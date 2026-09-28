-- ==============================================================================
-- MANPOWER / MAISC RECRUITMENT PORTAL - SUPABASE JOB VIEW TRACKING SYSTEM
-- ==============================================================================
-- This script configures:
-- 1. `job_views` table with appropriate columns and performance indexes
-- 2. `admin_users` table and `is_admin()` security helper function
-- 3. Row Level Security (RLS) policies allowing ONLY administrators to read, update, or delete
-- 4. `record_job_view` database function (SECURITY DEFINER RPC) allowing anonymous public visitors
--    to safely log a view without granting them read or write access to other rows or data
-- 5. `get_job_view_stats` function for authenticated administrators to query aggregated statistics
-- ==============================================================================

-- 1. Ensure the job_views table exists
CREATE TABLE IF NOT EXISTS public.job_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT NOT NULL,
  visitor_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for lightning-fast queries and aggregations by job_id
CREATE INDEX IF NOT EXISTS idx_job_views_job_id ON public.job_views(job_id);
CREATE INDEX IF NOT EXISTS idx_job_views_created_at ON public.job_views(created_at);

-- 2. Ensure admin_users table exists
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Define / update is_admin() function for strict administrator authorization
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Returns true if the currently authenticated user's ID or email exists in admin_users
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() OR email = (auth.jwt()->>'email')
  );
END;
$$;

-- Grant execution to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 4. Enable Row Level Security (RLS) on job_views
ALTER TABLE public.job_views ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing/conflicting policies to ensure clean state
DROP POLICY IF EXISTS "Admins can select job_views" ON public.job_views;
DROP POLICY IF EXISTS "Admins can insert job_views" ON public.job_views;
DROP POLICY IF EXISTS "Admins can update job_views" ON public.job_views;
DROP POLICY IF EXISTS "Admins can delete job_views" ON public.job_views;
DROP POLICY IF EXISTS "Allow admin select job_views" ON public.job_views;
DROP POLICY IF EXISTS "Allow public insert job_views" ON public.job_views;

-- 6. STRICT RLS POLICIES FOR ADMINISTRATORS ONLY
-- Normal public visitors CANNOT SELECT (read), UPDATE, or DELETE job_views records.
CREATE POLICY "Admins can select job_views"
  ON public.job_views
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update job_views"
  ON public.job_views
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete job_views"
  ON public.job_views
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 7. SECURE VIEW RECORDING RPC (SECURITY DEFINER)
-- This function allows anonymous and public visitors to increment a view count
-- safely. It runs as SECURITY DEFINER so that it can write to job_views without
-- needing to grant SELECT, UPDATE, or DELETE permissions to anonymous users.
CREATE OR REPLACE FUNCTION public.record_job_view(
  p_job_id TEXT,
  p_visitor_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Reject empty or whitespace-only job IDs
  IF p_job_id IS NULL OR trim(p_job_id) = '' THEN
    RETURN FALSE;
  END IF;

  INSERT INTO public.job_views (job_id, visitor_id, created_at, viewed_at)
  VALUES (trim(p_job_id), p_visitor_id, now(), now());

  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  RETURN FALSE;
END;
$$;

-- Grant EXECUTE to public visitors (anon) and authenticated users
GRANT EXECUTE ON FUNCTION public.record_job_view(TEXT, TEXT) TO anon, authenticated;

-- 8. SECURE AGGREGATED STATS RPC FOR ADMINISTRATORS
-- Efficiently calculates totals and view counts per job for authorized admins only.
CREATE OR REPLACE FUNCTION public.get_job_view_stats()
RETURNS TABLE (
  job_id TEXT,
  total_views BIGINT,
  last_viewed_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Strict authorization: only authenticated administrators are permitted
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Administrator privileges required.';
  END IF;

  RETURN QUERY
  SELECT 
    jv.job_id,
    COUNT(*)::BIGINT AS total_views,
    MAX(jv.created_at) AS last_viewed_at
  FROM public.job_views jv
  GROUP BY jv.job_id
  ORDER BY total_views DESC;
END;
$$;

-- Grant EXECUTE only to authenticated role
GRANT EXECUTE ON FUNCTION public.get_job_view_stats() TO authenticated;

-- (Optional) If you also want to allow direct INSERT via standard Supabase table insert:
-- CREATE POLICY "Allow public insert job_views"
--   ON public.job_views
--   FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (true);

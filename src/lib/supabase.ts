import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Job } from "../data/jobStore";
import type { CandidateApplication, ApplicantDocument } from "../data/applicantStore";
import type { RecruitmentPartnerRequest } from "../data/partnerStore";

// Read public environment variables for Supabase (Publishable / Anon key only)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qbvrzqviovgrjjftujy.supabase.co";
const supabasePublishableKey = 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabasePublishableKey && 
  !supabaseUrl.includes("your-project")
);

// Initialize client only with safe public publishable key - never service-role key
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Local fallback store keys
const LOCAL_VIEWS_KEY = "maisc_job_views_store";
const LOCAL_VISITOR_ID_KEY = "maisc_visitor_anon_id";

export interface JobViewStat {
  jobId: string;
  totalViews: number;
  lastViewedAt?: string;
}

/**
 * Get or generate a persistent anonymous visitor ID without requiring any user registration.
 */
export function getAnonymousVisitorId(): string {
  try {
    let visitorId = localStorage.getItem(LOCAL_VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(LOCAL_VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return `vis_temp_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// ==============================================================================
// 1. JOB VIEW TRACKING (job_views table + record_job_view RPC)
// ==============================================================================

/**
 * Record a single view for a specific job in Supabase.
 * - Works for anonymous and unauthenticated visitors
 * - Uses the secure SECURITY DEFINER RPC function 'record_job_view' to bypass direct table permissions safely
 * - Includes client-side session deduplication to prevent React re-renders or page state changes from double-counting
 */
export async function recordJobView(jobId: string): Promise<{ success: boolean; source: "supabase" | "local" | "deduped" }> {
  if (!jobId || typeof jobId !== "string" || !jobId.trim()) {
    return { success: false, source: "deduped" };
  }

  const cleanJobId = jobId.trim();
  const visitorId = getAnonymousVisitorId();

  // Deduplication check: check if already viewed in this browser session recently (within 15 minutes)
  const sessionKey = `maisc_viewed_${cleanJobId}`;
  try {
    const lastRecorded = sessionStorage.getItem(sessionKey);
    const now = Date.now();
    if (lastRecorded && now - parseInt(lastRecorded, 10) < 15 * 60 * 1000) {
      return { success: true, source: "deduped" };
    }
    // Mark as viewed in session
    sessionStorage.setItem(sessionKey, now.toString());
  } catch {
    // If sessionStorage is unavailable, continue
  }

  // If Supabase is connected, record the view via secure RPC or fallback insert
  if (supabase) {
    try {
      // Primary: Secure database function (RPC)
      const { data, error } = await supabase.rpc("record_job_view", {
        p_job_id: cleanJobId,
        p_visitor_id: visitorId,
      });

      if (!error && (data === true || data === null)) {
        recordLocalView(cleanJobId);
        return { success: true, source: "supabase" };
      }

      // Fallback: direct insert if RPC not used
      const { error: insertError } = await supabase.from("job_views").insert([
        {
          job_id: cleanJobId,
          visitor_id: visitorId,
          created_at: new Date().toISOString(),
        },
      ]);

      if (!insertError) {
        recordLocalView(cleanJobId);
        return { success: true, source: "supabase" };
      }

      console.warn("Supabase view recording error, falling back to local store:", error || insertError);
    } catch (err) {
      console.warn("Supabase view recording exception:", err);
    }
  }

  // Local fallback recording
  recordLocalView(cleanJobId);
  return { success: true, source: "local" };
}

function recordLocalView(jobId: string) {
  try {
    const raw = localStorage.getItem(LOCAL_VIEWS_KEY);
    const views: Record<string, { totalViews: number; lastViewedAt: string }> = raw ? JSON.parse(raw) : {};
    const current = views[jobId] || { totalViews: 0, lastViewedAt: new Date().toISOString() };
    views[jobId] = {
      totalViews: current.totalViews + 1,
      lastViewedAt: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_VIEWS_KEY, JSON.stringify(views));
    window.dispatchEvent(new Event("maisc_job_views_updated"));
  } catch (e) {
    console.error("Local view record error:", e);
  }
}

/**
 * Fetch view counts for all jobs.
 * Supabase is the authoritative data source for view statistics.
 */
export async function fetchJobViewStats(): Promise<Record<string, number>> {
  const statsMap: Record<string, number> = {};

  // If Supabase is connected, fetch authoritatively from Supabase
  if (supabase) {
    try {
      // 1. Try secure RPC function get_job_view_stats()
      const { data: rpcData, error: rpcError } = await supabase.rpc("get_job_view_stats");

      if (!rpcError && Array.isArray(rpcData)) {
        for (const row of rpcData) {
          if (row.job_id) {
            statsMap[row.job_id] = Number(row.total_views || 0);
          }
        }
        return statsMap;
      }

      // 2. Fallback: Query job_views table directly (protected by RLS / is_admin())
      const { data: tableData, error: tableError } = await supabase
        .from("job_views")
        .select("job_id");

      if (!tableError && Array.isArray(tableData)) {
        for (const row of tableData) {
          if (row.job_id) {
            statsMap[row.job_id] = (statsMap[row.job_id] || 0) + 1;
          }
        }
        return statsMap;
      }
    } catch (err) {
      console.warn("Error fetching Supabase job view stats:", err);
    }
  }

  // Read local store only when Supabase is not configured
  try {
    const raw = localStorage.getItem(LOCAL_VIEWS_KEY);
    if (raw) {
      const parsed: Record<string, { totalViews: number }> = JSON.parse(raw);
      for (const [jid, data] of Object.entries(parsed)) {
        statsMap[jid] = data.totalViews || 0;
      }
    }
  } catch (e) {
    console.error("Failed to read local views:", e);
  }

  return statsMap;
}

// ==============================================================================
// 2. JOBS MANAGEMENT (jobs table)
// ==============================================================================

/**
 * Fetch jobs from Supabase 'jobs' table.
 */
export async function fetchSupabaseJobs(): Promise<Job[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("posted_date", { ascending: false });

    if (error) {
      console.warn("Supabase jobs fetch error:", error);
      return null;
    }

    if (Array.isArray(data) && data.length > 0) {
      return data.map((row: any) => ({
        id: String(row.id || row.job_id),
        title: row.title || "Job Title",
        category: row.category || "General Services",
        location: row.location || "International",
        type: row.type || "Full-Time",
        experience: row.experience || "",
        description: row.description || "",
        keySkills: Array.isArray(row.key_skills) ? row.key_skills : (Array.isArray(row.keySkills) ? row.keySkills : []),
        status: row.status || "Actively Recruiting",
        applyUrl: row.apply_url || row.applyUrl || "",
        salary: row.salary || "",
        postedDate: row.posted_date || row.postedDate || new Date().toISOString().split("T")[0]
      }));
    }
    return [];
  } catch (err) {
    console.warn("Exception fetching jobs from Supabase:", err);
    return null;
  }
}

/**
 * Upsert a job to Supabase 'jobs' table.
 */
export async function saveSupabaseJob(job: Job): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload = {
      id: job.id,
      title: job.title,
      category: job.category,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      key_skills: job.keySkills,
      status: job.status,
      apply_url: job.applyUrl || null,
      salary: job.salary || null,
      posted_date: job.postedDate || new Date().toISOString().split("T")[0]
    };
    const { error } = await supabase.from("jobs").upsert([payload]);
    if (error) {
      console.warn("Supabase save job error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception saving job to Supabase:", err);
    return false;
  }
}

/**
 * Delete a job from Supabase 'jobs' table.
 */
export async function deleteSupabaseJob(jobId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);
    if (error) {
      console.warn("Supabase delete job error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception deleting job from Supabase:", err);
    return false;
  }
}

// ==============================================================================
// 3. CANDIDATE APPLICATIONS (candidate_applications table)
// ==============================================================================

/**
 * Submit candidate application to Supabase 'candidate_applications'.
 */
export async function submitCandidateApplicationToSupabase(
  app: CandidateApplication
): Promise<{ success: boolean; error?: any }> {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const payload: Record<string, any> = {
      id: app.id,
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      whatsapp_or_viber: app.whatsappOrViber || null,
      position_applied: app.positionApplied,
      target_country: app.targetCountry,
      category: app.category,
      years_of_experience: app.yearsOfExperience,
      education_level: app.educationLevel,
      current_location: app.currentLocation,
      passport_number: app.passportNumber || null,
      passport_expiry: app.passportExpiry || null,
      notes: app.notes || null,
      status: app.status || "Pending Review",
      submitted_at: app.submittedAt || new Date().toISOString(),
      documents: {
        resume: app.resume ? { name: app.resume.name, size: app.resume.size, type: app.resume.type, path: (app.resume as any).storagePath } : null,
        passport_copy: app.passportCopy ? { name: app.passportCopy.name, size: app.passportCopy.size, type: app.passportCopy.type, path: (app.passportCopy as any).storagePath } : null,
        photo_2x2: app.photo2x2 ? { name: app.photo2x2.name, size: app.photo2x2.size, type: app.photo2x2.type, path: (app.photo2x2 as any).storagePath } : null,
        nbi_clearance: app.nbiClearance ? { name: app.nbiClearance.name, size: app.nbiClearance.size, type: app.nbiClearance.type, path: (app.nbiClearance as any).storagePath } : null,
        certificates: app.certificates?.map(c => ({ name: c.name, size: c.size, type: c.type, path: (c as any).storagePath })) || []
      }
    };

    const { error } = await supabase.from("candidate_applications").insert([payload]);
    if (error) {
      console.warn("Supabase candidate_applications insert error:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.warn("Exception submitting candidate application to Supabase:", err);
    return { success: false, error: err };
  }
}

/**
 * Fetch candidate applications from Supabase (accessible to authorized admins via RLS).
 */
export async function fetchCandidateApplicationsFromSupabase(): Promise<CandidateApplication[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("candidate_applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      // Expected for non-admins due to RLS
      return null;
    }

    if (Array.isArray(data)) {
      return data.map((row: any) => ({
        id: String(row.id),
        fullName: row.full_name || row.fullName || "Applicant",
        email: row.email || "",
        phone: row.phone || "",
        whatsappOrViber: row.whatsapp_or_viber || row.whatsappOrViber || "",
        positionApplied: row.position_applied || row.positionApplied || "",
        targetCountry: row.target_country || row.targetCountry || "Any",
        category: row.category || "General Services",
        yearsOfExperience: row.years_of_experience || row.yearsOfExperience || "",
        educationLevel: row.education_level || row.educationLevel || "",
        currentLocation: row.current_location || row.currentLocation || "",
        passportNumber: row.passport_number || row.passportNumber || "",
        passportExpiry: row.passport_expiry || row.passportExpiry || "",
        notes: row.notes || "",
        submittedAt: row.submitted_at || row.created_at || new Date().toISOString(),
        status: row.status || "Pending Review",
        resume: row.documents?.resume || (row.resume ? { name: "Resume", size: 0, type: "application/pdf", dataUrl: row.resume } : undefined),
        passportCopy: row.documents?.passport_copy || (row.passport_copy ? { name: "Passport", size: 0, type: "image/jpeg", dataUrl: row.passport_copy } : undefined),
        photo2x2: row.documents?.photo_2x2 || (row.photo_2x2 ? { name: "2x2 Photo", size: 0, type: "image/jpeg", dataUrl: row.photo_2x2 } : undefined),
        nbiClearance: row.documents?.nbi_clearance || undefined,
        certificates: Array.isArray(row.documents?.certificates) ? row.documents.certificates : []
      }));
    }
    return [];
  } catch (err) {
    console.warn("Exception fetching candidate applications:", err);
    return null;
  }
}

/**
 * Update candidate application status in Supabase
 */
export async function updateCandidateApplicationStatusInSupabase(
  id: string,
  status: CandidateApplication["status"]
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("candidate_applications")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.warn("Supabase update candidate status error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception updating candidate status in Supabase:", err);
    return false;
  }
}

/**
 * Delete candidate application from Supabase
 */
export async function deleteCandidateApplicationInSupabase(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("candidate_applications")
      .delete()
      .eq("id", id);
    if (error) {
      console.warn("Supabase delete candidate error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception deleting candidate application from Supabase:", err);
    return false;
  }
}

// ==============================================================================
// 4. CANDIDATE DOCUMENTS (candidate-documents Storage bucket + candidate_documents table)
// ==============================================================================

/**
 * Upload a candidate document to the existing 'candidate-documents' storage bucket.
 * Records metadata in 'candidate_documents' table when possible.
 */
export async function uploadCandidateDocumentToStorage(
  file: File,
  applicationId: string,
  docType: string
): Promise<{ path: string; error?: any }> {
  if (!supabase) return { path: "", error: "Supabase not configured" };
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${applicationId}/${docType}_${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("candidate-documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.warn("candidate-documents storage upload error:", uploadError);
      return { path: "", error: uploadError };
    }

    // Try to record in candidate_documents table
    try {
      await supabase.from("candidate_documents").insert([
        {
          application_id: applicationId,
          document_type: docType,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type || "application/octet-stream",
          created_at: new Date().toISOString(),
        }
      ]);
    } catch {
      // Graceful fallback if table is protected or has custom schema
    }

    return { path: filePath };
  } catch (err) {
    console.warn("Exception uploading candidate document:", err);
    return { path: "", error: err };
  }
}

/**
 * Get an accessible URL for a candidate document from the 'candidate-documents' storage bucket.
 */
export async function getCandidateDocumentUrl(filePath: string): Promise<string | null> {
  if (!supabase || !filePath) return null;
  try {
    if (filePath.startsWith("data:") || filePath.startsWith("http")) {
      return filePath;
    }

    // Try signed URL (60 mins validity)
    const { data: signedData, error: signedError } = await supabase.storage
      .from("candidate-documents")
      .createSignedUrl(filePath, 3600);

    if (!signedError && signedData?.signedUrl) {
      return signedData.signedUrl;
    }

    // Fallback to public URL
    const { data: publicData } = supabase.storage
      .from("candidate-documents")
      .getPublicUrl(filePath);

    return publicData?.publicUrl || null;
  } catch (err) {
    console.warn("Error getting candidate document URL:", err);
    return null;
  }
}

// ==============================================================================
// 5. INTERNATIONAL PARTNERS (partner_inquiries table)
// ==============================================================================

/**
 * Submit partner inquiry to Supabase 'partner_inquiries'.
 */
export async function submitPartnerInquiryToSupabase(
  partner: RecruitmentPartnerRequest
): Promise<{ success: boolean; error?: any }> {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const payload: Record<string, any> = {
      id: partner.id,
      company_name: partner.companyName,
      country: partner.country,
      city: partner.city,
      industry: partner.industry,
      contact_person: partner.contactPerson,
      designation: partner.designation,
      corporate_email: partner.corporateEmail,
      phone_number: partner.phoneNumber,
      website: partner.website || null,
      registration_number: partner.registrationNumber || null,
      partnership_type: partner.partnershipType,
      previously_recruited_filipino: partner.previouslyRecruitedFilipino,
      countries_recruited_from: partner.countriesRecruitedFrom || null,
      has_philippine_partner: partner.hasPhilippinePartner,
      current_philippine_partner_name: partner.currentPhilippinePartnerName || null,
      additional_info: partner.additionalInfo || null,
      target_positions: partner.targetPositions || null,
      estimated_headcount: partner.estimatedHeadcount || null,
      target_deployment_timeline: partner.targetDeploymentTimeline || null,
      workplace_location: partner.workplaceLocation || null,
      candidate_requirements: partner.candidateRequirements || null,
      status: partner.status || "New",
      submitted_at: partner.submittedAt || new Date().toISOString()
    };

    const { error } = await supabase.from("partner_inquiries").insert([payload]);
    if (error) {
      console.warn("Supabase partner_inquiries insert error:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.warn("Exception submitting partner inquiry to Supabase:", err);
    return { success: false, error: err };
  }
}

/**
 * Fetch partner inquiries from Supabase (accessible to authorized admins via RLS).
 */
export async function fetchPartnerInquiriesFromSupabase(): Promise<RecruitmentPartnerRequest[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("partner_inquiries")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      // Expected for non-admins due to RLS
      return null;
    }

    if (Array.isArray(data)) {
      return data.map((row: any) => ({
        id: String(row.id),
        companyName: row.company_name || row.companyName || "",
        country: row.country || "",
        city: row.city || "",
        industry: row.industry || "",
        contactPerson: row.contact_person || row.contactPerson || "",
        designation: row.designation || "",
        corporateEmail: row.corporate_email || row.corporateEmail || row.email || "",
        phoneNumber: row.phone_number || row.phoneNumber || row.phone || "",
        website: row.website || "",
        registrationNumber: row.registration_number || row.registrationNumber || "",
        partnershipType: row.partnership_type || row.partnershipType || "Recruitment of Filipino Workers",
        previouslyRecruitedFilipino: row.previously_recruited_filipino || row.previouslyRecruitedFilipino || "No",
        countriesRecruitedFrom: row.countries_recruited_from || row.countriesRecruitedFrom || "",
        hasPhilippinePartner: row.has_philippine_partner || row.hasPhilippinePartner || "No",
        currentPhilippinePartnerName: row.current_philippine_partner_name || row.currentPhilippinePartnerName || "",
        additionalInfo: row.additional_info || row.additionalInfo || "",
        targetPositions: row.target_positions || row.targetPositions || "",
        estimatedHeadcount: row.estimated_headcount || row.estimatedHeadcount || "",
        targetDeploymentTimeline: row.target_deployment_timeline || row.targetDeploymentTimeline || "",
        workplaceLocation: row.workplace_location || row.workplaceLocation || "",
        candidateRequirements: row.candidate_requirements || row.candidateRequirements || "",
        status: row.status || "New",
        submittedAt: row.submitted_at || row.created_at || new Date().toISOString()
      }));
    }
    return [];
  } catch (err) {
    console.warn("Exception fetching partner inquiries from Supabase:", err);
    return null;
  }
}

/**
 * Update partner inquiry status in Supabase
 */
export async function updatePartnerInquiryStatusInSupabase(
  id: string,
  status: RecruitmentPartnerRequest["status"]
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("partner_inquiries")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.warn("Supabase update partner status error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception updating partner status in Supabase:", err);
    return false;
  }
}

/**
 * Delete partner inquiry from Supabase
 */
export async function deletePartnerInquiryInSupabase(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("partner_inquiries")
      .delete()
      .eq("id", id);
    if (error) {
      console.warn("Supabase delete partner error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Exception deleting partner inquiry from Supabase:", err);
    return false;
  }
}

// ==============================================================================
// 6. ADMIN AUTHORIZATION (admin_users table + is_admin() function)
// ==============================================================================

/**
 * Check if the current authenticated Supabase user is an administrator via the is_admin() function.
 */
export async function checkSupabaseIsAdmin(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data: userResponse } = await supabase.auth.getUser();
    if (!userResponse?.user) return false;

    // Call database is_admin() function
    const { data, error } = await supabase.rpc("is_admin");
    if (!error && typeof data === "boolean") {
      return data;
    }

    // Direct check in admin_users table
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .or(`user_id.eq.${userResponse.user.id},email.eq.${userResponse.user.email}`)
      .limit(1);

    return Boolean(adminData && adminData.length > 0);
  } catch {
    return false;
  }
}

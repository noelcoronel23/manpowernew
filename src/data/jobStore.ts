export interface Job {
  id: string;
  title: string;
  category: "Healthcare" | "Engineering" | "Hospitality" | "Skilled Trades" | "IT & Corporate" | "General Services";
  location: string;
  type: string;
  experience: string;
  description: string;
  keySkills: string[];
  status: "Urgent Hiring" | "Actively Recruiting" | "Accepting Applications";
  applyUrl?: string;
  salary?: string;
  postedDate?: string;
}

const STORAGE_KEY = "maisc_jobs_data";
const EVENT_NAME = "maisc_jobs_updated";

export const INITIAL_JOBS: Job[] = [];

export function getJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Remove any leftover sample jobs (job-001, job-002, job-003, job-004)
      const sampleJobIds = new Set(["job-001", "job-002", "job-003", "job-004"]);
      const cleaned = parsed.filter((j) => !sampleJobIds.has(j.id));
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    }
    return [];
  } catch (err) {
    console.error("Failed to parse jobs from localStorage:", err);
    return [];
  }
}

export function saveJobs(jobs: Job[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (err) {
    console.error("Failed to save jobs to localStorage:", err);
  }
}

export function addJob(jobData: Omit<Job, "id" | "postedDate">): Job {
  const currentJobs = getJobs();
  const newJob: Job = {
    ...jobData,
    id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    postedDate: new Date().toISOString().split("T")[0]
  };
  const updated = [newJob, ...currentJobs];
  saveJobs(updated);
  return newJob;
}

export function updateJob(id: string, updates: Partial<Job>): boolean {
  const currentJobs = getJobs();
  const index = currentJobs.findIndex((j) => j.id === id);
  if (index === -1) return false;
  
  currentJobs[index] = {
    ...currentJobs[index],
    ...updates,
  };
  saveJobs(currentJobs);
  return true;
}

export function deleteJob(id: string): boolean {
  const currentJobs = getJobs();
  const filtered = currentJobs.filter((j) => j.id !== id);
  if (filtered.length === currentJobs.length) return false;
  saveJobs(filtered);
  return true;
}

export function resetToDefaults(): void {
  saveJobs(INITIAL_JOBS);
}

export function clearAllJobs(): void {
  saveJobs([]);
}

export function subscribeToJobs(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}

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

export const INITIAL_JOBS: Job[] = [
  {
    id: "job-001",
    title: "Registered Staff Nurse",
    category: "Healthcare",
    location: "Germany / United Kingdom",
    type: "Full-Time (3-Year Contract)",
    experience: "Minimum 2 Years Hospital Experience",
    description: "Seeking compassionate and qualified Staff Nurses for premier hospital networks across Europe. Placement includes language sponsorship, relocation package, and comprehensive onboarding.",
    keySkills: ["PRC Licensed", "ICU / Med-Surg Care", "B2 Language Training Provided", "Patient Care"],
    status: "Urgent Hiring",
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform",
    salary: "Competitive Euro Package + Benefits",
    postedDate: "2026-09-18"
  },
  {
    id: "job-002",
    title: "Heavy Equipment Mechanic",
    category: "Skilled Trades",
    location: "Saudi Arabia / UAE",
    type: "Full-Time (2-Year Renewable Contract)",
    experience: "3+ Years Heavy Machinery Maintenance",
    description: "Responsible for diagnostic troubleshooting, scheduled servicing, and hydraulic repair of excavators, bulldozers, and prime movers for flagship infrastructure projects.",
    keySkills: ["TESDA NC II / NC III", "Hydraulic Systems", "Diesel Engine Diagnostic", "Safety Protocol Compliance"],
    status: "Actively Recruiting",
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform",
    salary: "Tax-Free Basic + Housing & Transport",
    postedDate: "2026-09-17"
  },
  {
    id: "job-003",
    title: "Pipe Fitter / 6G Welder",
    category: "Engineering",
    location: "Middle East (Oil & Gas)",
    type: "Full-Time (Rotation / Contract)",
    experience: "3+ Years Industrial Plant Experience",
    description: "Precision fabrication, alignment, and SMAW/GTAW welding of pressure piping systems according to ASME and international client specifications.",
    keySkills: ["6G Certified", "Blueprint Reading", "Pipe Spool Fabrication", "WPS Adherence"],
    status: "Urgent Hiring",
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform",
    salary: "Attractive Package + Food & Accommodation",
    postedDate: "2026-09-15"
  },
  {
    id: "job-004",
    title: "Food & Beverage Captain",
    category: "Hospitality",
    location: "Japan / Middle East Luxury Resorts",
    type: "Full-Time",
    experience: "2+ Years 4-Star or 5-Star Hotel Experience",
    description: "Oversee dining room operations, VIP guest coordination, and table service excellence. Requires strong English interpersonal skills and hospitable service mindset.",
    keySkills: ["Hospitality Management", "Guest Relations", "POS Operation", "Service Standards"],
    status: "Accepting Applications",
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform",
    salary: "Competitive Base + Service Charge Allocation",
    postedDate: "2026-09-12"
  }
];

export function getJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_JOBS;
  } catch (err) {
    console.error("Failed to parse jobs from localStorage:", err);
    return INITIAL_JOBS;
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

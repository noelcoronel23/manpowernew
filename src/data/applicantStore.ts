export interface ApplicantDocument {
  name: string;
  size: number;
  type: string;
  dataUrl?: string; // For previews/storage
}

export interface CandidateApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappOrViber?: string;
  positionApplied: string;
  targetCountry: string;
  category: string;
  yearsOfExperience: string;
  passportNumber?: string;
  passportExpiry?: string;
  educationLevel: string;
  currentLocation: string;
  notes?: string;
  
  // Documents
  photo2x2?: ApplicantDocument;
  passportCopy?: ApplicantDocument;
  resume?: ApplicantDocument;
  certificates?: ApplicantDocument[];
  nbiClearance?: ApplicantDocument;

  submittedAt: string;
  status: "Pending Review" | "Shortlisted" | "Under Evaluation" | "Deployed" | "Archived";
}

const STORAGE_KEY = "maisc_candidate_applications";
const EVENT_NAME = "maisc_applications_updated";

export function getApplications(): CandidateApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to load applications:", err);
    return [];
  }
}

export function saveApplications(apps: CandidateApplication[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (err) {
    console.error("Failed to save applications:", err);
  }
}

export function submitApplication(data: Omit<CandidateApplication, "id" | "submittedAt" | "status">): CandidateApplication {
  const current = getApplications();
  const newApp: CandidateApplication = {
    ...data,
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submittedAt: new Date().toISOString(),
    status: "Pending Review"
  };
  const updated = [newApp, ...current];
  saveApplications(updated);
  return newApp;
}

export function updateApplicationStatus(id: string, status: CandidateApplication["status"]): boolean {
  const current = getApplications();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return false;
  current[index].status = status;
  saveApplications(current);
  return true;
}

export function deleteApplication(id: string): boolean {
  const current = getApplications();
  const filtered = current.filter(a => a.id !== id);
  if (filtered.length === current.length) return false;
  saveApplications(filtered);
  return true;
}

export function subscribeToApplications(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}

export interface RecruitmentPartnerRequest {
  id: string;
  submittedAt: string;
  // Section 1: Company Information
  companyName: string;
  country: string;
  city: string;
  industry: string;
  contactPerson: string;
  designation: string;
  corporateEmail: string;
  phoneNumber: string;
  website?: string;
  registrationNumber?: string;

  // SECTION 2: RECRUITMENT PARTNERSHIP (Specified by user)
  partnershipType: string; // "Recruitment of Filipino Workers" | "Philippine Sourcing Partner" | "Long-term Recruitment Partnership" | "Other"
  partnershipTypeOther?: string;
  previouslyRecruitedFilipino: "Yes" | "No";
  countriesRecruitedFrom: string; // Short answer
  hasPhilippinePartner: "Yes" | "No";
  currentPhilippinePartnerName?: string; // Short answer
  additionalInfo: string; // Long answer

  // Section 3: Manpower Request Details
  targetPositions?: string;
  estimatedHeadcount?: string;
  targetDeploymentTimeline?: string;
  workplaceLocation?: string;
  candidateRequirements?: string;

  status: "New" | "Reviewed" | "Contacted" | "In Negotiation" | "Archived";
  notes?: string;
}

const STORAGE_KEY = "maisc_recruitment_partner_requests";

export function getPartnerRequests(): RecruitmentPartnerRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePartnerRequest(data: Omit<RecruitmentPartnerRequest, "id" | "submittedAt" | "status">): RecruitmentPartnerRequest {
  const current = getPartnerRequests();
  const newRequest: RecruitmentPartnerRequest = {
    ...data,
    id: `REQ-EUR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    submittedAt: new Date().toISOString(),
    status: "New"
  };

  const updated = [newRequest, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("maisc_partner_requests_updated"));
  } catch (err) {
    console.error("Failed to save partner request", err);
  }
  return newRequest;
}

export function updatePartnerRequestStatus(id: string, status: RecruitmentPartnerRequest["status"], notes?: string): void {
  const current = getPartnerRequests();
  const updated = current.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { notes } : {})
      };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("maisc_partner_requests_updated"));
}

export function deletePartnerRequest(id: string): void {
  const current = getPartnerRequests();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("maisc_partner_requests_updated"));
}

export function subscribeToPartnerRequests(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener("maisc_partner_requests_updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("maisc_partner_requests_updated", handler);
    window.removeEventListener("storage", handler);
  };
}

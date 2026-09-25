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

const INITIAL_REQUESTS: RecruitmentPartnerRequest[] = [
  {
    id: "REQ-EUR-2026-081",
    submittedAt: "2026-09-18T14:20:00Z",
    companyName: "Bavaria Klinikum & Pflegezentrum GmbH",
    country: "Germany",
    city: "Munich",
    industry: "Healthcare & Eldercare",
    contactPerson: "Dr. Klaus Richter",
    designation: "Head of International HR & Talent Acquisition",
    corporateEmail: "k.richter@bavaria-klinik.de",
    phoneNumber: "+49 89 2345 6789",
    website: "https://bavaria-klinik-sample.de",
    registrationNumber: "HRB 94821 Munich",

    // SECTION 2: RECRUITMENT PARTNERSHIP
    partnershipType: "Long-term Recruitment Partnership",
    previouslyRecruitedFilipino: "Yes",
    countriesRecruitedFrom: "Philippines, Tunisia, Vietnam, India",
    hasPhilippinePartner: "Yes",
    currentPhilippinePartnerName: "Apex Global Human Resources (Contract ending Q4 2026)",
    additionalInfo: "We are seeking a reliable, accredited Philippine DMW agency to deploy 25-30 registered nurses with B1/B2 German language proficiency annually. Looking for dedicated document processing and pre-departure German orientation.",

    targetPositions: "Registered General Nurses (RN), Geriatric Care Specialists",
    estimatedHeadcount: "30 nurses / year",
    targetDeploymentTimeline: "Q1 2027",
    workplaceLocation: "Munich and Nuremberg facilities",
    candidateRequirements: "B1 Goethe/Telc certificate, minimum 2 years hospital bed-side experience.",
    status: "New"
  },
  {
    id: "REQ-EUR-2026-074",
    submittedAt: "2026-09-15T09:45:00Z",
    companyName: "Nordic Construct & Infrastructure A/S",
    country: "Denmark",
    city: "Copenhagen",
    industry: "Construction & Civil Engineering",
    contactPerson: "Astrid Lindholm",
    designation: "Project Workforce Director",
    corporateEmail: "a.lindholm@nordic-construct.dk",
    phoneNumber: "+45 32 11 44 88",
    website: "https://nordic-construct-sample.dk",
    registrationNumber: "CVR 38291042",

    // SECTION 2: RECRUITMENT PARTNERSHIP
    partnershipType: "Recruitment of Filipino Workers",
    previouslyRecruitedFilipino: "No",
    countriesRecruitedFrom: "Poland, Romania, Lithuania",
    hasPhilippinePartner: "No",
    currentPhilippinePartnerName: "",
    additionalInfo: "First time looking into Philippine recruitment after hearing strong recommendations regarding Filipino welders, structural fabricators, and heavy equipment operators in Nordic projects.",

    targetPositions: "6G SMAW/GTAW Welders, Heavy Equipment Operators, Riggers",
    estimatedHeadcount: "15-20 workers",
    targetDeploymentTimeline: "November 2026",
    workplaceLocation: "Odense and Copenhagen harbour worksites",
    candidateRequirements: "AWS/ISO welding certificate, basic conversational English.",
    status: "Reviewed"
  }
];

export function getPartnerRequests(): RecruitmentPartnerRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_REQUESTS;
  } catch {
    return INITIAL_REQUESTS;
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

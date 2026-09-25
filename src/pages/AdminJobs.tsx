import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Job, 
  getJobs, 
  addJob, 
  updateJob, 
  deleteJob, 
  resetToDefaults, 
  clearAllJobs,
  subscribeToJobs 
} from "../data/jobStore";
import {
  CandidateApplication,
  ApplicantDocument,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  subscribeToApplications
} from "../data/applicantStore";
import {
  RecruitmentPartnerRequest,
  getPartnerRequests,
  updatePartnerRequestStatus,
  deletePartnerRequest,
  subscribeToPartnerRequests
} from "../data/partnerStore";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Lock,
  Unlock,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Download,
  Upload,
  Key,
  X,
  ArrowLeft,
  AlertCircle,
  Users,
  FileText,
  Camera,
  Eye,
  Phone,
  Mail,
  Award,
  FileCheck2,
  UserCheck,
  Handshake,
  Globe2,
  Building2,
  MessageSquare
} from "lucide-react";

const PASSWORD_KEY = "maisc_admin_password";
const AUTH_SESSION_KEY = "maisc_admin_authenticated";
const DEFAULT_PASSWORD = "admin";

export default function AdminJobs() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation tab: 'jobs' | 'applicants' | 'partners'
  const [activeTab, setActiveTab] = useState<"jobs" | "applicants" | "partners">("jobs");

  // Job management states
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Applicant management states
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [applicantSearch, setApplicantSearch] = useState<string>("");
  const [applicantStatusFilter, setApplicantStatusFilter] = useState<string>("All");
  const [selectedApplicant, setSelectedApplicant] = useState<CandidateApplication | null>(null);
  const [previewDoc, setPreviewDoc] = useState<ApplicantDocument | null>(null);

  // Partner Request management states
  const [partnerRequests, setPartnerRequests] = useState<RecruitmentPartnerRequest[]>([]);
  const [partnerSearch, setPartnerSearch] = useState<string>("");
  const [partnerStatusFilter, setPartnerStatusFilter] = useState<string>("All");
  const [selectedPartnerRequest, setSelectedPartnerRequest] = useState<RecruitmentPartnerRequest | null>(null);
  const [partnerAdminNote, setPartnerAdminNote] = useState<string>("");

  // Job Modal states
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<string>("");

  // Job Form inputs
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<Job["category"]>("Healthcare");
  const [formLocation, setFormLocation] = useState("");
  const [formType, setFormType] = useState("Full-Time");
  const [formExperience, setFormExperience] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formKeySkills, setFormKeySkills] = useState("");
  const [formStatus, setFormStatus] = useState<Job["status"]>("Actively Recruiting");
  const [formApplyUrl, setFormApplyUrl] = useState("https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform");
  const [formSalary, setFormSalary] = useState("");

  // Check auth session
  useEffect(() => {
    const session = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load and subscribe to jobs, applications, and partner requests
  useEffect(() => {
    if (isAuthenticated) {
      setJobs(getJobs());
      setApplications(getApplications());
      setPartnerRequests(getPartnerRequests());

      const unsubJobs = subscribeToJobs(() => {
        setJobs(getJobs());
      });
      const unsubApps = subscribeToApplications(() => {
        setApplications(getApplications());
      });
      const unsubPartners = subscribeToPartnerRequests(() => {
        setPartnerRequests(getPartnerRequests());
      });

      return () => {
        unsubJobs();
        unsubApps();
        unsubPartners();
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (passwordInput === storedPass || passwordInput === "maisc2024" || passwordInput === "admin") {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please verify and try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    localStorage.setItem(PASSWORD_KEY, newPassword);
    setPasswordSuccessMessage("Admin password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setPasswordSuccessMessage("");
      setIsPasswordModalOpen(false);
    }, 2000);
  };

  // Job Handlers
  const openNewJobModal = () => {
    setEditingJobId(null);
    setFormTitle("");
    setFormCategory("Healthcare");
    setFormLocation("");
    setFormType("Full-Time");
    setFormExperience("");
    setFormDescription("");
    setFormKeySkills("");
    setFormStatus("Actively Recruiting");
    setFormApplyUrl("https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform");
    setFormSalary("");
    setIsFormOpen(true);
  };

  const openEditJobModal = (job: Job) => {
    setEditingJobId(job.id);
    setFormTitle(job.title);
    setFormCategory(job.category);
    setFormLocation(job.location);
    setFormType(job.type);
    setFormExperience(job.experience);
    setFormDescription(job.description);
    setFormKeySkills(job.keySkills.join(", "));
    setFormStatus(job.status);
    setFormApplyUrl(job.applyUrl || "https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform");
    setFormSalary(job.salary || "");
    setIsFormOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim() || !formDescription.trim()) {
      alert("Please fill in the Job Title, Location, and Description.");
      return;
    }

    const skillsArray = formKeySkills
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (editingJobId) {
      updateJob(editingJobId, {
        title: formTitle.trim(),
        category: formCategory,
        location: formLocation.trim(),
        type: formType.trim(),
        experience: formExperience.trim(),
        description: formDescription.trim(),
        keySkills: skillsArray.length > 0 ? skillsArray : ["Relevant Experience Required"],
        status: formStatus,
        applyUrl: formApplyUrl.trim(),
        salary: formSalary.trim()
      });
    } else {
      addJob({
        title: formTitle.trim(),
        category: formCategory,
        location: formLocation.trim(),
        type: formType.trim(),
        experience: formExperience.trim(),
        description: formDescription.trim(),
        keySkills: skillsArray.length > 0 ? skillsArray : ["Relevant Experience Required"],
        status: formStatus,
        applyUrl: formApplyUrl.trim(),
        salary: formSalary.trim()
      });
    }

    setIsFormOpen(false);
    setEditingJobId(null);
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the job opening: "${title}"?`)) {
      deleteJob(id);
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jobs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `maisc-jobs-backup-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            if (window.confirm(`Found ${parsed.length} jobs in backup. Replace current listings?`)) {
              localStorage.setItem("maisc_jobs_data", JSON.stringify(parsed));
              setJobs(parsed);
              alert("Jobs imported successfully!");
            }
          } else {
            alert("Invalid JSON format.");
          }
        } catch {
          alert("Error reading JSON file.");
        }
      };
    }
  };

  // Applicant Actions
  const handleDeleteApplicant = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application record for "${name}"?`)) {
      deleteApplication(id);
      if (selectedApplicant?.id === id) {
        setSelectedApplicant(null);
      }
    }
  };

  const handleStatusChange = (id: string, newStatus: CandidateApplication["status"]) => {
    updateApplicationStatus(id, newStatus);
    if (selectedApplicant?.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const downloadDocument = (doc: ApplicantDocument, candidateName: string) => {
    if (!doc.dataUrl) {
      alert("Document data is unavailable.");
      return;
    }
    const a = document.createElement("a");
    a.href = doc.dataUrl;
    a.download = `${candidateName.replace(/\s+/g, "_")}_${doc.name}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesCat = selectedCategory === "All" || job.category === selectedCategory;
    const matchesQuery = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Filtered applicants
  const filteredApplicants = applications.filter((app) => {
    const matchesStatus = applicantStatusFilter === "All" || app.status === applicantStatusFilter;
    const matchesSearch = 
      app.fullName.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.positionApplied.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.phone.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.targetCountry.toLowerCase().includes(applicantSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered European partner requests
  const filteredPartnerRequests = partnerRequests.filter((req) => {
    const matchesStatus = partnerStatusFilter === "All" || req.status === partnerStatusFilter;
    const q = partnerSearch.toLowerCase();
    const matchesSearch = 
      req.companyName.toLowerCase().includes(q) ||
      req.country.toLowerCase().includes(q) ||
      req.city.toLowerCase().includes(q) ||
      req.contactPerson.toLowerCase().includes(q) ||
      req.corporateEmail.toLowerCase().includes(q) ||
      req.partnershipType.toLowerCase().includes(q) ||
      req.id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const categories = ["All", "Healthcare", "Engineering", "Hospitality", "Skilled Trades", "IT & Corporate", "General Services"];
  const applicantStatuses = ["All", "Pending Review", "Shortlisted", "Under Evaluation", "Deployed", "Archived"];
  const partnerStatuses = ["All", "New", "Reviewed", "Contacted", "In Negotiation", "Archived"];

  const handlePartnerStatusChange = (id: string, newStatus: RecruitmentPartnerRequest["status"]) => {
    updatePartnerRequestStatus(id, newStatus);
  };

  const handleSavePartnerNote = (id: string) => {
    updatePartnerRequestStatus(id, selectedPartnerRequest?.status || "Reviewed", partnerAdminNote);
    if (selectedPartnerRequest) {
      setSelectedPartnerRequest({
        ...selectedPartnerRequest,
        notes: partnerAdminNote
      });
    }
  };

  const handleDeletePartnerReq = (id: string, compName: string) => {
    if (confirm(`Are you sure you want to delete the European recruitment partner request from "${compName}" (${id})?`)) {
      deletePartnerRequest(id);
      if (selectedPartnerRequest?.id === id) {
        setSelectedPartnerRequest(null);
      }
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B2149] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-[#007BFF] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-8 h-8 stroke-[2]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B2149] tracking-tight">
              Recruitment Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Sign in to manage job openings and candidate document submissions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Admin Password / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all"
                />
              </div>
              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-2 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#0B2149] hover:bg-[#007BFF] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Access Admin Portal
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 mb-3">
              Default password: <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">admin</span> or <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">maisc2024</span>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <Link
                to="/job-openings"
                className="font-semibold text-slate-500 hover:text-[#007BFF] transition-colors"
              >
                View Job Openings
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                to="/apply-now"
                className="font-semibold text-slate-500 hover:text-[#007BFF] transition-colors"
              >
                View Apply Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#007BFF] tracking-widest uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              MAISC MANAGEMENT SYSTEM
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2149] tracking-tight">
              Recruitment & Candidate Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage live job openings and review candidate credentials, passport scans, and resumes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {activeTab === "jobs" && (
              <button
                onClick={openNewJobModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CE1126] hover:bg-[#a80e1f] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Post New Job
              </button>
            )}
            <Link
              to="/apply-now"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              Candidate Form
            </Link>
            <Link
              to="/recruitment-partner-form"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              Partner Form
            </Link>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
              title="Change Password"
            >
              <Key className="w-3.5 h-3.5 text-slate-400" />
              Security
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Primary View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "jobs"
                ? "bg-[#0B2149] text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Openings</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "jobs" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
            }`}>
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("applicants")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "applicants"
                ? "bg-[#0B2149] text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Applications & Documents</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "applicants" ? "bg-[#007BFF] text-white" : "bg-blue-50 text-[#007BFF]"
            }`}>
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === "partners"
                ? "bg-[#0B2149] text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>EU / USA &amp; International Requests</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "partners" ? "bg-[#0f7652] text-white" : "bg-emerald-50 text-[#0f7652]"
            }`}>
              {partnerRequests.length}
            </span>
          </button>
        </div>

        {/* TAB 1: JOB OPENINGS MANAGEMENT */}
        {activeTab === "jobs" && (
          <div>
            {/* Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Active Jobs</div>
                <div className="text-3xl font-extrabold text-[#0B2149]">{jobs.length}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Urgent Hiring</div>
                <div className="text-3xl font-extrabold text-[#CE1126]">
                  {jobs.filter(j => j.status === "Urgent Hiring").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Actively Recruiting</div>
                <div className="text-3xl font-extrabold text-[#007BFF]">
                  {jobs.filter(j => j.status === "Actively Recruiting").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Backup & Restore</div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={handleExportBackup}
                    className="text-xs font-bold text-slate-700 hover:text-[#007BFF] flex items-center gap-1"
                    title="Download JSON backup"
                  >
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                  <span className="text-slate-300">|</span>
                  <label className="text-xs font-bold text-slate-700 hover:text-[#007BFF] flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Import
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#0B2149] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, location, skill..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4 mb-12">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-[#0B2149] mb-1">No Jobs Found</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    {jobs.length === 0 ? "You have no active job postings. Click \"Post New Job\" to create your first vacancy." : "No jobs match your current search or category filter."}
                  </p>
                  {jobs.length === 0 ? (
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={openNewJobModal}
                        className="px-5 py-2.5 bg-[#0B2149] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#007BFF]"
                      >
                        + Post First Job
                      </button>
                      <button
                        onClick={resetToDefaults}
                        className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
                      >
                        Load Sample Jobs
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                      className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            job.status === "Urgent Hiring"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-blue-50 text-[#007BFF]"
                          }`}>
                            {job.status}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                            {job.category}
                          </span>
                          {job.postedDate && (
                            <span className="text-[11px] text-slate-400">
                              Posted: {job.postedDate}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-[#0B2149] mb-1.5">
                          {job.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#007BFF]" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{job.experience}</span>
                          </div>
                          {job.salary && (
                            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                              💰 <span>{job.salary}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {job.keySkills.map((skill, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions column */}
                      <div className="flex lg:flex-col items-center gap-2 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6">
                        <button
                          onClick={() => openEditJobModal(job)}
                          className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors w-full"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                          Edit Job
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-xl transition-colors w-full"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Utilities Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs text-slate-400">
              <div>
                Connected to Local Recruitment Database • Changes update live on candidate view immediately.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (window.confirm("Reset jobs back to default templates? Any custom jobs will be overwritten.")) {
                      resetToDefaults();
                    }
                  }}
                  className="hover:text-slate-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Defaults
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear ALL jobs? This will make the jobs page show 0 vacancies.")) {
                      clearAllJobs();
                    }
                  }}
                  className="text-rose-500 hover:text-rose-700"
                >
                  Clear All Listings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CANDIDATE APPLICATIONS & DOCUMENTS REVIEW */}
        {activeTab === "applicants" && (
          <div>
            {/* Filter & Search Bar for Applicants */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {applicantStatuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => setApplicantStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      applicantStatusFilter === st
                        ? "bg-[#0B2149] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={applicantSearch}
                  onChange={(e) => setApplicantSearch(e.target.value)}
                  placeholder="Search applicant name, role, country..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>
            </div>

            {/* Applications List */}
            {filteredApplicants.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#0B2149] mb-1">No Applications Found</h3>
                <p className="text-xs text-slate-500 mb-6">
                  {applications.length === 0
                    ? "No candidate applications have been submitted through the website yet. Candidates can submit their credentials on the Apply Now page."
                    : "No candidate applications match the selected status filter or search query."}
                </p>
                <Link
                  to="/apply-now"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Apply Now Form
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplicants.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                      
                      {/* Photo & Main Details */}
                      <div className="flex items-start gap-4 flex-1">
                        {app.photo2x2?.dataUrl ? (
                          <img
                            src={app.photo2x2.dataUrl}
                            alt={app.fullName}
                            onClick={() => setPreviewDoc(app.photo2x2!)}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 flex-shrink-0 cursor-pointer hover:opacity-90 shadow-xs"
                            title="Click to zoom 2x2 picture"
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-slate-400">
                            <Camera className="w-6 h-6 mb-1" />
                            <span className="text-[9px] uppercase font-bold">No Photo</span>
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="text-lg font-bold text-[#0B2149]">
                              {app.fullName}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                              app.status === "Pending Review"
                                ? "bg-amber-100 text-amber-800"
                                : app.status === "Shortlisted"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.status === "Under Evaluation"
                                ? "bg-blue-100 text-[#007BFF]"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {app.status}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Ref: {app.id.toUpperCase().slice(-8)}
                            </span>
                          </div>

                          <div className="text-xs text-[#007BFF] font-bold mb-2">
                            Applied For: {app.positionApplied} • <span className="text-slate-600 font-medium">{app.category}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-xs text-slate-500 mb-3">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>Destination: <strong>{app.targetCountry}</strong></span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              <span>Exp: {app.yearsOfExperience}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.email}</span>
                            </div>
                            {app.passportNumber && (
                              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Passport: {app.passportNumber} {app.passportExpiry ? `(Exp: ${app.passportExpiry})` : ""}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Uploaded Document Badges */}
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Attached Documents:
                            </span>

                            {app.photo2x2 && (
                              <button
                                onClick={() => setPreviewDoc(app.photo2x2!)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#007BFF] hover:bg-blue-100 text-xs font-semibold"
                              >
                                <Camera className="w-3 h-3" />
                                2x2 Photo
                              </button>
                            )}

                            {app.passportCopy && (
                              <button
                                onClick={() => downloadDocument(app.passportCopy!, app.fullName)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold"
                                title="Download Passport Copy"
                              >
                                <FileCheck2 className="w-3 h-3" />
                                Passport Copy
                                <Download className="w-3 h-3 ml-0.5" />
                              </button>
                            )}

                            {app.resume && (
                              <button
                                onClick={() => downloadDocument(app.resume!, app.fullName)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold"
                                title="Download Resume / CV"
                              >
                                <FileText className="w-3 h-3" />
                                Resume / CV
                                <Download className="w-3 h-3 ml-0.5" />
                              </button>
                            )}

                            {app.nbiClearance && (
                              <button
                                onClick={() => downloadDocument(app.nbiClearance!, app.fullName)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold"
                                title="Download NBI Clearance"
                              >
                                <ShieldCheck className="w-3 h-3" />
                                NBI / ID
                                <Download className="w-3 h-3 ml-0.5" />
                              </button>
                            )}

                            {app.certificates && app.certificates.map((cert, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => downloadDocument(cert, app.fullName)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold"
                                title={`Download ${cert.name}`}
                              >
                                <Award className="w-3 h-3" />
                                {cert.name.length > 15 ? cert.name.slice(0, 15) + "..." : cert.name}
                                <Download className="w-3 h-3 ml-0.5" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Status & Actions */}
                      <div className="flex lg:flex-col items-center gap-2 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6 min-w-[170px]">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as CandidateApplication["status"])}
                          className="w-full text-xs font-bold py-2 px-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#007BFF] outline-none"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Under Evaluation">Under Evaluation</option>
                          <option value="Deployed">Deployed</option>
                          <option value="Archived">Archived</option>
                        </select>

                        <button
                          onClick={() => setSelectedApplicant(app)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Dossier
                        </button>

                        <button
                          onClick={() => handleDeleteApplicant(app.id, app.fullName)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EUROPEAN RECRUITMENT PARTNER REQUESTS */}
        {activeTab === "partners" && (
          <div>
            {/* Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Requests</div>
                <div className="text-3xl font-extrabold text-[#0B2149]">{partnerRequests.length}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">New Submissions</div>
                <div className="text-3xl font-extrabold text-[#0f7652]">
                  {partnerRequests.filter(r => r.status === "New").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Under Review</div>
                <div className="text-3xl font-extrabold text-[#007BFF]">
                  {partnerRequests.filter(r => r.status === "Reviewed" || r.status === "Contacted").length}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">In Negotiation</div>
                <div className="text-3xl font-extrabold text-purple-600">
                  {partnerRequests.filter(r => r.status === "In Negotiation").length}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search company, country, contact person, or ID..."
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007BFF] outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Status:</span>
                  <select
                    value={partnerStatusFilter}
                    onChange={(e) => setPartnerStatusFilter(e.target.value)}
                    className="text-xs sm:text-sm font-semibold py-2 px-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#007BFF] outline-none w-full sm:w-auto"
                  >
                    {partnerStatuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <Link
                  to="/recruitment-partner-form"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0f7652] hover:bg-[#0c5c40] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Form
                </Link>
              </div>
            </div>

            {/* Requests List */}
            {filteredPartnerRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Handshake className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700 mb-1">No European Partner Requests Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  {partnerSearch || partnerStatusFilter !== "All"
                    ? "Try adjusting your search criteria or status filter."
                    : "No European employers have submitted requests yet."}
                </p>
                <Link
                  to="/recruitment-partner-form"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2149] text-white text-xs font-bold rounded-xl"
                >
                  Submit Sample Request
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPartnerRequests.map((req) => {
                  const statusColors: Record<string, string> = {
                    "New": "bg-emerald-50 text-[#0f7652] border-emerald-200",
                    "Reviewed": "bg-blue-50 text-[#007BFF] border-blue-200",
                    "Contacted": "bg-amber-50 text-amber-700 border-amber-200",
                    "In Negotiation": "bg-purple-50 text-purple-700 border-purple-200",
                    "Archived": "bg-slate-100 text-slate-600 border-slate-200"
                  };

                  return (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        
                        {/* Left Details */}
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                              {req.id}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(req.submittedAt).toLocaleDateString()} at {new Date(req.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColors[req.status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
                              {req.status}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl font-extrabold text-[#0B2149] flex items-center gap-2">
                              <span>{req.companyName}</span>
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="inline-flex items-center gap-1 font-semibold text-[#007BFF]">
                                <Globe2 className="w-3.5 h-3.5" />
                                {req.city}, {req.country}
                              </span>
                              <span>&bull;</span>
                              <span className="inline-flex items-center gap-1 text-slate-600">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {req.industry}
                              </span>
                              {req.website && (
                                <>
                                  <span>&bull;</span>
                                  <a href={req.website} target="_blank" rel="noreferrer" className="text-[#007BFF] hover:underline flex items-center gap-0.5">
                                    Website <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-slate-400 uppercase text-[10px] font-bold block">Representative</span>
                              <span className="font-bold text-slate-800">{req.contactPerson}</span>
                              <span className="text-slate-500 block text-[11px]">{req.designation}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 uppercase text-[10px] font-bold block">Contact Channels</span>
                              <div className="flex flex-col gap-0.5">
                                <a href={`mailto:${req.corporateEmail}`} className="text-[#007BFF] font-semibold hover:underline truncate">
                                  {req.corporateEmail}
                                </a>
                                <a href={`tel:${req.phoneNumber}`} className="text-slate-700 font-semibold hover:underline">
                                  {req.phoneNumber}
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* SECTION 2 HIGHLIGHTS BOX */}
                          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f7652] uppercase tracking-wider">
                              <Handshake className="w-3.5 h-3.5" />
                              Section 2: Recruitment Partnership Scope
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-slate-500 font-medium">1. Partnership Type:</span>
                                <span className="ml-1.5 font-bold text-[#0B2149]">{req.partnershipType}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">2. Recruited Filipino Before:</span>
                                <span className={`ml-1.5 font-bold ${req.previouslyRecruitedFilipino === "Yes" ? "text-emerald-700" : "text-slate-700"}`}>
                                  {req.previouslyRecruitedFilipino}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">3. Sourcing Countries:</span>
                                <span className="ml-1.5 font-semibold text-slate-800">{req.countriesRecruitedFrom || "None specified"}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">4. Current Philippine Partner:</span>
                                <span className="ml-1.5 font-semibold text-slate-800">
                                  {req.hasPhilippinePartner} {req.currentPhilippinePartnerName && req.currentPhilippinePartnerName !== "None / N/A" ? `(${req.currentPhilippinePartnerName})` : ""}
                                </span>
                              </div>
                            </div>

                            {req.additionalInfo && (
                              <div className="pt-2 border-t border-emerald-100 text-xs">
                                <span className="text-slate-500 font-medium block mb-0.5">6. Partnership Proposal Details:</span>
                                <p className="text-slate-700 italic line-clamp-2">
                                  "{req.additionalInfo}"
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Section 3 Initial Quota */}
                          {(req.targetPositions || req.estimatedHeadcount) && (
                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                              {req.targetPositions && (
                                <span><strong>Positions:</strong> {req.targetPositions}</span>
                              )}
                              {req.estimatedHeadcount && (
                                <span><strong>Headcount:</strong> {req.estimatedHeadcount}</span>
                              )}
                              {req.targetDeploymentTimeline && (
                                <span><strong>Timeline:</strong> {req.targetDeploymentTimeline}</span>
                              )}
                            </div>
                          )}

                        </div>

                        {/* Right Column: Status Selector & Actions */}
                        <div className="flex lg:flex-col items-center gap-2 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6 min-w-[190px]">
                          <select
                            value={req.status}
                            onChange={(e) => handlePartnerStatusChange(req.id, e.target.value as RecruitmentPartnerRequest["status"])}
                            className="w-full text-xs font-bold py-2 px-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#007BFF] outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Negotiation">In Negotiation</option>
                            <option value="Archived">Archived</option>
                          </select>

                          <button
                            onClick={() => {
                              setSelectedPartnerRequest(req);
                              setPartnerAdminNote(req.notes || "");
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Full Request
                          </button>

                          <a
                            href={`mailto:${req.corporateEmail}?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com&subject=${encodeURIComponent(`RE: Recruitment Partnership Inquiry - ${req.companyName} (${req.id})`)}&body=${encodeURIComponent(`Dear ${req.contactPerson},\n\nThank you for submitting your European recruitment partnership inquiry with Manpower Activity and International Solutions Corp. (MAISC)...\n\nBest regards,\nMAISC International Relations Team`)}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                          >
                            <Mail className="w-3 h-3 text-[#0f7652]" />
                            Email Partner
                          </a>

                          <a
                            href={`https://wa.me/${req.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${req.contactPerson}, this is MAISC Philippines regarding your European recruitment inquiry (${req.id}).`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl transition-colors"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            WhatsApp
                          </a>

                          <button
                            onClick={() => handleDeletePartnerReq(req.id, req.companyName)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* APPLICANT DOSSIER MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {selectedApplicant.photo2x2?.dataUrl ? (
                  <img
                    src={selectedApplicant.photo2x2.dataUrl}
                    alt={selectedApplicant.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                    <UserCheck className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-extrabold text-[#0B2149]">
                    {selectedApplicant.fullName}
                  </h2>
                  <p className="text-xs text-[#007BFF] font-semibold">
                    {selectedApplicant.positionApplied} ({selectedApplicant.category})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Email Address</span>
                  <a href={`mailto:${selectedApplicant.email}`} className="text-[#007BFF] font-semibold hover:underline">
                    {selectedApplicant.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Phone / Mobile</span>
                  <a href={`tel:${selectedApplicant.phone}`} className="font-semibold text-slate-900 hover:underline">
                    {selectedApplicant.phone}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">WhatsApp / Viber</span>
                  <span>{selectedApplicant.whatsappOrViber || "Not provided"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Current Residence</span>
                  <span>{selectedApplicant.currentLocation}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Target Destination</span>
                  <span className="font-bold text-slate-900">{selectedApplicant.targetCountry}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Work Experience</span>
                  <span className="font-semibold text-slate-900">{selectedApplicant.yearsOfExperience}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Education Level</span>
                  <span>{selectedApplicant.educationLevel}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Passport Information</span>
                  <span>
                    {selectedApplicant.passportNumber 
                      ? `${selectedApplicant.passportNumber} (Exp: ${selectedApplicant.passportExpiry || "N/A"})`
                      : "Not specified"}
                  </span>
                </div>
              </div>

              {selectedApplicant.notes && (
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Candidate Message / Notes</span>
                  <p className="text-slate-700 italic">"{selectedApplicant.notes}"</p>
                </div>
              )}

              {/* Document Downloads Section */}
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-3">
                  Downloadable Files & Credentials
                </h4>
                <div className="space-y-2">
                  {selectedApplicant.resume ? (
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-slate-800">Resume / CV: {selectedApplicant.resume.name}</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(selectedApplicant.resume!, selectedApplicant.fullName)}
                        className="px-3 py-1 bg-[#0B2149] hover:bg-[#007BFF] text-white font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">No Resume file attached</div>
                  )}

                  {selectedApplicant.passportCopy ? (
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-800">Passport Bio-Data Copy</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(selectedApplicant.passportCopy!, selectedApplicant.fullName)}
                        className="px-3 py-1 bg-[#0B2149] hover:bg-[#007BFF] text-white font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ) : null}

                  {selectedApplicant.nbiClearance ? (
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span className="font-semibold text-slate-800">NBI Clearance / ID</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(selectedApplicant.nbiClearance!, selectedApplicant.fullName)}
                        className="px-3 py-1 bg-[#0B2149] hover:bg-[#007BFF] text-white font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ) : null}

                  {selectedApplicant.certificates && selectedApplicant.certificates.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-slate-800">Certificate: {cert.name}</span>
                      </div>
                      <button
                        onClick={() => downloadDocument(cert, selectedApplicant.fullName)}
                        className="px-3 py-1 bg-[#0B2149] hover:bg-[#007BFF] text-white font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value as CandidateApplication["status"])}
                  className="text-xs font-bold py-1.5 px-3 border border-slate-300 rounded-xl bg-white"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Under Evaluation">Under Evaluation</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EUROPEAN PARTNER REQUEST FULL DOSSIER MODAL */}
      {selectedPartnerRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0f7652]">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#0B2149]">{selectedPartnerRequest.companyName}</h3>
                    <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {selectedPartnerRequest.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedPartnerRequest.city}, {selectedPartnerRequest.country} &bull; {selectedPartnerRequest.industry}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartnerRequest(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* Submission Meta & Direct Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-700">Submitted: </span>
                  {new Date(selectedPartnerRequest.submittedAt).toLocaleDateString()} at {new Date(selectedPartnerRequest.submittedAt).toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedPartnerRequest.corporateEmail}?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com&subject=${encodeURIComponent(`RE: European Recruitment Partnership - ${selectedPartnerRequest.companyName} (${selectedPartnerRequest.id})`)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                  <a
                    href={`https://wa.me/${selectedPartnerRequest.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedPartnerRequest.contactPerson}, this is MAISC Philippines regarding your inquiry (${selectedPartnerRequest.id}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Print
                  </button>
                </div>
              </div>

              {/* Section 1: Company Profile & Contact */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#0B2149] uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#007BFF]" />
                  Section 1: Company & Contact Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Company Name</span>
                    <span className="text-slate-800 font-semibold text-sm">{selectedPartnerRequest.companyName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Industry / Sector</span>
                    <span className="text-slate-800 font-semibold">{selectedPartnerRequest.industry}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">European Location</span>
                    <span className="text-slate-800 font-semibold">{selectedPartnerRequest.city}, {selectedPartnerRequest.country}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Official Website</span>
                    {selectedPartnerRequest.website ? (
                      <a href={selectedPartnerRequest.website} target="_blank" rel="noreferrer" className="text-[#007BFF] hover:underline flex items-center gap-1 font-semibold">
                        {selectedPartnerRequest.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>
                  {selectedPartnerRequest.registrationNumber && (
                    <div className="sm:col-span-2">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">EU / Commercial Registration Number</span>
                      <span className="text-slate-700 font-mono text-xs">{selectedPartnerRequest.registrationNumber}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Authorized Representative</span>
                    <span className="text-slate-800 font-bold">{selectedPartnerRequest.contactPerson}</span>
                    <span className="text-slate-500 block text-[11px]">{selectedPartnerRequest.designation}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Direct Corporate Email</span>
                    <a href={`mailto:${selectedPartnerRequest.corporateEmail}`} className="text-[#007BFF] font-semibold hover:underline">
                      {selectedPartnerRequest.corporateEmail}
                    </a>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Phone / Mobile / WhatsApp</span>
                    <span className="text-slate-800 font-semibold">{selectedPartnerRequest.phoneNumber}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Recruitment Partnership (The Newly Added Requested Fields) */}
              <div className="border border-emerald-300 bg-emerald-50/40 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#0f7652] uppercase tracking-wider flex items-center gap-1.5">
                  <Handshake className="w-4 h-4 text-[#0f7652]" />
                  Section 2: Recruitment Partnership Details
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="font-bold text-slate-500 block mb-1">
                      1. What type of partnership are you interested in?
                    </span>
                    <span className="text-sm font-bold text-[#0B2149] px-2.5 py-1 bg-emerald-100/60 rounded-lg inline-block">
                      {selectedPartnerRequest.partnershipType}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="font-bold text-slate-500 block mb-1">
                        2. Have you previously recruited Filipino workers?
                      </span>
                      <span className={`font-bold text-sm ${selectedPartnerRequest.previouslyRecruitedFilipino === "Yes" ? "text-emerald-700" : "text-slate-700"}`}>
                        {selectedPartnerRequest.previouslyRecruitedFilipino}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="font-bold text-slate-500 block mb-1">
                        4. Do you currently have a Philippine recruitment partner?
                      </span>
                      <span className="font-bold text-sm text-slate-800">
                        {selectedPartnerRequest.hasPhilippinePartner}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="font-bold text-slate-500 block mb-1">
                      3. What countries do you currently recruit workers from?
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {selectedPartnerRequest.countriesRecruitedFrom || "None specified"}
                    </span>
                  </div>

                  {selectedPartnerRequest.hasPhilippinePartner === "Yes" && (
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="font-bold text-slate-500 block mb-1">
                        5. If yes, please provide the name of your current Philippine recruitment partner:
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {selectedPartnerRequest.currentPhilippinePartnerName || "Not specified"}
                      </span>
                    </div>
                  )}

                  {selectedPartnerRequest.additionalInfo && (
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="font-bold text-slate-500 block mb-1">
                        6. Additional information about the proposed partnership:
                      </span>
                      <p className="text-slate-700 italic leading-relaxed whitespace-pre-line">
                        "{selectedPartnerRequest.additionalInfo}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Manpower Demand Profile */}
              {(selectedPartnerRequest.targetPositions || selectedPartnerRequest.estimatedHeadcount || selectedPartnerRequest.targetDeploymentTimeline) && (
                <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#0B2149] uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#007BFF]" />
                    Section 3: Initial Manpower Scope & Quota
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl">
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Target Roles</span>
                      <span className="font-bold text-slate-800">{selectedPartnerRequest.targetPositions || "Open to recommendation"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Estimated Headcount</span>
                      <span className="font-bold text-slate-800">{selectedPartnerRequest.estimatedHeadcount || "To be determined"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Target Timeline</span>
                      <span className="font-bold text-slate-800">{selectedPartnerRequest.targetDeploymentTimeline || "Immediate / Flexible"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Internal Administrative Notes */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  Internal MAISC Processing Notes
                </h4>
                <textarea
                  rows={3}
                  value={partnerAdminNote}
                  onChange={(e) => setPartnerAdminNote(e.target.value)}
                  placeholder="Enter internal notes, follow-up logs, or DMW accreditation readiness..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#007BFF] outline-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSavePartnerNote(selectedPartnerRequest.id)}
                    className="px-4 py-1.5 bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Save Internal Notes
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-500">Update Status:</span>
                <select
                  value={selectedPartnerRequest.status}
                  onChange={(e) => {
                    const newSt = e.target.value as RecruitmentPartnerRequest["status"];
                    handlePartnerStatusChange(selectedPartnerRequest.id, newSt);
                    setSelectedPartnerRequest({ ...selectedPartnerRequest, status: newSt });
                  }}
                  className="text-xs font-bold py-2 px-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#007BFF] outline-none"
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Negotiation">In Negotiation</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedPartnerRequest(null)}
                className="w-full sm:w-auto px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT ZOOM / PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#0B2149] truncate">{previewDoc.name}</h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            {previewDoc.dataUrl && (
              <div className="flex justify-center p-2 bg-slate-100 rounded-xl max-h-[70vh] overflow-auto">
                <img src={previewDoc.dataUrl} alt={previewDoc.name} className="max-w-full h-auto rounded-lg object-contain" />
              </div>
            )}
            <div className="pt-3 mt-2 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT JOB MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B2149]">
                  {editingJobId ? "Edit Job Vacancy" : "Post New Job Opening"}
                </h2>
                <p className="text-xs text-slate-400">
                  Fill in the vacancy details below to publish directly to the website.
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Registered Staff Nurse, Heavy Equipment Mechanic, Sous Chef"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Job["category"])}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Skilled Trades">Skilled Trades</option>
                    <option value="IT & Corporate">IT & Corporate</option>
                    <option value="General Services">General Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hiring Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as Job["status"])}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  >
                    <option value="Urgent Hiring">Urgent Hiring</option>
                    <option value="Actively Recruiting">Actively Recruiting</option>
                    <option value="Accepting Applications">Accepting Applications</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Location / Country <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Germany, Saudi Arabia, Japan, Local - Manila"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Job Type / Contract
                  </label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="e.g. Full-Time, 2-Year Contract, Permanent"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Experience Requirement
                  </label>
                  <input
                    type="text"
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    placeholder="e.g. Minimum 2 Years Hospital Experience"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Salary / Compensation (Optional)
                  </label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. Competitive Euro Package, Tax-free + Housing"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Key Skills & Qualifications (Separated by commas)
                </label>
                <input
                  type="text"
                  value={formKeySkills}
                  onChange={(e) => setFormKeySkills(e.target.value)}
                  placeholder="e.g. PRC Licensed, ICU Experience, B2 German Certificate, Valid Passport"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Job Description & Scope <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide an overview of responsibilities, candidate qualifications, and benefits..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Application Link (Google Form or Custom URL)
                </label>
                <input
                  type="url"
                  value={formApplyUrl}
                  onChange={(e) => setFormApplyUrl(e.target.value)}
                  placeholder="https://docs.google.com/forms/..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {editingJobId ? "Save Changes" : "Publish Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-[#0B2149] text-base">Change Admin Password</h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {passwordSuccessMessage && (
                <div className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg text-center">
                  {passwordSuccessMessage}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#0B2149] text-white font-bold rounded-lg hover:bg-[#007BFF]"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

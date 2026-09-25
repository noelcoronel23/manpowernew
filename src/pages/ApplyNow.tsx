import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Camera, 
  Award, 
  FileCheck2, 
  X,
  ExternalLink,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { submitApplication, ApplicantDocument } from "../data/applicantStore";

export default function ApplyNow() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOrViber, setWhatsappOrViber] = useState("");
  const [positionApplied, setPositionApplied] = useState(() => searchParams.get("position") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || "Healthcare");
  const [targetCountry, setTargetCountry] = useState("Any Available / Open to Relocation");
  const [yearsOfExperience, setYearsOfExperience] = useState("1 - 2 Years");
  const [educationLevel, setEducationLevel] = useState("College / Bachelor's Degree");
  const [currentLocation, setCurrentLocation] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [notes, setNotes] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  useEffect(() => {
    const pos = searchParams.get("position");
    if (pos) setPositionApplied(pos);
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  // Uploaded documents state
  const [photo2x2, setPhoto2x2] = useState<ApplicantDocument | null>(null);
  const [passportCopy, setPassportCopy] = useState<ApplicantDocument | null>(null);
  const [resume, setResume] = useState<ApplicantDocument | null>(null);
  const [certificates, setCertificates] = useState<ApplicantDocument[]>([]);
  const [nbiClearance, setNbiClearance] = useState<ApplicantDocument | null>(null);

  // File helper
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSingleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (doc: ApplicantDocument | null) => void,
    maxSizeMb = 10
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMb}MB limit. Please upload a smaller file.`);
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setter({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl
      });
    } catch (err) {
      console.error("Error reading file:", err);
      alert("Error reading file. Please try again.");
    }
  };

  const handleMultipleFilesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    maxCount = 5
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: ApplicantDocument[] = [];
    for (let i = 0; i < Math.min(files.length, maxCount); i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) continue;
      try {
        const dataUrl = await readFileAsDataUrl(file);
        newDocs.push({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl
        });
      } catch (err) {
        console.error("Error reading file:", err);
      }
    }
    setCertificates(prev => [...prev, ...newDocs]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) {
      alert("Please agree to the Data Privacy Act statement before submitting.");
      return;
    }

    if (!resume && !passportCopy && !photo2x2) {
      if (!window.confirm("You have not attached a Resume or Passport copy yet. Do you want to submit your basic details anyway?")) {
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newApp = submitApplication({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        whatsappOrViber: whatsappOrViber.trim() || undefined,
        positionApplied: positionApplied.trim(),
        targetCountry,
        category,
        yearsOfExperience,
        educationLevel,
        currentLocation: currentLocation.trim(),
        passportNumber: passportNumber.trim() || undefined,
        passportExpiry: passportExpiry.trim() || undefined,
        notes: notes.trim() || undefined,
        photo2x2: photo2x2 || undefined,
        passportCopy: passportCopy || undefined,
        resume: resume || undefined,
        certificates: certificates.length > 0 ? certificates : undefined,
        nbiClearance: nbiClearance || undefined,
      });

      setReferenceId(newApp.id.toUpperCase());
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Application & Documents Received
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2149] tracking-tight mb-3">
            Thank You, {fullName}!
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
            Your application and uploaded credentials for <strong className="text-[#0B2149]">{positionApplied}</strong> have been securely registered with our recruitment evaluation team.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-left space-y-2.5">
            <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200">
              <span>Application Reference Code:</span>
              <span className="font-mono font-bold text-[#0B2149] text-sm bg-white px-2.5 py-1 rounded border border-slate-200">
                {referenceId}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Position:</span>
              <span className="font-semibold text-slate-900">{positionApplied} ({category})</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Preferred Country:</span>
              <span className="font-semibold text-slate-900">{targetCountry}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Documents Attached:</span>
              <span className="font-semibold text-emerald-700">
                {[
                  photo2x2 ? "2x2 Photo" : null,
                  passportCopy ? "Passport Copy" : null,
                  resume ? "Resume" : null,
                  certificates.length > 0 ? `${certificates.length} Certificate(s)` : null,
                  nbiClearance ? "NBI Clearance" : null
                ].filter(Boolean).join(", ") || "None (Basic info only)"}
              </span>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-left mb-8 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-[#0B2149]">What Happens Next:</strong> Our recruitment officers will verify your qualifications against current licensed principal job orders. If shortlisted, you will receive an SMS or WhatsApp invitation for pre-screening.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/job-openings"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              Browse Other Job Openings
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setPhoto2x2(null);
                setPassportCopy(null);
                setResume(null);
                setCertificates([]);
                setNbiClearance(null);
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#007BFF] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Official Candidate Intake & Document Portal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2149] tracking-tight mb-4">
            Candidate Application & Documents
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Submit your personal profile and upload all required deployment credentials (2x2 Picture, Passport Bio-Data, Resume, and Certifications) for priority review by our licensed recruitment team.
          </p>
        </div>

        {/* Quick Requirement Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#007BFF] flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">2x2 Photo</div>
              <div className="text-[11px] text-slate-500">White background</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Valid Passport</div>
              <div className="text-[11px] text-slate-500">Min. 6 mos validity</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Updated CV</div>
              <div className="text-[11px] text-slate-500">PDF or Word file</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Certificates</div>
              <div className="text-[11px] text-slate-500">TESDA / PRC / COE</div>
            </div>
          </div>
        </div>

        {/* Alternative Google Form Callout */}
        <div className="bg-gradient-to-r from-blue-900 via-[#0B2149] to-slate-900 rounded-2xl p-5 mb-10 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-amber-300">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prefer using Google Forms?</h3>
              <p className="text-xs text-slate-300">
                You can also complete our official Google Application Form directly if you are signed in to Google.
              </p>
            </div>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2149] text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            Open Google Form
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149]">Personal & Contact Details</h2>
                <p className="text-xs text-slate-500">Provide your active contact numbers so our recruitment team can reach you promptly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Legal Name (First Name, Middle Name, Last Name) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Juan De La Cruz Santos"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. juandelacruz@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Philippine Mobile Contact Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +63 917 123 4567 / 09171234567"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp / Viber Number (For Overseas Interview)
                </label>
                <input
                  type="text"
                  value={whatsappOrViber}
                  onChange={(e) => setWhatsappOrViber(e.target.value)}
                  placeholder="e.g. +63 917 123 4567"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current City / Province of Residence <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="e.g. Quezon City, Metro Manila / Cebu / Davao"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: POSITION & QUALIFICATIONS */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/40">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149]">Target Position & Work Experience</h2>
                <p className="text-xs text-slate-500">Indicate the role you want to apply for and your professional background.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Position / Job Title Applied For <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={positionApplied}
                    onChange={(e) => setPositionApplied(e.target.value)}
                    placeholder="e.g. Staff Nurse, 6G Welder, Heavy Driver, Chef"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Industry / Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                >
                  <option value="Healthcare">Healthcare & Medical Services</option>
                  <option value="Engineering">Engineering, Construction & Infrastructure</option>
                  <option value="Hospitality">Hospitality, Tourism & F&B</option>
                  <option value="Skilled Trades">Skilled Trades, Mechanics & Technical</option>
                  <option value="IT & Corporate">IT, Corporate & Business Process</option>
                  <option value="General Services">General Services & Logistics</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Deployment Destination <span className="text-rose-500">*</span>
                </label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                >
                  <option value="Any Available / Open to Relocation">Any Available / Open to Any Destination</option>
                  <option value="Germany / Europe">Germany & European Union</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Middle East (Saudi Arabia / UAE / Qatar)">Middle East (Saudi Arabia, UAE, Qatar)</option>
                  <option value="Japan (SSW / TITP)">Japan (SSW / TITP Pathways)</option>
                  <option value="Domestic / Philippines Local Placement">Domestic / Local Placement (Philippines)</option>
                  <option value="Asia-Pacific / Other">Asia-Pacific / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Years of Relevant Work Experience
                </label>
                <select
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                >
                  <option value="Fresh Graduate / Entry Level">Fresh Graduate / Entry Level</option>
                  <option value="1 - 2 Years">1 - 2 Years Experience</option>
                  <option value="3 - 5 Years">3 - 5 Years Experience</option>
                  <option value="5+ Years (Senior / Specialist)">5+ Years (Senior / Specialist)</option>
                  <option value="Ex-OFW / Returning Worker">Ex-OFW / Returning Overseas Worker</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Highest Educational Attainment
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                >
                  <option value="College / Bachelor's Degree">College / Bachelor's Degree</option>
                  <option value="Vocational / Technical Diploma">Vocational / Technical Diploma (TESDA)</option>
                  <option value="Associate Degree / Undergraduate">Associate Degree / Undergraduate</option>
                  <option value="High School Graduate">High School Graduate (K-12 / Old Curriculum)</option>
                  <option value="Post-Graduate / Master's">Post-Graduate / Master's Degree</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. P1234567B"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Passport Expiry
                  </label>
                  <input
                    type="date"
                    value={passportExpiry}
                    onChange={(e) => setPassportExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: DOCUMENT UPLOADS */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149]">Upload Credentials & Documents</h2>
                <p className="text-xs text-slate-500">Attach clear scans or photos of your requirements. Supported: JPG, PNG, PDF (Max 10MB per file).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 text-xs">
              
              {/* 1. 2x2 / Passport Picture */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#007BFF]" />
                      2x2 Passport-Size Photo
                    </span>
                    <span className="text-[10px] bg-blue-100 text-[#007BFF] font-semibold px-2 py-0.5 rounded">White Background</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-3">
                    Recent formal photo in business attire with white background.
                  </p>
                </div>

                {photo2x2 ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {photo2x2.dataUrl && (
                        <img src={photo2x2.dataUrl} alt="2x2 Preview" className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                      )}
                      <div className="truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{photo2x2.name}</div>
                        <div className="text-[10.5px] text-slate-400">{formatFileSize(photo2x2.size)}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhoto2x2(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#007BFF] rounded-xl cursor-pointer bg-white transition-colors group">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#007BFF] mb-1.5 transition-colors" />
                    <span className="font-bold text-slate-700 text-xs group-hover:text-[#007BFF]">Click to upload photo</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleSingleFileUpload(e, setPhoto2x2)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 2. Valid Passport Bio Page */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-600" />
                      Passport Bio-Data Page
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Clear Copy</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-3">
                    Scanned copy of your passport photo/info page (must not be expired).
                  </p>
                </div>

                {passportCopy ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{passportCopy.name}</div>
                        <div className="text-[10.5px] text-slate-400">{formatFileSize(passportCopy.size)}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPassportCopy(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl cursor-pointer bg-white transition-colors group">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mb-1.5 transition-colors" />
                    <span className="font-bold text-slate-700 text-xs group-hover:text-emerald-600">Click to upload passport</span>
                    <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                    <input
                      type="file"
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={(e) => handleSingleFileUpload(e, setPassportCopy)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 3. Updated Resume / CV */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-600" />
                      Updated Resume / CV <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">Essential</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-3">
                    Detailed curriculum vitae with complete employment history and duties.
                  </p>
                </div>

                {resume ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-8 h-8 text-amber-600 flex-shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{resume.name}</div>
                        <div className="text-[10.5px] text-slate-400">{formatFileSize(resume.size)}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-600 rounded-xl cursor-pointer bg-white transition-colors group">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-amber-600 mb-1.5 transition-colors" />
                    <span className="font-bold text-slate-700 text-xs group-hover:text-amber-600">Click to upload Resume / CV</span>
                    <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => handleSingleFileUpload(e, setResume)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 4. NBI Clearance or Valid Government ID */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      NBI Clearance or Valid ID
                    </span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded">Optional</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-3">
                    Valid NBI Clearance or primary government ID (UMID, Driver's License).
                  </p>
                </div>

                {nbiClearance ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-slate-800 text-xs truncate">{nbiClearance.name}</div>
                        <div className="text-[10.5px] text-slate-400">{formatFileSize(nbiClearance.size)}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNbiClearance(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-xl cursor-pointer bg-white transition-colors group">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 mb-1.5 transition-colors" />
                    <span className="font-bold text-slate-700 text-xs group-hover:text-indigo-600">Upload NBI or Valid ID</span>
                    <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                    <input
                      type="file"
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={(e) => handleSingleFileUpload(e, setNbiClearance)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 5. Certificates & Training (Multiple) */}
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-600" />
                    Professional Certificates, Licenses & Training (TESDA, PRC, COE)
                  </span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded">Up to 5 Files</span>
                </div>
                <p className="text-slate-500 text-[11px] mb-4">
                  Attach PRC Board Rating/License, TESDA NC II/III, Certificates of Employment (COE), language certifications (e.g. Goethe, JLPT), or diplomas.
                </p>

                {certificates.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                    {certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <div className="truncate">
                            <div className="font-medium text-slate-800 text-xs truncate">{cert.name}</div>
                            <div className="text-[10px] text-slate-400">{formatFileSize(cert.size)}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCertificates(prev => prev.filter((_, i) => i !== idx))}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {certificates.length < 5 && (
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-purple-600 rounded-xl cursor-pointer bg-white transition-colors group">
                    <Upload className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                    <span className="font-bold text-slate-700 text-xs group-hover:text-purple-600">
                      {certificates.length === 0 ? "Click to upload certificates (TESDA, PRC, COE, Diplomas)" : "Add more certificates"}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={handleMultipleFilesUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 4: ADDITIONAL NOTES & DMW / PRIVACY CONSENT */}
          <div className="p-6 sm:p-8 bg-slate-50/50">
            <div className="mb-5 text-xs">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Additional Notes / Message to Recruitment Officer (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any specific certifications, preferred deployment timeline, or relevant skills..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
              />
            </div>

            {/* Privacy Declaration */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#007BFF] focus:ring-[#007BFF]"
                />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900">Data Privacy & Recruitment Consent:</span> By submitting this application, I certify that all information and uploaded documents provided are authentic and accurate. In compliance with Republic Act No. 10173 (Philippine Data Privacy Act) and DMW recruitment standards, I authorize Manila Alliance International Services Corp. (MAISC) to evaluate, process, and present my credentials to accredited foreign principals and prospective employers for recruitment and deployment purposes.
                </div>
              </label>
            </div>

            {/* Submission Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Placement Fee where mandated by law • DMW Regulated</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0B2149] hover:bg-[#007BFF] disabled:bg-slate-400 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Application & Documents...
                  </>
                ) : (
                  <>
                    Submit Application & Documents
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

        {/* Support Help Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Having trouble uploading your files? You can email your resume directly to our recruitment team at{" "}
          <a href="mailto:careers@maisc.ph" className="text-[#007BFF] font-semibold underline">careers@maisc.ph</a>{" "}
          or visit our office in Ermita, Manila.
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Handshake, 
  Globe2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Phone, 
  FileText, 
  ArrowLeft, 
  Printer, 
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import { savePartnerRequest } from "../data/partnerStore";

export default function EuropeanPartnerForm() {
  // Section 1: Company Information
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("Germany");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("Healthcare & Caregiving");
  const [contactPerson, setContactPerson] = useState("");
  const [designation, setDesignation] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  // SECTION 2: RECRUITMENT PARTNERSHIP (Specific user-requested section)
  // Field 1: What type of partnership are you interested in?
  const [partnershipType, setPartnershipType] = useState<string>("Recruitment of Filipino Workers");
  const [partnershipTypeOther, setPartnershipTypeOther] = useState<string>("");

  // Field 2: Have you previously recruited Filipino workers?
  const [previouslyRecruitedFilipino, setPreviouslyRecruitedFilipino] = useState<"Yes" | "No">("No");

  // Field 3: What countries do you currently recruit workers from?
  const [countriesRecruitedFrom, setCountriesRecruitedFrom] = useState<string>("");

  // Field 4: Do you currently have a Philippine recruitment partner?
  const [hasPhilippinePartner, setHasPhilippinePartner] = useState<"Yes" | "No">("No");

  // Field 5: If yes, please provide the name of your current Philippine recruitment partner.
  const [currentPhilippinePartnerName, setCurrentPhilippinePartnerName] = useState<string>("");

  // Field 6: Additional information about the proposed partnership
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  // Section 3: Manpower / Hiring Requirements (Optional initial demand)
  const [targetPositions, setTargetPositions] = useState("");
  const [estimatedHeadcount, setEstimatedHeadcount] = useState("");
  const [targetDeploymentTimeline, setTargetDeploymentTimeline] = useState("");
  const [workplaceLocation, setWorkplaceLocation] = useState("");
  const [candidateRequirements, setCandidateRequirements] = useState("");

  // Form Submission Status
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedRefId, setSubmittedRefId] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const partnerCountries = [
    "United States of America (USA)",
    "Germany",
    "United Kingdom",
    "Poland",
    "Romania",
    "Netherlands",
    "Croatia",
    "Austria",
    "Czech Republic",
    "Hungary",
    "Italy",
    "France",
    "Belgium",
    "Denmark",
    "Sweden",
    "Norway",
    "Finland",
    "Ireland",
    "Switzerland",
    "Slovakia",
    "Spain",
    "Portugal",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Malta",
    "Cyprus",
    "Canada",
    "Australia",
    "New Zealand",
    "Japan",
    "Singapore",
    "United Arab Emirates (UAE)",
    "Saudi Arabia",
    "Qatar",
    "Other European Country",
    "Other International Country"
  ];

  const industryOptions = [
    "Healthcare & Caregiving (Nurses, Elderly Care)",
    "Construction & Heavy Civil Infrastructure",
    "Engineering, Mechanical & Electrical Trades",
    "Logistics, Warehousing & Forklift Operations",
    "Manufacturing, Automotive & CNC Assembly",
    "Hospitality, Culinary Arts & Hotel Operations",
    "Agriculture, Farming & Greenhouses",
    "Information Technology, Software & Telecom",
    "Energy, Solar & Wind Power",
    "Other Specialized Industry"
  ];

  const partnershipTypes = [
    "Recruitment of Filipino Workers",
    "Philippine Sourcing Partner",
    "Long-term Recruitment Partnership",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please confirm the authorization and compliance check before submitting.");
      return;
    }

    setStatus("submitting");

    const effectivePartnershipType = partnershipType === "Other" && partnershipTypeOther 
      ? `Other (${partnershipTypeOther})` 
      : partnershipType;

    try {
      // 1. Save to local application store for instant admin review
      const savedRecord = savePartnerRequest({
        companyName,
        country,
        city,
        industry,
        contactPerson,
        designation,
        corporateEmail,
        phoneNumber,
        website,
        registrationNumber,

        // Section 2
        partnershipType: effectivePartnershipType,
        partnershipTypeOther,
        previouslyRecruitedFilipino,
        countriesRecruitedFrom,
        hasPhilippinePartner,
        currentPhilippinePartnerName: hasPhilippinePartner === "Yes" ? currentPhilippinePartnerName : "None / N/A",
        additionalInfo,

        // Section 3
        targetPositions,
        estimatedHeadcount,
        targetDeploymentTimeline,
        workplaceLocation: workplaceLocation || `${city}, ${country}`,
        candidateRequirements
      });

      setSubmittedRefId(savedRecord.id);

      // 2. Transmit via email to management (noelcoronel23@gmail.com, cc arnizza1973@gmail.com)
      const emailPayload = {
        _subject: `[Manpower Request] ${companyName} (${country}) - ${savedRecord.id}`,
        _cc: "arnizza1973@gmail.com",
        "Reference ID": savedRecord.id,
        "Submission Time": new Date().toLocaleString(),

        // Section 1
        "Company Name": companyName,
        "Country": country,
        "City": city,
        "Industry": industry,
        "Contact Person": contactPerson,
        "Designation": designation,
        "Corporate Email": corporateEmail,
        "Phone / WhatsApp": phoneNumber,
        "Website": website || "N/A",
        "Registration / VAT No": registrationNumber || "N/A",

        // SECTION 2: RECRUITMENT PARTNERSHIP
        "1. Partnership Type": effectivePartnershipType,
        "2. Previously Recruited Filipino Workers": previouslyRecruitedFilipino,
        "3. Countries Currently Recruited From": countriesRecruitedFrom || "None specified",
        "4. Current Philippine Partner": hasPhilippinePartner,
        "5. Current Philippine Partner Name": hasPhilippinePartner === "Yes" ? currentPhilippinePartnerName : "N/A",
        "6. Additional Information": additionalInfo || "None provided",

        // Section 3
        "Target Positions Needed": targetPositions || "General inquiry",
        "Estimated Headcount": estimatedHeadcount || "Not specified",
        "Target Deployment Timeline": targetDeploymentTimeline || "Flexible"
      };

      try {
        await fetch("https://formsubmit.co/ajax/noelcoronel23@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(emailPayload)
        });
      } catch (fetchErr) {
        console.warn("Formsubmit external relay notice, record stored locally:", fetchErr);
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySampleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/partners"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-[#007BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to International Partners
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySampleLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Copy link to this form"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Form Link</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Form Title & Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 opacity-5 pointer-events-none">
            <Building2 className="w-64 h-64 text-[#0B2149]" />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0f7652] border border-emerald-200">
              <Globe2 className="w-3.5 h-3.5 mr-1.5" />
              EU, USA &amp; International Partner Intake
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              DMW License: 042-LB-06302026-PL
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2149] tracking-tight mb-3">
            EU / USA &amp; International Manpower Request Form
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            This official intake form allows European, American, and international employers, enterprises, and principal recruitment agencies to submit their workforce requirements directly to <span className="font-semibold text-[#0B2149]">Manpower Activity and International Solutions Corp. (MAISC)</span> for regulated Philippine sourcing, screening, and deployment.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-y-2">
            <span>Direct submission to: <strong>noelcoronel23@gmail.com</strong> &amp; <strong>arnizza1973@gmail.com</strong></span>
            <span>Response turnaround: <strong>Within 24 to 48 business hours</strong></span>
          </div>
        </div>

        {/* Success Alert */}
        {status === "success" && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 mb-8 text-center shadow-sm">
            <div className="w-14 h-14 bg-emerald-100 text-[#0f7652] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B2149] mb-2">
              Partnership Request Received!
            </h2>
            <p className="text-slate-700 text-sm max-w-lg mx-auto mb-4">
              Thank you for submitting your manpower partnership requirements. Our International Bilateral Relations Director will review your proposal and get in touch with you shortly.
            </p>
            <div className="inline-block bg-white px-4 py-2 rounded-lg border border-emerald-200 text-xs font-mono font-bold text-slate-800 mb-6">
              Reference ID: {submittedRefId}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setCompanyName("");
                  setCity("");
                  setContactPerson("");
                  setCorporateEmail("");
                  setPhoneNumber("");
                  setAdditionalInfo("");
                  setCountriesRecruitedFrom("");
                  setCurrentPhilippinePartnerName("");
                }}
                className="px-5 py-2.5 bg-[#0f7652] text-white text-xs font-bold rounded-lg hover:bg-[#0c5c40] transition-colors"
              >
                Submit Another Request
              </button>
              <Link
                to="/partners"
                className="px-5 py-2.5 bg-white text-slate-700 border border-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Return to Partners
              </Link>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800">
              <p className="font-bold mb-1">There was an issue transmitting your request automatically.</p>
              <p>Your details were preserved. Please verify your connection or email our bilateral team directly at <strong>inquiry@maisc.ph</strong> with your company profile.</p>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* =========================================================================
              SECTION 1: COMPANY INFORMATION
             ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149] uppercase tracking-wide">
                  Section 1: Company Information
                </h2>
                <p className="text-xs text-slate-500">
                  Legal credentials and registered entity details of the European company
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Company Legal Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Bavaria Healthcare GmbH / Nordik Bau A/S"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Country and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Operating Country / Territory <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 bg-white"
                  >
                    {partnerCountries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    City / Regional Headquarters <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Munich, Warsaw, Bucharest, Vienna"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Industry / Sector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Industry / Business Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 bg-white"
                >
                  {industryOptions.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Authorized Contact Person and Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Authorized Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g., Dr. Klaus Richter"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Official Job Title / Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g., HR Director / Talent Acquisition Lead"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Corporate Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={corporateEmail}
                    onChange={(e) => setCorporateEmail(e.target.value)}
                    placeholder="name@company.de"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Telephone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., +49 89 1234 5678"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Website and Registration No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Company Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.company.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Corporate Registration / Tax ID / EIN / VAT Number
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="e.g., US EIN / EU VAT / HRB / Reg Number"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* =========================================================================
              SECTION 2: RECRUITMENT PARTNERSHIP
              (Exact new section placed directly below Company Information as requested)
             ========================================================================= */}
          <div className="bg-white rounded-2xl border-2 border-[#0f7652]/30 p-6 sm:p-8 shadow-sm relative">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0f7652] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149] uppercase tracking-wide flex items-center gap-2">
                  <span>SECTION 2: RECRUITMENT PARTNERSHIP</span>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-[#0f7652] px-2 py-0.5 rounded">
                    Key Partnership Scope
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Please provide details about your intended cooperation and sourcing background
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Field 1: What type of partnership are you interested in? */}
              <div>
                <label className="block text-sm font-bold text-[#0B2149] mb-2.5">
                  1. What type of partnership are you interested in? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {partnershipTypes.map((type) => {
                    const isSelected = partnershipType === type;
                    return (
                      <label
                        key={type}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-emerald-50/70 border-[#0f7652] shadow-xs text-[#0B2149] font-semibold"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="partnershipType"
                          value={type}
                          checked={isSelected}
                          onChange={() => setPartnershipType(type)}
                          className="h-4 w-4 text-[#0f7652] focus:ring-[#0f7652] border-slate-300"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    );
                  })}
                </div>

                {partnershipType === "Other" && (
                  <div className="mt-3 pl-1">
                    <input
                      type="text"
                      required={partnershipType === "Other"}
                      value={partnershipTypeOther}
                      onChange={(e) => setPartnershipTypeOther(e.target.value)}
                      placeholder="Please specify other partnership arrangement..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Field 2: Have you previously recruited Filipino workers? */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-bold text-[#0B2149] mb-2.5">
                  2. Have you previously recruited Filipino workers? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {(["Yes", "No"] as const).map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl border cursor-pointer transition-all ${
                        previouslyRecruitedFilipino === opt
                          ? "bg-emerald-50/70 border-[#0f7652] font-bold text-[#0f7652]"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                      }`}
                    >
                      <input
                        type="radio"
                        name="previouslyRecruitedFilipino"
                        value={opt}
                        checked={previouslyRecruitedFilipino === opt}
                        onChange={() => setPreviouslyRecruitedFilipino(opt)}
                        className="h-4 w-4 text-[#0f7652] focus:ring-[#0f7652] border-slate-300"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 3: What countries do you currently recruit workers from? */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-bold text-[#0B2149] mb-1.5">
                  3. What countries do you currently recruit workers from? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">Short answer</p>
                <input
                  type="text"
                  required
                  value={countriesRecruitedFrom}
                  onChange={(e) => setCountriesRecruitedFrom(e.target.value)}
                  placeholder="e.g., Poland, Romania, India, Vietnam, None / Domestic only"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Field 4: Do you currently have a Philippine recruitment partner? */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-bold text-[#0B2149] mb-2.5">
                  4. Do you currently have a Philippine recruitment partner? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {(["Yes", "No"] as const).map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl border cursor-pointer transition-all ${
                        hasPhilippinePartner === opt
                          ? "bg-emerald-50/70 border-[#0f7652] font-bold text-[#0f7652]"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasPhilippinePartner"
                        value={opt}
                        checked={hasPhilippinePartner === opt}
                        onChange={() => setHasPhilippinePartner(opt)}
                        className="h-4 w-4 text-[#0f7652] focus:ring-[#0f7652] border-slate-300"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 5: If yes, please provide the name of your current Philippine recruitment partner. */}
              <div className={`pt-2 border-t border-slate-100 transition-opacity ${hasPhilippinePartner === "Yes" ? "opacity-100" : "opacity-80"}`}>
                <label className="block text-sm font-bold text-[#0B2149] mb-1.5">
                  5. If yes, please provide the name of your current Philippine recruitment partner.
                </label>
                <p className="text-xs text-slate-500 mb-2">Short answer {hasPhilippinePartner === "No" ? "(Not applicable if answered 'No' above)" : ""}</p>
                <input
                  type="text"
                  value={currentPhilippinePartnerName}
                  onChange={(e) => setCurrentPhilippinePartnerName(e.target.value)}
                  placeholder={hasPhilippinePartner === "Yes" ? "e.g., Name of Philippine DMW Agency or Partner" : "N/A - Not currently partnered"}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Field 6: Additional information about the proposed partnership */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-bold text-[#0B2149] mb-1.5">
                  6. Additional information about the proposed partnership <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">Long answer</p>
                <textarea
                  required
                  rows={4}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Please elaborate on your project timelines, expected candidate volume, qualification criteria, employer accreditation documents available, or any bilateral requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

            </div>
          </div>


          {/* =========================================================================
              SECTION 3: MANPOWER / CANDIDATE SPECIFICATIONS (Initial Intake)
             ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B2149] uppercase tracking-wide">
                  Section 3: Manpower &amp; Job Demand (Initial Request)
                </h2>
                <p className="text-xs text-slate-500">
                  Provide your initial workforce headcount and job profiles (optional or as available)
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Job Roles / Professions
                  </label>
                  <input
                    type="text"
                    value={targetPositions}
                    onChange={(e) => setTargetPositions(e.target.value)}
                    placeholder="e.g., Staff Nurses, CNC Machinists, Welders"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Estimated Headcount / Quota
                  </label>
                  <input
                    type="text"
                    value={estimatedHeadcount}
                    onChange={(e) => setEstimatedHeadcount(e.target.value)}
                    placeholder="e.g., 20 - 50 workers"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Mobilization / Deployment Timeline
                  </label>
                  <input
                    type="text"
                    value={targetDeploymentTimeline}
                    onChange={(e) => setTargetDeploymentTimeline(e.target.value)}
                    placeholder="e.g., Q1 2027 / Within 3 to 6 months"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Workplace Location / Facilities
                  </label>
                  <input
                    type="text"
                    value={workplaceLocation}
                    onChange={(e) => setWorkplaceLocation(e.target.value)}
                    placeholder="e.g., Various hospitals in Bavaria, Germany"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Required Certifications, Trade Skills, or Language Level
                </label>
                <textarea
                  rows={2}
                  value={candidateRequirements}
                  onChange={(e) => setCandidateRequirements(e.target.value)}
                  placeholder="e.g., B1/B2 German language proficiency, minimum 2 years hospital experience, TESDA NC II, AWS welding certificates..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>
          </div>


          {/* =========================================================================
              COMPLIANCE & SUBMIT BUTTON
             ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-[#0f7652] focus:ring-[#0f7652] border-slate-300"
                />
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  I confirm that I represent a legitimate international business or licensed foreign recruitment principal, and I authorize <strong>Manpower Activity and International Solutions Corp. (MAISC)</strong> to process this partnership inquiry in compliance with Philippine Department of Migrant Workers (DMW) and European bilateral labor regulations.
                </span>
              </label>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  Copies will be routed to the Executive Recruitment Board.
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#0f7652] hover:bg-[#0c5c40] disabled:bg-slate-400 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg gap-2 cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Partnership Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </form>

        {/* Support Card / Direct Contacts */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#0B2149] mb-1">
              Need immediate bilateral assistance or custom JVA terms?
            </h3>
            <p className="text-xs text-slate-500">
              You can also contact our European Partnership Officers directly via phone, WhatsApp, or executive email.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="mailto:inquiry@maisc.ph?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com&subject=European%20Recruitment%20Partnership%20Inquiry"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0f7652]" />
              inquiry@maisc.ph
            </a>
            <a
              href="https://wa.me/63908499888?text=Hello%20MAISC%20Team%2C%20we%20are%20a%20European%20employer%20inquiring%20about%20recruitment%20partnership."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp: 0908 499 888
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  ArrowLeft, 
  Share2, 
  Check, 
  Building2,
  FileCheck,
  Plane,
  Eye,
  Calendar
} from "lucide-react";
import { Job, getJobs, subscribeToJobs } from "../data/jobStore";
import { recordJobView, fetchSupabaseJobs } from "../lib/supabase";

export default function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(() => getJobs());
  const [copied, setCopied] = useState(false);

  // Strict view tracking guard to prevent duplicate counts on re-renders
  const viewRecordedRef = useRef<string | null>(null);

  useEffect(() => {
    fetchSupabaseJobs().then((sbJobs) => {
      if (sbJobs && sbJobs.length > 0) {
        setJobs(sbJobs);
      }
    });

    const unsub = subscribeToJobs(() => {
      setJobs(getJobs());
    });
    return () => unsub();
  }, []);

  const currentJob = jobs.find((j) => j.id === jobId);

  // Trigger view tracking exactly once per job visit
  useEffect(() => {
    if (!currentJob) return;

    // Only record if we haven't already recorded this job in this component instance
    if (viewRecordedRef.current !== currentJob.id) {
      viewRecordedRef.current = currentJob.id;
      recordJobView(currentJob.id);
    }
  }, [currentJob]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!currentJob) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B2149] mb-3">Job Opening Not Found</h1>
          <p className="text-slate-600 text-sm mb-8">
            The job listing you are looking for may have expired or been updated.
          </p>
          <Link
            to="/job-openings"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2149] text-white text-sm font-bold shadow-md hover:bg-[#007BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Job Openings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/job-openings"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#007BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Job Openings
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
            title="Copy job link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Share Job</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 md:p-10 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentJob.status === "Urgent Hiring"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-blue-50 text-[#007BFF]"
              }`}
            >
              {currentJob.status}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {currentJob.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Job Ref: {currentJob.id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2149] tracking-tight mb-4">
            {currentJob.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-slate-100 mb-6 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#007BFF] flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Destination</span>
                <span className="font-semibold text-slate-800">{currentJob.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Contract</span>
                <span className="font-semibold text-slate-800">{currentJob.type}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Experience</span>
                <span className="font-semibold text-slate-800">{currentJob.experience}</span>
              </div>
            </div>

            {currentJob.salary && (
              <div className="flex items-center gap-2.5">
                <span className="text-base">💰</span>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Compensation</span>
                  <span className="font-bold text-emerald-700">{currentJob.salary}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              to={`/apply-now?position=${encodeURIComponent(currentJob.title)}&category=${encodeURIComponent(currentJob.category)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-sm font-bold shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              Apply for This Position
            </Link>

            <Link
              to="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
            >
              Inquire / Request Details
            </Link>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B2149] mb-4">
                Job Overview & Description
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                {currentJob.description}
              </p>

              <h3 className="text-base font-bold text-[#0B2149] mb-3">
                Key Skills & Qualifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentJob.keySkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ethical Deployment Standards */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B2149] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#007BFF]" />
                Recruitment Transparency & DMW Compliance
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manila Alliance International Services Corp. (MAISC) operates under official DMW License No. 042-LB-06302026-PL. All candidate applications are processed under ethical recruitment guidelines. No placement fee is charged for government-to-government programs or countries where prohibited by law.
              </p>
            </div>
          </div>

          {/* Right Sidebar: Quick Summary & How to Apply */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0B2149] uppercase tracking-wider mb-4">
                Quick Summary
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Job Reference</span>
                  <span className="font-mono font-semibold text-slate-800">{currentJob.id}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Industry</span>
                  <span className="font-semibold text-slate-800">{currentJob.category}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800">{currentJob.location}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Contract</span>
                  <span className="font-semibold text-slate-800">{currentJob.type}</span>
                </div>
                {currentJob.postedDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Posted Date</span>
                    <span className="font-semibold text-slate-800">{currentJob.postedDate}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <Link
                  to={`/apply-now?position=${encodeURIComponent(currentJob.title)}&category=${encodeURIComponent(currentJob.category)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Apply for This Position
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0B2149] to-slate-900 rounded-3xl p-6 text-white shadow-md">
              <h4 className="text-sm font-bold mb-2">Need Guidance?</h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Connect with our certified placement coordinators on WhatsApp or send us a message.
              </p>
              <Link
                to="/contact-us"
                className="inline-block text-xs font-bold text-[#00d4ff] hover:underline"
              >
                Start a Conversation →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

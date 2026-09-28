import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Send,
  Building2,
  Filter,
  FileCheck,
  Plane,
  Lock
} from "lucide-react";
import { Job, getJobs, subscribeToJobs } from "../data/jobStore";
import { fetchSupabaseJobs } from "../lib/supabase";

export default function JobOpenings() {
  const [jobs, setJobs] = useState<Job[]>(() => getJobs());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchSupabaseJobs().then((sbJobs) => {
      if (sbJobs && sbJobs.length > 0) {
        setJobs(sbJobs);
      }
    });

    const unsubscribe = subscribeToJobs(() => {
      setJobs(getJobs());
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    "All",
    "Healthcare",
    "Engineering",
    "Hospitality",
    "Skilled Trades",
    "IT & Corporate",
    "General Services"
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.keySkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#007BFF]/50"></span>
              <span className="text-[#007BFF] font-bold text-xs tracking-[0.2em] uppercase">
                CAREERS & OPPORTUNITIES
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] tracking-tight mb-4">
              Current Job Openings
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Browse verified domestic and overseas career openings with licensed employer partners. Every deployment pathway follows strictly regulated, ethical, zero-placement fee standards where mandated.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs hover:border-[#007BFF] hover:text-[#007BFF] transition-all whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 text-[#007BFF]" />
              Manage Jobs (Admin)
            </Link>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007BFF] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Regulated & Verified</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Direct coordination with accredited employers and legitimate job orders.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Clear Terms & Contract</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Transparent disclosure of compensation, benefits, and destination terms.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Deployment Guidance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Guidance through trade testing, document processing, and pre-departure briefings.</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#0B2149] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, skills..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30 focus:border-[#007BFF]"
              />
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-5 mb-16">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-10 md:p-14 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#007BFF] flex items-center justify-center mx-auto mb-5 shadow-xs">
                <Briefcase className="w-8 h-8 stroke-[1.75]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0B2149] mb-3 tracking-tight">
                No Current Job Openings
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto">
                There are currently no active vacancies. Please check back soon or join our job alert list to be notified when new opportunities become available.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0B2149] hover:bg-[#071633] text-white text-sm font-bold shadow-sm transition-all"
                >
                  Join Job Alert List
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
                >
                  Inquire Details
                </Link>
              </div>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-grow max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        job.status === "Urgent Hiring" 
                          ? "bg-rose-100 text-rose-700" 
                          : "bg-blue-50 text-[#007BFF]"
                      }`}>
                        {job.status}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {job.category}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[#0B2149] mb-2 group-hover:text-[#007BFF] transition-colors">
                      <Link to={`/job-openings/${job.id}`} className="hover:underline">
                        {job.title}
                      </Link>
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#007BFF]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        <span>{job.experience}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                          <span>💰 {job.salary}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.keySkills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B2149] bg-slate-100 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Actions */}
                  <div className="lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col justify-center flex-shrink-0 min-w-[200px]">
                    {job.applyUrl && !job.applyUrl.includes("forms") && job.applyUrl.startsWith("http") ? (
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-sm font-bold shadow-sm transition-colors mb-2.5"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply for Job
                      </a>
                    ) : (
                      <Link
                        to={`/apply-now?position=${encodeURIComponent(job.title)}&category=${encodeURIComponent(job.category)}`}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-sm font-bold shadow-sm transition-colors mb-2.5"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply for Job
                      </Link>
                    )}
                    <Link
                      to={`/job-openings/${job.id}`}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 hover:border-[#007BFF] hover:bg-blue-50/50 text-[#0B2149] hover:text-[#007BFF] text-xs font-bold transition-all mb-2"
                    >
                      View Full Details
                    </Link>
                    <Link
                      to="/contact-us"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Inquire Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0B2149] mb-2">No Matching Openings Found</h3>
              <p className="text-sm text-slate-500 mb-6">Try resetting your filter or search keywords to view all available positions.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-5 py-2.5 rounded-xl bg-[#0B2149] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* General Application Banner */}
        <div className="bg-[#0B2149] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[#00d4ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              TALENT POOL REGISTRATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Don&apos;t see your specific specialization listed?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Submit your curriculum vitae to our general recruitment database. Our placement officers continuously review qualified profiles for upcoming domestic and international deployments.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/apply-now"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#007BFF] hover:bg-[#0069d9] text-white text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              Submit Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

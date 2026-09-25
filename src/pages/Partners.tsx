import { ShieldCheck, Handshake, Globe2, Building2, CheckCircle2, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Partners() {
  const partnerPillars = [
    {
      icon: ShieldCheck,
      title: "Legitimate Employers Only",
      desc: "We exclusively collaborate with duly verified, licensed foreign recruitment principals and accredited international firms adhering to fair labor regulations."
    },
    {
      icon: Users,
      title: "Vetted Filipino Talent",
      desc: "Our candidates undergo comprehensive credential assessment, background checks, and trade examinations tailored to international employer specifications."
    },
    {
      icon: Handshake,
      title: "Ethical & Transparent Practices",
      desc: "Zero compromise on candidate welfare, fair placement terms, and compliant bilateral recruitment agreements certified under DMW guidelines."
    },
    {
      icon: Globe2,
      title: "Global Workforce Reach",
      desc: "Connecting businesses in Asia, the Middle East, Europe, and beyond with skilled professionals across engineering, healthcare, logistics, and technical trades."
    }
  ];

  const commitmentPoints = [
    "Full DMW & POEA regulatory compliance on all job orders",
    "Tailored trade testing and technical interviews conducted in Manila",
    "Streamlined visa endorsement, contract notarization, and documentation",
    "Post-arrival worker monitoring and principal support communication",
    "Bilateral coordination for long-term personnel retention"
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. "Partner With MAISC" Section (Directly below Navigation Bar) */}
        <div className="bg-gradient-to-br from-[#0B2149] to-[#081735] text-white p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-3 block">
              Partner With MAISC
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Looking to Hire High-Caliber Filipino Workers?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              Submit an inquiry or connect with our bilateral relations team to review current accreditation guidelines, job order approval, and manpower deployment timelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/recruitment-partner-form"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#0f7652] hover:bg-[#0c5c40] text-white font-bold text-sm rounded-lg transition-colors shadow-md"
              >
                EU / USA &amp; International Manpower Request Form
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg transition-colors border border-white/20"
              >
                Contact Partnership Team
              </Link>
            </div>
          </div>
        </div>

        {/* 2. "Our Global Partners" heading and description */}
        <div className="max-w-3xl mb-12">
          <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
            International Partnerships
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] tracking-tight mb-6">
            Our Global Partners
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Building enduring workforce alliances between legitimate international employers and verified Filipino professionals through ethical recruitment, trust, and shared excellence.
          </p>
        </div>

        {/* 3. Partnership Core Pillars: The four feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {partnerPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0f7652] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0B2149] text-lg mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. "Our Commitment to Foreign Principals & Employers" Section */}
        <div className="bg-white p-8 md:p-14 rounded-2xl border border-slate-200/80 shadow-sm mb-20">
          <div className="max-w-3xl">
            <span className="text-[#0f7652] font-bold text-xs tracking-wider uppercase mb-2 block">
              Principal Verification
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2149] mb-5 tracking-tight">
              Our Commitment to Foreign Principals & Employers
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              We act as your dedicated liaison office in the Philippines, handling end-to-end mobilization so you receive ready-to-work professionals tailored to your exacting project demands.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {commitmentPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0f7652] shrink-0 mt-0.5" />
                  <span className="text-sm md:text-[15px] font-medium text-slate-700">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Remaining Partners page content: Dedicated European Partner Banner */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0f7652] border border-emerald-200">
              EU, USA &amp; International Principals
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#0B2149]">
              EU / USA &amp; International Manpower Request Form
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              Complete our structured intake form covering Company Information, Recruitment Partnership preferences, previous Philippine hiring history, and initial manpower quotas.
            </p>
          </div>
          <Link
            to="/recruitment-partner-form"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-[#0B2149] hover:bg-[#071633] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm gap-2"
          >
            <span>Open Request Form</span>
            <ArrowRight className="w-4 h-4 text-[#0f7652]" />
          </Link>
        </div>

      </div>
    </div>
  );
}

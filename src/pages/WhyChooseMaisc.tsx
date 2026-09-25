import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Award, 
  Clock, 
  HeartHandshake, 
  ArrowRight,
  Send,
  Building2
} from 'lucide-react';
import cardLocalNurse from '../assets/images/card_local_nurse_1789814871911.jpg';
import cardOverseasFly from '../assets/images/card_overseas_fly_1789814892565.jpg';
import cardHandshake from '../assets/images/card_handshake_1789814909966.jpg';
import partnershipMeeting from '../assets/images/global_partnership_meeting_1789791470840.jpg';

export default function WhyChooseMaisc() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#007BFF]/50"></span>
            <span className="text-[#007BFF] font-bold text-xs tracking-[0.2em] uppercase">
              WHY CHOOSE MAISC
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B2149] tracking-tight leading-[1.1] mb-6">
            Your Global Partner <br className="hidden sm:inline" />
            <span className="text-[#007BFF]">in Talent Solutions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            MAISC connects skilled Filipino professionals with legitimate global opportunities, providing ethical, flexible, and dependable workforce solutions built on trust, competence, and regulatory compliance.
          </p>
        </div>

        {/* Three Ways We Help People & Companies (From Design Inspiration) */}
        <section className="mb-24">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2149] tracking-tight leading-tight">
              Three ways we help people find work and help companies <span className="text-[#007BFF]">build teams</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Local Placement */}
            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/11] overflow-hidden relative bg-slate-100">
                <img 
                  src="/local-placement.jpg" 
                  alt="Local Placement - Healthcare and Skilled Professionals" 
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('local-placement.jpg.jpg') && !e.currentTarget.src.includes('card_local_nurse')) {
                      e.currentTarget.src = cardLocalNurse;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B2149] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Users className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B2149] leading-tight tracking-tight">
                    Local Placement
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed flex-grow">
                  Matching Filipino job seekers with employers across healthcare, construction, hospitality, and corporate roles within the Philippines.
                </p>
              </div>
            </div>

            {/* Card 2: Overseas Opportunities */}
            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/11] overflow-hidden relative bg-slate-100">
                <img 
                  src="/overseas-opportunities.jpg" 
                  alt="Overseas Opportunities - International Career Paths" 
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('overseas-opportunities.jpg.jpg') && !e.currentTarget.src.includes('card_overseas_fly')) {
                      e.currentTarget.src = cardOverseasFly;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Globe className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B2149] leading-tight tracking-tight">
                    Overseas Opportunities
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed flex-grow">
                  Supporting qualified Filipino workers seeking international opportunities, with clear information about employment terms, costs, and destination employers before deployment.
                </p>
              </div>
            </div>

            {/* Card 3: Employer Partnerships */}
            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/11] overflow-hidden relative bg-slate-100">
                <img 
                  src="/employer-partnerships.jpg" 
                  alt="Employer Partnerships - Corporate Staffing Solutions" 
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('employer-partnerships.jpg.jpg') && !e.currentTarget.src.includes('card_handshake')) {
                      e.currentTarget.src = cardHandshake;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B2149] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Building2 className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B2149] leading-tight tracking-tight">
                    Employer Partnerships
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed flex-grow">
                  Helping companies build stronger teams by sourcing and presenting qualified candidates matched to their job requirements, not just a pile of resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout: Commitment & Core Services */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 mb-20 items-start">
          
          {/* Left Side: Image and Blue Commitment Box */}
          <div className="flex flex-col rounded-[2.5rem] overflow-hidden bg-[#0056b3] shadow-xl">
            {/* Image Area */}
            <div className="h-[350px] sm:h-[420px] w-full relative bg-slate-200">
              <img 
                src="/global_partnership_meeting.jpg" 
                alt="MAISC Strategic Global Partnerships" 
                onError={(e) => {
                  e.currentTarget.src = partnershipMeeting;
                }}
                className="absolute inset-0 w-full h-full object-cover z-10" 
              />
              
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
                <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#0056b3"></path>
                </svg>
              </div>
            </div>

            {/* Blue Content Area */}
            <div className="p-8 sm:p-10 relative bg-[#0056b3] flex-grow">
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-px bg-[#00e5ff] mr-4"></div>
                  <h3 className="text-white text-3xl font-bold">Our Commitment</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
                  {/* Feature 1 */}
                  <div>
                    <div className="mb-4 text-[#00e5ff]">
                      <ShieldCheck className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-[15px] mb-3 leading-tight">Ethical Recruitment<br/>Standards</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Strict adherence to fair hiring practices, ensuring transparent, legal, and zero-fee deployment pathways for candidates where legally mandated.
                    </p>
                  </div>
                  {/* Feature 2 */}
                  <div className="sm:border-l sm:border-white/20 sm:pl-8">
                    <div className="mb-4 text-[#00e5ff]">
                      <Users className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-[15px] mb-3 leading-tight">Tailored Workforce<br/>Solutions</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Flexible staffing models engineered to adapt seamlessly to the unique operational timelines and technical parameters of each client.
                    </p>
                  </div>
                  {/* Feature 3 */}
                  <div className="sm:border-l sm:border-white/20 sm:pl-8">
                    <div className="mb-4 text-[#00e5ff]">
                      <Settings className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-[15px] mb-3 leading-tight">Deep Sector<br/>Expertise</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Our team are former and current industry professionals who understand the technical requirements, certifications, and specific demands of your sector.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Core Services & Principles */}
          <div className="flex flex-col justify-center py-2 px-2 sm:px-4">
            
            {/* Mission Statement */}
            <div className="mb-10">
              <span className="text-[#007BFF] font-bold text-xs tracking-[0.2em] uppercase mb-3 block">
                COMPREHENSIVE HUMAN RESOURCE SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2149] mb-5 tracking-tight">
                End-to-End Recruitment Excellence
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                MAISC provides a full suite of end-to-end recruitment and human resource solutions designed to streamline the international hiring process, protecting both employers and candidates every step of the journey.
              </p>
            </div>

            {/* Core Services List */}
            <div className="space-y-7">
              {/* Service 1 */}
              <div className="flex items-start p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200/80">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#007BFF] flex items-center justify-center shadow-sm">
                    <Globe className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[#0B2149] font-bold text-lg mb-1.5">Global Talent Sourcing</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Accessing an extensive, continuously updated database of pre-screened candidates across healthcare, engineering, hospitality, and specialized technical fields.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-start p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200/80">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[#0B2149] font-bold text-lg mb-1.5">Rigorous Screening & Skills Verification</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Conducting meticulous background checks, credential verifications, practical trade testing, and behavioral interviews to ensure total job readiness.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex items-start p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200/80">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-[#0B2149] flex items-center justify-center shadow-sm">
                    <FileText className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[#0B2149] font-bold text-lg mb-1.5">Compliance & Regulatory Documentation</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Managing government mandates, DMW/POEA compliance, visa applications, certified medical examinations, and legally sound employment contracts.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex items-start p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200/80">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                    <Users className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[#0B2149] font-bold text-lg mb-1.5">Pre-Deployment & Cultural Orientation</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Preparing workers for successful integration into host country workplaces with workplace safety, language essentials, and cultural immersion briefings.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars of Advantage Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#007BFF] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              OUR COMPETITIVE ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2149] tracking-tight">
              Why Candidates & Employers Trust MAISC
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007BFF] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-[#0B2149] mb-2">Government Regulated</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Operating strictly in full adherence with Philippine Department of Migrant Workers (DMW) and international labor laws.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-[#0B2149] mb-2">Transparent Processing</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Clear guidelines, itemized documentation, and honest tracking throughout the recruitment cycle for zero surprises.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-[#0B2149] mb-2">Candidate Welfare</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                We prioritize candidate safety, ethical compensation, decent working conditions, and ongoing welfare support abroad.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-[#0B2149] mb-2">Rapid Turnaround</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Optimized candidate matching workflows that significantly reduce client vacancy periods without compromising qualifications.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="bg-[#0B2149] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[#00d4ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              PARTNER WITH MAISC TODAY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Ready to build a reliable workforce or explore your next career milestone?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are an employer looking to fill vital positions or a qualified worker seeking global opportunities, MAISC is here to guide you with integrity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScAi-k7zxpBU0JMhl5M1zEsb7c6ic8KnAp5GhC3yUUBjV5h7Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#007BFF] hover:bg-[#0069d9] text-white text-sm font-bold shadow-md transition-all text-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Apply as Candidate
            </a>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white text-sm font-semibold transition-all text-center"
            >
              Employer Inquiry
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

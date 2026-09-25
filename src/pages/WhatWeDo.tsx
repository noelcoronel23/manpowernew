import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Settings, Globe, FileText, Building2, Clock, ArrowRight } from 'lucide-react';
import whatWeDoHeroFallback from '../assets/images/what_we_do_hero_1789814849288.jpg';
import cardLocalNurseFallback from '../assets/images/card_local_nurse_1789814871911.jpg';
import cardOverseasFlyFallback from '../assets/images/card_overseas_fly_1789814892565.jpg';
import cardHandshakeFallback from '../assets/images/card_handshake_1789814909966.jpg';

export default function WhatWeDo() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* 1. TOP HERO BANNER FROM USER DESIGN */}
      <section className="relative bg-[#091C3E] w-full min-h-[440px] md:min-h-[520px] flex items-center overflow-hidden">
        {/* Background Image of Diverse Filipino Professionals & City */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-right md:bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/what-we-do-banner.jpg?t=${Date.now()}), url(${whatWeDoHeroFallback})` }}
        >
          {/* Gradient Overlay: Deep Navy on left, fades smoothly to show professionals on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071633] via-[#0B2149]/95 sm:via-[#0B2149]/85 to-transparent w-full md:w-[70%] lg:w-[58%]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-white/90 uppercase mb-2">
              MANPOWER ACTIVITY AND INTERNATIONAL SOLUTIONS CORP.
            </p>
            <div className="w-14 h-1 bg-[#00d4ff] mb-6 rounded-full"></div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6">
              Building People.<br />
              <span className="text-[#00d4ff]">Creating Opportunities.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-xl leading-relaxed">
              Your trusted partner in local and global workforce solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* 2. THREE-CARD SECTION FROM USER DESIGN */}
        <section id="job-openings" className="mb-24 scroll-mt-28">
          {/* Eyebrow with horizontal rules */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#007BFF]/50"></span>
            <span className="text-[#007BFF] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              WHAT WE DO
            </span>
            <span className="h-px w-8 bg-[#007BFF]/50"></span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2149] text-center tracking-tight mb-14 max-w-3xl mx-auto leading-tight">
            Three ways we help people find work and help companies <span className="text-[#007BFF]">build teams</span>.
          </h2>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Local Placement */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <img 
                  src="/local-placement.jpg" 
                  alt="Local Placement" 
                  onError={(e) => { e.currentTarget.src = cardLocalNurseFallback; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B2149] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2149] leading-tight">
                    Local Placement
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  Matching Filipino job seekers with employers across healthcare, construction, hospitality, and corporate roles within the Philippines.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a86b] text-white text-xs font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Open Now
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 group-hover:text-[#007BFF] group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Overseas Opportunities */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <img 
                  src="/overseas-opportunities.jpg?v=2" 
                  alt="Overseas Opportunities" 
                  onError={(e) => { e.currentTarget.src = cardOverseasFlyFallback; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0056b3] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2149] leading-tight">
                    Overseas Opportunities
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  Supporting qualified Filipino workers seeking international opportunities, with clear information about employment terms, costs, and destination employers before deployment.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#dbeafe] text-[#1e40af] text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#1e40af]" />
                    Coming Soon
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 group-hover:text-[#007BFF] group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Employer Partnerships */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <img 
                  src="/employer-partnerships.jpg?v=2" 
                  alt="Employer Partnerships" 
                  onError={(e) => { e.currentTarget.src = cardHandshakeFallback; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B2149] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2149] leading-tight">
                    Employer Partnerships
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  Helping companies build stronger teams by sourcing and presenting qualified candidates matched to their job requirements, not just a pile of resumes.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#dbeafe] text-[#1e40af] text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#1e40af]" />
                    Coming Soon
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 group-hover:text-[#007BFF] group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ORIGINAL SECTIONS (ALL TEXT PRESERVED AS REQUESTED) */}
        
        {/* Screening & Matching Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] mb-6">Connecting People & Employers</h2>
            <p className="text-slate-600 mb-10 text-base leading-relaxed max-w-xl">
              We connect qualified Filipino workers with legitimate international employers through careful screening, matching, and deployment coordination. Our team guides candidates and partners through every step with clarity and care.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-[3px] border-[#0B2149] pl-5">
                <h3 className="text-[#0B2149] font-bold text-lg mb-2">Screening & matching</h3>
                <p className="text-sm text-slate-500 leading-relaxed">We identify qualified candidates for real workforce needs.</p>
              </div>
              <div className="border-l-[3px] border-[#0B2149] pl-5">
                <h3 className="text-[#0B2149] font-bold text-lg mb-2">Deploy coordination</h3>
                <p className="text-sm text-slate-500 leading-relaxed">We support a clear journey from inquiry to placement.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 font-bold relative shadow-lg">
              <span className="z-0 tracking-wider">WORKING FILIPINO HERO</span>
              <img 
                src="/working-filipino.jpg" 
                alt="Working Filipino" 
                className="absolute inset-0 w-full h-full object-cover z-10" 
                onError={(e) => e.currentTarget.style.display = 'none'} 
              />
            </div>
          </div>
        </div>

        {/* Banner Section - The MAISC Difference */}
        <div className="flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden bg-[#14533b] shadow-xl mb-24 relative">
          {/* Content Area */}
          <div className="p-10 md:p-14 lg:p-20 relative bg-[#14533b] flex-grow flex flex-col justify-center order-2 md:order-1 md:w-1/2 lg:w-3/5 z-10">
            <span className="text-[#4cdba4] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">The MAISC Difference</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">Confidence in every<br/>connection.</h2>
            <p className="text-white/90 text-lg max-w-xl leading-relaxed">
              A people-first approach, grounded in ethical recruitment, practical expertise, and dependable support.
            </p>
          </div>

          {/* Image Area */}
          <div className="h-[250px] md:h-auto w-full md:w-1/2 lg:w-2/5 relative bg-[#1b7050] order-1 md:order-2 flex items-center justify-center">
            <span className="absolute inset-0 flex items-center justify-center text-white/50 font-bold z-0 tracking-wider">BANNER IMAGE</span>
            <img 
              src="/green-banner-image.jpg" 
              alt="MAISC Difference" 
              className="absolute inset-0 w-full h-full object-cover z-10" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
            
            {/* Mobile curve */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 md:hidden">
              <svg className="relative block w-[calc(100%+1.3px)] h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#14533b"></path>
              </svg>
            </div>

            {/* Desktop curve */}
            <div className="hidden md:block absolute top-0 left-[-1px] h-full w-[80px] overflow-hidden z-20">
              <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 C100,30 0,70 0,100 Z" fill="#14533b" />
              </svg>
            </div>
          </div>
        </div>

        {/* Discover Why Choose MAISC Callout */}
        <div className="mb-24 bg-gradient-to-r from-[#0B2149] to-[#0056b3] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[#00d4ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              DISCOVER OUR ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Why Choose MAISC as Your Global Talent Partner?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Explore our strict ethical recruitment standards, customized workforce solutions, deep sector expertise, and comprehensive end-to-end processing.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/why-choose-maisc"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-[#0B2149] text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              Why Choose MAISC
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Discover Key Industries Served Callout */}
        <div className="bg-white p-8 sm:p-12 shadow-sm border border-slate-200/80 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              SECTORS WE EMPOWER
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2149] tracking-tight mb-3">
              Explore Our Key Industries Served
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From engineering and heavy construction to healthcare, hospitality, manufacturing, IT, and agriculture—discover how MAISC sources and prepares specialists across 7 key global sectors.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/key-industries-served"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#0B2149] hover:bg-[#007BFF] text-white text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              View All Industries
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

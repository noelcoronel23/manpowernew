import { ArrowRight, Globe2, ShieldCheck, Users, Handshake, CheckCircle2, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/filipino_workers_hero_1789695852524.jpg";

export default function Home() {
  return (
    <div id="home-top" className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#0a192f] w-full min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden">
        {/* Background Image (City + Workers) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-right lg:bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Gradient Overlay for text readability on left side (dims the left city side, keeps people on right clear) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/80 to-transparent w-full md:w-[60%] lg:w-[50%]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-48 lg:pb-56">
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase mb-4">
              Your Global Career Partner
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Connecting Talent <br />
              <span className="text-[#00d4ff]">
                with Opportunities
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 mb-5 max-w-xl leading-relaxed font-medium">
              We are a trusted recruitment agency, helping skilled professionals find the right jobs and helping companies build stronger teams — locally and internationally.
            </p>
            
            {/* DMW License Badge */}
            <div id="hero-dmw-license" className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-[#0B2149] text-xs sm:text-sm font-semibold rounded-md border border-slate-200 shadow-xs mb-8">
              <ShieldCheck className="w-4 h-4 text-[#0f7652] shrink-0" />
              <span>DMW License No. 042-LB-06302026-PL</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/job-openings"
                className="inline-flex justify-center items-center px-8 py-4 border border-[#E5C25A]/50 text-sm font-extrabold text-[#0B2149] bg-[#D4AF37] hover:bg-[#C59B27] transition-all shadow-[0_4px_14px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)] whitespace-nowrap"
              >
                Get Notified When Hiring Opens
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex justify-center items-center px-8 py-4 border-2 border-transparent bg-white text-[#0B2149] text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
              >
                Be the First to Know When Jobs Open
              </Link>
            </div>
          </div>
        </div>

        {/* Script Typography: Better Jobs. Matched With Care. */}
        <div className="absolute bottom-32 right-8 md:bottom-40 md:right-16 lg:bottom-48 lg:right-28 z-30 transform -rotate-[8deg] hidden sm:block pointer-events-none select-none">
            <p className="font-['Caveat'] text-5xl md:text-6xl lg:text-[5.2rem] text-[#FFD700] drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)] leading-[0.88] tracking-wide">
              Better Jobs.<br/>
              <span className="text-[#FFD700] ml-8 sm:ml-12">Matched With Care.</span>
            </p>
        </div>

        {/* Bottom Decorative Ribbon & Stats */}
        <div className="absolute bottom-0 left-0 w-full z-20 flex justify-start">
           {/* Philippine Flag Motif Container */}
           <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex justify-end">
             {/* Wavy Philippine Flag Background */}
             <svg className="absolute bottom-0 right-0 w-[90%] md:w-[70%] lg:w-[60%] h-[200px] lg:h-[300px] drop-shadow-2xl" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                   <linearGradient id="blueWave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0B2149" />
                      <stop offset="50%" stopColor="#0038A8" />
                      <stop offset="100%" stopColor="#0052FF" />
                   </linearGradient>
                   <linearGradient id="redWave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7A0010" />
                      <stop offset="50%" stopColor="#CE1126" />
                      <stop offset="100%" stopColor="#FF1E38" />
                   </linearGradient>
                </defs>
                {/* Blue Top Wave */}
                <path d="M0,300 C200,200 400,100 700,200 C850,250 950,150 1000,100 L1000,300 L0,300 Z" fill="url(#blueWave)" />
                {/* Red Bottom Wave */}
                <path d="M0,300 C300,250 500,150 750,250 C880,300 950,200 1000,150 L1000,300 L0,300 Z" fill="url(#redWave)" />
             </svg>
             {/* Sun & Stars */}
             <div className="absolute bottom-8 right-6 md:right-12 lg:right-24 w-28 h-28 lg:w-40 lg:h-40 text-[#FCD116] drop-shadow-[0_0_15px_rgba(252,209,22,0.4)]">
                {/* Sun */}
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full absolute inset-0 animate-[spin_40s_linear_infinite]">
                   <circle cx="50" cy="50" r="16" />
                   {/* 8 Rays */}
                   <path d="M47 3 L53 3 L50 28 Z" />
                   <path d="M47 97 L53 97 L50 72 Z" />
                   <path d="M3 47 L3 53 L28 50 Z" />
                   <path d="M97 47 L97 53 L72 50 Z" />
                   <path d="M15 15 L20 20 L35 30 Z" />
                   <path d="M85 85 L80 80 L65 70 Z" />
                   <path d="M85 15 L80 20 L65 30 Z" />
                   <path d="M15 85 L20 80 L35 70 Z" />
                </svg>
                {/* 3 Stars */}
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full absolute inset-0">
                   <g transform="translate(10, 15) scale(0.12)">
                      <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                   </g>
                   <g transform="translate(78, 15) scale(0.12)">
                      <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                   </g>
                   <g transform="translate(44, 75) scale(0.12)">
                      <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                   </g>
                </svg>
             </div>
           </div>

           {/* The dark blue slanted bar */}
           <div 
             className="relative bg-[#0B2149] w-full md:w-[95%] lg:w-[85%] px-4 sm:px-8 pt-12 pb-6 lg:pt-16 lg:pb-10 shadow-[20px_0_30px_rgba(0,0,0,0.5)] z-30"
             style={{ clipPath: 'polygon(0 0, 100% 20%, 96% 100%, 0% 100%)' }}
           >
              {/* Added a blue accent top border to mimic depth */}
              <div className="absolute top-0 left-0 w-full h-3 bg-[#007BFF] opacity-30 transform -skew-y-[2deg]"></div>
              
              <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-end text-white pt-6">
                 <div className="flex items-center space-x-3">
                    <div className="p-2 lg:p-3 border-[1.5px] border-white/30 rounded-full flex-shrink-0">
                       <ShieldCheck className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <p className="text-[10px] md:text-xs lg:text-sm font-bold leading-tight tracking-wide">LEGITIMATE<br/>EMPLOYERS</p>
                 </div>
                 <div className="flex items-center space-x-3">
                    <div className="p-2 lg:p-3 border-[1.5px] border-white/30 rounded-full flex-shrink-0">
                       <Users className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <p className="text-[10px] md:text-xs lg:text-sm font-bold leading-tight tracking-wide">QUALIFIED<br/>FILIPINO WORKERS</p>
                 </div>
                 <div className="flex items-center space-x-3">
                    <div className="p-2 lg:p-3 border-[1.5px] border-white/30 rounded-full flex-shrink-0">
                       <Handshake className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <p className="text-[10px] md:text-xs lg:text-sm font-bold leading-tight tracking-wide">INTEGRITY &<br/>CARE</p>
                 </div>
                 <div className="flex items-center space-x-3">
                    <div className="p-2 lg:p-3 border-[1.5px] border-white/30 rounded-full flex-shrink-0">
                       <Globe2 className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <p className="text-[10px] md:text-xs lg:text-sm font-bold leading-tight tracking-wide">GLOBAL<br/>OPPORTUNITIES</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-sky-400 uppercase mb-2">Ready for a new chapter?</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Let's Build Your Future <span className="text-sky-400">Together</span>
            </h3>
            <p className="text-slate-300 text-lg max-w-xl">
              Whether you're looking for a job or seeking the right talent, we're here to help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/apply-now"
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg group"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex justify-center items-center px-8 py-3.5 border border-slate-500 text-base font-bold rounded-full text-white hover:bg-slate-800 transition-colors group"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6">
      <div className="mb-5 inline-flex p-3 bg-blue-50 rounded-xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

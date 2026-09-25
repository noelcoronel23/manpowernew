import { 
  Handshake, 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Globe2, 
  Building2, 
  Network, 
  BadgeCheck, 
  Settings, 
  Heart, 
  Milestone, 
  Target,
  Plane,
  Sparkles,
  Award
} from "lucide-react";
export default function Mission() {
  const missionItems = [
    {
      id: 1,
      number: "01",
      icon: Handshake,
      title: "Ethical & Transparent Recruitment",
      content: (
        <>
          <strong className="text-[#0B2149] font-bold">
            MANPOWER ACTIVITY AND INTERNATIONAL SOLUTIONS CORP.
          </strong>{" "}
          is committed to providing{" "}
          <strong className="text-[#0B2149] font-semibold">
            professional, ethical, transparent, and responsive
          </strong>{" "}
          recruitment and manpower services that connect qualified Filipino workers with legitimate employment opportunities while connecting{" "}
          <strong className="text-[#0B2149] font-semibold">
            reputable employers
          </strong>{" "}
          with competent, dependable, and properly qualified Filipino talent.
        </>
      ),
    },
    {
      id: 2,
      number: "02",
      icon: Users,
      title: "Employer Workforce Understanding",
      content: (
        <>
          Our mission is to{" "}
          <strong className="text-[#0B2149] font-semibold">
            understand the manpower requirements of every employer
          </strong>{" "}
          we serve and to identify candidates based on their qualifications, skills, experience, capabilities, and suitability for available positions.
        </>
      ),
    },
    {
      id: 3,
      number: "03",
      icon: ShieldCheck,
      title: "Compliance & Legal Standards",
      content: (
        <>
          We are committed to maintaining an{" "}
          <strong className="text-[#0B2149] font-semibold">
            organized, professional, transparent, and responsible
          </strong>{" "}
          recruitment process while observing applicable Philippine laws, regulations, and Department of Migrant Workers requirements.
        </>
      ),
    },
    {
      id: 4,
      number: "04",
      icon: UserCheck,
      title: "Worker Empowerment & Respect",
      content: (
        <>
          For{" "}
          <strong className="text-[#0B2149] font-semibold">
            Filipino workers and applicants
          </strong>
          , our mission is to provide clear and responsible information regarding employment opportunities, recruitment procedures, documentary requirements, responsibilities, and employment conditions. We strive to treat every applicant with fairness,{" "}
          <strong className="text-[#0B2149] font-semibold">
            respect, professionalism, and confidentiality
          </strong>
          .
        </>
      ),
    },
    {
      id: 5,
      number: "05",
      icon: Globe2,
      title: "Guidance & Awareness",
      content: (
        <>
          We are committed to helping applicants understand the opportunities available to them and to supporting them throughout the recruitment process while promoting awareness of legitimate recruitment practices and responsible overseas employment.
        </>
      ),
    },
    {
      id: 6,
      number: "06",
      icon: Building2,
      title: "Dependable Employer Solutions",
      content: (
        <>
          For{" "}
          <strong className="text-[#0B2149] font-semibold">employers</strong>, our mission is to provide{" "}
          <strong className="text-[#0B2149] font-semibold">
            dependable manpower solutions
          </strong>{" "}
          through candidate sourcing, screening, qualification and document assessment, candidate matching, communication, recruitment coordination, and professional documentation.
        </>
      ),
    },
    {
      id: 7,
      number: "07",
      icon: Network,
      title: "Sustainable Global Partnerships",
      content: (
        <>
          We aim to build long-term{" "}
          <strong className="text-[#0B2149] font-semibold">relationships</strong>{" "}
          with employers and international recruitment partners through reliable service, timely communication, professional conduct, and a clear understanding of their workforce requirements.
        </>
      ),
    },
    {
      id: 8,
      number: "08",
      icon: BadgeCheck,
      title: "Uncompromising Integrity",
      content: (
        <>
          <strong className="text-[#0B2149] font-semibold">Integrity</strong> is at the center of our mission. We believe that recruitment must be conducted through honest communication, transparency, accountability, respect, and responsible professional practices.
        </>
      ),
    },
    {
      id: 9,
      number: "09",
      icon: Settings,
      title: "Continuous Innovation",
      content: (
        <>
          We are committed to continuously improving our{" "}
          <strong className="text-[#0B2149] font-semibold">recruitment systems</strong>
          , developing our personnel, utilizing appropriate technology, strengthening our professional networks, and improving the quality and efficiency of our services.
        </>
      ),
    },
    {
      id: 10,
      number: "10",
      icon: Heart,
      title: "Human-Centric Focus",
      content: (
        <>
          Most importantly, we recognize that{" "}
          <strong className="text-[#0B2149] font-semibold">
            every applicant is more than a résumé or application
          </strong>
          . Every person has skills, responsibilities, dreams, family, and a future. At the same time, every employer{" "}
          <strong className="text-[#0B2149] font-semibold">
            has legitimate workforce requirements and responsibilities
          </strong>
          .
        </>
      ),
    },
    {
      id: 11,
      number: "11",
      icon: Milestone,
      title: "A Reliable Professional Bridge",
      content: (
        <>
          Our mission is therefore{" "}
          <strong className="text-[#0B2149] font-semibold">
            to serve as a professional bridge
          </strong>{" "}
          between people and organizations, creating meaningful employment opportunities while providing employers with reliable manpower solutions.
        </>
      ),
    },
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Header */}
        <div className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Core Purpose & Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0B2149] tracking-tight mb-4">
            Our Mission
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Committed to ethical, transparent, and responsive manpower services that connect qualified Filipino professionals with legitimate global opportunities.
          </p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Sticky Poster Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white relative">
              
              {/* Leadership Team Image */}
              <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
                <img 
                  src="/mission-photo.jpg" 
                  alt="MAISC Corporate Leadership Team" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2149] via-[#0B2149]/20 to-transparent" />
                
                {/* Floating Leadership Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0B2149]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-md">
                  <Plane className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-[11px] font-semibold tracking-wide">MAISC Leadership</span>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-emerald-700/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30 text-white shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-semibold tracking-wide">Ethical Governance</span>
                </div>

                {/* Slogan Overlay at bottom of picture */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white text-center">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                    MAISC Philosophy
                  </p>
                  <p className="text-sm sm:text-base font-medium italic text-slate-100">
                    "Connecting People. Creating Opportunities. Building Trust."
                  </p>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B2149]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B2149] text-base leading-tight">
                      Leadership Dedicated to Service
                    </h3>
                    <p className="text-xs text-slate-500">
                      Guided by integrity, transparency, and worker welfare
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  Our directors and management lead with personal accountability, ensuring every Filipino worker is respected and every employer receives qualified, dependable talent.
                </p>
              </div>
            </div>

            {/* Quick Stat / Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="block text-2xl font-extrabold text-[#0B2149]">100%</span>
                <span className="text-xs text-slate-500 font-medium">Compliant with Philippine DMW Regulations</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="block text-2xl font-extrabold text-emerald-700">Multi-Sector</span>
                <span className="text-xs text-slate-500 font-medium">Healthcare, Construction, IT, Hospitality & More</span>
              </div>
            </div>

          </div>

          {/* Right Column: Mission Points List */}
          <div className="lg:col-span-7 space-y-4">
            {missionItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 flex items-start gap-4 sm:gap-5"
                >
                  {/* Icon badge */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-[#0B2149] flex-shrink-0 flex items-center justify-center shadow-xs border border-blue-100">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B2149] stroke-[2]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-[#0B2149] text-base leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-bold tracking-wider text-slate-400 font-mono">
                        {item.number}
                      </span>
                    </div>
                    <div className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Concluding Commitment Banner */}
            <div className="rounded-2xl p-6 sm:p-8 bg-[#0B2149] text-white shadow-xl mt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    Our Unwavering Commitment
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                    Our commitment is to connect qualified people with legitimate opportunities, provide professional manpower solutions to employers, and build lasting relationships based on <strong className="text-emerald-400 font-bold">integrity, trust, respect, and quality service</strong>.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

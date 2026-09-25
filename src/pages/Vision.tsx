import { 
  Globe2, 
  Users, 
  Building2, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Eye,
  Plane,
  Sparkles,
  Compass
} from "lucide-react";
export default function Vision() {
  const visionItems = [
    {
      id: 1,
      number: "01",
      icon: Globe2,
      title: "Global Recognition & Trust",
      content: (
        <>
          To become a{" "}
          <strong className="text-[#0B2149] font-semibold">
            trusted and internationally recognized Philippine recruitment and manpower solutions company
          </strong>
          , known for connecting qualified{" "}
          <strong className="text-[#0B2149] font-semibold">
            Filipino professionals, skilled workers, and dedicated individuals
          </strong>{" "}
          with legitimate and meaningful employment opportunities around the world, while building lasting partnerships with{" "}
          <strong className="text-[#0B2149] font-semibold">
            reputable employers and international recruitment organizations
          </strong>
          .
        </>
      ),
    },
    {
      id: 2,
      number: "02",
      icon: Users,
      title: "Empowering Worker Potential",
      content: (
        <>
          We envision a{" "}
          <strong className="text-[#0B2149] font-semibold">
            future where Filipino workers are provided with opportunities that recognize their skills, experience, dignity, rights, aspirations, and potential
          </strong>{" "}
          for personal and professional growth. We aim to help individuals find employment opportunities where they can develop their abilities, improve their quality of life, support their families, and contribute{" "}
          <strong className="text-[#0B2149] font-semibold">meaningfully</strong>{" "}
          to the organizations and communities where they work.
        </>
      ),
    },
    {
      id: 3,
      number: "03",
      icon: Building2,
      title: "Reliable Employer Partnership",
      content: (
        <>
          We envision becoming a{" "}
          <strong className="text-[#0B2149] font-semibold">
            reliable and professional recruitment partner for employers
          </strong>{" "}
          by providing qualified, competent, dependable, and properly assessed Filipino workers who can contribute to their{" "}
          <strong className="text-[#0B2149] font-semibold">
            organizations and meet their workforce requirements
          </strong>
          .
        </>
      ),
    },
    {
      id: 4,
      number: "04",
      icon: ShieldCheck,
      title: "Foundational Ethical Values",
      content: (
        <>
          Our vision is to continuously{" "}
          <strong className="text-[#0B2149] font-semibold">
            develop a recruitment organization founded on integrity, professionalism, transparency, accountability, respect, quality service, and responsible recruitment practices
          </strong>
          .
        </>
      ),
    },
    {
      id: 5,
      number: "05",
      icon: Settings,
      title: "Modern Systems & Global Networks",
      content: (
        <>
          We aspire to use{" "}
          <strong className="text-[#0B2149] font-semibold">
            modern recruitment systems, technology, effective human resource practices, skills development
          </strong>
          , professional networks, and strong international partnerships to improve the recruitment experience for both applicants and employers.
        </>
      ),
    },
    {
      id: 6,
      number: "06",
      icon: TrendingUp,
      title: "Protecting Value & Dignity",
      content: (
        <>
          Ultimately, our vision is to build a recruitment and manpower organization that creates opportunities, develops careers, supports families, strengthens employer partnerships, and protects the value, dignity, and potential of every Filipino worker.
        </>
      ),
    },
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Header */}
        <div className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Aspiration & Strategic Outlook</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0B2149] tracking-tight mb-4">
            Our Vision
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Striving to be the most trusted and internationally recognized Philippine recruitment and manpower solutions partner worldwide.
          </p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Sticky Poster Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white relative">
              
              {/* Strategic Partnership Meeting Image */}
              <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
                <img 
                  src="/vision-photo.jpg" 
                  alt="MAISC Strategic Global Partnership Meeting" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2149] via-[#0B2149]/20 to-transparent" />
                
                {/* Floating Worldwide Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0B2149]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-md">
                  <Plane className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-[11px] font-semibold tracking-wide">Global Alliances</span>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-emerald-700/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30 text-white shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-semibold tracking-wide">Employer Networks</span>
                </div>

                {/* Slogan Overlay */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white text-center">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                    Guiding Principle
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
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B2149] text-base leading-tight">
                      International Collaboration & Trust
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uniting skilled workers with international organizations
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  Engaging in high-level collaboration with international employers and industry leaders to open sustainable, dignified career opportunities worldwide.
                </p>
              </div>
            </div>

            {/* Supporting Pillar Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="block text-2xl font-extrabold text-[#0B2149]">Global</span>
                <span className="text-xs text-slate-500 font-medium">Reputable International Employer Alliances</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="block text-2xl font-extrabold text-emerald-700">Dignity</span>
                <span className="text-xs text-slate-500 font-medium">Fair, Respectful, & Protected Employment</span>
              </div>
            </div>

          </div>

          {/* Right Column: Vision Points List */}
          <div className="lg:col-span-7 space-y-4">
            {visionItems.map((item) => {
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

          </div>

        </div>

      </div>
    </div>
  );
}

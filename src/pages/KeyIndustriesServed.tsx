import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HardHat, 
  Factory, 
  Cpu, 
  Stethoscope, 
  UtensilsCrossed, 
  Laptop, 
  Wheat, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Building2
} from 'lucide-react';

interface IndustryCardProps {
  icon: React.ElementType;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  roles: string[];
  certifications: string[];
}

export default function KeyIndustriesServed() {
  const industries: IndustryCardProps[] = [
    {
      icon: HardHat,
      title: "Engineering & Construction",
      badge: "Heavy Civil & Commercial",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "Supplying certified technical engineers and seasoned construction personnel for civil infrastructure, high-rise developments, industrial facilities, and regional transport networks.",
      roles: [
        "Civil, Mechanical & Electrical Engineers",
        "Heavy Equipment Operators (Excavator, Crane, Dozer)",
        "Site Foremen & Construction Supervisors",
        "Piping Engineers & Structural Fitters",
        "Safety Officers (OSH / NEBOSH / DOLE SO2)"
      ],
      certifications: ["PRC Licensed", "TESDA NC II / III", "Site Safety Protocols"]
    },
    {
      icon: Factory,
      title: "Manufacturing & Production",
      badge: "Industrial & Manufacturing",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "Delivering disciplined workforce solutions for high-volume manufacturing lines, precision fabrication plants, food processing facilities, and automated warehouses.",
      roles: [
        "Operations & Plant Maintenance Managers",
        "Shift Team Leaders & Line Foremen",
        "Preventive Maintenance Technicians",
        "Warehouse Personnel & Logistics Coordinators",
        "QA / QC Inspectors & Laboratory Staff"
      ],
      certifications: ["Six Sigma / 5S", "GMP / ISO 9001", "HACCP Awareness"]
    },
    {
      icon: Cpu,
      title: "Projects & Technology",
      badge: "Project Management",
      badgeColor: "bg-indigo-100 text-indigo-800",
      description: "Supplying technical leadership and engineering expertise to execute complex multidisciplinary turnkey projects on schedule and within budget.",
      roles: [
        "Senior Project Managers & PMO Specialists",
        "Project Engineers & Planning Engineers",
        "Process Engineers & Commissioning Leads",
        "Automation & PLC System Programmers",
        "Estimators & Quantity Surveyors (QS)"
      ],
      certifications: ["PMP / Prince2", "AutoCAD / Primavera P6", "SCADA / PLC"]
    },
    {
      icon: Stethoscope,
      title: "Healthcare & Medical Services",
      badge: "Medical & Allied Health",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Connecting licensed Filipino medical professionals with premier hospitals, clinical facilities, nursing homes, and international healthcare institutions.",
      roles: [
        "Medical Doctors & Clinical Specialists",
        "Registered Staff Nurses (ICU, ER, OR, Med-Surg)",
        "Medical Technologists & Lab Analysts",
        "Physical & Occupational Therapists",
        "Certified Caregivers & Geriatric Care Assistants"
      ],
      certifications: ["PRC Registered", "BLS / ACLS Certified", "IELTS / OET Verified"]
    },
    {
      icon: UtensilsCrossed,
      title: "Hotels, Restaurants & Hospitality",
      badge: "Hospitality & Tourism",
      badgeColor: "bg-rose-100 text-rose-800",
      description: "Empowering world-class hotels, cruise lines, luxury resorts, and high-end restaurant groups with renowned Filipino hospitality, culinary talent, and guest services.",
      roles: [
        "Executive Chefs, Sous Chefs & Pastry Specialists",
        "Line Cooks, Commis & Kitchen Stewards",
        "Waiters, Waitresses & Banquet Captains",
        "Front Desk Clerks & Guest Relations Officers",
        "Housekeeping Supervisors & Room Attendants"
      ],
      certifications: ["TESDA Cookery / FBS NC II", "HACCP Food Safety", "Multilingual Service"]
    },
    {
      icon: Laptop,
      title: "Information Technology & Administration",
      badge: "IT & Corporate Services",
      badgeColor: "bg-sky-100 text-sky-800",
      description: "Providing forward-thinking companies with proficient IT engineers, software developers, technical support specialists, and multilingual administrative staff.",
      roles: [
        "Software Developers & Full-Stack Engineers",
        "Systems Administrators & Network Engineers",
        "Cybersecurity Analysts & Tier 1/2 Support",
        "Corporate Executive Assistants & Data Analysts",
        "Customer Service Specialists & BPO Agents"
      ],
      certifications: ["CompTIA / Cisco CCNA", "Cloud Fundamentals (AWS/Azure)", "Agile / Scrum"]
    },
    {
      icon: Wheat,
      title: "Agriculture & Farming",
      badge: "Agri-Business & Farming",
      badgeColor: "bg-lime-100 text-lime-800",
      description: "Matching agricultural enterprises with skilled farm technicians, crop handlers, poultry operators, and meat processing personnel for sustainable food supply operations.",
      roles: [
        "Farm Operations Managers & Agronomists",
        "Poultry Farm Workers & Livestock Handlers",
        "Professional Butchers & Meat Cutters",
        "Greenhouse & Hydroponic Technicians",
        "Agricultural Machine & Irrigation Operators"
      ],
      certifications: ["TESDA Agri NC II", "Meat Cutting NC II", "Bio-Security Standards"]
    }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#007BFF]/50"></span>
            <span className="text-[#007BFF] font-bold text-xs tracking-[0.2em] uppercase">
              KEY INDUSTRIES SERVED
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B2149] tracking-tight leading-[1.1] mb-6">
            Industries We Support <br className="hidden sm:inline" />
            <span className="text-[#007BFF]">Globally & Locally</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            MAISC delivers specialized human resource and workforce placement solutions across a wide range of critical industries. We match qualified, pre-screened Filipino talent with licensed domestic and international employer partners.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0B2149] group-hover:text-[#007BFF] group-hover:bg-blue-50/60 transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ind.badgeColor}`}>
                      {ind.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2149] mb-3 group-hover:text-[#007BFF] transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {ind.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Personnel & Roles
                    </h4>
                    <ul className="space-y-2">
                      {ind.roles.map((role, rIdx) => (
                        <li key={rIdx} className="flex items-start text-xs text-slate-700">
                          <span className="text-[#007BFF] mr-2 font-bold">•</span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {ind.certifications.map((cert, cIdx) => (
                      <span key={cIdx} className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Standards & Compliance Highlights */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-20">
          <div className="max-w-3xl mb-10">
            <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              OUR SELECTION RIGOR
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2149] tracking-tight mb-3">
              Standardized Screening Across Every Industry
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Regardless of the sector, every candidate deployed by MAISC undergoes rigorous technical verification, government compliance validation, and pre-departure preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-[#007BFF] mb-3" />
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Trade Testing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Hands-on assessment at accredited testing centers for technical roles.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Credential Audit</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Verification of PRC licenses, diplomas, CAV certifications, and employment history.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-indigo-600 mb-3" />
              <h4 className="font-bold text-[#0B2149] text-base mb-1">Medical Clearance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Comprehensive physical, psychological, and fit-to-work screening via accredited clinics.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-amber-600 mb-3" />
              <h4 className="font-bold text-[#0B2149] text-base mb-1">DMW Compliance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Strict adherence to Department of Migrant Workers and POEA guidelines.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#0B2149] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[#00d4ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              TALENT & PARTNERSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Need qualified talent in your industry, or looking for your next career move?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with MAISC recruitment specialists today to discuss customized staffing orders or explore available positions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <Link
              to="/job-openings"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#007BFF] hover:bg-[#0069d9] text-white text-sm font-bold shadow-md transition-all text-center"
            >
              Browse Openings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white text-sm font-semibold transition-all text-center"
            >
              Contact Specialists
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

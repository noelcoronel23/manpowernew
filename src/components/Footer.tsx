import { Link, useLocation, useNavigate } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === href) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate(href);
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xl">
             <Link 
              to="/" 
              onClick={(e) => handleFooterLinkClick("/", e)}
              className="flex items-center gap-3 group mb-4"
             >
              <div className="relative h-12 w-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center overflow-hidden">
                 <img src="/logo.jpg" alt="Manpower Activity Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="block text-lg font-bold text-white tracking-tight leading-tight">
                  MANPOWER ACTIVITY
                </span>
                <span className="block text-[10px] font-semibold text-slate-400 tracking-wider">
                  AND INTERNATIONAL SOLUTIONS CORP.
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Your global career partner. We connect trusted employers worldwide with skilled professionals across the Philippines.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a href="mailto:inquiry@maisc.ph?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Manpower Activity and International Solutions Corp. All rights reserved.
          </p>
          <div className="flex space-x-6 items-center">
            <Link to="#" className="text-xs text-slate-500 hover:text-white">Privacy Policy</Link>
            <Link to="#" className="text-xs text-slate-500 hover:text-white">Terms & Conditions</Link>
            <Link to="/admin" className="text-xs text-slate-500 hover:text-[#007BFF] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

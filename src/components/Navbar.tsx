import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Target, Handshake, Mail, Send, ChevronDown, Activity, Bell, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Record<string, boolean>>({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleDropdownEnter = (name: string) => {
    if (closeTimeoutRef.current[name]) {
      clearTimeout(closeTimeoutRef.current[name]);
    }
    setOpenDropdown(name);
  };

  const handleDropdownLeave = (name: string) => {
    closeTimeoutRef.current[name] = setTimeout(() => {
      setOpenDropdown((current) => (current === name ? null : current));
    }, 180);
  };

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdowns({});

    const [targetPath, hash] = href.split("#");

    if (location.pathname === targetPath) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } else {
      navigate(href);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      } else {
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }, 50);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: "HOME", href: "/", icon: Home },
    { 
      name: "WHO WE ARE", 
      icon: Users,
      dropdown: [
        { name: "About Us", href: "/who-we-are" },
        { name: "Vision", href: "/vision" },
        { name: "Mission", href: "/mission" }
      ]
    },
    { 
      name: "WHAT WE DO", 
      href: "/what-we-do",
      icon: Target,
      dropdown: [
        { name: "Key Industries Served", href: "/key-industries-served" },
        { name: "Why Choose MAISC", href: "/why-choose-maisc" }
      ]
    },
    { name: "OUR WORK IN ACTION", href: "/our-work-in-action", icon: Activity },
    { 
      name: "JOB OPENINGS", 
      href: "/job-openings", 
      icon: Briefcase,
      isJobOpenings: true 
    },
    { name: "BECOME OUR PARTNER", href: "/partners", icon: Handshake },
    { name: "CONTACT US", href: "/contact-us", icon: Mail },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path.includes("#")) {
      return (location.pathname + location.hash) === path;
    }
    return location.pathname === path;
  };

  const isDropdownActive = (dropdown?: {href: string}[]) => 
    dropdown ? dropdown.some(item => {
      const targetPath = item.href.split("#")[0];
      return location.pathname === targetPath;
    }) : false;

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-24 items-center justify-between gap-3 xl:gap-4">
          
          {/* Brand Logo on the Left */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              onClick={(e) => handleNavClick("/", e)} 
              className="flex items-center gap-2.5 sm:gap-3 group"
            >
              {/* Custom Logo Image */}
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-50 shadow-sm">
                <img src="/logo.jpg" alt="Manpower Activity Logo" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex flex-col">
                <span className="block text-lg sm:text-xl font-extrabold text-[#0B2149] tracking-tight leading-none mb-0.5">
                  MANPOWER ACTIVITY
                </span>
                <span className="block text-[11px] sm:text-xs font-semibold text-[#0B2149] tracking-tight leading-none mb-1">
                  AND INTERNATIONAL SOLUTIONS CORP.
                </span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-blue-600 tracking-[0.16em] sm:tracking-[0.2em]">
                  PEOPLE &bull; OPPORTUNITIES &bull; GLOBAL CAREERS
                </span>
              </div>
            </Link>
          </div>
          
          {/* Centered & Balanced Desktop Navigation */}
          <div className="hidden xl:flex flex-1 items-center justify-center px-2 2xl:px-4" ref={desktopNavRef}>
            <div className="flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                
                if (item.dropdown) {
                  const active = isDropdownActive(item.dropdown);
                  const isDropdownOpen = openDropdown === item.name;
                  return (
                    <div 
                      key={item.name} 
                      className="relative py-2"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={() => handleDropdownLeave(item.name)}
                    >
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className={`flex items-center gap-1 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-bold tracking-tight transition-colors whitespace-nowrap ${
                          active || isDropdownOpen
                            ? "text-[#007BFF]"
                            : "text-[#0B2149] hover:text-[#007BFF]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 stroke-[2.2] flex-shrink-0" />
                        <span className="uppercase">{item.name}</span>
                        <ChevronDown className={`w-3 h-3 stroke-[2.5] flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Desktop Dropdown */}
                      {isDropdownOpen && (
                        <div 
                          className="absolute top-[calc(100%+14px)] left-0 min-w-[220px] bg-white rounded-md shadow-lg border border-slate-100 py-1 z-50 before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                          onMouseEnter={() => handleDropdownEnter(item.name)}
                          onMouseLeave={() => handleDropdownLeave(item.name)}
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={(e) => handleNavClick(subItem.href, e)}
                              className={`block px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                                isActive(subItem.href)
                                  ? "text-[#007BFF] bg-blue-50/50"
                                  : "text-[#0B2149] hover:bg-slate-50 hover:text-[#007BFF]"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href!}
                    onClick={(e) => handleNavClick(item.href!, e)}
                    className={`flex items-center gap-1 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-bold tracking-tight transition-colors uppercase whitespace-nowrap ${
                      isActive(item.href)
                        ? "text-[#007BFF]"
                        : item.isJobOpenings
                          ? "text-[#0B2149] hover:text-[#CE1126]"
                          : "text-[#0B2149] hover:text-[#007BFF]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 stroke-[2.2] flex-shrink-0 ${item.isJobOpenings ? "text-[#CE1126]" : ""}`} />
                    <span>{item.name}</span>
                    {item.isJobOpenings && (
                      <span className="inline-flex items-center px-1.5 py-0.5 text-[8.5px] font-black leading-none bg-[#CE1126] text-white rounded-full tracking-wider shadow-xs animate-pulse ml-0.5">
                        OPEN
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Final CTA Button on the Right */}
          <div className="hidden xl:flex items-center flex-shrink-0">
            <Link
              to="/job-openings"
              onClick={(e) => handleNavClick("/job-openings", e)}
              className="inline-flex items-center justify-center px-3 xl:px-3.5 py-2 border border-transparent text-[12px] xl:text-[12.5px] font-bold rounded-lg text-white bg-[#0B2149] hover:bg-[#071633] transition-all shadow-sm hover:shadow whitespace-nowrap flex-shrink-0"
            >
              <Bell className="w-3.5 h-3.5 mr-1.5 text-[#FFD700] flex-shrink-0" />
              Get Notified When Hiring Opens
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-[#007BFF] p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              if (item.dropdown) {
                const active = isDropdownActive(item.dropdown);
                const isMobileOpen = !!mobileOpenDropdowns[item.name];
                return (
                  <div key={item.name} className="flex flex-col space-y-1">
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className={`flex items-center justify-between px-3 py-3 rounded-md text-base font-bold uppercase w-full ${
                        active
                          ? "bg-blue-50 text-[#007BFF]"
                          : "text-[#0B2149] hover:bg-slate-50 hover:text-[#007BFF]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Mobile Dropdown */}
                    {isMobileOpen && (
                      <div className="pl-11 pr-3 py-2 space-y-1 bg-slate-50/50 rounded-md">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={(e) => handleNavClick(subItem.href, e)}
                            className={`block px-3 py-2.5 rounded-md text-sm font-bold ${
                              isActive(subItem.href)
                                ? "text-[#007BFF] bg-blue-50"
                                : "text-slate-600 hover:bg-slate-100 hover:text-[#0B2149]"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href!}
                  onClick={(e) => handleNavClick(item.href!, e)}
                  className={`flex items-center justify-between px-3 py-3 rounded-md text-base font-bold uppercase ${
                    isActive(item.href)
                      ? "bg-blue-50 text-[#007BFF]"
                      : "text-[#0B2149] hover:bg-slate-50 hover:text-[#007BFF]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${item.isJobOpenings ? "text-[#CE1126]" : ""}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.isJobOpenings && (
                    <span className="px-2 py-0.5 text-xs font-black bg-[#CE1126] text-white rounded-full animate-pulse">
                      OPEN
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              to="/job-openings"
              onClick={(e) => {
                setIsOpen(false);
                handleNavClick("/job-openings", e);
              }}
              className="flex items-center justify-center w-full mt-4 px-6 py-3 border border-transparent text-base font-bold rounded-md text-white bg-[#0B2149] hover:bg-[#071633]"
            >
              <Bell className="w-5 h-5 mr-2 text-[#FFD700]" />
              Get Notified When Hiring Opens
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

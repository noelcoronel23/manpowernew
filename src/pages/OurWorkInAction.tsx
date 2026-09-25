import { Briefcase, Users, Award, Globe, Building2, CheckCircle2, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function OurWorkInAction() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const highlightPoints = [
    {
      title: "Active Overseas Deployment",
      desc: "Guiding verified candidates through standardized pre-departure orientations, documentation, and compliant placement with authorized employers."
    },
    {
      title: "Hands-on Technical Assessment",
      desc: "Rigorous skill verification and trade testing across diverse fields ensuring readiness for international workplace standards."
    },
    {
      title: "Bilateral Partner Coordination",
      desc: "Continuous engagement with foreign recruitment principals, host nation labor delegates, and regulatory bodies."
    },
    {
      title: "Worker Welfare & Post-Arrival Monitoring",
      desc: "Dedicated ongoing support checking in on deployed personnel to ensure safe living and working conditions."
    }
  ];

  // Action photos (filtered)
  const actionPhotos = [
    { id: 6, src: "/PIC6.jpg", fallbackSrc: "/pic6.jpg", caption: "Field Technical Training & Safety Standards" },
    { id: 10, src: "/PIC10.jpg", fallbackSrc: "/pic10.jpg", caption: "Medical & Health Clearance Verification" },
    { id: 11, src: "/PIC11.jpg", fallbackSrc: "/pic11.jpg", caption: "Overseas Employer Coordination & Interview" },
    { id: 13, src: "/PIC13.jpg", fallbackSrc: "/pic13.jpg", caption: "Trade Competency & Certification Assessment" },
    { id: 14, src: "/PIC14.jpg", fallbackSrc: "/pic14.jpg", caption: "Team Coordination & Professional Placement" },
    { id: 15, src: "/PIC15.jpg", fallbackSrc: "/pic15.jpg", caption: "Successful Deployment Milestone & Celebration" }
  ];

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + actionPhotos.length) % actionPhotos.length);
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % actionPhotos.length);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="max-w-3xl mb-14">
          <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-3 block">
            Our Global Operations
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] tracking-tight mb-6">
            Our Work in Action
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Witness our dedication in motion — from comprehensive trade testing and credential verification in Manila to confident departures and flourishing careers with verified global principals.
          </p>
        </div>

        {/* Operational Highlights Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlightPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0f7652] flex items-center justify-center font-bold text-sm mb-4">
                0{index + 1}
              </div>
              <h3 className="font-bold text-[#0B2149] text-lg mb-2 leading-snug">
                {point.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Photo Gallery Section */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-5 border-b border-slate-100">
            <div>
              <span className="text-[#0f7652] font-bold text-xs tracking-wider uppercase mb-1 block">
                Field Activities & Milestones
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2149]">
                Photo & Deployment Archive
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-2 sm:mt-0 font-medium">
              Click any photo to view enlarged
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {actionPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={photo.src} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes(photo.src) && photo.fallbackSrc) {
                      target.src = photo.fallbackSrc;
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2149]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-[11px] font-bold tracking-wider uppercase bg-[#0f7652] px-2 py-0.5 rounded">
                      PIC {photo.id}
                    </span>
                    <ZoomIn className="w-4 h-4 text-emerald-300" />
                  </div>
                  <p className="text-white text-xs font-medium line-clamp-1 mt-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image in Lightbox */}
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
              <img 
                src={actionPhotos[selectedPhotoIndex].src} 
                alt={actionPhotos[selectedPhotoIndex].caption}
                className="max-h-[75vh] max-w-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = actionPhotos[selectedPhotoIndex].fallbackSrc;
                  if (target.src.includes(actionPhotos[selectedPhotoIndex].src) && fallback) {
                    target.src = fallback;
                  }
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption & Counter */}
            <div className="w-full flex items-center justify-between text-white mt-4 px-2">
              <div className="text-left">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                  Photo {selectedPhotoIndex + 1} of {actionPhotos.length}
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200">
                  {actionPhotos[selectedPhotoIndex].caption}
                </p>
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

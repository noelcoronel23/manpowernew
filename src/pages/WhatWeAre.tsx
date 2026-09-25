export default function WhatWeAre() {
  return (
    <div className="py-16 md:py-24 bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: About Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Overlapping Box */}
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0 px-4 sm:px-12 lg:px-0">
            {/* PIC 1 Placeholder */}
            <div className="aspect-[4/3] bg-slate-200 rounded flex items-center justify-center text-slate-400 font-bold text-3xl relative shadow-md overflow-hidden">
              <span className="z-0">PIC 1</span>
              {/* If user uploads pic1.jpg, it will cover the placeholder text */}
              <img 
                src="/pic1.jpg" 
                alt="About Us" 
                className="absolute inset-0 w-full h-full object-cover z-10" 
                onError={(e) => {
                  if (!e.currentTarget.src.includes('pic1.jpg.png')) {
                    e.currentTarget.src = '/pic1.jpg.png';
                  } else if (!e.currentTarget.src.includes('pic1.png')) {
                    e.currentTarget.src = '/pic1.png';
                  } else if (!e.currentTarget.src.includes('pic1.jpg.jpg')) {
                    e.currentTarget.src = '/pic1.jpg.jpg';
                  } else if (!e.currentTarget.src.includes('PIC1.jpg')) {
                    e.currentTarget.src = '/PIC1.jpg';
                  }
                }} 
              />
            </div>
            
            {/* Overlapping Green Box */}
            <div className="absolute -bottom-8 right-0 sm:right-8 lg:-right-12 bg-[#0f7652] text-white p-6 sm:p-8 shadow-xl w-[280px] z-20">
              <h3 className="font-bold text-xl sm:text-2xl mb-2">MAISC</h3>
              <p className="text-sm sm:text-base leading-tight opacity-90">
                Your reliable partner for people.<br />
                Your partner for success.
              </p>
            </div>
          </div>
          
          {/* Right Column: Text Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left">
            <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Who we are</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] mb-10">About us</h2>
            
            <p className="text-slate-600 mb-6 text-base leading-relaxed mx-auto lg:mx-0 max-w-lg">
              At Manpower Activity and International Solutions Corp. (MAISC), we specialize in connecting skilled talent with thriving businesses worldwide across various industries including agriculture, healthcare, construction, IT, hospitality, and manufacturing.
            </p>
            
            <p className="text-slate-600 mb-12 text-base leading-relaxed mx-auto lg:mx-0 max-w-lg">
              With strong network and years of experience of its directors of understanding workforce dynamics, is our commitment to ethical recruitment empowering both employers and job seekers to grow together.
            </p>
            
            {/* Feature Columns */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start text-left">
              <div className="border-l-[3px] border-[#0B2149] pl-5 max-w-[240px]">
                <h4 className="text-[#0B2149] font-bold text-[17px] mb-2">Employer-ready talent</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Qualified candidates that meet industry standards</p>
              </div>
              <div className="border-l-[3px] border-[#0B2149] pl-5 max-w-[240px]">
                <h4 className="text-[#0B2149] font-bold text-[17px] mb-2">Guided deployment</h4>
                <p className="text-sm text-slate-500 leading-relaxed">A clear, step-by-step journey from inquiry to placement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Vision and Mission */}
        <div className="mt-32 space-y-6 max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-10 shadow-sm border border-slate-100 border-l-[3px] border-l-[#0f7652]">
            <h3 className="text-[#0B2149] font-bold text-xl mb-3">Our Vision</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              To be the most trusted partner in manpower services, recognized for our integrity, innovation, and impact on people's lives.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-10 shadow-sm border border-slate-100 border-l-[3px] border-l-[#dc2626]">
            <h3 className="text-[#0B2149] font-bold text-xl mb-3">Our Mission</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              To bridge opportunity and ambition by delivering workforce solutions that build careers and drive business success.
            </p>
          </div>
        </div>

        {/* Section 3: Our Work in Action (Gallery) */}
        <div className="mt-24 bg-white p-8 md:p-12 shadow-sm border border-slate-100 rounded-xl max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Our Global Reach</span>
              <h2 className="text-2xl md:text-[28px] font-bold text-[#0B2149]">Our Work in Action</h2>
            </div>
            <p className="text-slate-500 text-sm mt-4 md:mt-0 font-medium">
              Building trusted connections through meaningful partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Render PIC 2 to PIC 15 (14 images total) */}
            {Array.from({ length: 14 }).map((_, i) => {
              const picNumber = i + 2; // Starts from 2
              return (
                <div key={picNumber} className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 font-bold relative group shadow-sm">
                  <span className="z-0 tracking-wider">PIC {picNumber}</span>
                  <img 
                    src={`/pic${picNumber}.jpg`} 
                    alt={`Gallery Image ${picNumber}`} 
                    className="absolute inset-0 w-full h-full object-cover z-10" 
                    onError={(e) => e.currentTarget.style.display = 'none'} 
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

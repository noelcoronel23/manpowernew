export default function WhoWeAre() {
  return (
    <div className="py-16 md:py-24 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image with Overlapping Box */}
          <div className="relative order-2 lg:order-1 mt-8 lg:mt-0 pb-8 sm:pb-12 lg:pb-0 pr-0 sm:pr-8 lg:pr-12">
            <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden shadow-lg relative">
              <img 
                src="/pic1.jpg" 
                alt="MAISC Team" 
                className="w-full h-full object-cover"
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
            <div className="absolute -bottom-4 right-2 sm:right-2 lg:-right-4 bg-[#0f7652] text-white p-6 sm:p-8 shadow-xl w-[260px] sm:w-[290px] z-20">
              <h3 className="font-bold text-xl sm:text-2xl mb-2">MAISC</h3>
              <p className="text-sm sm:text-base leading-snug opacity-95">
                Your reliable partner for people.<br />
                Your partner for success.
              </p>
            </div>
          </div>
          
          {/* Right Column: Text Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B2149] mb-8 tracking-tight">
              About us
            </h1>
            
            <p className="text-slate-600 mb-6 text-base lg:text-[17px] leading-relaxed">
              At Manpower Activity and International Solutions Corp. (MAISC), we specialize in connecting skilled talent with thriving businesses worldwide across various industries including agriculture, healthcare, construction, IT, hospitality, and manufacturing.
            </p>
            
            <p className="text-slate-600 mb-10 text-base lg:text-[17px] leading-relaxed">
              With strong network and years of experience of its directors of understanding workforce dynamics, is our commitment to ethical recruitment empowering both employers and job seekers to grow together.
            </p>
            
            {/* Feature Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="border-l-[3px] border-[#0B2149] pl-5">
                <h4 className="text-[#0B2149] font-bold text-lg mb-1.5 leading-snug">
                  Employer-ready talent
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Qualified candidates that meet industry standards
                </p>
              </div>
              <div className="border-l-[3px] border-[#0B2149] pl-5">
                <h4 className="text-[#0B2149] font-bold text-lg mb-1.5 leading-snug">
                  Guided deployment
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  A clear, step-by-step journey from inquiry to placement.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowRight, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';
import { getImagePath } from '../utils/imageHelper';

export default function PromoBanner({ onExplore }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF0F3] via-[#FAF6F0] to-[#FFE6EC] border border-[#F4ACB7]/40 shadow-card">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Text & Style Guide */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-4">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-white/80 px-3.5 py-1 rounded-full border border-[#EE7B99]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#EE7B99]" />
              Campus Lookbook Spotlight
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#561026] leading-tight">
              Your College Wardrobe, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#D94B73]">Reimagined.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5C4D4D] leading-relaxed max-w-xl">
              Who says college outfits take an hour to decide? Pair our short cotton kurtis with relaxed denim mom-jeans, grab your canvas tote, slip on silver jhumkas, and you are ready for 8:30 AM lectures in 5 minutes flat.
            </p>

            {/* Micro style chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg text-xs text-[#561026]">
              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#F4ACB7]/20">
                <span className="text-base">👖</span>
                <div>
                  <div className="font-bold">Jeans-Ready Cuts</div>
                  <div className="text-[11px] text-[#7A6B6B]">Short lengths with comfort slits</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#F4ACB7]/20">
                <span className="text-base">🧺</span>
                <div>
                  <div className="font-bold">Hostel Wash Friendly</div>
                  <div className="text-[11px] text-[#7A6B6B]">Color-fast cambric cotton</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 bg-[#561026] hover:bg-[#751734] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Explore Denim Pairing Kurtis</span>
                <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
              </button>
            </div>

          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden">
            <img
              src={getImagePath('/images/promo_wardrobe.jpg')}
              alt="Aesthetic college wardrobe with pastel Indian kurtis"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-black/10 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { getImagePath } from '../utils/imageHelper';

export default function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden pastel-gradient-hero pt-8 pb-16 lg:py-20 border-b border-[#F4ACB7]/20">
      
      {/* Decorative blurred pastel ambient circles */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#FFE6EC] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FAD2E1] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFF5EB] rounded-full blur-2xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-[#FFE6EC] text-[#961E42] px-4 py-1.5 rounded-full border border-[#EE7B99]/30 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#EE7B99]" />
              <span>Campus Curated • Designed for Indian College Life</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#561026] leading-[1.15]">
              Your Everyday <br className="hidden sm:inline" />
              <span className="italic font-normal bg-gradient-to-r from-[#D94B73] to-[#892B42] bg-clip-text text-transparent">
                Ethnic Style
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#5C4D4D] max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Trendy kurtis, affordable prices, effortless style. Handpicked breathable cottons, floral prints, and chic short kurtis for your daily jeans from just <strong className="font-semibold text-[#892B42]">₹299 to ₹499</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#561026] hover:bg-[#751734] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 text-base tracking-wide"
              >
                <span>Shop Kurtis</span>
                <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
              </button>

              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/80 hover:bg-white text-[#561026] font-medium rounded-full border border-[#F4ACB7] shadow-sm hover:shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2"
              >
                <span>Explore Under ₹399</span>
                <span className="w-2 h-2 rounded-full bg-[#D94B73]"></span>
              </button>
            </div>

            {/* Value Props Row */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left border-t border-[#F4ACB7]/30">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
                  <span className="text-xs font-bold">₹</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#561026]">Student Budget</div>
                  <div className="text-[11px] text-[#7A6B6B]">Always ₹299 - ₹499</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#561026]">Fast Dispatch</div>
                  <div className="text-[11px] text-[#7A6B6B]">Direct Hub Ships</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#561026]">7-Day Size Swap</div>
                  <div className="text-[11px] text-[#7A6B6B]">Hassle-free exchange</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Boutique Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src={getImagePath('/images/hero.jpg')}
                  alt="Young Indian college girl wearing stylish floral kurti on campus"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#F4ACB7]/30 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D94B73] block">
                      Campus Look of the Week
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#561026]">
                      Gulabi Bahaar Floral Kurti
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-extrabold text-[#961E42]">₹399</span>
                      <span className="text-[#A09393] line-through">₹899</span>
                      <span className="text-[#2B9348] font-bold text-[11px]">56% OFF</span>
                    </div>
                  </div>

                  <button
                    onClick={onShopClick}
                    className="px-3.5 py-2 bg-[#561026] hover:bg-[#751734] text-white text-xs font-medium rounded-full shadow-sm"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Floating Top Badge 1: College Pocket Friendly */}
              <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#EE7B99]/30 flex items-center gap-2.5 animate-soft-pulse">
                <span className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-sm">
                  📚
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[#561026]">College Pocket-Friendly</div>
                  <div className="text-[10px] text-[#961E42]">Budget ₹300 - ₹500</div>
                </div>
              </div>

              {/* Floating Badge 2: 100% Pure Cotton */}
              <div className="absolute top-1/3 -right-3 sm:-right-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#EE7B99]/30 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#D8F3DC] text-[#2B9348] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[#2D2626]">100% Pure Cotton</div>
                  <div className="text-[10px] text-[#6B7280]">Summer-proof comfort</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

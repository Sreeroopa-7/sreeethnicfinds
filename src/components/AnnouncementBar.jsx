import React, { useState } from 'react';
import { Sparkles, Truck, Tag, X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#FDE2E4] via-[#FAD2E1] to-[#FFE6EC] text-[#561026] text-xs md:text-sm font-medium py-2 px-4 shadow-sm relative border-b border-[#F4ACB7]/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left marquee / message */}
        <div className="flex-1 text-center flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#892B42]">
            <Sparkles className="w-3.5 h-3.5 text-[#EE7B99] animate-spin" style={{ animationDuration: '6s' }} />
            Trendy College Wear | Styles from ₹299
          </span>

          <span className="hidden sm:inline-block text-[#F4ACB7]">•</span>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#751734]">
            <Truck className="w-3.5 h-3.5 text-[#C75B7A]" />
            Free Delivery on orders above ₹499
          </span>

          <span className="hidden md:inline-block text-[#F4ACB7]">•</span>

          <span className="hidden md:inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-0.5 rounded-full text-[#961E42] border border-[#EE7B99]/30 font-semibold shadow-xs">
            <Tag className="w-3 h-3 text-[#EE7B99]" />
            Use code <span className="underline decoration-wavy decoration-[#EE7B99]">COLLEGE10</span> for 10% off
          </span>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close Announcement"
          className="text-[#961E42]/60 hover:text-[#961E42] p-1 rounded-full transition-colors ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

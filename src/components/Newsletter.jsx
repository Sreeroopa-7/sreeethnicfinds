import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('🎉 Subscribed! Your 15% discount code is CAMPUS15');
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-tr from-[#FFF0F3] via-[#FFE6EC] to-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#F4ACB7]/40 shadow-sm text-center relative overflow-hidden">
        
        {/* Background glow circle */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#FAD2E1] rounded-full blur-2xl opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EE7B99]" />
            Student Style Club
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#561026]">
            Get 15% Off Your Next Campus Kurti
          </h3>

          <p className="text-xs sm:text-sm text-[#5C4D4D] leading-relaxed">
            Join 3,500+ Indian college women receiving drop alerts on new floral kurtis under ₹399, flash festive discounts, and styling tips.
          </p>

          {isSubscribed ? (
            <div className="bg-white/90 p-4 rounded-2xl border border-[#2B9348]/40 text-[#1B4332] text-xs flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 text-[#2B9348]" />
              <span>
                You are in! Use code <strong className="font-mono bg-[#D8F3DC] px-2 py-0.5 rounded text-[#1B4332]">CAMPUS15</strong> at checkout.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#961E42]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your student email ID..."
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-full border border-[#F4ACB7] bg-white outline-none focus:ring-2 focus:ring-[#EE7B99]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#561026] hover:bg-[#751734] text-white text-xs font-semibold rounded-full shadow-md transition-all flex-shrink-0"
              >
                Join Style Club
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#7A6B6B]">
            No spam ever. Unsubscribe at any time with 1-click.
          </p>
        </div>

      </div>
    </section>
  );
}

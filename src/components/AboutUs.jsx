import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F4ACB7]/20">
      
      {/* Container */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FFF0F3] to-[#FAF6F0] rounded-4xl p-6 sm:p-10 lg:p-14 border border-[#F4ACB7]/40 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Brand Story Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-[#FFE6EC] px-3.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#EE7B99]" />
              Our Campus Journey
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#561026] leading-tight">
              About <span className="italic font-normal text-[#D94B73]">Sree Ethnic Finds</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5C4D4D] leading-relaxed">
              <strong>Sree Ethnic Finds</strong> started with a simple belief: looking stylish for 8:30 AM college lectures shouldn't burn a hole in a student's pocket. Traditional boutique kurtis often cost ₹1,200 to ₹2,500, while mass-market fast-fashion wears out after two hostel washes.
            </p>

            <p className="text-xs sm:text-sm text-[#5C4D4D] leading-relaxed">
              We bridged this gap by handcrafting and directly curating our college-wear collection right from our boutique studio in Chalakuzhy, Medical College, Thiruvananthapuram. Every piece is personally inspected, quality-checked, and shipped directly to college dorms and homes across India — keeping prices strictly between <strong>₹299 and ₹499</strong> without compromising on 100% breathable cambric cotton.
            </p>

            {/* Value badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-white/80 p-3 rounded-2xl border border-[#F4ACB7]/30 text-center">
                <div className="font-serif text-lg font-bold text-[#561026]">₹299 - ₹499</div>
                <div className="text-[11px] text-[#7A6B6B]">Pocket-friendly always</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-[#F4ACB7]/30 text-center">
                <div className="font-serif text-lg font-bold text-[#561026]">100% Cotton</div>
                <div className="text-[11px] text-[#7A6B6B]">Cambric & Slub weaves</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-[#F4ACB7]/30 text-center">
                <div className="font-serif text-lg font-bold text-[#561026]">7-Day Swap</div>
                <div className="text-[11px] text-[#7A6B6B]">Zero-hassle exchange</div>
              </div>
            </div>
          </div>

          {/* Right Direct Contact Card Column */}
          <div className="lg:col-span-5" id="contact">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F4ACB7]/40 shadow-soft space-y-5">
              
              <div className="border-b border-[#F4ACB7]/20 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D94B73] block">
                  Student Concierge & Support
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#561026] mt-0.5">
                  Get in Touch With Us
                </h3>
                <p className="text-xs text-[#7A6B6B] mt-1">
                  Have questions about sizing, fabric care, or hostel delivery? Call or WhatsApp our student care desk anytime.
                </p>
              </div>

              {/* Direct Phone / Call Button */}
              <a
                href="tel:+917012897623"
                className="p-3.5 bg-[#FFF5F7] hover:bg-[#FFE6EC] rounded-2xl border border-[#F4ACB7]/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#561026] text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5 text-[#FFE6EC]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6B6B] uppercase font-bold block">Direct Call Support</span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#561026] group-hover:text-[#B82E56]">
                      +91 70128 97623
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#892B42] bg-white px-2.5 py-1 rounded-full border border-[#EE7B99]/30">
                  Call Now
                </span>
              </a>

              {/* WhatsApp Chat Button */}
              <a
                href="https://wa.me/917012897623?text=Hi%20Sree%20Ethnic%20Finds!%20I%20have%20an%20inquiry%20regarding%20college%20kurtis."
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-[#E8F8EE] hover:bg-[#D5F2DF] rounded-2xl border border-[#25D366]/30 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2D6A4F] uppercase font-bold block">WhatsApp Assistance</span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#1B4332]">
                      +91 70128 97623
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1B4332] bg-white px-2.5 py-1 rounded-full border border-[#25D366]/40">
                  Chat Now
                </span>
              </a>

              {/* Email & Location */}
              <div className="pt-2 space-y-2 text-xs text-[#5C4D4D] border-t border-[#F4ACB7]/20">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#EE7B99] flex-shrink-0" />
                  <span>Email: <a href="mailto:sreeroopa07122006@gmail.com" className="font-medium text-[#561026] hover:underline">sreeroopa07122006@gmail.com</a></span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#EE7B99] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Location:</strong> Chalakuzhy, Medical College, Thiruvananthapuram, Kerala, India
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

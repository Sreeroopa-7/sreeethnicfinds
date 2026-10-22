import React from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  User, 
  RotateCcw, 
  Truck,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer({ onNavigate }) {
  const { setSelectedCategory, setIsAdminOpen } = useStore();

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#F4ACB7]/40 text-[#5C4D4D] pt-14 pb-8">
      
      {/* Top 3 Assurance Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#F4ACB7]/30 shadow-xs">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#561026]">Direct Boutique Dispatch</h4>
              <p className="text-xs text-[#7A6B6B] mt-0.5">Packed and dispatched directly from Chalakuzhy, Thiruvananthapuram in 24 hours.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#561026]">7-Day Size Exchange</h4>
              <p className="text-xs text-[#7A6B6B] mt-0.5">Worried about fit? Swap for another size with zero questions asked.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE6EC] flex items-center justify-center text-[#D94B73] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#561026]">Student-First Pricing</h4>
              <p className="text-xs text-[#7A6B6B] mt-0.5">Always ₹299 - ₹499. Premium fabrics without boutique price tags.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#F4ACB7]/30">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#EE7B99] to-[#FAD2E1] flex items-center justify-center text-white text-xs font-serif shadow-xs">
                🌸
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#561026]">
                Sree <span className="font-normal italic text-[#D94B73]">Ethnic Finds</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#7A6B6B] leading-relaxed max-w-sm">
              A student-founded Indian fashion boutique bringing breezy, stylish, and comfortable college-wear kurtis to young women across campuses in India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#F4ACB7] flex items-center justify-center text-[#961E42] hover:bg-[#EE7B99] hover:text-white hover:border-[#EE7B99] transition-all shadow-xs"
                title="Follow Sree Ethnic Finds on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917012897623"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#F4ACB7] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-xs"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#F4ACB7] flex items-center justify-center text-[#E60023] hover:bg-[#E60023] hover:text-white hover:border-[#E60023] transition-all shadow-xs"
                title="View Pinterest Moodboards"
              >
                <span className="font-bold text-xs">P</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-xs text-[#892B42] hover:underline font-semibold flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#EE7B99]" />
                Boutique Profile & Store Manager
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#561026] uppercase tracking-wider">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#B82E56] transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#B82E56] transition-colors">
                  Shop All Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Floral Straight'); onNavigate('catalog'); }} className="hover:text-[#B82E56] transition-colors">
                  Floral Straight Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Short Kurti for Jeans'); onNavigate('catalog'); }} className="hover:text-[#B82E56] transition-colors">
                  Short Kurtis for Jeans
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Pastel Cotton'); onNavigate('catalog'); }} className="hover:text-[#B82E56] transition-colors">
                  Pastel Cotton Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Student Care */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#561026] uppercase tracking-wider">
              Policies & Care
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#B82E56] cursor-pointer">7-Day Size Exchange Policy</li>
              <li className="hover:text-[#B82E56] cursor-pointer">Shipping & Hub Dispatch Info</li>
              <li className="hover:text-[#B82E56] cursor-pointer">Hostel Delivery Guidelines</li>
              <li className="hover:text-[#B82E56] cursor-pointer">Privacy & Data Security</li>
              <li className="hover:text-[#B82E56] cursor-pointer">Terms & Student Ethics</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#561026] uppercase tracking-wider">
              Campus Support
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EE7B99] flex-shrink-0 mt-0.5" />
                <span>Chalakuzhy, Medical College, Thiruvananthapuram, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EE7B99] flex-shrink-0" />
                <a href="mailto:sreeroopa07122006@gmail.com" className="hover:text-[#B82E56]">sreeroopa07122006@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EE7B99] flex-shrink-0" />
                <a href="tel:+917012897623" className="hover:text-[#B82E56] font-semibold">
                  +91 70128 97623
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a href="https://wa.me/917012897623" target="_blank" rel="noreferrer" className="hover:text-[#25D366]">
                  WhatsApp: +91 70128 97623
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] bg-[#FFE6EC] text-[#961E42] px-2.5 py-1 rounded-full font-semibold">
                  Hours: 9 AM - 8 PM IST
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Prototype Transparency Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7A6B6B]">
          <div>
            © {new Date().getFullYear()} <strong>Sree Ethnic Finds</strong>. All rights reserved.
          </div>

          <div className="text-[11px] bg-white/70 px-3 py-1 rounded-full border border-[#F4ACB7]/30 text-center">
            Designed for Indian College Students • Chalakuzhy, Thiruvananthapuram, Kerala
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#EE7B99] text-[#EE7B99]" />
            <span>for ethnic fashion lovers</span>
          </div>
        </div>

      </div>

    </footer>
  );
}

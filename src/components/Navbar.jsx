import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Sparkles, 
  PhoneCall,
  Settings
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar({ onNavigate }) {
  const { 
    cartCount, 
    cartTotal, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    currentCustomer,
    openAuthModal
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navLinks = [
    { name: 'Home', target: 'hero' },
    { name: 'Shop All', target: 'catalog', category: 'All Styles' },
    { name: 'New Arrivals', target: 'catalog', filter: 'new' },
    { name: 'Best Sellers', target: 'catalog', filter: 'bestseller' },
    { name: 'About Us', target: 'about' },
    { name: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.category) {
      setSelectedCategory(link.category);
    }
    onNavigate(link.target);
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#561026] hover:bg-[#FFE6EC]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('hero')}>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#EE7B99] to-[#FAD2E1] flex items-center justify-center text-white text-xs font-serif shadow-xs">
                  🌸
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#561026]">
                  Sree <span className="font-normal italic text-[#D94B73]">Ethnic Finds</span>
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#961E42]/80 font-medium ml-7 -mt-1 hidden sm:inline-block">
                Trendy College Kurtis • ₹299 - ₹499
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="px-3.5 py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#B82E56] rounded-full hover:bg-[#FFE6EC]/50 transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart, Admin */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Bar / Icon */}
            <div className="relative">
              {isSearchActive ? (
                <div className="flex items-center bg-white border border-[#F4ACB7] rounded-full px-3 py-1.5 shadow-xs w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-[#961E42] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search floral, cotton, short..."
                    className="w-full text-xs sm:text-sm bg-transparent outline-none text-[#561026] placeholder-[#961E42]/40"
                    autoFocus
                  />
                  <button
                    onClick={() => { setIsSearchActive(false); setSearchQuery(''); }}
                    className="text-[#961E42]/60 hover:text-[#961E42] ml-1 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchActive(true)}
                  className="p-2.5 rounded-full text-[#561026] hover:bg-[#FFE6EC]/60 transition-colors"
                  aria-label="Search kurtis"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-[#561026] hover:bg-[#FFE6EC]/60 transition-colors"
              aria-label="View Wishlist"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D94B73] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#561026] hover:bg-[#751734] text-white px-3.5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FFE6EC]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#EE7B99] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#561026]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide hidden sm:inline">
                {cartCount > 0 ? `₹${cartTotal}` : 'Bag'}
              </span>
            </button>

            {/* Customer Account Button (Sign In / Sign Up / My Account) */}
            {currentCustomer ? (
              <button
                onClick={() => openAuthModal('profile')}
                className="flex items-center gap-1.5 bg-[#FFF0F4] hover:bg-[#FFE6EC] text-[#561026] px-3 py-1.5 rounded-full border border-[#F4ACB7]/50 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                title="My Account & Saved Address"
              >
                <div className="w-5 h-5 rounded-full bg-[#D94B73] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentCustomer.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {currentCustomer.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 text-[#561026] hover:bg-[#FFE6EC]/60 px-3 py-1.5 rounded-full border border-[#F4ACB7]/50 text-xs font-semibold transition-all cursor-pointer"
                title="Customer Login / Sign Up"
              >
                <User className="w-4 h-4 text-[#D94B73]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Boutique Admin Console Key Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-full text-[#961E42]/80 hover:text-[#561026] hover:bg-[#FFE6EC]/50 transition-colors"
              title="Boutique Manager (Orders & Stock)"
              aria-label="Boutique Manager"
            >
              <Settings className="w-4 h-4 text-[#961E42]" />
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F4ACB7]/30 bg-[#FFFDF9] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left px-4 py-2.5 text-base font-medium text-[#4A3E3D] hover:text-[#B82E56] hover:bg-[#FFE6EC]/50 rounded-xl transition-colors"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-3 border-t border-[#F4ACB7]/20 flex flex-col gap-2 px-2">
              {currentCustomer ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); openAuthModal('profile'); }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FFE6EC]/60 text-xs font-semibold text-[#561026]"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D94B73]" />
                    My Account ({currentCustomer.name})
                  </span>
                  <span className="text-[10px] text-[#2B9348] font-bold">Saved Address</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); openAuthModal('login'); }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FFE6EC]/60 text-xs font-semibold text-[#561026]"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D94B73]" />
                    Customer Sign In / Sign Up
                  </span>
                  <span className="text-[10px] text-[#892B42] font-bold">Save Address</span>
                </button>
              )}
              
              <div className="flex justify-between items-center px-1 pt-1">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsAdminOpen(true); }}
                  className="text-[11px] text-[#892B42] hover:underline font-medium flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Boutique Store Manager
                </button>
                <span className="text-[10px] text-[#961E42]/70">Support: WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

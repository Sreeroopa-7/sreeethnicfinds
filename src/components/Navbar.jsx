import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Sparkles,
  PhoneCall
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
    setSelectedCategory
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

            {/* Profile / Boutique Manager Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-full text-[#961E42] hover:text-[#561026] hover:bg-[#FFE6EC]/60 transition-colors flex items-center gap-1.5 text-xs font-semibold border border-[#F4ACB7]/40 relative"
              title="Boutique Profile & Store Manager"
              aria-label="Profile"
            >
              <div className="relative flex items-center justify-center">
                <User className="w-4 h-4 text-[#D94B73]" />
                {isAdminLoggedIn && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>
              <span className="hidden md:inline">Profile</span>
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
            <div className="pt-3 border-t border-[#F4ACB7]/20 flex justify-between items-center px-4">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsAdminOpen(true); }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#892B42] bg-[#FFE6EC] px-3.5 py-1.5 rounded-full"
              >
                <User className="w-4 h-4 text-[#D94B73]" />
                Profile
              </button>
              <span className="text-[11px] text-[#961E42]/70">Support: WhatsApp Ready</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

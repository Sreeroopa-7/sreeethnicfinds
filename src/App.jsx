import React from 'react';
import { StoreProvider } from './context/StoreContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import PromoBanner from './components/PromoBanner';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import SizeGuideModal from './components/SizeGuideModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import Toast from './components/Toast';

function MainApp() {
  const scrollToSection = (targetId) => {
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === 'catalog') {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'about') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else if (targetId === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2D2626]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onShopClick={() => scrollToSection('catalog')} />

        {/* Product Catalog with Categories, Filters, Search, Sort */}
        <ProductCatalog />

        {/* Promotional Banner: "Your College Wardrobe, Reimagined" */}
        <PromoBanner onExplore={() => scrollToSection('catalog')} />

        {/* Verified Student Reviews (Clearly marked prototype content) */}
        <Testimonials />

        {/* About Us & Campus Contact Section */}
        <AboutUs />

        {/* Student Style Club Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Elements & Drawers */}
      <WhatsAppFloatingButton />
      <ProductModal />
      <SizeGuideModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <AdminDashboard />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

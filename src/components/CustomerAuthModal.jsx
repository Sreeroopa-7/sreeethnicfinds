import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Package, 
  LogOut, 
  Edit3, 
  ShieldCheck,
  Building,
  Home
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const INDIAN_STATES = [
  "Kerala", "Delhi", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function CustomerAuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    currentCustomer,
    customerLogin,
    customerSignup,
    customerLogout,
    updateCustomerProfile,
    orders
  } = useStore();

  const [activeTab, setActiveTab] = useState(authModalTab || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  });

  // Signup form state (including phone and delivery address)
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    pincode: '695011'
  });

  // Profile Edit state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileAddressData, setProfileAddressData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (authModalTab) {
      setActiveTab(authModalTab);
    }
  }, [authModalTab]);

  useEffect(() => {
    if (currentCustomer) {
      setProfileAddressData({
        name: currentCustomer.name || '',
        phone: currentCustomer.phone || '',
        address: currentCustomer.address || '',
        city: currentCustomer.city || '',
        state: currentCustomer.state || 'Kerala',
        pincode: currentCustomer.pincode || ''
      });
    }
  }, [currentCustomer]);

  if (!isAuthModalOpen) return null;

  // Validate Login
  const validateLogin = () => {
    const errs = {};
    if (!loginData.identifier.trim()) errs.identifier = 'Enter your mobile number or email';
    if (!loginData.password) errs.password = 'Enter your password';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Signup
  const validateSignup = () => {
    const errs = {};
    if (!signupData.name.trim()) errs.name = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(signupData.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!signupData.email.trim() || !/\S+@\S+\.\S+/.test(signupData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!signupData.password || signupData.password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }
    if (!signupData.address.trim()) errs.address = 'Street/hostel/apartment address is required';
    if (!signupData.city.trim()) errs.city = 'City is required';
    if (!/^\d{6}$/.test(signupData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit postal code';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsSubmitting(true);
    await customerLogin(loginData.identifier, loginData.password);
    setIsSubmitting(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsSubmitting(true);
    await customerSignup(signupData);
    setIsSubmitting(false);
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    await customerLogin('9876543210', 'password123');
    setIsSubmitting(false);
  };

  const handleSaveProfileAddress = async (e) => {
    e.preventDefault();
    if (!profileAddressData.address.trim() || !profileAddressData.city.trim() || !/^\d{6}$/.test(profileAddressData.pincode)) {
      return;
    }
    setIsSubmitting(true);
    await updateCustomerProfile(profileAddressData);
    setIsSubmitting(false);
    setIsEditingAddress(false);
  };

  // Filter orders matching current customer
  const customerOrders = currentCustomer
    ? orders.filter(o => 
        o.customer?.phone === currentCustomer.phone || 
        o.customer?.email?.toLowerCase() === currentCustomer.email?.toLowerCase()
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-[#F4ACB7]/40 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN VIEW: MY ACCOUNT & SAVED ADDRESS */}
        {currentCustomer ? (
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header Badge */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#F4ACB7]/30">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#D94B73] to-[#EE7B99] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
                {currentCustomer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#561026]">
                    {currentCustomer.name}
                  </h3>
                  <span className="text-[10px] bg-[#D8F3DC] text-[#2B9348] font-bold px-2 py-0.5 rounded-full">
                    Member
                  </span>
                </div>
                <div className="text-xs text-[#7A6B6B] flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                  <span>📱 +91 {currentCustomer.phone}</span>
                  <span>✉️ {currentCustomer.email}</span>
                </div>
              </div>
              <button
                onClick={customerLogout}
                className="p-2 text-[#892B42] hover:bg-[#FFE6EC] rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            {/* Saved Delivery Address Card */}
            <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#F4ACB7]/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EE7B99]" />
                  Saved Delivery Address (Auto-fills at Checkout)
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs text-[#D94B73] hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  {isEditingAddress ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingAddress ? (
                <form onSubmit={handleSaveProfileAddress} className="space-y-2.5 pt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-0.5">Full Address / Hostel / Room</label>
                    <input
                      type="text"
                      value={profileAddressData.address}
                      onChange={(e) => setProfileAddressData({ ...profileAddressData, address: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-0.5">City</label>
                      <input
                        type="text"
                        value={profileAddressData.city}
                        onChange={(e) => setProfileAddressData({ ...profileAddressData, city: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#F4ACB7] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-0.5">State</label>
                      <select
                        value={profileAddressData.state}
                        onChange={(e) => setProfileAddressData({ ...profileAddressData, state: e.target.value })}
                        className="w-full px-2 py-1.5 text-xs rounded-xl border border-[#F4ACB7] bg-white outline-none"
                      >
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-0.5">Pincode</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={profileAddressData.pincode}
                        onChange={(e) => setProfileAddressData({ ...profileAddressData, pincode: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#F4ACB7] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-1 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-1.5 bg-[#561026] text-white text-xs font-semibold rounded-full hover:bg-[#751734] transition-colors shadow-sm"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-xs text-[#5C4D4D] bg-white p-3 rounded-xl border border-[#F4ACB7]/20 space-y-0.5">
                  <div className="font-semibold text-[#2D2626]">{currentCustomer.address}</div>
                  <div>{currentCustomer.city}, {currentCustomer.state} - {currentCustomer.pincode}</div>
                  <div className="text-[11px] text-[#7A6B6B] pt-1">Phone: +91 {currentCustomer.phone}</div>
                </div>
              )}
            </div>

            {/* My Past Orders Section */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#EE7B99]" />
                My Order History ({customerOrders.length})
              </h4>

              {customerOrders.length === 0 ? (
                <div className="p-4 text-center bg-[#FFFDF9] rounded-2xl border border-dashed border-[#F4ACB7]/50 text-xs text-[#7A6B6B]">
                  No orders placed yet with your phone number. Explore our kurtis collection to place your first order!
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {customerOrders.map((ord, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-[#F4ACB7]/30 text-xs flex justify-between items-center hover:shadow-xs transition-all">
                      <div>
                        <div className="font-bold text-[#561026] flex items-center gap-2">
                          <span>#{ord.orderId}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFE6EC] text-[#892B42]">
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#7A6B6B] mt-0.5">
                          {ord.items?.length || 1} item(s) • Total: ₹{ord.totalAmount}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#2B9348] font-semibold block">Online Transfer</span>
                        <span className="text-[10px] text-[#7A6B6B]">{new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-[#892B42] bg-[#FFE6EC]/40 p-3 rounded-2xl border border-[#EE7B99]/30">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2B9348]" />
                Your address will auto-fill next time you checkout!
              </span>
              <button
                onClick={closeAuthModal}
                className="font-bold underline hover:text-[#561026]"
              >
                Shop Now
              </button>
            </div>
          </div>
        ) : (
          /* NOT LOGGED IN VIEW: LOGIN & SIGNUP TABS */
          <div className="space-y-5">
            
            {/* Header */}
            <div className="text-center space-y-1">
              <span className="w-10 h-10 rounded-2xl bg-[#FFE6EC] text-[#D94B73] flex items-center justify-center mx-auto shadow-xs text-lg">
                🌸
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#561026]">
                {activeTab === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
              </h2>
              <p className="text-xs text-[#7A6B6B]">
                {activeTab === 'login' 
                  ? 'Sign in to access your saved address and rapid checkout.'
                  : 'Register your mobile number and address for instant ordering.'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-[#FFF0F4] p-1 rounded-2xl border border-[#F4ACB7]/30">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setErrors({}); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-white text-[#561026] shadow-xs'
                    : 'text-[#892B42] hover:text-[#561026]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setErrors({}); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white text-[#561026] shadow-xs'
                    : 'text-[#892B42] hover:text-[#561026]'
                }`}
              >
                Sign Up (New Customer)
              </button>
            </div>

            {/* TAB 1: LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in duration-200">
                
                <div>
                  <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                    Mobile Number or Email *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#961E42]/60 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={loginData.identifier}
                      onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                      placeholder="e.g. 9876543210 or yourname@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                  </div>
                  {errors.identifier && <p className="text-[10px] text-red-500 mt-0.5">{errors.identifier}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#961E42]/60 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#961E42]/60 hover:text-[#561026]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#561026] hover:bg-[#751734] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <span>Signing In...</span> : (
                    <>
                      <span>Sign In to My Account</span>
                      <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
                    </>
                  )}
                </button>

                {/* Quick Demo Login Option */}
                <div className="pt-2 border-t border-[#F4ACB7]/20 text-center">
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="text-[11px] font-semibold text-[#D94B73] hover:text-[#561026] bg-[#FFE6EC]/60 px-3.5 py-1.5 rounded-full border border-[#EE7B99]/30 transition-colors"
                  >
                    ⚡ One-Click Demo Login (Sneha Mukherjee)
                  </button>
                  <p className="text-[10px] text-[#7A6B6B] mt-1">
                    Don't have an account? <button type="button" onClick={() => setActiveTab('signup')} className="font-bold text-[#892B42] underline">Sign Up here</button>
                  </p>
                </div>

              </form>
            )}

            {/* TAB 2: SIGN UP FORM WITH NUMBER & ADDRESS */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5 animate-in fade-in duration-200">
                
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#961E42]/60 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        placeholder="e.g. Ananya Nair"
                        className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Mobile Number (10 Digits) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs font-bold text-[#7A6B6B]">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-2.5 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#961E42]/60 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="ananya@gmail.com"
                        className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-[#961E42]/60 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        placeholder="At least 4 characters"
                        className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2 text-[#961E42]/60 hover:text-[#561026]"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
                  </div>
                </div>

                {/* Delivery Address Section */}
                <div className="p-3.5 bg-[#FFFDF9] rounded-2xl border border-[#F4ACB7]/40 space-y-2.5 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#561026] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#EE7B99]" />
                    Delivery Address (Auto-filled for Orders)
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Street / Flat / Hostel / Campus Address *
                    </label>
                    <input
                      type="text"
                      value={signupData.address}
                      onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                      placeholder="e.g. Room 14, Ladies Hostel, Medical College"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">City *</label>
                      <input
                        type="text"
                        value={signupData.city}
                        onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                        placeholder="Thiruvananthapuram"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                      {errors.city && <p className="text-[10px] text-red-500 mt-0.5">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">State *</label>
                      <select
                        value={signupData.state}
                        onChange={(e) => setSignupData({ ...signupData, state: e.target.value })}
                        className="w-full px-2 py-1.5 text-xs rounded-xl border border-[#F4ACB7] bg-white outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      >
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">Pincode (6 Digits) *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={signupData.pincode}
                        onChange={(e) => setSignupData({ ...signupData, pincode: e.target.value.replace(/\D/g, '') })}
                        placeholder="695011"
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                      {errors.pincode && <p className="text-[10px] text-red-500 mt-0.5">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#561026] hover:bg-[#751734] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <span>Creating Account...</span> : (
                    <>
                      <span>Complete Sign Up & Save Address</span>
                      <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#7A6B6B]">
                  Already have an account? <button type="button" onClick={() => setActiveTab('login')} className="font-bold text-[#892B42] underline">Sign In here</button>
                </p>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

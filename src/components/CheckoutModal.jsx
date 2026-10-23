import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Smartphone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

export default function CheckoutModal() {
  const { 
    cart, 
    cartSubtotal, 
    deliveryFee, 
    cartTotal, 
    appliedCoupon,
    isCheckoutOpen, 
    setIsCheckoutOpen,
    placeOrder,
    lastPlacedOrder,
    setLastPlacedOrder,
    currentCustomer,
    openAuthModal
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Kerala',
    pincode: '',
    deliveryNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Online Money Transfer (+91 70128 97623)');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill customer address and phone if logged in
  useEffect(() => {
    if (currentCustomer && isCheckoutOpen) {
      setFormData(prev => ({
        ...prev,
        name: currentCustomer.name || prev.name,
        phone: currentCustomer.phone || prev.phone,
        email: currentCustomer.email || prev.email,
        address: currentCustomer.address || prev.address,
        city: currentCustomer.city || prev.city,
        state: currentCustomer.state || prev.state || 'Kerala',
        pincode: currentCustomer.pincode || prev.pincode
      }));
    }
  }, [currentCustomer, isCheckoutOpen]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('7012897623');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.address.trim()) errs.address = 'Hostel / room / street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit postal code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl border border-[#F4ACB7]/40 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setLastPlacedOrder(null);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* View Mode: Confirmation vs Form */}
        {lastPlacedOrder ? (
          /* Order Confirmation Screen */
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-[#D8F3DC] text-[#2B9348] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#2B9348] bg-[#D8F3DC] px-3 py-1 rounded-full">
                Order Confirmed
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#561026] mt-2">
                Thank You, {lastPlacedOrder.customer.name}!
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B6B] mt-1 max-w-md mx-auto">
                Your order <strong className="text-[#892B42] font-mono">#{lastPlacedOrder.orderId}</strong> has been received and is being prepared for dispatch from our Chalakuzhy boutique.
              </p>
            </div>

            {/* Prototype Disclaimer */}
            <div className="p-3 bg-[#FFE6EC]/60 border border-[#EE7B99]/30 rounded-2xl text-xs text-[#892B42] max-w-lg mx-auto">
              🌸 <strong>Order Confirmed:</strong> Your order has been placed successfully and logged in your store orders console for shipping.
            </div>

            {/* Order Details Receipt Box */}
            <div className="p-4 sm:p-5 bg-[#FFFDF9] rounded-2xl border border-[#F4ACB7]/30 text-left space-y-4 max-w-lg mx-auto text-xs">
              <div className="flex justify-between items-center border-b border-[#F4ACB7]/20 pb-2">
                <div>
                  <span className="text-[11px] text-[#7A6B6B]">Order Date</span>
                  <div className="font-semibold text-[#2D2626]">{new Date(lastPlacedOrder.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#7A6B6B]">Payment Mode</span>
                  <div className="font-semibold text-[#892B42]">{lastPlacedOrder.paymentMethod}</div>
                </div>
              </div>

              {/* Items summary */}
              <div>
                <span className="text-[11px] font-bold text-[#561026] uppercase tracking-wider block mb-2">
                  Items Ordered:
                </span>
                <div className="space-y-2">
                  {lastPlacedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={it.image} alt="" className="w-10 h-12 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-[#2D2626]">{it.name}</div>
                          <div className="text-[10px] text-[#7A6B6B]">Size: {it.size} • Color: {it.color} • Qty: {it.quantity}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#561026]">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t border-[#F4ACB7]/20 pt-2">
                <span className="text-[11px] font-bold text-[#561026] block">Delivering To:</span>
                <div className="text-[#5C4D4D] text-[11px] mt-0.5">
                  {lastPlacedOrder.customer.address}, {lastPlacedOrder.customer.city}, {lastPlacedOrder.customer.state} - {lastPlacedOrder.customer.pincode}
                </div>
                <div className="text-[#7A6B6B] text-[10px] mt-0.5">
                  Phone: +91 {lastPlacedOrder.customer.phone} • Email: {lastPlacedOrder.customer.email}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[#F4ACB7]/20 pt-2 flex justify-between font-bold text-sm text-[#561026]">
                <span>Total Amount</span>
                <span>₹{lastPlacedOrder.totalAmount}</span>
              </div>
            </div>

            {/* Online Money Transfer Instructions */}
            <div className="max-w-lg mx-auto text-left bg-[#FFE6EC]/60 border border-[#EE7B99]/40 p-4 sm:p-5 rounded-2xl text-xs space-y-3 text-[#561026]">
              <div className="font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-[#892B42]">
                  <Smartphone className="w-4 h-4 text-[#D94B73]" />
                  Online Money Transfer Details
                </span>
                <span className="text-[10px] font-bold bg-[#D94B73] text-white px-2 py-0.5 rounded-full">
                  No COD
                </span>
              </div>
              <p className="text-xs text-[#5C4D4D]">
                Please complete your transfer of <strong className="text-[#892B42] font-bold text-sm">₹{lastPlacedOrder.totalAmount}</strong> to our boutique number via Google Pay, PhonePe, or Paytm:
              </p>
              <div className="p-3 bg-white/95 rounded-xl border border-[#F4ACB7]/50 flex items-center justify-between">
                <div>
                  <span className="text-[#7A6B6B] block text-[10px]">GPay / PhonePe / Paytm Number:</span>
                  <span className="font-mono font-bold text-sm text-[#892B42]">+91 70128 97623</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 bg-[#FFF0F4] hover:bg-[#FFE6EC] text-[#892B42] text-[11px] font-semibold rounded-lg border border-[#F4ACB7]/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPhone ? 'Copied!' : 'Copy Number'}
                </button>
              </div>
              <div className="text-[11px] text-[#7A6B6B] bg-white/60 p-2.5 rounded-xl border border-[#F4ACB7]/30 space-y-1">
                <p className="font-semibold text-[#561026]">💬 We will ask and confirm in WhatsApp DM:</p>
                <p>Our team will message you directly in WhatsApp DM at <strong>+91 {lastPlacedOrder.customer.phone}</strong> to confirm your payment receipt and prepare instant courier dispatch!</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/917012897623?text=${encodeURIComponent(
                  `Hello Sree Ethnic Finds! I just placed an order:\n\nOrder ID: #${lastPlacedOrder.orderId}\nCustomer: ${lastPlacedOrder.customer.name}\nPhone: ${lastPlacedOrder.customer.phone}\nTotal Amount: ₹${lastPlacedOrder.totalAmount}\nPayment Method: Online Transfer to +91 70128 97623\n\nI am contacting you to complete my online payment in DM!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Message Us in WhatsApp DM to Pay
              </a>

              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-white border border-[#F4ACB7] hover:bg-[#FFE6EC]/40 text-[#561026] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#EE7B99]" />
                Print Receipt
              </button>

              <button
                onClick={() => {
                  setLastPlacedOrder(null);
                  setIsCheckoutOpen(false);
                }}
                className="px-6 py-2.5 bg-[#561026] hover:bg-[#751734] text-white text-xs font-semibold rounded-full shadow-md transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        ) : (
          /* Checkout Form */
          <div>
            
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-[#FFE6EC] px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#EE7B99]" />
                Student-Friendly Checkout
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#561026]">
                Delivery Details
              </h2>
              <p className="text-xs text-[#7A6B6B]">
                Enter your hostel or residential address for direct courier delivery
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Customer Account Auto-Fill Banner */}
              {currentCustomer ? (
                <div className="p-3 bg-[#D8F3DC]/70 border border-[#2B9348]/40 rounded-2xl flex items-center justify-between text-xs text-[#1B4332]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2B9348] shrink-0" />
                    <span>Logged in as <strong>{currentCustomer.name}</strong> • Saved address auto-filled</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal('profile')}
                    className="text-[11px] font-bold text-[#1B4332] underline hover:text-black cursor-pointer"
                  >
                    Edit Address
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-[#FFE6EC]/60 border border-[#EE7B99]/40 rounded-2xl flex items-center justify-between text-xs text-[#892B42]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D94B73] shrink-0" />
                    <span>Have an account? Log in to auto-fill your saved address & phone number.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="px-3 py-1 bg-white border border-[#EE7B99]/50 rounded-full font-bold text-xs hover:bg-[#FFF0F4] text-[#561026] shadow-2xs cursor-pointer shrink-0"
                  >
                    Sign In
                  </button>
                </div>
              )}
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#EE7B99]" />
                  1. Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 bg-[#FFF5F7] border border-r-0 border-[#F4ACB7] rounded-l-xl text-xs font-semibold text-[#892B42]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9876543210"
                        className="flex-1 px-3 py-2.5 text-xs rounded-r-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Email Address (For order invoice) *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya.sharma@college.edu.in"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2 border-t border-[#F4ACB7]/30">
                <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EE7B99]" />
                  2. Shipping Address
                </h4>

                <div>
                  <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                    Flat / House No. / Hostel Room & College Campus *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Room 204, Kaveri Hostel, North Campus, DU"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                  />
                  {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="New Delhi"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    {errors.city && <p className="text-[10px] text-red-500 mt-0.5">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99] bg-white"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                      Pincode (6 Digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="110007"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                    />
                    {errors.pincode && <p className="text-[10px] text-red-500 mt-0.5">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#5C4D4D] block mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    placeholder="e.g. Call before delivery, or leave at college gate security"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] outline-none focus:ring-1 focus:ring-[#EE7B99]"
                  />
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div className="space-y-3 pt-2 border-t border-[#F4ACB7]/30">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EE7B99]" />
                    3. Payment Method (Online Transfer Only)
                  </h4>
                  <span className="text-[10px] font-bold text-[#D94B73] bg-[#FFE6EC] px-2.5 py-0.5 rounded-full border border-[#F4ACB7]/50">
                    No Cash on Delivery
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-[#D94B73] bg-[#FFE6EC]/40 ring-1 ring-[#EE7B99] space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online Money Transfer (+91 70128 97623)"
                      checked={true}
                      readOnly
                      className="accent-[#D94B73] mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#561026] flex items-center gap-2">
                        <span>Online Money Transfer to Mobile Number</span>
                        <span className="text-[10px] bg-[#2B9348] text-white px-2 py-0.5 rounded-full font-semibold">GPay • PhonePe • Paytm</span>
                      </div>
                      <div className="text-[11px] text-[#7A6B6B] mt-0.5">
                        Direct transfer to our boutique number: <strong className="text-[#892B42] font-mono font-bold text-xs">+91 70128 97623</strong>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Details Card */}
                  <div className="p-3 bg-white/95 rounded-xl border border-[#F4ACB7]/40 text-xs space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-[#7A6B6B] block text-[10px]">Payment Receiver Number:</span>
                        <span className="font-mono font-bold text-sm text-[#561026]">+91 70128 97623</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="px-3 py-1.5 bg-[#FFF0F4] hover:bg-[#FFE6EC] text-[#892B42] text-[11px] font-semibold rounded-lg border border-[#F4ACB7]/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedPhone ? 'Copied Number!' : 'Copy Number'}
                      </button>
                    </div>

                    <div className="text-[11px] text-[#5C4D4D] pt-2 border-t border-[#F4ACB7]/20 space-y-1">
                      <p className="font-semibold text-[#892B42]">
                        💬 Note: We will ask you and confirm payment directly in WhatsApp DM!
                      </p>
                      <p className="text-[10px] text-[#7A6B6B]">
                        No Cash on Delivery. Once you place the order, our team connects with you directly in DM (+91 70128 97623) to confirm payment and prepare your pure cotton kurti for dispatch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#F4ACB7]/30 space-y-2 text-xs">
                <div className="font-bold text-[#561026] text-xs uppercase tracking-wider mb-2">
                  Order Summary:
                </div>
                <div className="flex justify-between text-[#5C4D4D]">
                  <span>Items Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-[#2D2626]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-[#5C4D4D]">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-[#2D2626]">
                    {deliveryFee === 0 ? <strong className="text-[#2B9348]">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#2B9348] font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>- ₹{appliedCoupon.type === 'percentage' ? Math.round((cartSubtotal * appliedCoupon.value) / 100) : appliedCoupon.value}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-[#561026] pt-2 border-t border-[#F4ACB7]/30">
                  <span>Payable Amount</span>
                  <span className="font-serif">₹{cartTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#561026] hover:bg-[#751734] disabled:opacity-50 text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <span>Submitting Order...</span>
                ) : (
                  <>
                    <span>Place Order & Pay Online • ₹{cartTotal}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>

    </div>
  );
}

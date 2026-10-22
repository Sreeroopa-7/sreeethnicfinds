import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Package, 
  Truck, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Upload,
  Image as ImageIcon,
  DollarSign,
  ArrowRight,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  Phone,
  FileText,
  Clock,
  User,
  UserCheck,
  MapPin,
  Mail,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export default function AdminDashboard() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin,
    orders,
    shipOrder,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    publishManualOrder
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('publish-kurti'); // 'publish-kurti' | 'publish-order' | 'orders' | 'catalog' | 'analytics' | 'profile'
  
  // State for Publishing Kurti
  const [kurtiForm, setKurtiForm] = useState({
    name: '',
    subtitle: '',
    category: 'Floral Straight',
    price: 399,
    originalPrice: 899,
    fabric: '100% Pure Cambric Cotton',
    length: 'Calf Length (42 inches)',
    sleeves: '3/4th Sleeves',
    neckline: 'V-Notch Round Neck',
    fit: 'Regular Straight Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Pastel Pink', hex: '#FAD2E1', inStock: true }],
    images: ['/images/floral_straight.jpg'],
    stockCount: 20
  });

  const [imagePreview, setImagePreview] = useState('/images/floral_straight.jpg');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // State for Publishing Manual Order (WhatsApp / Phone)
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    customerCity: 'Thiruvananthapuram',
    customerState: 'Kerala',
    customerPincode: '695011',
    selectedProductId: products[0]?.id || 'sef-001',
    selectedSize: 'M',
    selectedColor: 'Standard',
    quantity: 1,
    unitPrice: products[0]?.price || 399,
    paymentMethod: 'Cash on Delivery (COD) [Direct Order]',
    deliveryNotes: 'Order received via WhatsApp (+91 70128 97623)'
  });

  // State for Tracking Modal
  const [selectedOrderIdForTracking, setSelectedOrderIdForTracking] = useState(null);
  const [courierName, setCourierName] = useState('India Post Speed Post');
  const [trackingAwb, setTrackingAwb] = useState('');

  // Editing Kurti
  const [editingProductId, setEditingProductId] = useState(null);

  if (!isAdminOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Please enter your password');
      return;
    }
    const success = loginAdmin(passwordInput.trim());
    if (success) {
      setPasswordInput('');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // Image File Upload Handler
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setKurtiForm(prev => ({ ...prev, images: [reader.result, ...prev.images] }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle Size in Kurti Form
  const toggleSize = (size) => {
    setKurtiForm(prev => {
      const exists = prev.sizes.includes(size);
      const updatedSizes = exists 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: updatedSizes };
    });
  };

  // Submit Kurti Form
  const handlePublishKurti = (e) => {
    e.preventDefault();
    if (!kurtiForm.name.trim() || !kurtiForm.price) {
      return;
    }

    const discountPercent = Math.round(((kurtiForm.originalPrice - kurtiForm.price) / kurtiForm.originalPrice) * 100);

    const payload = {
      ...kurtiForm,
      discount: `${discountPercent}% OFF`,
      images: [imagePreview, ...kurtiForm.images.filter(img => img !== imagePreview)]
    };

    if (editingProductId) {
      updateProduct({ ...payload, id: editingProductId });
      setEditingProductId(null);
    } else {
      addProduct(payload);
    }

    // Reset form
    setKurtiForm({
      name: '',
      subtitle: '',
      category: 'Floral Straight',
      price: 399,
      originalPrice: 899,
      fabric: '100% Pure Cambric Cotton',
      length: 'Calf Length (42 inches)',
      sleeves: '3/4th Sleeves',
      neckline: 'V-Notch Round Neck',
      fit: 'Regular Straight Fit',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Pastel Pink', hex: '#FAD2E1', inStock: true }],
      images: ['/images/floral_straight.jpg'],
      stockCount: 20
    });
    setImagePreview('/images/floral_straight.jpg');
    setActiveTab('catalog');
  };

  // Submit Manual Order
  const handlePublishOrder = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === orderForm.selectedProductId) || products[0];
    const totalAmount = orderForm.unitPrice * orderForm.quantity;

    const newOrderPayload = {
      customer: {
        name: orderForm.customerName,
        phone: orderForm.customerPhone,
        email: orderForm.customerEmail || 'direct.customer@sreeethnicfinds.in',
        address: orderForm.customerAddress,
        city: orderForm.customerCity,
        state: orderForm.customerState,
        pincode: orderForm.customerPincode
      },
      items: [
        {
          id: product.id,
          name: product.name,
          size: orderForm.selectedSize,
          color: orderForm.selectedColor || product.colors[0]?.name || 'Standard',
          price: orderForm.unitPrice,
          quantity: parseInt(orderForm.quantity),
          image: product.images[0]
        }
      ],
      totalAmount,
      paymentMethod: orderForm.paymentMethod,
      status: 'Confirmed',
      notes: orderForm.deliveryNotes
    };

    publishManualOrder(newOrderPayload);

    // Reset order form
    setOrderForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      customerCity: 'Thiruvananthapuram',
      customerState: 'Kerala',
      customerPincode: '695011',
      selectedProductId: products[0]?.id || 'sef-001',
      selectedSize: 'M',
      selectedColor: 'Standard',
      quantity: 1,
      unitPrice: products[0]?.price || 399,
      paymentMethod: 'Cash on Delivery (COD) [Direct Order]',
      deliveryNotes: 'Order received via WhatsApp (+91 70128 97623)'
    });

    setActiveTab('orders');
  };

  // Start Edit Kurti
  const startEditKurti = (p) => {
    setEditingProductId(p.id);
    setKurtiForm({ ...p });
    setImagePreview(p.images[0]);
    setActiveTab('publish-kurti');
  };

  // Calculations for Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Cancelled').length;
  const averageOrderValue = activeOrdersCount > 0 ? Math.round(totalRevenue / activeOrdersCount) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-in fade-in duration-200">
      
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-5xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl border border-[#F4ACB7]/40 max-h-[94vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F4ACB7]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#561026] to-[#892B42] text-white flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-[#FFE6EC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#561026]">
                  Boutique Profile & Store Manager
                </h2>
                <span className="text-[10px] bg-[#FFE6EC] text-[#892B42] font-semibold px-2 py-0.5 rounded-full">
                  Chalakuzhy, Trivandrum
                </span>
              </div>
              <p className="text-xs text-[#7A6B6B]">
                Publish photos, manage prices, sizes, and log customer orders directly to your website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#892B42] hover:bg-[#FFE6EC] flex items-center gap-1.5 transition-colors border border-[#EE7B99]/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
              aria-label="Close Profile Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentication Gate */}
        {!isAdminLoggedIn ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFE6EC] to-[#FAD2E1] text-[#892B42] flex items-center justify-center mx-auto shadow-soft border-2 border-white">
              <User className="w-8 h-8 text-[#892B42]" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#561026]">Boutique Profile Login</h3>
              <p className="text-xs text-[#7A6B6B] mt-1.5 leading-relaxed">
                Sign in to manage your boutique, publish new kurti arrivals, record direct customer orders, and view sales.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 text-xs sm:text-sm rounded-xl border border-[#F4ACB7] outline-none focus:ring-2 focus:ring-[#EE7B99] bg-white text-center tracking-wider"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6B6B] hover:text-[#561026] p-1 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-medium animate-in fade-in">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#561026] hover:bg-[#751734] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Sign In to Profile
              </button>
            </form>

            <div className="pt-2 text-[11px] text-[#7A6B6B] flex items-center justify-center gap-1.5">
              <span>🔒</span>
              <span>Protected Boutique Administration • Sree Ethnic Finds</span>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="py-4 space-y-6 flex-1">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#F4ACB7]/30 pb-2 overflow-x-auto">
              {[
                { id: 'publish-kurti', label: editingProductId ? '✏️ Edit Kurti' : '📸 Publish New Kurti', icon: Plus },
                { id: 'publish-order', label: '📝 Publish / Record Order', icon: FileText },
                { id: 'orders', label: `📦 Orders & Shipping (${orders.length})`, icon: Truck },
                { id: 'catalog', label: `🛍️ Live Catalog (${products.length})`, icon: Package },
                { id: 'analytics', label: '📊 Sales & Revenue', icon: TrendingUp },
                { id: 'profile', label: '👤 Boutique Profile', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id !== 'publish-kurti') setEditingProductId(null);
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#561026] text-white shadow-sm'
                        : 'text-[#7A6B6B] hover:text-[#561026] hover:bg-[#FFE6EC]/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: PUBLISH NEW KURTI (PHOTO, SIZE, PRICE) */}
            {activeTab === 'publish-kurti' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#561026]">
                      {editingProductId ? 'Edit Kurti Style' : 'Publish New Kurti with Photo, Size & Price'}
                    </h3>
                    <p className="text-xs text-[#7A6B6B]">
                      Upload photos directly from your phone/computer, set sizes and Indian rupee pricing.
                    </p>
                  </div>
                  {editingProductId && (
                    <button
                      onClick={() => {
                        setEditingProductId(null);
                        setKurtiForm({
                          name: '',
                          subtitle: '',
                          category: 'Floral Straight',
                          price: 399,
                          originalPrice: 899,
                          fabric: '100% Pure Cambric Cotton',
                          length: 'Calf Length (42 inches)',
                          sleeves: '3/4th Sleeves',
                          neckline: 'V-Notch Round Neck',
                          fit: 'Regular Straight Fit',
                          sizes: ['S', 'M', 'L', 'XL'],
                          colors: [{ name: 'Pastel Pink', hex: '#FAD2E1', inStock: true }],
                          images: ['/images/floral_straight.jpg'],
                          stockCount: 20
                        });
                        setImagePreview('/images/floral_straight.jpg');
                      }}
                      className="text-xs text-[#892B42] underline font-semibold"
                    >
                      Clear / Create New
                    </button>
                  )}
                </div>

                <form onSubmit={handlePublishKurti} className="space-y-6">
                  
                  {/* Photo Upload & Preview Section */}
                  <div className="bg-white p-5 rounded-3xl border border-[#F4ACB7]/40 shadow-xs space-y-4">
                    <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#EE7B99]" />
                      1. Kurti Photo
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Photo Preview Box */}
                      <div className="md:col-span-4">
                        <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden bg-[#FFF5F7] border-2 border-dashed border-[#F4ACB7] shadow-sm flex items-center justify-center">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Kurti Preview"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <span className="text-xs text-[#A09393] p-4 text-center">
                              No photo selected
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                            Live Preview
                          </span>
                        </div>
                      </div>

                      {/* Photo Upload Controls */}
                      <div className="md:col-span-8 space-y-4 text-xs">
                        {/* File Upload from Device */}
                        <div>
                          <label className="font-bold text-[#561026] block mb-1.5">
                            Upload Photo from Device (Phone / Laptop):
                          </label>
                          <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-[#EE7B99]/60 bg-[#FFF5F7]/40 hover:bg-[#FFE6EC]/50 cursor-pointer transition-all">
                            <Upload className="w-6 h-6 text-[#D94B73] mb-1.5" />
                            <span className="font-semibold text-[#892B42]">Click to Browse Image File</span>
                            <span className="text-[10px] text-[#7A6B6B] mt-0.5">Supports JPG, PNG, WEBP</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Or Quick Pick from Boutique Library */}
                        <div>
                          <label className="font-bold text-[#561026] block mb-1">
                            Or Quick-Pick from Curated Studio Photos:
                          </label>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {[
                              { label: "Floral Pink", src: "/images/floral_straight.jpg" },
                              { label: "Mint Green", src: "/images/pastel_mint.jpg" },
                              { label: "Short Indigo", src: "/images/short_indigo.jpg" },
                              { label: "Beige Plaid", src: "/images/minimal_peach.jpg" },
                              { label: "Flared Lilac", src: "/images/ethnic_lavender.jpg" }
                            ].map((sample) => (
                              <button
                                key={sample.src}
                                type="button"
                                onClick={() => {
                                  setImagePreview(sample.src);
                                  setKurtiForm(prev => ({ ...prev, images: [sample.src, ...prev.images] }));
                                }}
                                className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                  imagePreview === sample.src ? 'border-[#561026] ring-2 ring-[#EE7B99]' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={sample.src} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Or Paste Web Image URL */}
                        <div>
                          <label className="font-bold text-[#5C4D4D] block mb-1">
                            Or Paste Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={customImageUrl}
                              onChange={(e) => setCustomImageUrl(e.target.value)}
                              placeholder="https://example.com/kurti-photo.jpg"
                              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#F4ACB7] bg-white outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (customImageUrl.trim()) {
                                  setImagePreview(customImageUrl.trim());
                                  setKurtiForm(prev => ({ ...prev, images: [customImageUrl.trim(), ...prev.images] }));
                                  setCustomImageUrl('');
                                }
                              }}
                              className="px-4 py-2 bg-[#561026] text-white text-xs font-semibold rounded-xl"
                            >
                              Apply
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Title & Category Details */}
                  <div className="bg-white p-5 rounded-3xl border border-[#F4ACB7]/40 shadow-xs space-y-4 text-xs">
                    <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#EE7B99]" />
                      2. Kurti Details & Description
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Kurti Name *</label>
                        <input
                          type="text"
                          value={kurtiForm.name}
                          onChange={(e) => setKurtiForm({ ...kurtiForm, name: e.target.value })}
                          placeholder="e.g. Malabar Peach Cotton Kurti"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Category *</label>
                        <select
                          value={kurtiForm.category}
                          onChange={(e) => setKurtiForm({ ...kurtiForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                        >
                          {CATEGORIES.filter(c => c !== 'All Styles').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Subtitle / Short Style Tagline</label>
                        <input
                          type="text"
                          value={kurtiForm.subtitle}
                          onChange={(e) => setKurtiForm({ ...kurtiForm, subtitle: e.target.value })}
                          placeholder="e.g. Lightweight breathable cotton kurti designed for blue jeans"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Fabric Specification</label>
                        <input
                          type="text"
                          value={kurtiForm.fabric}
                          onChange={(e) => setKurtiForm({ ...kurtiForm, fabric: e.target.value })}
                          placeholder="e.g. 100% Pure Cambric Cotton"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Stock Availability (Units)</label>
                        <input
                          type="number"
                          min="1"
                          value={kurtiForm.stockCount}
                          onChange={(e) => setKurtiForm({ ...kurtiForm, stockCount: parseInt(e.target.value) || 1 })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price & Size Grid */}
                  <div className="bg-white p-5 rounded-3xl border border-[#F4ACB7]/40 shadow-xs space-y-4 text-xs">
                    <h4 className="text-xs font-bold text-[#561026] uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#EE7B99]" />
                      3. Pricing in Indian Rupees (₹) & Available Sizes
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#FFF5F7] rounded-2xl border border-[#F4ACB7]/30">
                      <div>
                        <label className="font-bold text-[#561026] block mb-1">Retail Selling Price (₹) *</label>
                        <div className="flex items-center">
                          <span className="px-3 py-2.5 bg-white border border-r-0 border-[#F4ACB7] rounded-l-xl font-bold text-[#561026]">₹</span>
                          <input
                            type="number"
                            min="200"
                            max="999"
                            value={kurtiForm.price}
                            onChange={(e) => setKurtiForm({ ...kurtiForm, price: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2.5 rounded-r-xl border border-[#F4ACB7] bg-white font-serif text-base font-bold text-[#561026] outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#7A6B6B] block mb-1">Original MRP (₹)</label>
                        <div className="flex items-center">
                          <span className="px-3 py-2.5 bg-white border border-r-0 border-[#F4ACB7] rounded-l-xl font-bold text-[#7A6B6B]">₹</span>
                          <input
                            type="number"
                            min="300"
                            value={kurtiForm.originalPrice}
                            onChange={(e) => setKurtiForm({ ...kurtiForm, originalPrice: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2.5 rounded-r-xl border border-[#F4ACB7] bg-white font-medium text-[#7A6B6B] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#2B9348] block mb-1">Student Savings Display</label>
                        <div className="px-4 py-2.5 bg-white rounded-xl border border-[#2B9348]/40 font-bold text-[#2B9348] text-center">
                          Save ₹{Math.max(0, kurtiForm.originalPrice - kurtiForm.price)} ({Math.round(((kurtiForm.originalPrice - kurtiForm.price) / kurtiForm.originalPrice) * 100)}% OFF)
                        </div>
                      </div>
                    </div>

                    {/* Sizes Selection Multi-Toggle */}
                    <div>
                      <label className="font-bold text-[#561026] block mb-2">
                        Select Available Sizes (Click to toggle on/off) *:
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => {
                          const isSelected = kurtiForm.sizes.includes(sz);
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => toggleSize(sz)}
                              className={`w-12 h-11 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#561026] text-white border-[#561026] shadow-xs'
                                  : 'bg-[#FFF5F7] text-[#7A6B6B] border-[#F4ACB7]/40 hover:bg-[#FFE6EC]'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-[11px] text-[#7A6B6B] mt-1 block">
                        Selected: <strong>{kurtiForm.sizes.join(', ') || 'None'}</strong>
                      </span>
                    </div>

                  </div>

                  {/* Publish Action Button */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#561026] hover:bg-[#751734] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFE6EC]" />
                      <span>{editingProductId ? 'Save Kurti Changes' : 'Publish Kurti to Live Website'}</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* TAB 2: PUBLISH / RECORD MANUAL ORDER */}
            {activeTab === 'publish-order' && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#561026]">
                    Publish / Record a Customer Order
                  </h3>
                  <p className="text-xs text-[#7A6B6B]">
                    Log direct orders received from WhatsApp (+91 70128 97623), Instagram DMs, or phone calls into your live fulfillment queue.
                  </p>
                </div>

                <form onSubmit={handlePublishOrder} className="bg-white p-6 rounded-3xl border border-[#F4ACB7]/40 shadow-xs space-y-6 text-xs">
                  
                  {/* Select Kurti Product */}
                  <div className="p-4 bg-[#FFF5F7] rounded-2xl border border-[#F4ACB7]/30 space-y-3">
                    <h4 className="font-bold text-[#561026] uppercase tracking-wider">
                      1. Ordered Kurti Item
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Select Kurti *</label>
                        <select
                          value={orderForm.selectedProductId}
                          onChange={(e) => {
                            const selected = products.find(p => p.id === e.target.value);
                            setOrderForm({
                              ...orderForm,
                              selectedProductId: e.target.value,
                              unitPrice: selected ? selected.price : orderForm.unitPrice
                            });
                          }}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#F4ACB7] bg-white font-medium"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} (₹{p.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Select Size *</label>
                        <select
                          value={orderForm.selectedSize}
                          onChange={(e) => setOrderForm({ ...orderForm, selectedSize: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#F4ACB7] bg-white font-bold"
                        >
                          {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={orderForm.quantity}
                          onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                          className="w-full px-3 py-2 rounded-xl border border-[#F4ACB7] bg-white font-bold text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-[#561026] uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#EE7B99]" />
                      2. Customer Shipping & Contact Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Customer Full Name *</label>
                        <input
                          type="text"
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                          placeholder="e.g. Ananya Nair"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">WhatsApp / Phone Number *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={orderForm.customerPhone}
                          onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                          placeholder="9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Delivery Address (Hostel / Home) *</label>
                        <input
                          type="text"
                          value={orderForm.customerAddress}
                          onChange={(e) => setOrderForm({ ...orderForm, customerAddress: e.target.value })}
                          placeholder="e.g. Room 12, Medical College Ladies Hostel, Chalakuzhy"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">City</label>
                        <input
                          type="text"
                          value={orderForm.customerCity}
                          onChange={(e) => setOrderForm({ ...orderForm, customerCity: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#5C4D4D] block mb-1">Pincode</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={orderForm.customerPincode}
                          onChange={(e) => setOrderForm({ ...orderForm, customerPincode: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4ACB7] bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F4ACB7]/20">
                    <div>
                      <label className="font-semibold text-[#5C4D4D] block mb-1">Payment Method</label>
                      <select
                        value={orderForm.paymentMethod}
                        onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#F4ACB7] bg-white"
                      >
                        <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                        <option value="UPI Payment Received (GPay/PhonePe)">UPI Payment Received (GPay/PhonePe)</option>
                        <option value="Direct In-Store Cash">Direct In-Store Cash</option>
                      </select>
                    </div>

                    <div className="flex flex-col justify-end">
                      <div className="p-3 bg-[#D8F3DC]/40 rounded-xl border border-[#2B9348]/30 flex justify-between items-center">
                        <span className="font-semibold text-[#1B4332]">Total Amount to Collect:</span>
                        <span className="font-serif text-lg font-bold text-[#1B4332]">
                          ₹{orderForm.unitPrice * orderForm.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Publish Order Button */}
                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#561026] hover:bg-[#751734] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FFE6EC]" />
                      <span>Publish & Confirm Order</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* TAB 3: ALL ORDERS & SHIPPING */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#561026]">
                      Store Orders & Direct Shipping
                    </h3>
                    <p className="text-xs text-[#7A6B6B]">
                      Manage customer shipments directly from Chalakuzhy, assign courier AWBs, and update delivery states.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('publish-order')}
                    className="px-4 py-2 bg-[#561026] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Record Direct Order</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => {
                    const isShipped = order.status === 'Shipped';
                    const isDelivered = order.status === 'Delivered';
                    const isCancelled = order.status === 'Cancelled';

                    return (
                      <div
                        key={order.orderId}
                        className="bg-white rounded-2xl border border-[#F4ACB7]/40 p-4 sm:p-5 shadow-xs space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4ACB7]/20 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold bg-[#FFE6EC] text-[#892B42] px-2.5 py-1 rounded-md">
                              #{order.orderId}
                            </span>
                            <span className="text-xs text-[#7A6B6B]">
                              {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              isDelivered ? 'bg-[#D8F3DC] text-[#1B4332]' :
                              isShipped ? 'bg-blue-100 text-blue-800' :
                              isCancelled ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-900'
                            }`}>
                              {order.status}
                            </span>
                            <span className="text-xs font-bold text-[#561026] bg-[#FAF6F0] px-2.5 py-1 rounded-md">
                              ₹{order.totalAmount}
                            </span>
                          </div>
                        </div>

                        {/* Customer & Destination */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#F4ACB7]/20">
                            <span className="text-[10px] uppercase font-bold text-[#892B42] block">Customer</span>
                            <div className="font-bold text-[#2D2626]">{order.customer.name}</div>
                            <div className="text-[#5C4D4D]">📞 +91 {order.customer.phone}</div>
                            <div className="text-[#7A6B6B] truncate">{order.customer.email}</div>
                          </div>

                          <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#F4ACB7]/20">
                            <span className="text-[10px] uppercase font-bold text-[#892B42] block">Shipping Destination</span>
                            <div className="text-[#2D2626]">{order.customer.address}</div>
                            <div className="font-semibold text-[#561026]">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</div>
                            {order.notes && <div className="text-[10px] text-[#892B42] italic mt-1">"{order.notes}"</div>}
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-1.5">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-[#FFF5F7] rounded-xl border border-[#F4ACB7]/20">
                              <div className="flex items-center gap-2.5">
                                <img src={it.image} alt="" className="w-9 h-11 object-cover rounded-lg" />
                                <div>
                                  <div className="font-semibold text-[#2D2626]">{it.name}</div>
                                  <div className="text-[11px] text-[#7A6B6B]">Size: {it.size} | Color: {it.color} | Qty: {it.quantity}</div>
                                </div>
                              </div>
                              <span className="font-bold text-[#561026]">₹{it.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Courier Tracking & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F4ACB7]/20">
                          <div className="text-xs">
                            {order.trackingAwb && order.trackingAwb !== 'Pending' ? (
                              <div className="flex items-center gap-1.5 text-[#1B4332]">
                                <Truck className="w-3.5 h-3.5 text-[#2B9348]" />
                                <span>Courier: <strong>{order.trackingCourier}</strong> • AWB: <strong className="font-mono bg-[#D8F3DC] px-2 py-0.5 rounded">{order.trackingAwb}</strong></span>
                              </div>
                            ) : (
                              <span className="text-[#A09393] italic">Ready for dispatch from Chalakuzhy.</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {!isShipped && !isDelivered && !isCancelled && (
                              <button
                                onClick={() => {
                                  setSelectedOrderIdForTracking(order.orderId);
                                  setTrackingAwb(order.trackingAwb !== 'Pending' ? order.trackingAwb : '');
                                }}
                                className="px-3.5 py-1.5 bg-[#561026] text-white text-xs font-semibold rounded-lg hover:bg-[#751734] transition-colors"
                              >
                                Mark as Shipped
                              </button>
                            )}

                            {isShipped && (
                              <button
                                onClick={() => updateOrderStatus(order.orderId, 'Delivered')}
                                className="px-3 py-1.5 bg-[#2B9348] text-white text-xs font-semibold rounded-lg"
                              >
                                Mark Delivered
                              </button>
                            )}

                            {!isDelivered && !isCancelled && (
                              <button
                                onClick={() => updateOrderStatus(order.orderId, 'Cancelled')}
                                className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Tracking Modal */}
                {selectedOrderIdForTracking && (
                  <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-xl border border-[#F4ACB7]">
                      <h4 className="font-serif text-base font-bold text-[#561026]">
                        Ship Order #{selectedOrderIdForTracking}
                      </h4>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="font-semibold text-[#5C4D4D] block mb-1">Courier Service</label>
                          <select
                            value={courierName}
                            onChange={(e) => setCourierName(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                          >
                            <option value="India Post Speed Post">India Post Speed Post (Trivandrum)</option>
                            <option value="Delhivery Air">Delhivery Air</option>
                            <option value="BlueDart Express">BlueDart Express</option>
                            <option value="DTDC Priority">DTDC Priority</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-[#5C4D4D] block mb-1">Waybill / AWB Tracking Number</label>
                          <input
                            type="text"
                            value={trackingAwb}
                            onChange={(e) => setTrackingAwb(e.target.value)}
                            placeholder="e.g. KL-TRV-89124501"
                            className="w-full p-2.5 rounded-xl border border-[#F4ACB7] bg-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setSelectedOrderIdForTracking(null)}
                          className="px-3 py-1.5 text-xs text-[#7A6B6B]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            shipOrder(selectedOrderIdForTracking, courierName, trackingAwb);
                            setSelectedOrderIdForTracking(null);
                          }}
                          className="px-4 py-1.5 bg-[#561026] text-white text-xs font-semibold rounded-xl"
                        >
                          Confirm Shipment
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: MANAGE LIVE CATALOG */}
            {activeTab === 'catalog' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#561026]">
                      Manage Published Kurtis ({products.length} Styles)
                    </h3>
                    <p className="text-xs text-[#7A6B6B]">
                      Edit prices, photos, sizes, and stock for items shown on the live website.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('publish-kurti')}
                    className="px-4 py-2 bg-[#561026] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Another Kurti</span>
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-[#F4ACB7]/40 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FFF5F7] text-[#561026] font-semibold border-b border-[#F4ACB7]/30">
                        <tr>
                          <th className="py-3 px-4">Kurti Style</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Available Sizes</th>
                          <th className="py-3 px-4">Stock</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F4ACB7]/20 text-[#4A3E3D]">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FFFDF9] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg" />
                                <div>
                                  <div className="font-bold text-[#2D2626]">{p.name}</div>
                                  <div className="text-[10px] text-[#7A6B6B]">{p.subtitle}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-[#FFE6EC] text-[#892B42] px-2 py-0.5 rounded text-[10px] font-semibold">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-[#561026]">₹{p.price}</td>
                            <td className="py-3 px-4 font-semibold text-[#892B42]">
                              {p.sizes.join(', ')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {p.stockCount} in stock
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => startEditKurti(p)}
                                className="p-1.5 text-[#561026] hover:bg-[#FFE6EC] rounded-lg transition-colors"
                                title="Edit kurti"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete kurti"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: REVENUE & SALES ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/40 shadow-xs">
                    <span className="text-[11px] uppercase font-bold text-[#7A6B6B] tracking-wider block">Total Sales</span>
                    <div className="font-serif text-2xl font-bold text-[#561026] mt-1">₹{totalRevenue}</div>
                    <span className="text-[11px] text-[#2B9348] mt-1 block">From {orders.length} orders</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/40 shadow-xs">
                    <span className="text-[11px] uppercase font-bold text-[#7A6B6B] tracking-wider block">Average Order Value</span>
                    <div className="font-serif text-2xl font-bold text-[#892B42] mt-1">₹{averageOrderValue}</div>
                    <span className="text-[11px] text-[#7A6B6B] mt-1 block">Per customer bag</span>
                  </div>

                  <div className="bg-[#D8F3DC]/40 p-5 rounded-2xl border border-[#2B9348]/30 shadow-xs">
                    <span className="text-[11px] uppercase font-bold text-[#1B4332] tracking-wider block">Completed Deliveries</span>
                    <div className="font-serif text-2xl font-bold text-[#2B9348] mt-1">{deliveredCount} Orders</div>
                    <span className="text-[11px] text-[#1B4332] mt-1 block">Successfully delivered</span>
                  </div>

                  <div className="bg-[#FFE6EC]/60 p-5 rounded-2xl border border-[#EE7B99]/30 shadow-xs">
                    <span className="text-[11px] uppercase font-bold text-[#892B42] tracking-wider block">Published Catalog</span>
                    <div className="font-serif text-2xl font-bold text-[#D94B73] mt-1">{products.length} Styles</div>
                    <span className="text-[11px] text-[#892B42] mt-1 block">Live on store</span>
                  </div>

                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F4ACB7]/40 text-xs space-y-2 text-[#5C4D4D]">
                  <h4 className="font-serif text-base font-bold text-[#561026]">
                    Boutique Operations Overview
                  </h4>
                  <p>
                    All orders are managed directly by <strong>Sree Ethnic Finds</strong> based in Chalakuzhy, Medical College, Thiruvananthapuram, Kerala. Direct local fulfillment allows student-friendly pricing, rapid dispatch, and immediate customer care via WhatsApp (<strong>+91 70128 97623</strong>).
                  </p>
                </div>
              </div>
            )}

            {/* TAB 6: BOUTIQUE PROFILE INFORMATION */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                {/* Profile Card Header */}
                <div className="bg-gradient-to-r from-[#FFF5F7] via-[#FFE6EC] to-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#F4ACB7]/40 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#561026] to-[#892B42] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md border-4 border-white flex-shrink-0">
                    SF
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="font-serif text-2xl font-bold text-[#561026]">
                        Sree Ethnic Finds
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Boutique
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6B6B]">
                      Founder & Lead Curator: <strong className="text-[#561026]">Sreeroopa</strong>
                    </p>
                    <p className="text-xs text-[#5C4D4D] pt-0.5">
                      Chalakuzhy, Medical College, Thiruvananthapuram, Kerala, India - 695011
                    </p>
                  </div>
                  <button
                    onClick={logoutAdmin}
                    className="px-4 py-2 bg-white text-[#892B42] hover:bg-[#FFE6EC] rounded-xl text-xs font-semibold border border-[#EE7B99]/40 flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>

                {/* Profile Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Studio Contact Card */}
                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/30 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-[#561026] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D94B73]" />
                      Boutique Contact & WhatsApp
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#F4ACB7]/20">
                        <span className="text-[#7A6B6B]">Phone / WhatsApp:</span>
                        <a href="tel:+917012897623" className="font-semibold text-[#561026] hover:underline">
                          +91 70128 97623
                        </a>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4ACB7]/20">
                        <span className="text-[#7A6B6B]">Official Email:</span>
                        <a href="mailto:sreeroopa07122006@gmail.com" className="font-semibold text-[#561026] hover:underline">
                          sreeroopa07122006@gmail.com
                        </a>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#7A6B6B]">WhatsApp Direct:</span>
                        <a 
                          href="https://wa.me/917012897623?text=Hello%20Sree%20Ethnic%20Finds!%20I%20would%20like%20to%20order%20a%20kurti." 
                          target="_blank" 
                          rel="noreferrer"
                          className="font-semibold text-[#25D366] hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat with Customers
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Studio Operations */}
                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/30 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-[#561026] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D94B73]" />
                      Studio Location & Hours
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#F4ACB7]/20">
                        <span className="text-[#7A6B6B]">Location:</span>
                        <span className="font-semibold text-[#561026]">Chalakuzhy, Medical College P.O.</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4ACB7]/20">
                        <span className="text-[#7A6B6B]">City & State:</span>
                        <span className="font-semibold text-[#561026]">Thiruvananthapuram, Kerala (695011)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#7A6B6B]">Daily Dispatch Time:</span>
                        <span className="font-semibold text-[#561026]">4:00 PM IST (Monday - Saturday)</span>
                      </div>
                    </div>
                  </div>

                  {/* Courier Partners */}
                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/30 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-[#561026] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#D94B73]" />
                      Active Shipping Couriers
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-[#FFE6EC] text-[#892B42] font-semibold px-2.5 py-1 rounded-lg">
                        📮 India Post Speed Post
                      </span>
                      <span className="bg-[#FFE6EC] text-[#892B42] font-semibold px-2.5 py-1 rounded-lg">
                        ⚡ Delhivery Air
                      </span>
                      <span className="bg-[#FFE6EC] text-[#892B42] font-semibold px-2.5 py-1 rounded-lg">
                        ✈️ BlueDart Express
                      </span>
                      <span className="bg-[#FFE6EC] text-[#892B42] font-semibold px-2.5 py-1 rounded-lg">
                        📦 DTDC Priority
                      </span>
                    </div>
                  </div>

                  {/* Brand Guidelines */}
                  <div className="bg-white p-5 rounded-2xl border border-[#F4ACB7]/30 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-[#561026] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#EE7B99]" />
                      Boutique Promise
                    </h4>
                    <ul className="text-xs space-y-1.5 text-[#5C4D4D]">
                      <li>• <strong>Target Price:</strong> ₹299 - ₹499 strictly preserved for student accessibility.</li>
                      <li>• <strong>Fabrics:</strong> 100% Breathable Cambric, Slub, & Mulmul Cotton.</li>
                      <li>• <strong>Exchanges:</strong> 7-Day Hassle-free size exchange from Chalakuzhy studio.</li>
                    </ul>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

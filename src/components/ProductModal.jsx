import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductModal() {
  const { 
    selectedProduct, 
    isProductModalOpen, 
    closeProductModal, 
    addToCart, 
    setIsSizeGuideOpen,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen
  } = useStore();

  if (!isProductModalOpen || !selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0] || { name: 'Standard', hex: '#FAD2E1' });
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [pincodeError, setPincodeError] = useState('');

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAdd = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeProductModal();
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeProductModal();
    setIsCheckoutOpen(true);
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeError('Please enter a valid 6-digit Indian postal code');
      setDeliveryEstimate(null);
      return;
    }
    setPincodeError('');
    // Calculate realistic delivery date: 3-5 days from today
    const now = new Date();
    const minDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    
    setDeliveryEstimate({
      pincode: pincode.trim(),
      dateRange: `${minDate.toLocaleDateString('en-IN', options)} - ${maxDate.toLocaleDateString('en-IN', options)}`,
      speed: "Fast Hub Dispatch (within 24 hours)",
      onlineTransfer: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl border border-[#F4ACB7]/40 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#561026] hover:bg-[#FFE6EC] shadow-xs transition-colors"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-3">
            
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFF5F7] border border-[#F4ACB7]/30 shadow-xs">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              {/* Tag pill */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="bg-[#561026] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {selectedProduct.category}
                </span>
                <span className="bg-[#EE7B99] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {selectedProduct.discount}
                </span>
              </div>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                aria-label="Toggle Wishlist"
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isFavorited
                    ? 'bg-[#EE7B99] text-white shadow-md'
                    : 'bg-white/80 text-[#561026] hover:bg-white hover:text-[#EE7B99]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#D94B73] ring-2 ring-[#EE7B99]/40 scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D94B73] mb-1">
                <span className="flex items-center gap-1 bg-[#FFE6EC] px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-[#EE7B99] text-[#EE7B99]" />
                  {selectedProduct.rating} ({selectedProduct.reviewsCount} student reviews)
                </span>
                <span className="text-[#2B9348]">✓ In Stock • Chalakuzhy, Trivandrum</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#561026]">
                {selectedProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B6B] mt-1">
                {selectedProduct.subtitle}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-3.5 bg-[#FFF5F7] rounded-2xl border border-[#F4ACB7]/30 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-3xl font-bold text-[#561026]">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-sm text-[#A09393] line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="text-xs text-[#2B9348] font-bold">
                    {selectedProduct.discount}
                  </span>
                </div>
                <span className="text-[10px] text-[#7A6B6B] block mt-0.5">
                  Inclusive of all taxes • Free shipping on orders over ₹499
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#892B42] block">Pocket Deal</span>
                <span className="text-xs font-bold text-[#2B9348]">Save ₹{selectedProduct.originalPrice - selectedProduct.price}</span>
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#561026] mb-1.5">
                <span>Selected Shade: <strong className="text-[#892B42]">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                {selectedProduct.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#D94B73] bg-[#FFE6EC] text-[#561026] shadow-xs'
                          : 'border-[#F4ACB7]/40 bg-white text-[#7A6B6B] hover:bg-[#FFF5F7]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector + Size Guide Trigger */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#561026] mb-1.5">
                <span>Select Size:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#D94B73] hover:text-[#961E42] font-semibold flex items-center gap-1 underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  View Kurti Size Guide
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {selectedProduct.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-10 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#561026] text-white border-[#561026] shadow-xs'
                          : 'bg-white text-[#561026] border-[#F4ACB7]/40 hover:bg-[#FFE6EC]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-semibold text-[#561026]">Quantity:</span>
              <div className="flex items-center border border-[#F4ACB7] rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-[#561026] hover:bg-[#FFE6EC] rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3.5 py-1 text-xs font-bold text-[#561026]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-[#561026] hover:bg-[#FFE6EC] rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-[#7A6B6B]">
                Total: <strong>₹{selectedProduct.price * quantity}</strong>
              </span>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 bg-white hover:bg-[#FFE6EC]/60 text-[#561026] border-2 border-[#561026] font-semibold text-xs sm:text-sm rounded-full shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#EE7B99]" />
                Add to Bag
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 bg-[#561026] hover:bg-[#751734] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFE6EC]" />
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-2 border-t border-[#F4ACB7]/30">
              <div className="text-xs font-semibold text-[#561026] flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EE7B99]" />
                Check Delivery at Your Pincode:
              </div>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 110007)"
                  className="flex-1 px-3 py-2 text-xs border border-[#F4ACB7] rounded-xl outline-none focus:ring-1 focus:ring-[#EE7B99]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF6F0] hover:bg-[#F5EBE0] text-[#561026] text-xs font-semibold rounded-xl border border-[#D5BDAF] transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeError && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{pincodeError}</p>
              )}

              {deliveryEstimate && (
                <div className="mt-2 p-2.5 bg-[#D8F3DC]/50 border border-[#2B9348]/30 rounded-xl text-xs space-y-0.5 text-[#1B4332]">
                  <div className="font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#2B9348]" />
                    Estimated Delivery: {deliveryEstimate.dateRange}
                  </div>
                  <div className="text-[11px] text-[#2D6A4F]">
                    {deliveryEstimate.speed} • Online Transfer (+91 70128 97623 / WhatsApp DM)
                  </div>
                </div>
              )}
            </div>

            {/* Fabric & Product Specifications */}
            <div className="p-3.5 bg-[#FAF6F0] rounded-2xl border border-[#F5EBE0] space-y-1.5 text-xs text-[#5C4D4D]">
              <div className="font-bold text-[#561026] text-xs uppercase tracking-wider">
                Fabric & Garment Details:
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                <div>• <strong>Fabric:</strong> {selectedProduct.fabric}</div>
                <div>• <strong>Pattern:</strong> {selectedProduct.weave}</div>
                <div>• <strong>Length:</strong> {selectedProduct.length}</div>
                <div>• <strong>Neckline:</strong> {selectedProduct.neckline}</div>
                <div>• <strong>Sleeves:</strong> {selectedProduct.sleeves}</div>
                <div>• <strong>Pocket:</strong> {selectedProduct.pocket}</div>
              </div>
              <div className="text-[11px] pt-1 border-t border-[#E8DFD8]">
                <strong>Care Instructions:</strong> {selectedProduct.washCare}
              </div>
            </div>

            {/* Policy Chips */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#7A6B6B]">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#F4ACB7]/20">
                <RotateCcw className="w-3.5 h-3.5 text-[#EE7B99] flex-shrink-0" />
                <span>7-Day Easy Size Exchange</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#F4ACB7]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EE7B99] flex-shrink-0" />
                <span>Quality Tested Cambric</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

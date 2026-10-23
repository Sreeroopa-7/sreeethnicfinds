import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    cartTotal, 
    appliedCoupon, 
    applyCouponCode, 
    removeCoupon,
    setIsCheckoutOpen,
    currentCustomer,
    openAuthModal
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCouponCode(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#F4ACB7]/40 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F4ACB7]/30 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#561026]">
              <ShoppingBag className="w-4 h-4 text-[#D94B73]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#561026]">My Campus Bag</h3>
              <span className="text-[11px] text-[#7A6B6B]">
                {cart.length === 0 ? 'Your bag is empty' : `${cart.length} unique style${cart.length > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        {cart.length > 0 && (
          <div className="px-5 py-3 bg-[#FFF5F7] border-b border-[#F4ACB7]/30">
            <div className="flex items-center justify-between text-xs font-semibold text-[#892B42] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#EE7B99]" />
                {amountNeededForFreeDelivery === 0 ? (
                  <span className="text-[#2B9348] font-bold">🎉 Free Delivery unlocked!</span>
                ) : (
                  <span>Add <strong>₹{amountNeededForFreeDelivery}</strong> more for Free Delivery!</span>
                )}
              </span>
              <span>{deliveryProgressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[#FFE6EC] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EE7B99] to-[#D94B73] transition-all duration-500 rounded-full"
                style={{ width: `${deliveryProgressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#FFE6EC] flex items-center justify-center mx-auto mb-4 text-2xl">
                🛍️
              </div>
              <h4 className="font-serif text-lg font-bold text-[#561026]">Your bag feels lonely!</h4>
              <p className="text-xs text-[#7A6B6B] mt-1 mb-6 max-w-xs mx-auto">
                Explore our collection of college kurtis from ₹299 and style your everyday campus looks.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#561026] text-white text-xs font-semibold rounded-full hover:bg-[#751734] transition-colors"
              >
                Browse Kurtis
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemKey}
                className="flex gap-3 p-3 bg-white rounded-2xl border border-[#F4ACB7]/30 shadow-2xs relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#FFF5F7] flex-shrink-0 border border-[#F4ACB7]/20">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif text-sm font-bold text-[#2D2626] line-clamp-1">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-[#7A6B6B] mt-0.5">
                      <span className="bg-[#FFE6EC] px-2 py-0.5 rounded font-semibold text-[#892B42]">
                        Size: {item.size}
                      </span>
                      <span>• {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-serif text-sm font-bold text-[#561026]">
                      ₹{item.product.price * item.quantity}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#F4ACB7] rounded-lg bg-[#FFFDF9]">
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        className="p-1 text-[#561026] hover:bg-[#FFE6EC] rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#561026]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        className="p-1 text-[#561026] hover:bg-[#FFE6EC] rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.itemKey)}
                  className="p-1.5 rounded-full text-[#A09393] hover:text-[#B82E56] hover:bg-[#FFE6EC] transition-colors self-start"
                  aria-label="Remove item"
                  title="Remove from bag"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Coupon, Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F4ACB7]/30 bg-[#FFFDF9] space-y-3">
            
            {/* Coupon Code Input */}
            <div className="space-y-1">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#D8F3DC]/60 border border-[#2B9348]/40 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-[#1B4332] font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#2B9348]" />
                    <span>{appliedCoupon.code} applied ({appliedCoupon.label})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#961E42] hover:underline text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon (e.g. COLLEGE10)"
                    className="flex-1 px-3 py-2 text-xs border border-[#F4ACB7] rounded-xl outline-none focus:border-[#EE7B99] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#FFE6EC] hover:bg-[#FCD5DE] text-[#892B42] text-xs font-bold rounded-xl border border-[#EE7B99]/40 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              <div className="text-[10px] text-[#7A6B6B] flex items-center justify-between">
                <span>Try <strong>COLLEGE10</strong> (10% off) or <strong>CAMPUS50</strong></span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-1 text-xs text-[#5C4D4D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2D2626]">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-semibold text-[#2D2626]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#2B9348] font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-[#2B9348] font-semibold">
                  <span>Coupon Discount</span>
                  <span>- ₹{appliedCoupon.type === 'percentage' ? Math.round((cartSubtotal * appliedCoupon.value) / 100) : appliedCoupon.value}</span>
                </div>
              )}

              <div className="flex justify-between text-sm sm:text-base font-bold text-[#561026] pt-2 border-t border-[#F4ACB7]/30">
                <span>Grand Total</span>
                <span className="font-serif">₹{cartTotal}</span>
              </div>
            </div>

            {/* Customer Prompt if not logged in */}
            {!currentCustomer && (
              <div className="text-[11px] text-[#892B42] bg-[#FFE6EC]/60 p-2.5 rounded-2xl border border-[#EE7B99]/30 flex items-center justify-between">
                <span>Save your address for 1-click checkout:</span>
                <button
                  onClick={() => { setIsCartOpen(false); openAuthModal('login'); }}
                  className="font-bold underline text-[#561026] hover:text-[#892B42] cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#561026] hover:bg-[#751734] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#FFE6EC]" />
            </button>

            {/* Prototype Notice */}
            <div className="text-[10px] text-center text-[#7A6B6B] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2B9348]" />
              <span>Online Transfer to +91 70128 97623 • WhatsApp DM confirmation</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

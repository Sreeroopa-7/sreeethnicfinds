import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { 
    openProductModal, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#FAD2E1' });
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  return (
    <div 
      onClick={() => openProductModal(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#F4ACB7]/30 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 relative"
    >
      
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FFF5F7]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-[#561026] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
          {product.discount && (
            <span className="bg-[#EE7B99] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.discount}
            </span>
          )}
        </div>

        {/* Prototype Demo Tag */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="bg-black/50 backdrop-blur-xs text-[9px] text-white/90 px-2 py-0.5 rounded-md font-mono">
            Demo Sample
          </span>
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-[#EE7B99] text-white shadow-md'
              : 'bg-white/80 text-[#561026] hover:bg-white hover:text-[#EE7B99]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-full py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#561026] text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#EE7B99]" />
            Quick Preview
          </button>
        </div>

      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#7A6B6B]">
          <span className="font-medium text-[#961E42] bg-[#FFE6EC] px-2 py-0.5 rounded-md text-[11px]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[#D94B73] font-semibold text-[11px]">
            <Star className="w-3.5 h-3.5 fill-[#EE7B99] text-[#EE7B99]" />
            <span>{product.rating}</span>
            <span className="text-[#A09393] font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2626] group-hover:text-[#892B42] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#6B5E5E] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & MRP in Indian Rupees */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#561026]">
            ₹{product.price}
          </span>
          <span className="text-xs sm:text-sm text-[#A09393] line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-xs text-[#2B9348] font-semibold">
            Save ₹{product.originalPrice - product.price}
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[11px] text-[#7A6B6B] mr-1">Color:</span>
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  isSelected ? 'ring-2 ring-[#EE7B99] ring-offset-1 scale-110' : 'border-black/10'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            );
          })}
        </div>

        {/* Size Selection Pills */}
        <div className="flex items-center gap-1 pt-1 flex-wrap">
          <span className="text-[11px] text-[#7A6B6B] mr-1">Size:</span>
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                  isSelected
                    ? 'bg-[#561026] text-white border-[#561026]'
                    : 'bg-[#FFF5F7] text-[#561026] border-[#F4ACB7]/40 hover:bg-[#FFE6EC]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Availability / Stock Status */}
        <div className="text-[11px] font-medium pt-1">
          {product.stockCount <= 10 ? (
            <span className="text-[#B82E56] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B82E56] animate-ping" />
              Only {product.stockCount} left in hub!
            </span>
          ) : (
            <span className="text-[#2B9348] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B9348]" />
              In Stock • Dispatches in 24 hrs
            </span>
          )}
        </div>

        {/* Actions: View Details & Add to Cart */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F4ACB7]/20">
          <button
            onClick={() => openProductModal(product)}
            className="py-2.5 px-3 rounded-xl border border-[#F4ACB7] text-[#561026] hover:bg-[#FFE6EC]/50 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#EE7B99]" />
            Details
          </button>

          <button
            onClick={handleQuickAdd}
            className={`py-2.5 px-3 rounded-xl text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
              isAddedRecently
                ? 'bg-[#2B9348]'
                : 'bg-[#561026] hover:bg-[#751734]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#FFE6EC]" />
                Add to Bag
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

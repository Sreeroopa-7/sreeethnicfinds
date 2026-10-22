import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart 
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#F4ACB7]/40 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F4ACB7]/30 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#D94B73]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#561026]">My Saved Kurtis</h3>
              <span className="text-[11px] text-[#7A6B6B]">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#FFE6EC] flex items-center justify-center mx-auto mb-4 text-2xl">
                🤍
              </div>
              <h4 className="font-serif text-lg font-bold text-[#561026]">Your wishlist is empty</h4>
              <p className="text-xs text-[#7A6B6B] mt-1 mb-6 max-w-xs mx-auto">
                Tap the heart on any kurti card to save it for your next college shopping haul!
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 bg-[#561026] text-white text-xs font-semibold rounded-full hover:bg-[#751734] transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-white rounded-2xl border border-[#F4ACB7]/30 shadow-2xs"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 rounded-xl object-cover object-top flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif text-sm font-bold text-[#2D2626] line-clamp-1">
                      {product.name}
                    </h5>
                    <div className="text-xs font-bold text-[#561026] mt-1">
                      ₹{product.price}
                      <span className="text-[10px] text-[#A09393] line-through ml-1.5 font-normal">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0] || 'M', product.colors[0], 1);
                        toggleWishlist(product);
                      }}
                      className="flex-1 py-1.5 px-3 bg-[#561026] hover:bg-[#751734] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 text-[#A09393] hover:text-[#B82E56] hover:bg-[#FFE6EC] rounded-xl transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F4ACB7]/30 bg-[#FFFDF9] text-center">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-2.5 bg-white border border-[#F4ACB7] text-[#561026] text-xs font-semibold rounded-full hover:bg-[#FFE6EC]/40 transition-colors"
          >
            Keep Browsing
          </button>
        </div>

      </div>

    </div>
  );
}

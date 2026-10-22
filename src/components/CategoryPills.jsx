import React from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function CategoryPills() {
  const { 
    selectedCategory, 
    setSelectedCategory,
    selectedSizeFilter,
    setSelectedSizeFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useStore();

  const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL"];

  const hasActiveFilters = 
    selectedCategory !== 'All Styles' || 
    selectedSizeFilter !== '' || 
    priceRange[0] !== 300 || 
    priceRange[1] !== 500 || 
    searchQuery !== '' || 
    sortBy !== 'featured';

  const resetFilters = () => {
    setSelectedCategory('All Styles');
    setSelectedSizeFilter('');
    setPriceRange([300, 500]);
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="space-y-5 pt-4 pb-2">
      
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-2xs ${
                isActive
                  ? 'bg-[#561026] text-white shadow-md transform scale-[1.02]'
                  : 'bg-white text-[#5C4D4D] border border-[#F4ACB7]/40 hover:border-[#D94B73] hover:bg-[#FFE6EC]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#F4ACB7]/30 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Size Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[#892B42] flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EE7B99]" />
            Size:
          </span>
          {sizes.map((s) => {
            const isSelected = (s === "All" && selectedSizeFilter === "") || selectedSizeFilter === s;
            return (
              <button
                key={s}
                onClick={() => setSelectedSizeFilter(s === "All" ? "" : s)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#EE7B99] text-white shadow-xs'
                    : 'bg-[#FFF5F7] text-[#751734] hover:bg-[#FFE6EC]'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Middle: Price Range Indicator */}
        <div className="flex items-center gap-2 text-xs text-[#5C4D4D]">
          <span className="font-semibold text-[#892B42]">Price:</span>
          <span className="bg-[#FFE6EC] px-2.5 py-1 rounded-full text-[#961E42] font-semibold text-[11px]">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
          <input
            type="range"
            min="300"
            max="500"
            step="20"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-24 accent-[#D94B73] cursor-pointer"
            title="Max price filter"
          />
        </div>

        {/* Right: Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#892B42] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#EE7B99]" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium bg-[#FFF5F7] border border-[#F4ACB7]/40 rounded-xl px-2.5 py-1.5 text-[#561026] outline-none cursor-pointer hover:border-[#D94B73]"
          >
            <option value="featured">Featured / Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">New Arrivals</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-full text-[#D94B73] hover:bg-[#FFE6EC] transition-colors ml-1"
              title="Reset all filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

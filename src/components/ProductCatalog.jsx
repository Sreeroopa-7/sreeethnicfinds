import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import CategoryPills from './CategoryPills';
import { Sparkles, PackageOpen } from 'lucide-react';

export default function ProductCatalog() {
  const { 
    products, 
    selectedCategory, 
    selectedSizeFilter, 
    priceRange, 
    sortBy, 
    searchQuery,
    setSelectedCategory,
    setSelectedSizeFilter,
    setSearchQuery,
    setPriceRange
  } = useStore();

  // Filter products based on active filters
  const filteredProducts = products.filter((prod) => {
    // Category filter
    if (selectedCategory !== 'All Styles' && prod.category !== selectedCategory) {
      return false;
    }

    // Size filter
    if (selectedSizeFilter && !prod.sizes.includes(selectedSizeFilter)) {
      return false;
    }

    // Price range filter
    if (prod.price < priceRange[0] || prod.price > priceRange[1]) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchSub = prod.subtitle.toLowerCase().includes(q);
      const matchCat = prod.category.toLowerCase().includes(q);
      const matchFabric = prod.fabric.toLowerCase().includes(q);
      if (!matchName && !matchSub && !matchCat && !matchFabric) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return 0; // default featured
  });

  return (
    <section id="catalog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Catalog Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-[#FFE6EC] px-3.5 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#EE7B99]" />
          Everyday Campus Collections
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#561026]">
          Curated College Kurtis
        </h2>
        <p className="text-sm text-[#7A6B6B] mt-2">
          Affordable, lightweight ethnic wear designed for college lectures, campus fests, and casual outings with friends.
        </p>
      </div>

      {/* Filter and Category Bar */}
      <CategoryPills />

      {/* Product Count & Notice */}
      <div className="flex items-center justify-between text-xs text-[#7A6B6B] mt-4 mb-6 px-1">
        <div>
          Showing <span className="font-bold text-[#561026]">{sortedProducts.length}</span> styles 
          {selectedCategory !== 'All Styles' && ` in "${selectedCategory}"`}
        </div>
        <div className="hidden sm:inline-block bg-[#F5EBE0] text-[#751734] px-2.5 py-0.5 rounded-md text-[11px]">
          Demo Product Catalog • Prices ₹300 - ₹500
        </div>
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#F4ACB7]/30 max-w-md mx-auto my-8">
          <PackageOpen className="w-12 h-12 text-[#EE7B99] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#561026]">No kurtis matched your filters</h3>
          <p className="text-xs text-[#7A6B6B] mt-1 mb-5">
            Try adjusting your search keyword, size selection, or price slider.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Styles');
              setSelectedSizeFilter('');
              setSearchQuery('');
              setPriceRange([300, 500]);
            }}
            className="px-5 py-2.5 bg-[#561026] text-white text-xs font-semibold rounded-full hover:bg-[#751734] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}

// app/page.tsx
'use client';

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Item } from "@/types/types";
import ProductCard from "@/components/ProductCard";
import { itemsWithId, groupedData } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  
  const [products, setProducts] = useState<Item[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(itemsWithId.map(item => item.category)));
    return uniqueCategories.map((category, index) => ({
      id: index,
      name: category,
    }));
  }, []);

  // Get selected categories from URL
  const selectedCategoryNames = useMemo(() => {
    const categoriesParam = searchParams.get("categories");
    return categoriesParam ? categoriesParam.split(",") : [];
  }, [searchParams]);

  const toggleCategory = (categoryName: string) => {
    let updated = [...selectedCategoryNames];
    
    if (updated.includes(categoryName)) {
      updated = updated.filter(c => c !== categoryName);
    } else {
      updated.push(categoryName);
    }
    
    const params = new URLSearchParams(searchParams);
    if (updated.length > 0) {
      params.set("categories", updated.join(","));
    } else {
      params.delete("categories");
    }
    
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("categories");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  // Filter products based on selected categories
  useEffect(() => {
    let filteredProducts = [...itemsWithId];
    
    // Filter by categories if any selected
    if (selectedCategoryNames.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategoryNames.includes(product.category)
      );
    }
    
    setProducts(filteredProducts);
    
    // Set loading to false after products are filtered
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [selectedCategoryNames]);

  // Initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryDisplayName = (categoryName: string) => {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Shop Our Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products at great prices
          </p>
          {selectedCategoryNames.length > 0 && (
            <div className="mt-3 text-sm text-indigo-600">
              Showing {products.length} products in {selectedCategoryNames.join(", ")}
            </div>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters & Sorting</span>
            {selectedCategoryNames.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full">
                {selectedCategoryNames.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`
            lg:block lg:w-80 flex-shrink-0
            ${showFilters ? 'block' : 'hidden'}
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            bg-white lg:bg-transparent
            p-6 lg:p-0
            overflow-y-auto lg:overflow-visible
            shadow-xl lg:shadow-none
          `}>
            <div className="lg:hidden flex justify-between items-center mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                aria-label="close"
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories Filter */}
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Categories</h3>
              <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 custom-scroll">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <input
                      data-testid={`category-${category.id}`}
                      type="checkbox"
                      checked={selectedCategoryNames.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700 flex-1 capitalize">{getCategoryDisplayName(category.name)}</span>
                    <span className="text-xs text-gray-400">
                      ({groupedData[category.name]?.length || 0})
                    </span>
                    {selectedCategoryNames.includes(category.name) && (
                      <X
                        className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCategory(category.name);
                        }}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {selectedCategoryNames.length > 0 && (
              <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Active Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategoryNames.map(catName => (
                    <span key={catName} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-full flex items-center gap-2 capitalize">
                      {getCategoryDisplayName(catName)}
                      <button
                        aria-label="close"
                        onClick={() => toggleCategory(catName)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Close button for mobile */}
            <div className="lg:hidden mt-6">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="h-56 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg mb-4">
                  {selectedCategoryNames.length > 0 
                    ? `No products found in ${selectedCategoryNames.join(", ")}`
                    : "No products found"}
                </p>
                {selectedCategoryNames.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Found {products.length} product{products.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}
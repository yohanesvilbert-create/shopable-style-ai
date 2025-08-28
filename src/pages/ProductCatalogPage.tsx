import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import sneakersImage from '@/assets/sneakers-white.jpg';
import toteImage from '@/assets/tote-bag-beige.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';
import beltImage from '@/assets/belt-brown.jpg';

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  priceNumber: number;
  sizes?: string;
  tags?: string[];
  colors?: string[];
  category: 'men' | 'women' | 'kids' | 'accessories';
  availability: 'in-stock' | 'out-of-stock';
  type: 'shoes' | 'bags' | 'dresses' | 'accessories';
}

interface Filters {
  category: string[];
  availability: string[];
  type: string[];
}

// Mock product data
const generateProducts = (): Product[] => {
  const products: Product[] = [
    {
      id: 1,
      image: sneakersImage,
      name: "Classic White Sneakers",
      price: "RM259.00",
      priceNumber: 259,
      sizes: "Size 5-11",
      tags: ["minimal", "leather", "bestseller"],
      colors: ["#000000", "#ffffff", "#d4c4a0"],
      category: 'women',
      availability: 'in-stock',
      type: 'shoes'
    },
    {
      id: 2,
      image: toteImage,
      name: "Structured Zip Tote",
      price: "RM359.00",
      priceNumber: 359,
      sizes: "One Size",
      tags: ["structured", "work"],
      colors: ["#d4c4a0", "#8B4513", "#000000"],
      category: 'women',
      availability: 'in-stock',
      type: 'bags'
    },
    {
      id: 3,
      image: crossbodyImage,
      name: "Mini Crossbody Bag",
      price: "RM219.00",
      priceNumber: 219,
      sizes: "One Size",
      tags: ["casual", "compact"],
      colors: ["#D2B48C", "#8B4513"],
      category: 'women',
      availability: 'in-stock',
      type: 'bags'
    },
    {
      id: 4,
      image: beltImage,
      name: "Premium Leather Belt",
      price: "RM129.00",
      priceNumber: 129,
      sizes: "S-XL",
      tags: ["leather", "premium"],
      colors: ["#8B4513", "#000000"],
      category: 'accessories',
      availability: 'in-stock',
      type: 'accessories'
    }
  ];

  // Generate more products for infinite scroll demo
  const additionalNames = [
    "Casual Denim Sneakers", "Evening Clutch", "Weekend Tote", "Sports Belt",
    "Designer Heels", "Crossbody Messenger", "Vintage Belt", "Running Shoes",
    "Elegant Handbag", "Casual Loafers", "Travel Backpack", "Fashion Belt"
  ];

  for (let i = 5; i <= 50; i++) {
    const randomName = additionalNames[Math.floor(Math.random() * additionalNames.length)];
    const randomPrice = Math.floor(Math.random() * 400) + 100;
    const categories: Array<'men' | 'women' | 'kids' | 'accessories'> = ['men', 'women', 'kids', 'accessories'];
    const types: Array<'shoes' | 'bags' | 'dresses' | 'accessories'> = ['shoes', 'bags', 'dresses', 'accessories'];
    const availability: Array<'in-stock' | 'out-of-stock'> = ['in-stock', 'out-of-stock'];
    
    products.push({
      id: i,
      image: [sneakersImage, toteImage, crossbodyImage, beltImage][Math.floor(Math.random() * 4)],
      name: `${randomName} ${i}`,
      price: `RM${randomPrice}.00`,
      priceNumber: randomPrice,
      sizes: Math.random() > 0.5 ? "One Size" : "S-XL",
      tags: ["trendy", "new"],
      colors: ["#000000", "#ffffff", "#d4c4a0"],
      category: categories[Math.floor(Math.random() * categories.length)],
      availability: availability[Math.floor(Math.random() * availability.length)],
      type: types[Math.floor(Math.random() * types.length)]
    });
  }

  return products;
};

const allProducts = generateProducts();

export default function ProductCatalogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState<Filters>({
    category: [],
    availability: [],
    type: []
  });
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const PRODUCTS_PER_PAGE = 10;

  // Filter and sort products
  const getFilteredAndSortedProducts = useCallback(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category));
    }
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => filters.availability.includes(product.availability));
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter(product => filters.type.includes(product.type));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case 'bestsellers':
        filtered.sort((a, b) => (b.tags?.includes('bestseller') ? 1 : 0) - (a.tags?.includes('bestseller') ? 1 : 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Load products for current page
  const loadProducts = useCallback(() => {
    const filteredProducts = getFilteredAndSortedProducts();
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    
    if (page === 1) {
      setDisplayedProducts(filteredProducts.slice(0, endIndex));
    } else {
      setDisplayedProducts(prev => [
        ...prev,
        ...filteredProducts.slice(startIndex, endIndex)
      ]);
    }
  }, [page, getFilteredAndSortedProducts]);

  // Reset and reload when filters change
  useEffect(() => {
    setPage(1);
    setDisplayedProducts([]);
  }, [searchQuery, filters, sortBy]);

  // Load products when page changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          const filteredProducts = getFilteredAndSortedProducts();
          const hasMore = displayedProducts.length < filteredProducts.length;
          
          if (hasMore) {
            setIsLoading(true);
            setTimeout(() => {
              setPage(prev => prev + 1);
              setIsLoading(false);
            }, 500);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [displayedProducts.length, getFilteredAndSortedProducts, isLoading]);

  const handleFilterToggle = (type: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilter = (type: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({ category: [], availability: [], type:[] });
  };

  const activeFiltersCount = Object.values(filters).flat().length;
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-app-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold text-text-primary">Products</h1>
            <div></div>
          </div>

          {/* Search, Sort, Filter Bar */}
          <div className="flex items-center space-x-2 mb-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-text-muted hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-input border border-border rounded-xl px-3 py-2.5 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="bestsellers">Best Sellers</option>
              </select>
              <ChevronDown size={16} className="absolute right-2.5 top-3 text-text-muted pointer-events-none" />
            </div>

            {/* Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="relative bg-input border border-border rounded-xl p-2.5 text-text-primary hover:bg-chip-background transition-colors">
                  <Filter size={16} />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[70vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-4">
                  {/* Category */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-text-primary">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {['men', 'women', 'kids', 'accessories'].map((category) => (
                        <button
                          key={category}
                          onClick={() => handleFilterToggle('category', category)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            filters.category.includes(category)
                              ? 'bg-text-primary text-primary-foreground'
                              : 'bg-chip-background text-chip-foreground hover:bg-chip-background/80'
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-text-primary">Availability</h3>
                    <div className="flex flex-wrap gap-2">
                      {['in-stock', 'out-of-stock'].map((availability) => (
                        <button
                          key={availability}
                          onClick={() => handleFilterToggle('availability', availability)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            filters.availability.includes(availability)
                              ? 'bg-text-primary text-primary-foreground'
                              : 'bg-chip-background text-chip-foreground hover:bg-chip-background/80'
                          }`}
                        >
                          {availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Item Type */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-text-primary">Item Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {['shoes', 'bags', 'dresses', 'accessories'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleFilterToggle('type', type)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            filters.type.includes(type)
                              ? 'bg-text-primary text-primary-foreground'
                              : 'bg-chip-background text-chip-foreground hover:bg-chip-background/80'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-text-primary text-primary-foreground rounded-lg"
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {Object.entries(filters).map(([filterType, values]) =>
                values.map((value) => (
                  <div
                    key={`${filterType}-${value}`}
                    className="flex items-center space-x-1 bg-chip-active text-chip-active-foreground px-3 py-1 rounded-full text-xs whitespace-nowrap"
                  >
                    <span>{value.replace('-', ' ')}</span>
                    <button
                      onClick={() => clearFilter(filterType as keyof Filters, value)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
              <button
                onClick={clearAllFilters}
                className="bg-error/10 text-error px-3 py-1 rounded-full text-xs whitespace-nowrap hover:bg-error/20"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              sizes={product.sizes}
              tags={product.tags}
              colors={product.colors}
              onAdd={() => console.log('Add to cart:', product.name)}
              onWishlist={() => console.log('Add to wishlist:', product.name)}
              className="w-full"
            />
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="h-10 flex items-center justify-center mt-4">
          {isLoading && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>

        {/* No Results */}
        {displayedProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-text-muted text-sm">No products found</p>
            <p className="text-text-muted text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
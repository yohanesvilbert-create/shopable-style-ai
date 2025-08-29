import { useState } from 'react';
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Trash2, FolderPlus, Share2, CheckSquare, Square, Star, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import sneakersImage from '@/assets/sneakers-white.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';
import toteImage from '@/assets/tote-bag-beige.jpg';

interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  stockStatus: 'in-stock' | 'out-of-stock' | 'low-stock';
  onSale?: boolean;
  tags?: string[];
}

// Mock data
const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Classic White Sneakers Premium Edition',
    brand: 'Nike',
    image: sneakersImage,
    currentPrice: 259,
    originalPrice: 299,
    discount: 13,
    stockStatus: 'in-stock',
    onSale: true,
    tags: ['casual', 'sports']
  },
  {
    id: '2',
    name: 'Mini Crossbody Bag Leather',
    brand: 'Coach',
    image: crossbodyImage,
    currentPrice: 189,
    originalPrice: 219,
    discount: 14,
    stockStatus: 'low-stock',
    tags: ['accessories']
  },
  {
    id: '3',
    name: 'Structured Tote Bag',
    brand: 'Marc Jacobs',
    image: toteImage,
    currentPrice: 359,
    stockStatus: 'out-of-stock',
    tags: ['work', 'formal']
  }
];

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recently-added');

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (itemId: string) => {
    // Add to cart logic
    console.log('Added to cart:', itemId);
  };

  const handleBulkAddToCart = () => {
    // Bulk add to cart logic
    selectedItems.forEach(id => handleAddToCart(id));
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'text-success bg-success/10';
      case 'out-of-stock':
        return 'text-destructive bg-destructive/10';
      case 'low-stock':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-muted bg-secondary';
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return '✅ In Stock';
      case 'out-of-stock':
        return '❌ Out of Stock';
      case 'low-stock':
        return '⚠️ Low Stock';
      default:
        return status;
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="mobile-container bg-app-background min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-app-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-14 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-text-primary"
            >
              <ArrowLeft size={20} />
            </Button>
            
            <h1 className="text-lg font-semibold text-text-primary">Wishlist ♥️</h1>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-text-primary">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-text-primary">
                <Share2 size={20} />
              </Button>
            </div>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <Heart size={32} className="text-text-muted" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-lg">♥️</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-text-primary">
              Your wishlist is empty ♥️
            </h2>
            <p className="text-text-muted max-w-sm">
              Save items you love to buy them later.
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-app-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-app-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-text-primary"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <h1 className="text-lg font-semibold text-text-primary">Wishlist ♥️</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-text-primary">
              <Search size={20} />
            </Button>
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-text-primary">
                  <Filter size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Sort & Filter</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Sort by</h4>
                    <div className="space-y-2">
                      {['recently-added', 'price-low-high', 'price-high-low', 'name'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="sort"
                            value={option}
                            checked={sortBy === option}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-primary"
                          />
                          <span className="text-sm capitalize">{option.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="text-text-primary">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Bulk Actions Header */}
      {selectedItems.length > 0 && (
        <div className="sticky top-14 z-30 bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={selectedItems.length === wishlistItems.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-text-secondary">
                {selectedItems.length} selected
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkAddToCart}
                className="text-xs"
              >
                <ShoppingCart size={14} className="mr-1" />
                Add All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkRemove}
                className="text-xs text-destructive"
              >
                <Trash2 size={14} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="flex-1 pb-20">
        <div className="px-4 py-4 space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemSelect(item.id)}
                    className="mt-1"
                  />

                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-secondary"
                    />
                    
                    {/* Overlay Badges */}
                    <Badge className="absolute -top-2 -right-2 text-xs bg-accent text-accent-foreground">
                      <Heart size={12} className="mr-1 fill-current" />
                      Saved
                    </Badge>

                    {item.onSale && (
                      <Badge className="absolute -bottom-2 -left-2 text-xs bg-destructive text-white">
                        🔥 On Sale
                      </Badge>
                    )}

                    {item.stockStatus === 'low-stock' && (
                      <Badge className="absolute -bottom-2 -left-2 text-xs bg-warning text-warning-foreground">
                        ⚠️ Low Stock
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary text-sm leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-muted">{item.brand}</p>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-text-primary">
                        RM{item.currentPrice.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <>
                          <span className="text-xs text-text-muted line-through">
                            RM{item.originalPrice.toFixed(2)}
                          </span>
                          {item.discount && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              -{item.discount}%
                            </Badge>
                          )}
                        </>
                      )}
                    </div>

                    {/* Stock Status */}
                    <Badge className={`mt-2 text-xs ${getStockStatusColor(item.stockStatus)}`}>
                      {getStockStatusText(item.stockStatus)}
                    </Badge>

                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 space-y-3">
                  {/* Row 1: Quick Actions */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAddToCart(item.id)}
                      disabled={item.stockStatus === 'out-of-stock'}
                      className="flex-1 text-sm"
                    >
                      <ShoppingCart size={14} className="mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-sm text-destructive"
                    >
                      <Heart size={14} className="mr-1 fill-current" />
                      Remove
                    </Button>
                  </div>

                  {/* Row 2: Advanced Features */}
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs text-text-muted">
                      <FolderPlus size={12} className="mr-1" />
                      Move to Folder
                    </Button>
                  </div>

                  {/* Style Optimizer */}
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center space-x-2 mb-3">
                      <Star size={14} className="text-accent fill-current" />
                      <h4 className="font-medium text-text-primary text-sm">Style Optimizer</h4>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <p className="text-xs text-text-secondary mb-2">
                        Complete your look with matching accessories
                      </p>
                      <div className="flex space-x-2 overflow-x-auto">
                        <div className="flex-shrink-0 w-16 h-16 bg-secondary rounded-md flex items-center justify-center">
                          <span className="text-xs text-text-muted">Belt</span>
                        </div>
                        <div className="flex-shrink-0 w-16 h-16 bg-secondary rounded-md flex items-center justify-center">
                          <span className="text-xs text-text-muted">Watch</span>
                        </div>
                        <button className="flex-shrink-0 w-16 h-16 border-2 border-dashed border-border rounded-md flex items-center justify-center text-text-muted hover:border-primary transition-colors">
                          <span className="text-xs">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Recommendations Footer */}
        {selectedItems.length === 0 && (
          <div className="px-4 py-6 border-t border-border bg-card/50">
            <h3 className="font-medium text-text-primary mb-3">Popular in Wishlist</h3>
            <div className="flex space-x-3 overflow-x-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-24 space-y-2">
                  <div className="w-24 h-24 bg-secondary rounded-lg"></div>
                  <p className="text-xs text-text-muted">RM{(199 + i * 50).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
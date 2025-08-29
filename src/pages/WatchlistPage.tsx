import { useState } from 'react';
import { ArrowLeft, Filter, Heart, Plus, Trash2, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { WatchlistCard } from '@/components/watchlist/WatchlistCard';
import { WatchlistEmpty } from '@/components/watchlist/WatchlistEmpty';
import { WatchlistFilters } from '@/components/watchlist/WatchlistFilters';
import { SmartRecommendations } from '@/components/watchlist/SmartRecommendations';
import sneakersImage from '@/assets/sneakers-white.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';

interface WatchlistItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  stockStatus: 'in-stock' | 'out-of-stock' | 'back-soon';
  priceHistory: number[];
  priceDropAmount?: number;
  aiInsight?: string;
  addedDate: string;
  isSelected?: boolean;
}

// Mock data
const mockWatchlistItems: WatchlistItem[] = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    brand: 'Nike',
    image: sneakersImage,
    currentPrice: 259,
    originalPrice: 299,
    discount: 13,
    stockStatus: 'in-stock',
    priceHistory: [299, 289, 279, 269, 259],
    priceDropAmount: 15,
    aiInsight: 'Prices usually drop during holiday season.',
    addedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mini Crossbody Bag',
    brand: 'Coach',
    image: crossbodyImage,
    currentPrice: 189,
    originalPrice: 219,
    discount: 14,
    stockStatus: 'out-of-stock',
    priceHistory: [219, 209, 199, 189, 189],
    aiInsight: 'High demand, price may increase soon.',
    addedDate: '2024-01-10'
  }
];

export default function WatchlistPage() {
  const navigate = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>(mockWatchlistItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recently-added');
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterDiscounted, setFilterDiscounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === watchlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(watchlistItems.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    setWatchlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleMoveToWishlist = (itemIds: string[]) => {
    // Move to wishlist logic
    setWatchlistItems(prev => prev.filter(item => !itemIds.includes(item.id)));
    setSelectedItems([]);
  };

  const handleRemoveItem = (itemId: string) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = watchlistItems.filter(item => {
    if (filterInStock && item.stockStatus !== 'in-stock') return false;
    if (filterDiscounted && !item.discount) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.currentPrice - b.currentPrice;
      case 'price-high-low':
        return b.currentPrice - a.currentPrice;
      case 'discounted-first':
        return (b.discount || 0) - (a.discount || 0);
      default: // recently-added
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const hasUpdates = watchlistItems.some(item => item.priceDropAmount);

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
          
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-text-primary">Watchlist</h1>
            <span className="text-lg">👀</span>
            {hasUpdates && (
              <div className="w-2 h-2 bg-accent-warm rounded-full"></div>
            )}
          </div>
          
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
              <WatchlistFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterInStock={filterInStock}
                setFilterInStock={setFilterInStock}
                filterDiscounted={filterDiscounted}
                setFilterDiscounted={setFilterDiscounted}
                onClose={() => setShowFilters(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 pb-20">
        {sortedItems.length === 0 ? (
          <WatchlistEmpty onStartShopping={() => navigate('/')} />
        ) : (
          <>
            {/* Bulk Actions Header */}
            {selectedItems.length > 0 && (
              <div className="sticky top-14 z-30 bg-card border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedItems.length === watchlistItems.length}
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
                      onClick={() => handleMoveToWishlist(selectedItems)}
                      className="text-xs"
                    >
                      <Plus size={14} className="mr-1" />
                      Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveSelected}
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
            <div className="px-4 py-4 space-y-4">
              {sortedItems.map((item) => (
                <WatchlistCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={() => handleItemSelect(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                  onMoveToWishlist={() => handleMoveToWishlist([item.id])}
                />
              ))}
            </div>

            {/* Smart Recommendations */}
            <SmartRecommendations />
          </>
        )}
      </div>
    </div>
  );
}
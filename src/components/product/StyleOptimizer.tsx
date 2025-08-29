import { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StyleOptimizerProps {
  productId: string;
}

const optimizerChips = [
  { id: 'color', label: 'Match by Color', active: true },
  { id: 'occasion', label: 'Occasion', active: false },
  { id: 'trend', label: 'Trend', active: false }
];

const styledPicks = [
  {
    id: 1,
    name: 'Denim Jacket',
    price: 159.90,
    image: '/placeholder.svg',
    rating: 4.5,
    category: 'jacket'
  },
  {
    id: 2,
    name: 'White Sneakers',
    price: 129.90,
    image: '/placeholder.svg',
    rating: 4.8,
    category: 'shoes'
  },
  {
    id: 3,
    name: 'Canvas Tote',
    price: 49.90,
    image: '/placeholder.svg',
    rating: 4.3,
    category: 'bag'
  },
  {
    id: 4,
    name: 'Gold Necklace',
    price: 89.90,
    image: '/placeholder.svg',
    rating: 4.6,
    category: 'accessory'
  }
];

export function StyleOptimizer({ productId }: StyleOptimizerProps) {
  const [activeChip, setActiveChip] = useState('color');
  const [layout, setLayout] = useState<'grid' | 'carousel'>('grid');

  const handleAddToCart = (itemId: number) => {
    console.log('Adding styled pick to cart:', itemId);
  };

  const handleAddAllToCart = () => {
    console.log('Adding all styled picks to cart');
  };

  const handleCustomizeLook = () => {
    console.log('Navigate to style optimizer page');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-text-primary">Style Optimizer</h3>
      </div>
      
      <p className="text-sm text-text-secondary">
        AI-powered picks to match your look
      </p>

      {/* Toggle Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {optimizerChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveChip(chip.id)}
            className={`fashion-chip flex-shrink-0 ${
              activeChip === chip.id ? 'fashion-chip-active' : ''
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Layout Toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-text-secondary">View:</span>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setLayout('grid')}
            className={`px-3 py-1 text-sm transition-colors ${
              layout === 'grid' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background hover:bg-secondary'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setLayout('carousel')}
            className={`px-3 py-1 text-sm transition-colors ${
              layout === 'carousel' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background hover:bg-secondary'
            }`}
          >
            Carousel
          </button>
        </div>
      </div>

      {/* Styled Picks */}
      <div className="fashion-card p-4">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {styledPicks.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-sm font-bold text-price-color">
                    RM {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {styledPicks.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-32 space-y-2">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="absolute bottom-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-text-primary line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-price-color">
                    RM {item.price.toFixed(2)}
                  </p>
                  {item.rating && (
                    <p className="text-xs text-text-secondary">
                      ★ {item.rating}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4 pt-4 border-t border-border">
          <Button 
            onClick={handleAddAllToCart}
            className="flex-1 fashion-button-primary"
          >
            Add All to Bag
          </Button>
          <Button 
            variant="outline"
            onClick={handleCustomizeLook}
            className="px-4"
          >
            Customize Look
          </Button>
        </div>
      </div>
    </div>
  );
}
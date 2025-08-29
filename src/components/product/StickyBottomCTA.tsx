import { Heart, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StickyBottomCTAProps {
  isFavorite: boolean;
  canAddToCart: boolean;
  selectedColor: string;
  selectedSize: string;
  onFavoriteToggle: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function StickyBottomCTA({
  isFavorite,
  canAddToCart,
  selectedColor,
  selectedSize,
  onFavoriteToggle,
  onAddToCart,
  onBuyNow
}: StickyBottomCTAProps) {
  const getHelperText = () => {
    if (!selectedColor && !selectedSize) {
      return 'Select color and size';
    } else if (!selectedColor) {
      return 'Select a color';
    } else if (!selectedSize) {
      return 'Select a size';
    }
    return '';
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-40">
      <div className="bg-card/95 backdrop-blur-xl border-t border-border p-4">
        {!canAddToCart && (
          <p className="text-sm text-text-muted text-center mb-2">
            {getHelperText()}
          </p>
        )}
        
        <div className="flex items-center space-x-3">
          {/* Favorite Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onFavoriteToggle}
            className="w-12 h-12 rounded-xl flex-shrink-0"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : ''
              }`} 
            />
          </Button>

          {/* Add to Cart Button */}
          <Button
            onClick={onAddToCart}
            disabled={!canAddToCart}
            className="flex-1 h-12 rounded-xl font-semibold fashion-button-primary"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>

          {/* Buy Now Button */}
          <Button
            variant="outline"
            onClick={onBuyNow}
            disabled={!canAddToCart}
            className="px-4 h-12 rounded-xl font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Zap className="w-4 h-4 mr-1" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
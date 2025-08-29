import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface HeroMediaCarouselProps {
  images: string[];
  badges: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export function HeroMediaCarousel({ 
  images, 
  badges, 
  stockStatus 
}: HeroMediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getStockBadgeVariant = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'default';
      case 'low-stock':
        return 'secondary';
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStockBadgeText = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'In Stock';
    }
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden bg-secondary-muted">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      {/* Badges Overlay */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge 
            key={index} 
            variant={badge.includes('%') || badge.includes('SALE') ? 'destructive' : 'default'}
            className="text-xs font-bold backdrop-blur-sm"
          >
            {badge}
          </Badge>
        ))}
        
        <Badge 
          variant={getStockBadgeVariant()}
          className="text-xs font-medium backdrop-blur-sm"
        >
          {getStockBadgeText()}
        </Badge>
      </div>

      {/* Image Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-primary' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
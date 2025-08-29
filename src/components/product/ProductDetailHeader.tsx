import { useState, useEffect } from 'react';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductDetailHeaderProps {
  product: {
    name: string;
    price: number;
    salePrice?: number;
  };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onBack: () => void;
}

export function ProductDetailHeader({ 
  product, 
  isFavorite, 
  onFavoriteToggle, 
  onBack 
}: ProductDetailHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const displayPrice = product.salePrice || product.price;

  return (
    <header className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {isScrolled && (
          <div className="flex-1 mx-4 animate-fade-in">
            <h1 className="text-sm font-semibold text-text-primary truncate">
              {product.name}
            </h1>
            <p className="text-xs text-text-secondary">
              RM {displayPrice.toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <Share className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavoriteToggle}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : ''
              }`} 
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
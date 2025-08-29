import { ArrowRight, Plus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import sneakersImage from '@/assets/sneakers-white.jpg';
import toteImage from '@/assets/tote-bag-beige.jpg';
import beltImage from '@/assets/belt-brown.jpg';

interface RecommendationItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  rating: number;
  isWatched?: boolean;
}

const mockRecommendations: RecommendationItem[] = [
  {
    id: 'rec1',
    name: 'Leather Sneakers',
    brand: 'Adidas',
    image: sneakersImage,
    price: 189,
    rating: 4.5
  },
  {
    id: 'rec2',
    name: 'Canvas Tote Bag',
    brand: 'Everlane',
    image: toteImage,
    price: 129,
    rating: 4.3
  },
  {
    id: 'rec3',
    name: 'Classic Belt',
    brand: 'Coach',
    image: beltImage,
    price: 159,
    rating: 4.7
  }
];

export function SmartRecommendations() {
  const navigate = useNavigate();

  const handleAddToWatchlist = (item: RecommendationItem) => {
    console.log('Adding to watchlist:', item.name);
  };

  const handleQuickAdd = (item: RecommendationItem) => {
    console.log('Quick add to cart:', item.name);
  };

  return (
    <section className="px-4 py-6 bg-gradient-to-b from-transparent to-secondary/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Trending in Watchlist
          </h3>
          <p className="text-sm text-text-muted">
            Popular items others are watching
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/catalog')}
          className="text-text-muted hover:text-text-primary"
        >
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-2">
        {mockRecommendations.map((item) => (
          <div
            key={item.id}
            className="min-w-[140px] bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-20 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWatchlist(item);
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-white/80 hover:bg-white text-text-secondary"
              >
                <Heart size={12} />
              </Button>
            </div>

            <div className="p-3 space-y-2">
              <div>
                <h4 className="font-medium text-text-primary text-sm leading-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-text-muted">{item.brand}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-primary text-sm">
                  RM{item.price}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-accent-warm">★</span>
                  <span className="text-xs text-text-muted">{item.rating}</span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAdd(item);
                }}
                className="w-full text-xs"
              >
                <Plus size={12} className="mr-1" />
                Quick Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
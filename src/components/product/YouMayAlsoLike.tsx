import { Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YouMayAlsoLikeProps {
  currentProductId: string;
}

const relatedProducts = [
  {
    id: 2,
    name: 'Organic Cotton Tee',
    price: 79.90,
    salePrice: 63.92,
    image: '/placeholder.svg',
    rating: 4.4,
    reviewCount: 89,
    colors: ['#FFFFFF', '#000000', '#8B5CF6'],
    badge: 'ORGANIC'
  },
  {
    id: 3,
    name: 'Classic V-Neck',
    price: 69.90,
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 156,
    colors: ['#EF4444', '#3B82F6', '#10B981'],
    badge: 'BESTSELLER'
  },
  {
    id: 4,
    name: 'Oversized Fit Tee',
    price: 89.90,
    image: '/placeholder.svg',
    rating: 4.3,
    reviewCount: 72,
    colors: ['#F59E0B', '#EC4899', '#6366F1']
  },
  {
    id: 5,
    name: 'Striped Long Sleeve',
    price: 99.90,
    salePrice: 79.92,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 203,
    colors: ['#1F2937', '#6B7280'],
    badge: '-20%'
  }
];

export function YouMayAlsoLike({ currentProductId }: YouMayAlsoLikeProps) {
  const handleAddToCart = (productId: number) => {
    console.log('Adding to cart:', productId);
  };

  const handleToggleWishlist = (productId: number) => {
    console.log('Toggle wishlist:', productId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-text-primary">
        You May Also Like
      </h3>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40 product-card">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg bg-secondary-muted"
              />
              
              {product.badge && (
                <span className="absolute top-2 left-2 text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              
              <button
                onClick={() => handleToggleWishlist(product.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all duration-200"
              >
                <Heart size={12} className="text-text-secondary" />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-text-primary text-sm line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-xs text-yellow-500">★</span>
                  <span className="text-xs text-text-secondary">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="fashion-price text-sm">
                  RM {(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-xs text-text-muted line-through">
                    RM {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {product.colors && (
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-text-muted">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}

              <Button
                onClick={() => handleAddToCart(product.id)}
                size="sm"
                className="w-full h-8 text-xs fashion-button-primary"
              >
                <Plus size={12} className="mr-1" />
                Quick Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
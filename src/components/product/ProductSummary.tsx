import { Star } from 'lucide-react';

interface ProductSummaryProps {
  product: {
    name: string;
    brand: string;
    price: number;
    salePrice?: number;
    discountPercent?: number;
    rating: number;
    reviewCount: number;
  };
}

export function ProductSummary({ product }: ProductSummaryProps) {
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 pt-16">
      <div>
        <p className="text-sm text-text-secondary font-medium">
          {product.brand}
        </p>
        <h1 className="text-2xl font-bold text-text-primary leading-tight">
          {product.name}
        </h1>
      </div>

      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold text-price-color">
          RM {displayPrice.toFixed(2)}
        </span>
        
        {hasDiscount && (
          <>
            <span className="text-lg text-text-muted line-through">
              RM {product.price.toFixed(2)}
            </span>
            {product.discountPercent && (
              <span className="text-sm font-bold text-discount-color bg-red-50 px-2 py-1 rounded-full">
                -{product.discountPercent}%
              </span>
            )}
          </>
        )}
      </div>

      <button 
        onClick={scrollToReviews}
        className="flex items-center space-x-2 group"
      >
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : i < product.rating
                  ? 'fill-yellow-200 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </button>
    </div>
  );
}
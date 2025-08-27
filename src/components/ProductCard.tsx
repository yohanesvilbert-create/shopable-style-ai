import { Heart, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  tags: string[];
  variants?: string[];
  inStock: boolean;
  onAddToCart: () => void;
  onWishlist: () => void;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating,
  tags,
  variants = [],
  inStock,
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  return (
    <div className="product-card group animate-fade-in">
      {/* Image Container - More compact */}
      <div className="relative aspect-[4/5] mb-2 rounded-lg overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button - Smaller and repositioned */}
        <button
          onClick={onWishlist}
          className="absolute top-2 right-2 w-6 h-6 rounded-full glass flex items-center justify-center hover:bg-primary-glass transition-colors"
        >
          <Heart size={12} className="text-muted-foreground hover:text-primary" />
        </button>
        
        {/* Tags - Smaller */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="glass text-xs px-1.5 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
        
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      {/* Content - More compact */}
      <div className="space-y-2">
        {/* Name & Rating */}
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-medium text-xs leading-tight flex-1 line-clamp-2">{name}</h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={10} className="fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">{rating}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm gradient-text">RM{price}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              RM{originalPrice}
            </span>
          )}
        </div>
        
        {/* Variants - More compact */}
        {variants.length > 0 && (
          <div className="flex gap-1">
            {variants.slice(0, 3).map((variant, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-card-border shadow-sm"
                style={{ backgroundColor: variant }}
              />
            ))}
            {variants.length > 3 && (
              <span className="text-xs text-muted-foreground self-center ml-1">
                +{variants.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Add to Cart Button - Smaller */}
        <Button
          onClick={onAddToCart}
          disabled={!inStock}
          className="w-full glass-button rounded-lg font-medium text-xs py-2"
          variant={inStock ? "default" : "secondary"}
          size="sm"
        >
          <Plus size={12} className="mr-1" />
          {inStock ? "Add" : "Notify"}
        </Button>
      </div>
    </div>
  );
}
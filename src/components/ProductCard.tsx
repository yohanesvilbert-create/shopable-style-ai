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
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={onWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary-glass transition-colors"
        >
          <Heart size={16} className="text-muted-foreground hover:text-primary" />
        </button>
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="glass text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        {/* Name & Rating */}
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm leading-tight flex-1 mr-2">{name}</h3>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{rating}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg gradient-text">RM{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              RM{originalPrice}
            </span>
          )}
        </div>
        
        {/* Variants */}
        {variants.length > 0 && (
          <div className="flex gap-2">
            {variants.slice(0, 4).map((variant, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: variant }}
              />
            ))}
            {variants.length > 4 && (
              <span className="text-xs text-muted-foreground self-center">
                +{variants.length - 4}
              </span>
            )}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <Button
          onClick={onAddToCart}
          disabled={!inStock}
          className="w-full glass-button rounded-xl font-medium"
          variant={inStock ? "default" : "secondary"}
        >
          <Plus size={16} className="mr-2" />
          {inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </div>
    </div>
  );
}
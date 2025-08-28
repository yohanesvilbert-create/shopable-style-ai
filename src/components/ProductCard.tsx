import { Plus, Heart } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  sizes?: string;
  tags?: string[];
  colors?: string[];
  onAdd?: () => void;
  onWishlist?: () => void;
  className?: string;
}

export function ProductCard({
  image,
  name,
  price,
  sizes,
  tags = [],
  colors = [],
  onAdd,
  onWishlist,
  className = ""
}: ProductCardProps) {
  return (
    <div className={`product-card ${className}`}>
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-24 object-cover rounded-lg bg-secondary-muted"
        />
        {onWishlist && (
          <button 
            onClick={onWishlist}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all duration-200"
          >
            <Heart size={14} className="text-text-secondary" />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-text-primary text-sm">{name}</h3>
          {sizes && (
            <p className="text-xs text-text-muted">{sizes}</p>
          )}
        </div>
        
        <p className="fashion-price text-base">{price}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-tag-background text-text-muted text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {colors.length > 0 && (
            <div className="flex space-x-1">
              {colors.map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          
          {onAdd && (
            <button 
              onClick={onAdd}
              className="fashion-button-primary py-2 px-4 text-sm flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
import { Minus, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Color {
  name: string;
  value: string;
  available: boolean;
}

interface Size {
  name: string;
  available: boolean;
}

interface VariantSelectorsProps {
  colors: Color[];
  sizes: Size[];
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
  onSizeGuideOpen: () => void;
}

export function VariantSelectors({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  quantity,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
  onSizeGuideOpen
}: VariantSelectorsProps) {
  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Color</h3>
          {selectedColor && (
            <span className="text-sm text-text-secondary">
              Selected: {selectedColor}
            </span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && onColorSelect(color.name)}
              disabled={!color.available}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color.name
                  ? 'border-primary ring-2 ring-primary/20'
                  : color.available
                  ? 'border-border hover:border-primary/50'
                  : 'border-border opacity-40 cursor-not-allowed'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {!color.available && (
                <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-red-500 rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Size</h3>
          <button
            onClick={onSizeGuideOpen}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <span>Size Guide</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => size.available && onSizeSelect(size.name)}
              disabled={!size.available}
              className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 ${
                selectedSize === size.name
                  ? 'border-primary bg-primary text-primary-foreground'
                  : size.available
                  ? 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                  : 'border-border bg-background opacity-40 cursor-not-allowed line-through'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Quantity</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-l-lg rounded-r-none"
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <span className="w-12 text-center text-lg font-medium">
              {quantity}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-10 h-10 rounded-r-lg rounded-l-none"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <span className="text-sm text-text-secondary">
            Available in stock
          </span>
        </div>
      </div>
    </div>
  );
}
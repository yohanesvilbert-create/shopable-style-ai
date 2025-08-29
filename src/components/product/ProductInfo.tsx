import { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, RotateCcw } from 'lucide-react';

interface ProductInfoProps {
  description: string;
  features: string[];
  shippingInfo: string;
  returnPolicy: string;
}

export function ProductInfo({ 
  description, 
  features, 
  shippingInfo, 
  returnPolicy 
}: ProductInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="fashion-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            Product Details
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
        
        <p className={`text-text-secondary leading-relaxed transition-all duration-300 ${
          isExpanded ? '' : 'line-clamp-2'
        }`}>
          {description}
        </p>
        
        {isExpanded && (
          <div className="mt-4 space-y-2 animate-fade-in">
            <h4 className="font-medium text-text-primary">Key Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Shipping & Returns */}
      <div className="fashion-card p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">Shipping</h4>
            <p className="text-sm text-text-secondary">{shippingInfo}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">Returns</h4>
            <p className="text-sm text-text-secondary">{returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
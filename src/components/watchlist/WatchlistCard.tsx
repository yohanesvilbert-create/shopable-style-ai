import { useState } from 'react';
import { Heart, Trash2, Eye, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { PriceChart } from './PriceChart';

interface WatchlistItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  stockStatus: 'in-stock' | 'out-of-stock' | 'back-soon';
  priceHistory: number[];
  priceDropAmount?: number;
  aiInsight?: string;
  addedDate: string;
}

interface WatchlistCardProps {
  item: WatchlistItem;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveToWishlist: () => void;
}

export function WatchlistCard({
  item,
  isSelected,
  onSelect,
  onRemove,
  onMoveToWishlist
}: WatchlistCardProps) {
  const navigate = useNavigate();
  const [showChart, setShowChart] = useState(false);
  const [notifyWhenInStock, setNotifyWhenInStock] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }
    navigate(`/product/${item.id}`);
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'text-success bg-success/10';
      case 'out-of-stock':
        return 'text-destructive bg-destructive/10';
      case 'back-soon':
        return 'text-accent-warm bg-accent-warm/10';
      default:
        return 'text-text-muted bg-secondary';
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      case 'back-soon':
        return 'Back in Stock Soon';
      default:
        return status;
    }
  };

  const lowestPrice = Math.min(...item.priceHistory);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Price Drop Banner */}
      {item.priceDropAmount && (
        <div className="bg-success/10 border-b border-success/20 px-4 py-2">
          <div className="flex items-center space-x-2">
            <TrendingDown size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              Price dropped RM{item.priceDropAmount} since added
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="mt-1"
          />

          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg bg-secondary cursor-pointer"
              onClick={handleCardClick}
            />
            
            {/* Watching Badge */}
            <Badge className="absolute -top-2 -right-2 text-xs bg-primary text-primary-foreground">
              <Eye size={12} className="mr-1" />
              Watching
            </Badge>

            {/* Price Drop/Stock Badge */}
            {item.priceDropAmount ? (
              <Badge className="absolute -bottom-2 -left-2 text-xs bg-success text-white">
                🔥 Price Drop
              </Badge>
            ) : item.stockStatus === 'back-soon' ? (
              <Badge className="absolute -bottom-2 -left-2 text-xs bg-accent-warm text-white">
                ⏳ Back Soon
              </Badge>
            ) : null}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0" onClick={handleCardClick}>
            <div className="cursor-pointer">
              <h3 className="font-semibold text-text-primary text-sm leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-text-muted">{item.brand}</p>
              
              {/* Price */}
              <div className="flex items-center space-x-2 mt-1">
                <span className="font-bold text-text-primary">
                  RM{item.currentPrice.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <>
                    <span className="text-xs text-text-muted line-through">
                      RM{item.originalPrice.toFixed(2)}
                    </span>
                    {item.discount && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        -{item.discount}%
                      </Badge>
                    )}
                  </>
                )}
              </div>

              {/* Stock Status */}
              <Badge className={`mt-2 text-xs ${getStockStatusColor(item.stockStatus)}`}>
                {getStockStatusText(item.stockStatus)}
              </Badge>
            </div>

            {/* Price Chart */}
            {showChart && (
              <div className="mt-3 p-3 bg-secondary/30 rounded-lg">
                <PriceChart priceHistory={item.priceHistory} />
                <p className="text-xs text-text-muted mt-2">
                  Lowest seen: RM{lowestPrice.toFixed(2)}
                </p>
              </div>
            )}

            {/* AI Insight */}
            {item.aiInsight && (
              <div className="mt-3 p-3 bg-info/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={14} className="text-info mt-0.5" />
                  <p className="text-xs text-info">{item.aiInsight}</p>
                </div>
              </div>
            )}

            {/* Out of Stock Notification */}
            {item.stockStatus === 'out-of-stock' && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  Notify when back in stock
                </span>
                <Switch
                  checked={notifyWhenInStock}
                  onCheckedChange={setNotifyWhenInStock}
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="text-xs text-text-muted hover:text-text-primary"
          >
            <TrendingUp size={14} className="mr-1" />
            {showChart ? 'Hide' : 'Show'} Chart
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveToWishlist}
              className="text-xs"
            >
              <Heart size={14} className="mr-1" />
              Wishlist
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="text-xs text-destructive hover:text-destructive"
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
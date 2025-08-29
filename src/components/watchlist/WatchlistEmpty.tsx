import { Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchlistEmptyProps {
  onStartShopping: () => void;
}

export function WatchlistEmpty({ onStartShopping }: WatchlistEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <Eye size={32} className="text-text-muted" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-warm/20 rounded-full flex items-center justify-center">
          <span className="text-lg">👀</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-text-primary">
          No items in your watchlist
        </h2>
        <p className="text-text-muted max-w-sm">
          Start tracking products to get alerts when prices drop or items come back in stock.
        </p>
      </div>

      {/* CTA */}
      <Button
        onClick={onStartShopping}
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
      >
        <ShoppingBag size={18} className="mr-2" />
        Start Shopping
      </Button>

      {/* Additional Info */}
      <div className="mt-8 space-y-2 text-sm text-text-muted">
        <p className="flex items-center justify-center space-x-2">
          <span>🔥</span>
          <span>Get notified of price drops</span>
        </p>
        <p className="flex items-center justify-center space-x-2">
          <span>⏳</span>
          <span>Track restock alerts</span>
        </p>
        <p className="flex items-center justify-center space-x-2">
          <span>💡</span>
          <span>Receive AI insights</span>
        </p>
      </div>
    </div>
  );
}
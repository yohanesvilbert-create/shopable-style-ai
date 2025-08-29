import { ShoppingBag, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  title?: string;
  showProfile?: boolean;
}

export function AppHeader({ title = "ShopAble Fashion", showProfile = true }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <ShoppingBag 
            size={18} 
            className="text-text-primary" 
            strokeWidth={1.5}
          />
        </div>
        <h1 className="text-lg font-bold text-text-primary">{title}</h1>
      </div>
      
      {showProfile && (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate('/wishlist')}
            className="w-9 h-9 rounded-full border border-border/60 bg-card flex items-center justify-center hover:border-border hover:shadow-sm transition-all duration-200"
          >
            <Heart 
              size={16} 
              className="text-text-secondary" 
              strokeWidth={1.5}
            />
          </button>
          <button className="w-9 h-9 rounded-full border border-border/60 bg-card flex items-center justify-center hover:border-border hover:shadow-sm transition-all duration-200">
            <User 
              size={16} 
              className="text-text-secondary" 
              strokeWidth={1.5}
            />
          </button>
        </div>
      )}
    </header>
  );
}
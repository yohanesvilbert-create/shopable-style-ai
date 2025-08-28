import { Home, Users, Shirt, ShoppingBag, Trophy } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/stylist', icon: Users, label: 'Stylist' },
  { path: '/looks', icon: Shirt, label: 'Looks' },
  { path: '/bag', icon: ShoppingBag, label: 'Bag' },
  { path: '/loyalty', icon: Trophy, label: 'Loyalty' }
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-primary bg-chip-background' 
                  : 'text-text-secondary hover:text-primary'
              }`
            }
          >
            <Icon size={20} className={`transition-colors duration-200`} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
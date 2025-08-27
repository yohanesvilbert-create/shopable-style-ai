import { Home, Sparkles, Eye, ShoppingBag, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "stylist", label: "Stylist", icon: Sparkles },
  { id: "looks", label: "Looks", icon: Eye },
  { id: "bag", label: "Bag", icon: ShoppingBag },
  { id: "loyalty", label: "Loyalty", icon: Crown },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 nav-glass z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-primary-foreground scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:bg-primary-glass"
              )}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
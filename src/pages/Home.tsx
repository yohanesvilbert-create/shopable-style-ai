import { Search, Bell, User, Calendar, Clock } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const styleCapsules = [
  { title: "Interview Outfit", budget: "< RM500", color: "bg-gradient-primary" },
  { title: "City-Weekend", budget: "Capsule", color: "bg-gradient-secondary" },
  { title: "Date Night", budget: "< RM800", color: "bg-gradient-accent" },
];

const alerts = [
  { type: "drop", title: "Sneaker Week", timeLeft: "3 days left", icon: Calendar },
  { type: "restock", title: "Mini Crossbody (Khaki)", subtitle: "Watchlist", icon: Clock },
];

const trendingPicks = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/400",
    rating: 4.8,
    tags: ["New", "Trending"],
    variants: ["#000000", "#333333", "#8B4513"],
    inStock: true,
  },
  {
    id: 2,
    name: "High-Waist Trousers",
    price: 179,
    image: "/api/placeholder/300/400",
    rating: 4.6,
    tags: ["Bestseller"],
    variants: ["#000000", "#8B4513", "#2F4F4F"],
    inStock: true,
  },
  {
    id: 3,
    name: "Leather Ankle Boots",
    price: 449,
    image: "/api/placeholder/300/400",
    rating: 4.9,
    tags: ["Premium"],
    variants: ["#8B4513", "#000000"],
    inStock: false,
  },
];

const finishLookItems = [
  {
    id: 4,
    name: "Structured Tote Bag",
    price: 229,
    image: "/api/placeholder/300/400",
    rating: 4.7,
    tags: ["Complete"],
    inStock: true,
  },
  {
    id: 5,
    name: "Gold Chain Necklace",
    price: 89,
    image: "/api/placeholder/300/400",
    rating: 4.5,
    tags: ["Accent"],
    inStock: true,
  },
];

export function Home() {
  const handleAddToCart = (productId: number) => {
    console.log("Add to cart:", productId);
  };

  const handleWishlist = (productId: number) => {
    console.log("Add to wishlist:", productId);
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-2xl font-bold gradient-text">ShopAble</h1>
          <p className="text-muted-foreground">Good morning, Sarah ✨</p>
        </div>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <User size={20} className="text-muted-foreground" />
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search items, looks, styles..."
          className="glass-input pl-12 text-base"
        />
      </div>

      {/* Welcome Section - Style Capsules */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Style Capsules</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {styleCapsules.map((capsule, index) => (
            <div
              key={index}
              className={`${capsule.color} p-4 rounded-2xl min-w-[140px] text-white animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-medium text-sm mb-1">{capsule.title}</h3>
              <p className="text-xs opacity-90">{capsule.budget}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Alerts */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Alerts</h2>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div key={index} className="glass-card flex items-center gap-3 animate-slide-up">
                <div className="w-10 h-10 rounded-xl bg-primary-glass flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{alert.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {alert.subtitle || alert.timeLeft}
                  </p>
                </div>
                <Bell size={16} className="text-muted-foreground" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Picks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Trending Picks</h2>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {trendingPicks.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              tags={product.tags}
              variants={product.variants}
              inStock={product.inStock}
              onAddToCart={() => handleAddToCart(product.id)}
              onWishlist={() => handleWishlist(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Finish Your Look */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Finish Your Look</h2>
        <div className="grid grid-cols-2 gap-4">
          {finishLookItems.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              tags={product.tags}
              inStock={product.inStock}
              onAddToCart={() => handleAddToCart(product.id)}
              onWishlist={() => handleWishlist(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
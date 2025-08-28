import { Search, Scan, Calendar, Package, ArrowRight, Clock, Bookmark } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { StyleChip } from '@/components/StyleChip';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import sneakersImage from '@/assets/sneakers-white.jpg';
import toteImage from '@/assets/tote-bag-beige.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';
import beltImage from '@/assets/belt-brown.jpg';

export default function HomePage() {
  const navigate = useNavigate();
  
  const handleStyleClick = (style: string) => {
    navigate('/stylist', { state: { selectedStyle: style } });
  };

  const styleCapsules = [
    "Interview Outfit < RM500",
    "City-Weekend Capsule", 
    "Wedding Guest Look"
  ];

  const trendingProducts = [
    {
      image: sneakersImage,
      name: "Classic White Sneakers",
      price: "RM259.00",
      sizes: "Size 5-11",
      tags: ["minimal", "leather"],
      colors: ["#000000", "#ffffff", "#d4c4a0"]
    },
    {
      image: toteImage,
      name: "Structured Zip Tote",
      price: "RM359.00", 
      sizes: "One Size",
      tags: ["structured", "work"],
      colors: ["#d4c4a0", "#8B4513", "#000000"]
    }
  ];

  const finishLookItems = [
    {
      image: beltImage,
      name: "Premium Leather Belt",
      price: "RM129.00",
      description: "Complements your style goals"
    },
    {
      image: crossbodyImage,
      name: "Mini Crossbody",
      price: "RM219.00",
      description: "Perfect for essentials"
    }
  ];

  return (
    <div className="mobile-container">
      <AppHeader />
      
      <div className="mobile-page pt-4 space-y-6">
        {/* Welcome & Style Plans */}
        <section>
          <Card className="bg-card">
            <CardHeader>
              <h2 className="text-xl font-bold text-text-primary">Welcome back</h2>
              <p className="text-lg text-text-secondary">Let's plan your next look</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1">
                {styleCapsules.map((capsule, index) => (
                  <StyleChip 
                    key={index} 
                    className="w-full flex justify-center items-center text-center"
                    onClick={() => handleStyleClick(capsule)}
                  >
                    {capsule}
                  </StyleChip>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Search Bar */}
        <section>
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search items, looks, styles…"
              className="w-full pl-12 pr-12 py-3 bg-input border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Scan size={20} className="absolute right-4 top-3.5 text-text-muted" />
          </div>
        </section>

        {/* Quick Alerts */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            <div className="alert-card">
              <Calendar size={20} className="text-accent-warm flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">Sneaker Week:</p>
                <p className="text-xs text-text-muted">3 days left</p>
              </div>
            </div>
            
            <div className="alert-card">
              <Bookmark size={20} className="text-info flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">Mini Crossbody (Khaki)</p>
                <p className="text-xs text-text-muted">Watchlist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Picks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">Trending Picks</h3>
            <ArrowRight size={20} className="text-text-muted" />
          </div>
          
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {trendingProducts.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                onAdd={() => console.log('Add to cart:', product.name)}
                onWishlist={() => console.log('Add to wishlist:', product.name)}
                className="min-w-[160px]"
              />
            ))}
          </div>
        </section>

        {/* Finish Your Look */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Finish Your Look</h3>
          
          <div className="space-y-3">
            {finishLookItems.map((item, index) => (
              <div key={index} className="fashion-card p-4 flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-secondary-muted"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary text-sm">{item.name}</h4>
                  <p className="text-xs text-text-muted">{item.description}</p>
                  <p className="fashion-price text-sm mt-1">{item.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="fashion-button-secondary py-2 px-4 text-xs">
                    Wishlist
                  </button>
                  <button className="fashion-button-primary py-2 px-4 text-xs">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
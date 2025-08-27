import { Minus, Plus, Info, ArrowRight, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const cartItems = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 299,
    originalPrice: 399,
    size: "M",
    material: "Wool Blend",
    quantity: 1,
    image: "/api/placeholder/100/120",
    fitInfo: "Runs slightly large",
  },
  {
    id: 2,
    name: "High-Waist Trousers",
    price: 179,
    size: "S",
    material: "Cotton",
    quantity: 2,
    image: "/api/placeholder/100/120",
    fitInfo: "True to size",
  },
];

const betterPicks = [
  {
    id: 1,
    current: "Classic Sneakers",
    suggested: "Premium Leather Sneakers",
    reason: "Longer-lasting outsole",
    priceDiff: 50,
    image: "/api/placeholder/80/100",
  },
];

const completeTheLook = [
  {
    id: 1,
    name: "Leather Tote Bag",
    price: 249,
    image: "/api/placeholder/80/100",
    reason: "Perfect for work essentials",
  },
  {
    id: 2,
    name: "Gold Watch",
    price: 189,
    image: "/api/placeholder/80/100",
    reason: "Adds professional touch",
  },
];

export function Bag() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="py-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Bag</h1>
        <p className="text-muted-foreground">Smart cart & optimizer</p>
      </header>

      {items.length === 0 ? (
        /* Empty Bag */
        <div className="glass-card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Plus size={24} className="text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Your bag is empty</h2>
          <p className="text-muted-foreground mb-6">Start adding items to create your perfect look</p>
          <Button className="glass-button">
            Explore Products
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Cart Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size {item.size} • {item.material}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-destructive-glass"
                        >
                          <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold gradient-text">RM{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            RM{item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Fit Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <Info size={14} className="text-accent" />
                        <span className="text-sm text-muted-foreground">{item.fitInfo}</span>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full glass flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Style Optimizer */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Style Optimizer</h2>
            
            {/* Better Picks */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Better Picks</h3>
              <div className="space-y-3">
                {betterPicks.map((pick, index) => (
                  <div key={pick.id} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={pick.image} 
                          alt={pick.suggested}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Instead of {pick.current}</p>
                        <h4 className="font-medium mb-1">{pick.suggested}</h4>
                        <p className="text-sm text-accent mb-2">{pick.reason}</p>
                        <Badge variant="outline" className="glass">
                          +RM{pick.priceDiff}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="glass-button">
                        Swap
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete the Look */}
            <div>
              <h3 className="font-medium mb-3">Complete the Look</h3>
              <div className="grid grid-cols-1 gap-3">
                {completeTheLook.map((item, index) => (
                  <div key={item.id} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
                        <span className="font-medium gradient-text">RM{item.price}</span>
                      </div>
                      <Button size="sm" className="glass-button">
                        <Plus size={14} className="mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="mb-8">
            <div className="glass-card">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">RM{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-accent">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold gradient-text">RM{total}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full glass-button font-medium text-lg py-3">
                Checkout
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
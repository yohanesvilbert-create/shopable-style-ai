import { Minus, Plus, Star, ArrowUpDown } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { ProductCard } from '@/components/ProductCard';
import toteImage from '@/assets/tote-bag-beige.jpg';
import sneakersImage from '@/assets/sneakers-white.jpg';
import beltImage from '@/assets/belt-brown.jpg';

export default function BagPage() {
  const cartItems = [
    {
      image: toteImage,
      name: "Structured Zip Tote",
      price: "RM359.00",
      quantity: 1,
      fitTip: "Perfect size for essentials"
    },
    {
      image: sneakersImage,
      name: "Classic White Sneakers", 
      price: "RM259.00",
      quantity: 1,
      fitTip: "Runs slightly large"
    }
  ];

  const recommendations = [
    {
      image: beltImage,
      name: "Soft Tote Bag",
      price: "RM299.00"
    },
    {
      image: beltImage,
      name: "Leather Belt",
      price: "RM129.00"
    }
  ];

  const subtotal = 618.00;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="mobile-container">
      <AppHeader title="Shopping Bag" />
      
      <div className="mobile-page pt-4 space-y-6">
        {/* Cart Items */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4">Your Items</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="fashion-card p-4">
                <div className="flex space-x-4">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-secondary-muted"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">{item.name}</h3>
                      <p className="fashion-price">{item.price}</p>
                      <p className="text-xs text-text-muted">Fit tip: {item.fitTip}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-secondary-muted rounded-lg p-1">
                        <button className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:shadow-md transition-all duration-200">
                          <Minus size={14} className="text-text-secondary" />
                        </button>
                        <span className="text-sm font-medium text-text-primary px-2">{item.quantity}</span>
                        <button className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:shadow-md transition-all duration-200">
                          <Plus size={14} className="text-text-secondary" />
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
        <section>
          <div className="fashion-card p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-accent-gold" fill="currentColor" />
              <h3 className="text-lg font-bold text-text-primary">Style Optimizer</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary-muted rounded-lg">
                <h4 className="font-semibold text-text-primary text-sm mb-1">Better Pick</h4>
                <p className="text-sm text-text-secondary mb-2">
                  Try Premium Leather Sneakers - longer-lasting outsole
                </p>
                <button className="fashion-button-secondary py-2 px-4 text-xs flex items-center space-x-1">
                  <ArrowUpDown size={12} />
                  <span>Swap</span>
                </button>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary text-sm mb-3">Complete the Look</h4>
                <div className="flex overflow-x-auto space-x-3 pb-2">
                  {recommendations.map((product, index) => (
                    <ProductCard
                      key={index}
                      {...product}
                      onAdd={() => console.log('Add to cart:', product.name)}
                      className="min-w-[140px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <div className="fashion-card p-4 space-y-4">
            <h3 className="text-lg font-bold text-text-primary">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary font-medium">RM{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-success font-medium">FREE</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-text-primary">Total</span>
                  <span className="text-lg font-bold text-text-primary">RM{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full fashion-button-primary py-4 text-lg font-semibold">
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
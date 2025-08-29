import { useState } from 'react';
import { Minus, Plus, Star, ArrowUpDown, ChevronRight, ChevronDown, Truck } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toteImage from '@/assets/tote-bag-beige.jpg';
import sneakersImage from '@/assets/sneakers-white.jpg';
import beltImage from '@/assets/belt-brown.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';

export default function BagPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: toteImage,
      name: "Structured Zip Tote",
      price: 359.00,
      quantity: 1,
      size: "Medium",
      color: "Beige",
      fitRisk: "Runs small — most customers chose Size L",
      inStock: true
    },
    {
      id: 2,
      image: sneakersImage,
      name: "Classic White Sneakers", 
      price: 259.00,
      quantity: 1,
      size: "US 8",
      color: "White",
      fitRisk: null,
      inStock: true
    }
  ]);

  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('standard');
  const [selectedVendor, setSelectedVendor] = useState('jne');
  const [promoCode, setPromoCode] = useState('');
  const [currentInsight, setCurrentInsight] = useState(0);
  const [showSmartNudge, setShowSmartNudge] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [appliedDiscounts, setAppliedDiscounts] = useState<string[]>([]);
  const [discountsExpanded, setDiscountsExpanded] = useState(false);

  const betterPicks = [
    {
      id: 1,
      name: "Premium Leather Tote",
      price: 399.00,
      originalPrice: 359.00,
      reason: "Better material quality"
    },
    {
      id: 2,
      name: "Athletic Comfort Sneakers",
      price: 279.00,
      originalPrice: 259.00,
      reason: "Enhanced arch support"
    }
  ];

  const completeTheLook = [
    {
      image: crossbodyImage,
      name: "Crossbody Chain Bag",
      price: "RM189.00",
      description: "Perfect evening companion"
    },
    {
      image: beltImage,
      name: "Leather Belt",
      price: "RM129.00",
      description: "Completes your casual look"
    }
  ];

  const shippingMethods = {
    standard: { name: 'Standard', price: 0, time: '3–5 days' },
    express: { name: 'Express', price: 8.99, time: '1–2 days' },
    sameday: { name: 'Same-day', price: 15.99, time: 'within 9 hours' }
  };

  const vendors = {
    standard: [
      { id: 'jne', name: 'JNE Regular', rating: 4.2 },
      { id: 'pos', name: 'POS Indonesia', rating: 4.0 }
    ],
    express: [
      { id: 'dhl', name: 'DHL Express', rating: 4.8 },
      { id: 'jnt', name: 'J&T Express', rating: 4.5 }
    ],
    sameday: [
      { id: 'gosend', name: 'GoSend', rating: 4.6 },
      { id: 'grab', name: 'GrabExpress', rating: 4.4 }
    ]
  };

  const aiInsights = [
    { icon: '💰', text: "You saved RM45 with ongoing discounts" },
    { icon: '📉', text: "This tote is at its lowest price in 90 days" },
    { icon: '🌱', text: "Your choices reduced CO₂ by 2kg vs alternatives" }
  ];

  const availableDiscounts = [
    {
      id: 'fashion15',
      title: '15% OFF Fashion Voucher',
      description: 'Save RM25 on your order',
      savings: 25.00,
      expiry: 'Expires in 2 days',
      type: 'voucher',
      eligible: true,
      stackable: false
    },
    {
      id: 'loyalty500',
      title: 'Use 500 Loyalty Points',
      description: 'Convert points to RM5 off',
      savings: 5.00,
      expiry: 'Points don\'t expire',
      type: 'loyalty',
      eligible: true,
      stackable: true
    },
    {
      id: 'bcacard',
      title: 'BCA Card 5% Cashback',
      description: 'Extra 5% cashback (applied instantly)',
      savings: 15.45,
      expiry: 'Limited time offer',
      type: 'payment',
      eligible: true,
      stackable: true
    },
    {
      id: 'flashsale',
      title: 'Flash Sale 20% OFF',
      description: 'Limited time flash discount',
      savings: 35.80,
      expiry: 'Ends in 1h 20m',
      type: 'flash',
      eligible: true,
      stackable: false,
      urgent: true
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethods[selectedMethod].price;
  const discount = 25.00;
  const total = subtotal + shipping - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const currentVendors = vendors[selectedMethod] || [];

  // Discount management functions
  const applyPromoCode = () => {
    if (promoCode.trim()) {
      // Simulate promo code application
      console.log('Applying promo code:', promoCode);
      setPromoCode('');
    }
  };

  const toggleDiscount = (discountId: string) => {
    const discount = availableDiscounts.find(d => d.id === discountId);
    if (!discount) return;

    if (selectedDiscounts.includes(discountId)) {
      setSelectedDiscounts(prev => prev.filter(id => id !== discountId));
    } else {
      if (!discount.stackable) {
        // If not stackable, replace other non-stackable discounts
        const newSelected = selectedDiscounts.filter(id => {
          const existing = availableDiscounts.find(d => d.id === id);
          return existing?.stackable;
        });
        setSelectedDiscounts([...newSelected, discountId]);
      } else {
        setSelectedDiscounts(prev => [...prev, discountId]);
      }
    }
  };

  const applyBestDeals = () => {
    // AI logic to select optimal discount combination
    const bestCombination = availableDiscounts
      .filter(d => d.eligible)
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 2); // Take top 2 for demo
    
    setSelectedDiscounts(bestCombination.map(d => d.id));
    setAppliedDiscounts(bestCombination.map(d => d.id));
  };

  const totalDiscountSavings = selectedDiscounts.reduce((sum, id) => {
    const discount = availableDiscounts.find(d => d.id === id);
    return sum + (discount?.savings || 0);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <AppHeader title="Shopping Bag" />
      
      <div className="px-3 pt-4 space-y-4">
        {/* Your Items */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Items</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex space-x-3">
                  {/* Image - 25% width */}
                  <div className="w-1/4">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Details - 75% width */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                      <div className="flex space-x-2 mt-1">
                        <Select defaultValue={item.size}>
                          <SelectTrigger className="w-20 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="S">S</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="XL">XL</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={item.color}>
                          <SelectTrigger className="w-20 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beige">Beige</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="White">White</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="font-bold text-gray-900">RM{item.price.toFixed(2)}</p>
                    </div>
                    
                    {/* AI Fit Risk Predictor */}
                    {item.fitRisk && (
                      <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2">
                        <p className="text-xs text-yellow-800">{item.fitRisk}</p>
                        <Button variant="outline" size="sm" className="h-6 text-xs mt-1">
                          Change Size
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:shadow-md transition-all"
                        >
                          <Minus size={14} className="text-gray-600" />
                        </button>
                        <span className="text-sm font-medium px-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:shadow-md transition-all"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-600 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Style Optimizer */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-black" fill="currentColor" />
              <h3 className="text-lg font-semibold text-gray-900">Style Optimizer</h3>
            </div>
            
            {/* Better Picks */}
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-3">Better Picks</h4>
              <div className="space-y-2">
                {betterPicks.map((pick) => (
                  <div key={pick.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pick.name}</p>
                      <p className="text-xs text-gray-600">{pick.reason}</p>
                      <p className="text-sm font-bold text-gray-900">RM{pick.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      <ArrowUpDown size={12} className="mr-1" />
                      Swap
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Complete the Look */}
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-3">Complete the Look</h4>
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {completeTheLook.map((product, index) => (
                  <div key={index} className="flex-shrink-0 w-32">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg mb-2"
                    />
                    <h5 className="text-xs font-medium text-gray-900 line-clamp-1">{product.name}</h5>
                    <p className="text-xs text-gray-600">{product.description}</p>
                    <p className="text-xs font-bold text-gray-900">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Method */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <button 
              onClick={() => setShippingExpanded(!shippingExpanded)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">
                    {shippingMethods[selectedMethod].name} by {currentVendors.find(v => v.id === selectedVendor)?.name || 'JNE'}
                  </p>
                  <p className="text-xs text-gray-600">Est. {shippingMethods[selectedMethod].time}</p>
                </div>
              </div>
              {shippingExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {shippingExpanded && (
              <div className="mt-4 space-y-4">
                {/* Delivery Methods */}
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Choose Delivery Method</h4>
                  <div className="space-y-2">
                    {Object.entries(shippingMethods).map(([key, method]) => (
                      <label key={key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={selectedMethod === key}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{method.name}</span>
                            <span className="text-sm text-gray-600">
                              {method.price === 0 ? 'Free' : `+RM${method.price.toFixed(2)}`}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{method.time}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Vendors */}
                {selectedMethod && currentVendors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">Choose Vendor</h4>
                    <div className="space-y-2">
                      {currentVendors.map((vendor) => (
                        <label key={vendor.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                          <input
                            type="radio"
                            name="vendor"
                            value={vendor.id}
                            checked={selectedVendor === vendor.id}
                            onChange={(e) => setSelectedVendor(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1 flex justify-between items-center">
                            <span className="text-sm font-medium">{vendor.name}</span>
                            <span className="text-xs text-gray-600">★ {vendor.rating}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Voucher & Discount */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-medium text-gray-900 text-sm mb-3">Promo Code</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={applyPromoCode}>Apply</Button>
            </div>

            {/* AI Dynamic Discount Optimizer */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm font-medium text-purple-900 mb-2">🔥 Limited deal: Get FREE Express Shipping if you checkout in the next 10 minutes.</p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                Apply Offer
              </Button>
            </div>
          </div>
        </section>

        {/* Current Applicable Discounts - New Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 text-sm">Available Discounts</h3>
              <Button 
                size="sm" 
                className="bg-black hover:bg-gray-800 text-white text-xs"
                onClick={applyBestDeals}
              >
                Apply Best Deal
              </Button>
            </div>

            <div className={`space-y-3 ${availableDiscounts.length > 4 && discountsExpanded ? 'max-h-80 overflow-y-auto' : ''}`}>
              {availableDiscounts
                .sort((a, b) => b.savings - a.savings) // Sort by best deal first
                .slice(0, discountsExpanded ? 4 : 2) // Show 2 initially, 4 when expanded
                .map((discount) => (
                <div 
                  key={discount.id} 
                  className={`p-3 rounded-lg border transition-all ${
                    selectedDiscounts.includes(discount.id)
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${discount.urgent ? 'border-orange-300 bg-orange-50' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type={discount.stackable ? "checkbox" : "radio"}
                      name={discount.stackable ? undefined : "discount"}
                      checked={selectedDiscounts.includes(discount.id)}
                      onChange={() => toggleDiscount(discount.id)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 text-sm">{discount.title}</h4>
                        {discount.urgent && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{discount.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{discount.expiry}</span>
                        <span className="text-sm font-bold text-green-600">-RM{discount.savings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand/Collapse Button */}
            {availableDiscounts.length > 2 && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDiscountsExpanded(!discountsExpanded)}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  {discountsExpanded ? 'Show Less' : `Show More (${availableDiscounts.length - 2} more)`}
                  <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${discountsExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}

            {/* AI Personalized Nudges */}
            {selectedDiscounts.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  💡 Best Deal: Flash Sale 20% OFF saves you RM35.80 vs 15% Fashion Voucher (RM25). 
                  Total savings: RM{totalDiscountSavings.toFixed(2)}
                </p>
              </div>
            )}

            {!selectedDiscounts.length && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  🎯 Use your 500 points now for RM5 off — or save for RM20 voucher at 2000 points.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Smart Cart Summary */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 text-sm">Smart Insights</h3>
              <div className="flex space-x-1">
                {aiInsights.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentInsight ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-900">
                {aiInsights[currentInsight].icon} {aiInsights[currentInsight].text}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Sheet - Order Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">RM{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? 'FREE' : `RM${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">-RM{discount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">RM{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* AI Loyalty Booster */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-2">
            <p className="text-xs text-pink-800">
              🎉 You'll earn 450 points with this order — only 250 away from a RM20 voucher!
            </p>
          </div>
          
          <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-4 text-lg font-semibold">
            Proceed to Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
}
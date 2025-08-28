import React from 'react';
import { 
  Palette, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Briefcase, 
  Heart, 
  Plane,
  ArrowRight
} from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { StyleChip } from '@/components/StyleChip';
import { ProductCard } from '@/components/ProductCard';
import sneakersImage from '@/assets/sneakers-white.jpg';
import toteImage from '@/assets/tote-bag-beige.jpg';
import crossbodyImage from '@/assets/crossbody-khaki.jpg';

export default function LooksPage() {
  const filterChips = [
    { label: "Warm neutrals" },
    { label: "Under RM800" },
    { label: "Casual Weekend" },
    { label: "Office Style" }
  ];

  const outfitCollections = [
    {
      title: "Clean Minimalist",
      subtitle: "Monochrome • RM600–900",
      items: [
        {
          image: sneakersImage,
          name: "Classic White Sneakers",
          price: "RM259.00",
          tags: ["minimal"]
        },
        {
          image: toteImage,
          name: "Structured Tote",
          price: "RM329.00", 
          tags: ["structured"]
        }
      ]
    },
    {
      title: "Sunny Weekend",
      subtitle: "Warm neutrals • RM500–800",
      items: [
        {
          image: crossbodyImage,
          name: "Mini Crossbody",
          price: "RM219.00",
          tags: ["casual"]
        },
        {
          image: sneakersImage,
          name: "Canvas Sneakers",
          price: "RM199.00",
          tags: ["comfort"]
        }
      ]
    }
  ];

  return (
    <div className="mobile-container">
      <AppHeader title="Smart Looks" />
      
      <div className="mobile-page pt-4 space-y-6">
        {/* Smart Outfit Builder */}
        <section>
          <div className="fashion-card p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-accent-gold" />
              <h2 className="text-lg font-bold text-text-primary">Smart Outfit Builder</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {filterChips.map((chip, index) => (
                    <StyleChip 
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      {chip.label}
                    </StyleChip>
                  ))}
                </div>
              </div>
              
              <button className="w-full fashion-button-primary py-2 text-lg font-semibold">
                Generate Look
              </button>
              
              <p className="text-xs text-text-muted text-center">
                AI picks one shoe, one bag, one accessory… Swap later.
              </p>
            </div>
          </div>
        </section>

        {/* Outfit Collections */}
        <section>
        <h3 className="text-lg font-bold text-text-primary mb-4">Curated Collections</h3>
        
        <div className="space-y-6">
          {outfitCollections.map((collection, collectionIndex) => (
            <div key={collectionIndex} className="fashion-card p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-text-primary">{collection.title}</h4>
                  <p className="text-sm text-text-muted">{collection.subtitle}</p>
                </div>
                <button 
                  onClick={() => console.log('More like:', collection.title)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
                    bg-primary hover:bg-primary-dark transition-colors duration-200"
                  title="More like this"
                >
                  <Sparkles size={12} className="text-white" />
                  <span className="text-white text-xs font-medium">Discover More</span>
                </button>
              </div>
              
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {collection.items.map((item, itemIndex) => (
                  <ProductCard
                    key={itemIndex}
                    {...item}
                    onAdd={() => console.log('Add to cart:', item.name)}
                    className="min-w-[150px]"
                  />
                ))}
              </div>
              
              <button className="w-full fashion-button-primary py-3 font-semibold">
                Add look to bag
              </button>
            </div>
          ))}
        </div>
      </section>

        {/* Style Inspiration */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Style Inspiration</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Office Ready", count: "12 looks", icon: Briefcase },
              { title: "Weekend Vibes", count: "8 looks", icon: Calendar },
              { title: "Date Night", count: "15 looks", icon: Heart },
              { title: "Travel Essentials", count: "6 looks", icon: Plane }
            ].map((inspiration, index) => (
              <div key={index} className="fashion-card p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-accent-gold-muted mx-auto flex items-center justify-center">
                  {React.createElement(inspiration.icon, {
                    size: 20,
                    className: "text-accent-gold"
                  })}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">{inspiration.title}</h4>
                  <p className="text-xs text-text-muted">{inspiration.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Looks */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Your Recent Looks</h3>
          
          <div className="space-y-3">
            {[
              { name: "Casual Friday", date: "2 days ago", items: "3 items • RM567" },
              { name: "Weekend Brunch", date: "1 week ago", items: "2 items • RM418" }
            ].map((look, index) => (
              <div key={index} className="fashion-card p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary">{look.name}</h4>
                  <p className="text-sm text-text-muted">{look.date}</p>
                  <p className="text-xs text-text-secondary">{look.items}</p>
                </div>
                <button className="fashion-button-secondary py-2 px-4 text-sm">
                  Recreate
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
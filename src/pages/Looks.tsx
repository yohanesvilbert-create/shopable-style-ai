import { Filter, Shuffle, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const filters = [
  { id: "palette", label: "Palette", options: ["Neutrals", "Warm", "Cool", "Monochrome"] },
  { id: "budget", label: "Budget", options: ["Under RM500", "RM500-800", "RM800-1200", "Premium"] },
  { id: "occasion", label: "Occasion", options: ["Work", "Casual", "Evening", "Weekend"] },
];

const outfitRecommendations = [
  {
    id: 1,
    title: "Clean Minimalist",
    budget: "RM600–900",
    items: [
      { name: "White Button Shirt", price: 199, image: "/api/placeholder/150/200" },
      { name: "Tailored Trousers", price: 249, image: "/api/placeholder/150/200" },
      { name: "Leather Loafers", price: 399, image: "/api/placeholder/150/200" },
      { name: "Structured Bag", price: 299, image: "/api/placeholder/150/200" },
    ],
    tags: ["Office", "Minimal"],
  },
  {
    id: 2,
    title: "Sunny Weekend",
    budget: "RM500–800",
    items: [
      { name: "Linen Blend Top", price: 129, image: "/api/placeholder/150/200" },
      { name: "High-Waist Shorts", price: 99, image: "/api/placeholder/150/200" },
      { name: "Canvas Sneakers", price: 189, image: "/api/placeholder/150/200" },
      { name: "Crossbody Bag", price: 159, image: "/api/placeholder/150/200" },
    ],
    tags: ["Casual", "Summer"],
  },
];

export function Looks() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? "" : value
    }));
  };

  const generateLook = () => {
    console.log("Generating new look with filters:", selectedFilters);
  };

  const addLookToBag = (lookId: number) => {
    console.log("Adding look to bag:", lookId);
  };

  const addItemToBag = (itemName: string) => {
    console.log("Adding item to bag:", itemName);
  };

  const totalPrice = (items: any[]) => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="py-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Looks</h1>
        <p className="text-muted-foreground">Smart outfit builder</p>
      </header>

      {/* Smart Outfit Builder */}
      <section className="mb-8">
        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shuffle size={20} className="text-primary" />
            Smart Outfit Builder
          </h2>

          {/* Filters */}
          <div className="space-y-4 mb-6">
            {filters.map((filter) => (
              <div key={filter.id}>
                <h3 className="font-medium mb-2">{filter.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {filter.options.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters[filter.id] === option ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedFilters[filter.id] === option 
                          ? "bg-primary text-primary-foreground" 
                          : "glass hover:bg-primary-glass"
                      }`}
                      onClick={() => handleFilterChange(filter.id, option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateLook}
            className="w-full glass-button font-medium"
          >
            <Shuffle size={20} className="mr-2" />
            Generate Look
          </Button>
        </div>
      </section>

      {/* Outfit Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Curated Looks</h2>
          <button className="flex items-center gap-2 text-sm text-primary font-medium">
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="space-y-6">
          {outfitRecommendations.map((look, index) => (
            <div key={look.id} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Look Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{look.title}</h3>
                  <p className="text-sm text-muted-foreground">{look.budget}</p>
                </div>
                <div className="flex gap-2">
                  {look.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="glass">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Look Items */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {look.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative group">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-2">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm gradient-text font-semibold">RM{item.price}</p>
                    </div>
                    
                    {/* Individual Add Button */}
                    <button
                      onClick={() => addItemToBag(item.name)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Plus size={14} className="text-primary" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Look Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">
                    Total: <span className="gradient-text">RM{totalPrice(look.items)}</span>
                  </span>
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
                    <Heart size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <Button
                  onClick={() => addLookToBag(look.id)}
                  className="glass-button"
                >
                  Add Look to Bag
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
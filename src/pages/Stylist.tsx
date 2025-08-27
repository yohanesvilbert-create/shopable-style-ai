import { Send, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const quickScenarios = [
  { title: "Interview < RM500", color: "bg-gradient-primary" },
  { title: "Monochrome streetwear", color: "bg-gradient-secondary" },
  { title: "Weekend trip 3 items", color: "bg-gradient-accent" },
  { title: "Date night elegant", color: "bg-gradient-primary" },
  { title: "Casual office look", color: "bg-gradient-secondary" },
  { title: "Festival outfit", color: "bg-gradient-accent" },
];

const examples = [
  "Wedding guest • warm neutrals • under RM800",
  "Business meeting • monochrome • premium pieces",
  "Beach vacation • boho style • under RM600",
];

export function Stylist() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStyleMe = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // This would normally trigger navigation to results
    }, 2000);
  };

  const handleScenarioClick = (scenario: string) => {
    setPrompt(scenario);
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="py-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">AI Stylist</h1>
        <p className="text-muted-foreground">Your personal fashion assistant</p>
      </header>

      {/* Quick Scenarios */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Scenarios</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => handleScenarioClick(scenario.title)}
              className={`${scenario.color} p-4 rounded-2xl text-white text-left animate-fade-in hover:scale-105 transition-transform duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="font-medium text-sm">{scenario.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* AI Input Section */}
      <section className="mb-8">
        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Zap size={20} className="text-primary" />
            Style Me
          </h2>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your occasion, style preference, and budget..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="glass-input min-h-[100px] resize-none"
            />
            
            <Button
              onClick={handleStyleMe}
              disabled={!prompt.trim() || isGenerating}
              className="w-full glass-button font-medium text-lg py-3"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Styling...
                </div>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Style Me
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Example Prompts</h2>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="w-full glass-card text-left hover:bg-primary-glass transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-sm text-muted-foreground mb-1">Try this:</p>
              <p className="font-medium">{example}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Helper Tips */}
      <section className="mb-8">
        <div className="glass-card bg-accent-glass border-accent/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-glass flex items-center justify-center mt-1">
              <Lightbulb size={16} className="text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-2">How it works</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Describe your occasion and style</li>
                <li>• Set your budget range</li>
                <li>• Get curated outfit suggestions</li>
                <li>• Swap items to customize your look</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Features</h2>
        <div className="space-y-3">
          {[
            { title: "Smart Suggestions", desc: "AI learns your style preferences" },
            { title: "Budget Optimizer", desc: "Mix high & affordable pieces" },
            { title: "Size Guidance", desc: "Perfect fit recommendations" },
            { title: "Style Reasoning", desc: "Understand why items work together" },
          ].map((feature, index) => (
            <div key={index} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
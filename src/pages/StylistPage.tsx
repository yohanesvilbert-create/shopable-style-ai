import { AppHeader } from '@/components/AppHeader';
import { StyleChip } from '@/components/StyleChip';
import { useLocation } from 'react-router-dom';

export default function StylistPage() {
  const location = useLocation();
  const selectedStyle = location.state?.selectedStyle;

  // If there's a selected style, use it as initial value
  const initialText = selectedStyle || '';

  const scenarios = [
    "Interview < RM500",
    "Monochrome streetwear", 
    "Weekend trip 3 items"
  ];

  return (
    <div className="mobile-container">
      <AppHeader title="AI Stylist" />
      
      <div className="mobile-page pt-8 space-y-8">
        {/* Gradient Background Section */}
        <div className="relative">
          <div className="absolute inset-0 fashion-gradient-primary opacity-5 rounded-2xl"></div>
          
          <div className="relative p-6 space-y-6">
            {/* Quick Scenario Chips */}
            <section>
              <h2 className="text-lg font-bold text-text-primary mb-4">Quick Scenarios</h2>
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {scenarios.map((scenario, index) => (
                  <StyleChip key={index}>{scenario}</StyleChip>
                ))}
              </div>
            </section>

            {/* AI Input Area */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-text-primary">
                  Tell me an occasion, palette, and budget
                </h3>
                <p className="text-text-secondary">I'll style you perfectly</p>
              </div>
              
              <div className="space-y-3">
                <div className="fashion-card p-4">
                  <p className="text-sm text-text-muted mb-2">Example:</p>
                  <p className="text-text-primary font-medium">
                    "Wedding guest • warm neutrals • under RM800"
                  </p>
                </div>
                
                <div className="relative">
                  <textarea
                    placeholder="Describe your look…"
                    rows={4}
                    defaultValue={initialText}
                    className="w-full p-4 bg-input border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                
                <button className="w-full fashion-button-primary py-4 text-lg font-semibold">
                  Style me
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Tip */}
        <section className="text-center">
          <p className="fashion-text-muted leading-relaxed">
            <strong>Tip:</strong> I can explain choices, swap by palette, and suggest size based on your profile.
          </p>
        </section>

        {/* Recent Styles */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Recent Styles</h3>
          <div className="space-y-3">
            {[
              { occasion: "Casual Friday", budget: "RM400", items: "3 items" },
              { occasion: "Date Night", budget: "RM600", items: "4 items" },
            ].map((style, index) => (
              <div key={index} className="fashion-card p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary">{style.occasion}</h4>
                  <p className="text-sm text-text-muted">{style.budget} • {style.items}</p>
                </div>
                <button className="fashion-button-secondary py-2 px-4 text-sm">
                  View Look
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
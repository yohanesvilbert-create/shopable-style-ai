import { Trophy, Clock, CheckCircle, Gift, Wrench } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';

export default function LoyaltyPage() {
  const challenges = [
    {
      title: "Complete a look",
      reward: "+2x points",
      progress: 75,
      icon: CheckCircle
    },
    {
      title: "Review your fit & sizing", 
      reward: "+100 pts",
      progress: 30,
      icon: CheckCircle
    },
    {
      title: "Unlock VIP early access drop",
      reward: "exclusive invite",
      progress: 0,
      icon: Gift
    }
  ];

  const rewards = [
    {
      name: "RM20 Voucher",
      cost: "200 pts",
      icon: Gift
    },
    {
      name: "VIP Drop Queue Pass",
      cost: "500 pts", 
      icon: Trophy
    },
    {
      name: "Leather Care Kit",
      cost: "800 pts",
      icon: Wrench
    }
  ];

  return (
    <div className="mobile-container">
      <AppHeader title="Loyalty & Rewards" />
      
      <div className="mobile-page pt-4 space-y-6">
        {/* Tier Progress */}
        <section>
          <div className="fashion-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl fashion-gradient-gold flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Gold Tier</h2>
                <p className="text-sm text-text-muted">580 pts to Platinum</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">2420 pts</span>
                <span className="text-text-secondary">3000 pts</span>
              </div>
              <div className="w-full bg-secondary-muted rounded-full h-2">
                <div 
                  className="fashion-gradient-gold h-2 rounded-full transition-all duration-500"
                  style={{ width: '80.7%' }}
                ></div>
              </div>
              <p className="text-xs text-text-muted">Platinum at 3000 pts</p>
            </div>
          </div>
        </section>

        {/* Active Benefits & Streaks */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Active Benefits</h3>
          <div className="space-y-3">
            <div className="fashion-card p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-accent-warm" />
                <div>
                  <h4 className="font-semibold text-text-primary">VIP Drop Queue Pass</h4>
                  <p className="text-sm text-text-muted">Sneaker Week drop, countdown active</p>
                </div>
              </div>
              <button className="fashion-button-primary py-2 px-4 text-sm">
                Use Pass
              </button>
            </div>
            
            <div className="fashion-card p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle size={20} className="text-success" />
                <div>
                  <h4 className="font-semibold text-text-primary">Style Streak</h4>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((day) => (
                      <div 
                        key={day}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          day <= 1 
                            ? 'bg-success border-success text-white' 
                            : 'border-border bg-secondary-muted'
                        }`}
                      >
                        <span className="text-xs font-medium">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="fashion-button-secondary py-2 px-4 text-sm">
                Check in
              </button>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Challenges</h3>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <div key={index} className="fashion-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <challenge.icon size={20} className="text-primary" />
                    <div>
                      <h4 className="font-semibold text-text-primary">{challenge.title}</h4>
                      <p className="text-sm text-text-muted">{challenge.reward}</p>
                    </div>
                  </div>
                </div>
                
                {challenge.progress > 0 && (
                  <div className="space-y-1">
                    <div className="w-full bg-secondary-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-text-muted">{challenge.progress}% complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Redeem Rewards */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Redeem Rewards</h3>
          <div className="grid grid-cols-1 gap-3">
            {rewards.map((reward, index) => (
              <div key={index} className="fashion-card p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold-muted flex items-center justify-center">
                    <reward.icon size={18} className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{reward.name}</h4>
                    <p className="text-sm text-text-muted">{reward.cost}</p>
                  </div>
                </div>
                <button className="fashion-button-primary py-2 px-4 text-sm">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Service Bonus */}
        <section>
          <div className="fashion-card p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Wrench size={16} className="text-primary" />
              <h3 className="text-lg font-bold text-text-primary">Service Bonus</h3>
            </div>
            <p className="text-text-secondary">Care & Repair: Book a service, earn +200 pts</p>
            <button className="fashion-button-secondary py-3 px-6 text-sm">
              Book Slot
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
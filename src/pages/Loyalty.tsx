import { Crown, Star, Gift, Calendar, Award, ShoppingBag, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const currentTier = {
  name: "Gold",
  points: 1250,
  nextTier: "Platinum",
  nextTierPoints: 2000,
  progress: 62.5,
};

const activeBenefits = [
  {
    title: "VIP Drop Queue Pass",
    description: "Skip the line for limited drops",
    icon: Crown,
    active: true,
    expires: "3 days",
  },
  {
    title: "Style Streak",
    description: "Daily check-in bonus",
    icon: Star,
    active: true,
    streak: 7,
  },
];

const challenges = [
  {
    title: "Complete a look",
    description: "Use the Look Builder to create an outfit",
    points: "2x points",
    icon: ShoppingBag,
    progress: 0,
    max: 1,
  },
  {
    title: "Review fit/sizing",
    description: "Help others with sizing feedback",
    points: "100 pts",
    icon: MessageSquare,
    progress: 2,
    max: 3,
  },
  {
    title: "Early-access drops",
    description: "Purchase from 3 exclusive collections",
    points: "300 pts",
    icon: Gift,
    progress: 1,
    max: 3,
  },
];

const rewards = [
  {
    title: "RM20 Voucher",
    points: 200,
    type: "voucher",
    available: true,
  },
  {
    title: "VIP Drop Pass",
    points: 500,
    type: "access",
    available: true,
  },
  {
    title: "Leather Care Kit",
    points: 800,
    type: "product",
    available: false,
  },
  {
    title: "Personal Styling Session",
    points: 1500,
    type: "service",
    available: false,
  },
];

const servicePerks = [
  {
    title: "Care & Repair Booking",
    description: "Professional garment care service",
    points: "200 pts",
    icon: Heart,
  },
  {
    title: "Early Access",
    description: "48h early access to new collections",
    points: "Active",
    icon: Crown,
  },
];

export function Loyalty() {
  const redeemReward = (rewardTitle: string, points: number) => {
    console.log(`Redeeming ${rewardTitle} for ${points} points`);
  };

  const completeChallenge = (challengeTitle: string) => {
    console.log(`Completing challenge: ${challengeTitle}`);
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="py-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Loyalty</h1>
        <p className="text-muted-foreground">Rewards & exclusive perks</p>
      </header>

      {/* Tier Progress */}
      <section className="mb-8">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentTier.name} Member</h2>
                <p className="text-sm text-muted-foreground">{currentTier.points} points</p>
              </div>
            </div>
            <Badge className="glass bg-gradient-primary text-white">
              {currentTier.name}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to {currentTier.nextTier}</span>
              <span className="font-medium">
                {currentTier.nextTierPoints - currentTier.points} points to go
              </span>
            </div>
            <Progress value={currentTier.progress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Active Benefits */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Active Benefits</h2>
        <div className="space-y-3">
          {activeBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-glass flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                  <div className="text-right">
                    {benefit.expires && (
                      <Badge variant="outline" className="glass mb-1">
                        {benefit.expires}
                      </Badge>
                    )}
                    {benefit.streak && (
                      <Badge className="bg-gradient-accent text-white">
                        {benefit.streak} days
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Challenges */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Challenges for Points</h2>
        <div className="space-y-3">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const progressPercent = (challenge.progress / challenge.max) * 100;
            
            return (
              <div key={index} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-glass flex items-center justify-center">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <Badge variant="outline" className="glass text-accent">
                        {challenge.points}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.max}</span>
                      </div>
                      <Progress value={progressPercent} className="h-1.5" />
                    </div>
                  </div>
                </div>
                
                {challenge.progress < challenge.max && (
                  <Button
                    size="sm"
                    onClick={() => completeChallenge(challenge.title)}
                    className="glass-button w-full"
                  >
                    Start Challenge
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Redeem Rewards */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Redeem Rewards</h2>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward, index) => (
            <div key={index} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-sm mb-1">{reward.title}</h3>
                  <p className="text-accent font-semibold">{reward.points} pts</p>
                </div>
                
                <Button
                  size="sm"
                  onClick={() => redeemReward(reward.title, reward.points)}
                  disabled={!reward.available}
                  className="w-full glass-button text-xs"
                  variant={reward.available ? "default" : "secondary"}
                >
                  {reward.available ? "Redeem" : "Not Available"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Perks */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Service Perks</h2>
        <div className="space-y-3">
          {servicePerks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div key={index} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-glass flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{perk.title}</h3>
                    <p className="text-sm text-muted-foreground">{perk.description}</p>
                  </div>
                  <Badge variant="outline" className="glass">
                    {perk.points}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
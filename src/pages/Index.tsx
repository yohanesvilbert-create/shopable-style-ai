import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Home } from "./Home";
import { Stylist } from "./Stylist";
import { Looks } from "./Looks";
import { Bag } from "./Bag";
import { Loyalty } from "./Loyalty";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "stylist":
        return <Stylist />;
      case "looks":
        return <Looks />;
      case "bag":
        return <Bag />;
      case "loyalty":
        return <Loyalty />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

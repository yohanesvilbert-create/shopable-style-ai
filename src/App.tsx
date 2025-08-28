import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StylistPage from "./pages/StylistPage";
import BagPage from "./pages/BagPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import LooksPage from "./pages/LooksPage";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stylist" element={<StylistPage />} />
            <Route path="/looks" element={<LooksPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/loyalty" element={<LoyaltyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

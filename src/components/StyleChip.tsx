import { 
  Briefcase, 
  CalendarDays, 
  PartyPopper, 
  DollarSign, 
  Palette, 
  Sparkles,
  LucideIcon 
} from 'lucide-react';

interface StyleChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: boolean;
  className?: string;
}

export function StyleChip({ children, active = false, onClick, icon = true, className }: StyleChipProps) {
  const getIconForText = (content: React.ReactNode): LucideIcon => {
    // Convert ReactNode to string safely
    const text = String(content).toLowerCase();
    
    // Price/Budget related
    if (text.includes('rm') || text.includes('under')) {
      return DollarSign;
    }
    // Color/Style related
    if (text.includes('warm') || text.includes('neutral') || text.includes('monochrome')) {
      return Palette;
    }
    // Time/Event related
    if (text.includes('weekend') || text.includes('casual') || text.includes('brunch')) {
      return CalendarDays;
    }
    // Formal/Business related
    if (text.includes('interview') || text.includes('outfit') || text.includes('office')) {
      return Briefcase;
    }
    // Party/Special occasions
    if (text.includes('wedding') || text.includes('party') || text.includes('date')) {
      return PartyPopper;
    }
    return Sparkles; // default icon for other cases
  };

  const IconComponent = getIconForText(children);

  return (
    <button
      onClick={onClick}
      className={`fashion-chip flex items-center justify-center gap-1.5 break-words min-h-[30px] px-2.5 py-1.5 text-xs ${
        active ? 'fashion-chip-active' : ''
      } ${className || ''}`}
    >
      {icon && <IconComponent size={14} className="text-current flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
interface PriceChartProps {
  priceHistory: number[];
}

export function PriceChart({ priceHistory }: PriceChartProps) {
  if (priceHistory.length < 2) {
    return <div className="text-xs text-text-muted">Not enough data</div>;
  }

  const min = Math.min(...priceHistory);
  const max = Math.max(...priceHistory);
  const range = max - min;

  // Create SVG path for the price line
  const width = 200;
  const height = 40;
  const padding = 4;

  const points = priceHistory.map((price, index) => {
    const x = (index / (priceHistory.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((price - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const pathD = `M ${points.split(' ').join(' L ')}`;

  // Determine if trend is up or down
  const firstPrice = priceHistory[0];
  const lastPrice = priceHistory[priceHistory.length - 1];
  const isDown = lastPrice < firstPrice;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">30-day price trend</span>
        <span className={`text-xs font-medium ${isDown ? 'text-success' : 'text-destructive'}`}>
          {isDown ? '↓' : '↑'} RM{Math.abs(lastPrice - firstPrice).toFixed(2)}
        </span>
      </div>
      
      <svg width={width} height={height} className="w-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="10" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price line */}
        <path
          d={pathD}
          fill="none"
          stroke={isDown ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {priceHistory.map((price, index) => {
          const x = (index / (priceHistory.length - 1)) * (width - padding * 2) + padding;
          const y = height - padding - ((price - min) / range) * (height - padding * 2);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={isDown ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
              className="drop-shadow-sm"
            />
          );
        })}
      </svg>
      
      <div className="flex justify-between text-xs text-text-muted">
        <span>RM{min.toFixed(0)}</span>
        <span>RM{max.toFixed(0)}</span>
      </div>
    </div>
  );
}
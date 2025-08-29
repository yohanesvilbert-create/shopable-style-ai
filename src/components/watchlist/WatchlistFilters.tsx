import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface WatchlistFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  filterInStock: boolean;
  setFilterInStock: (value: boolean) => void;
  filterDiscounted: boolean;
  setFilterDiscounted: (value: boolean) => void;
  onClose: () => void;
}

export function WatchlistFilters({
  sortBy,
  setSortBy,
  filterInStock,
  setFilterInStock,
  filterDiscounted,
  setFilterDiscounted,
  onClose
}: WatchlistFiltersProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Sort Options */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Sort by</Label>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recently-added" id="recently-added" />
            <Label htmlFor="recently-added" className="text-sm">Recently Added</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-low-high" id="price-low-high" />
            <Label htmlFor="price-low-high" className="text-sm">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-high-low" id="price-high-low" />
            <Label htmlFor="price-high-low" className="text-sm">Price: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="discounted-first" id="discounted-first" />
            <Label htmlFor="discounted-first" className="text-sm">Discounted First</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Filter Options */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Filters</Label>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="in-stock-filter" className="text-sm">In-stock only</Label>
          <Switch
            id="in-stock-filter"
            checked={filterInStock}
            onCheckedChange={setFilterInStock}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="discounted-filter" className="text-sm">Discounted only</Label>
          <Switch
            id="discounted-filter"
            checked={filterDiscounted}
            onCheckedChange={setFilterDiscounted}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setSortBy('recently-added');
            setFilterInStock(false);
            setFilterDiscounted(false);
          }}
          className="flex-1"
        >
          Reset
        </Button>
        <Button onClick={onClose} className="flex-1">
          Apply
        </Button>
      </div>
    </div>
  );
}
'use client';

import { Map, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/brasseries';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  disabled?: boolean;
}

export default function ToggleVue({
  currentView,
  onViewChange,
  disabled = false,
}: ViewToggleProps) {
  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      <Button
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-background shadow text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="font-medium">Liste</span>
      </Button>

      <Button
        variant={currentView === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('map')}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === 'map'
            ? 'bg-background shadow text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Map className="w-4 h-4" />
        <span className="font-medium">Carte</span>
      </Button>
    </div>
  );
}

import React from 'react';
import { LayoutList, LayoutGrid, Columns } from 'lucide-react';

interface ViewToggleProps {
  view: 'list' | 'grid' | 'kanban';
  onChange: (view: 'list' | 'grid' | 'kanban') => void;
  showKanban?: boolean;
}

export function ViewToggle({ view, onChange, showKanban = false }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md p-1">
      <button
        onClick={() => onChange('list')}
        className={`p-1.5 rounded ${
          view === 'list'
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="List view"
      >
        <LayoutList className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onChange('grid')}
        className={`p-1.5 rounded ${
          view === 'grid'
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>

      {showKanban && (
        <button
          onClick={() => onChange('kanban')}
          className={`p-1.5 rounded ${
            view === 'kanban'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Kanban view"
        >
          <Columns className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
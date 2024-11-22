export interface SavedFilter {
  id: string;
  name: string;
  type: 'ticket' | 'asset' | 'chromebook';
  filters: Record<string, any>;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterStore {
  savedFilters: SavedFilter[];
  addFilter: (filter: Omit<SavedFilter, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFilter: (id: string, filter: Partial<SavedFilter>) => void;
  deleteFilter: (id: string) => void;
  setDefaultFilter: (id: string) => void;
}
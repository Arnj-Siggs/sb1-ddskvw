import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedFilter, FilterStore } from '../types/filters';

export const useFilters = create<FilterStore>()(
  persist(
    (set) => ({
      savedFilters: [],
      addFilter: (filter) => set((state) => ({
        savedFilters: [
          ...state.savedFilters,
          {
            ...filter,
            id: `filter-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),
      updateFilter: (id, updates) => set((state) => ({
        savedFilters: state.savedFilters.map((filter) =>
          filter.id === id
            ? {
                ...filter,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : filter
        ),
      })),
      deleteFilter: (id) => set((state) => ({
        savedFilters: state.savedFilters.filter((filter) => filter.id !== id),
      })),
      setDefaultFilter: (id) => set((state) => ({
        savedFilters: state.savedFilters.map((filter) => ({
          ...filter,
          isDefault: filter.id === id,
        })),
      })),
    }),
    {
      name: 'saved-filters',
    }
  )
);
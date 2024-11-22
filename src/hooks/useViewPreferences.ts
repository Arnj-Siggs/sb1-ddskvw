import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewPreferences {
  ticketView: 'list' | 'kanban';
  assetView: 'list' | 'grid';
  chromebookView: 'list' | 'grid';
  ticketColumns: {
    id: boolean;
    status: boolean;
    priority: boolean;
    assignee: boolean;
    createdAt: boolean;
    updatedAt: boolean;
  };
  assetColumns: {
    id: boolean;
    type: boolean;
    status: boolean;
    location: boolean;
    assignee: boolean;
    warranty: boolean;
  };
  chromebookColumns: {
    serialNumber: boolean;
    model: boolean;
    status: boolean;
    assignedTo: boolean;
    batteryHealth: boolean;
    lastSync: boolean;
  };
}

interface ViewPreferencesStore extends ViewPreferences {
  setTicketView: (view: 'list' | 'kanban') => void;
  setAssetView: (view: 'list' | 'grid') => void;
  setChromebookView: (view: 'list' | 'grid') => void;
  setTicketColumn: (column: keyof ViewPreferences['ticketColumns'], value: boolean) => void;
  setAssetColumn: (column: keyof ViewPreferences['assetColumns'], value: boolean) => void;
  setChromebookColumn: (column: keyof ViewPreferences['chromebookColumns'], value: boolean) => void;
}

export const useViewPreferences = create<ViewPreferencesStore>()(
  persist(
    (set) => ({
      ticketView: 'list',
      assetView: 'grid',
      chromebookView: 'grid',
      ticketColumns: {
        id: true,
        status: true,
        priority: true,
        assignee: true,
        createdAt: true,
        updatedAt: false,
      },
      assetColumns: {
        id: true,
        type: true,
        status: true,
        location: true,
        assignee: true,
        warranty: false,
      },
      chromebookColumns: {
        serialNumber: true,
        model: true,
        status: true,
        assignedTo: true,
        batteryHealth: true,
        lastSync: true,
      },
      setTicketView: (view) => set({ ticketView: view }),
      setAssetView: (view) => set({ assetView: view }),
      setChromebookView: (view) => set({ chromebookView: view }),
      setTicketColumn: (column, value) =>
        set((state) => ({
          ticketColumns: { ...state.ticketColumns, [column]: value },
        })),
      setAssetColumn: (column, value) =>
        set((state) => ({
          assetColumns: { ...state.assetColumns, [column]: value },
        })),
      setChromebookColumn: (column, value) =>
        set((state) => ({
          chromebookColumns: { ...state.chromebookColumns, [column]: value },
        })),
    }),
    {
      name: 'view-preferences',
    }
  )
);
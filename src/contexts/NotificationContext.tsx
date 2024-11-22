import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Notification, NotificationPreferences } from '../types/notifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  ticketUpdates: true,
  ticketAssignments: true,
  assetUpdates: true,
  systemAlerts: true,
};

// Mock notifications for development
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'ticket',
    title: 'New ticket assigned',
    message: 'Ticket #1234 has been assigned to you',
    read: false,
    link: '/tickets/1234',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'asset',
    title: 'Asset warranty expiring',
    message: 'Asset PC123456 warranty expires in 30 days',
    read: false,
    link: '/assets/PC123456',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(current =>
      current.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(current =>
      current.map(n => ({ ...n, read: true }))
    );
  };

  const updatePreferences = (prefs: Partial<NotificationPreferences>) => {
    setPreferences(current => ({ ...current, ...prefs }));
  };

  // In a real app, we would fetch notifications from the server
  useEffect(() => {
    if (user) {
      // Fetch notifications
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        preferences,
        markAsRead,
        markAllAsRead,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
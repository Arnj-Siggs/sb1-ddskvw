export interface Notification {
  id: string;
  type: 'ticket' | 'asset' | 'system';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  ticketUpdates: boolean;
  ticketAssignments: boolean;
  assetUpdates: boolean;
  systemAlerts: boolean;
}
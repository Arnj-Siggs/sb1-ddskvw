import React, { createContext, useContext, useState } from 'react';

interface Settings {
  systemName: string;
  defaultTicketQueue: string;
  ticketPrefix: string;
  enableUserFeedback: boolean;
  requireMFA: boolean;
  autoAssignTickets: boolean;
  emailTemplates: {
    ticketCreated: string;
    ticketAssigned: string;
    ticketResolved: string;
    feedbackRequest: string;
  };
  integrations: {
    microsoftClientId: string;
    microsoftTenantId: string;
    googleClientId: string;
    googleAdminEmail: string;
    jamfUrl: string;
    jamfUsername: string;
  };
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  systemName: 'K12 Help Desk',
  defaultTicketQueue: 'general',
  ticketPrefix: 'TICK',
  enableUserFeedback: true,
  requireMFA: false,
  autoAssignTickets: true,
  emailTemplates: {
    ticketCreated: 'Hi {user},\n\nA new ticket has been created:\nTicket ID: {ticketId}\nTitle: {title}\n\nWe\'ll get back to you soon.\n\nBest regards,\nIT Support',
    ticketAssigned: 'Hi {user},\n\nYour ticket {ticketId} has been assigned to {assignee}.\n\nBest regards,\nIT Support',
    ticketResolved: 'Hi {user},\n\nYour ticket {ticketId} has been resolved.\n\nResolution: {resolution}\n\nBest regards,\nIT Support',
    feedbackRequest: 'Hi {user},\n\nHow was your experience with ticket {ticketId}?\nPlease take a moment to provide feedback.\n\n{feedbackLink}\n\nBest regards,\nIT Support',
  },
  integrations: {
    microsoftClientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || '',
    microsoftTenantId: import.meta.env.VITE_MICROSOFT_TENANT_ID || '',
    googleClientId: '',
    googleAdminEmail: '',
    jamfUrl: '',
    jamfUsername: '',
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(current => ({
      ...current,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
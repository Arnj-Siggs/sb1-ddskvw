import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface NotificationPreferencesProps {
  onBack: () => void;
}

export function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  const { preferences, updatePreferences } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-2 p-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          Notification Preferences
        </h3>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences.emailNotifications}
            onChange={(e) =>
              updatePreferences({ emailNotifications: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Email notifications</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences.ticketUpdates}
            onChange={(e) =>
              updatePreferences({ ticketUpdates: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Ticket updates</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences.ticketAssignments}
            onChange={(e) =>
              updatePreferences({ ticketAssignments: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Ticket assignments</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences.assetUpdates}
            onChange={(e) =>
              updatePreferences({ assetUpdates: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Asset updates</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences.systemAlerts}
            onChange={(e) =>
              updatePreferences({ systemAlerts: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">System alerts</span>
        </label>
      </div>
    </div>
  );
}
import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationPreferences } from './NotificationPreferences';

export function NotificationList() {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [showPreferences, setShowPreferences] = React.useState(false);

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
    }
  };

  if (showPreferences) {
    return <NotificationPreferences onBack={() => setShowPreferences(false)} />;
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={markAllAsRead}
          className="text-sm text-primary hover:text-primary/90"
        >
          Mark all as read
        </button>
        <button
          onClick={() => setShowPreferences(true)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id, notification.link)}
              className={`p-4 rounded-lg cursor-pointer ${
                notification.read
                  ? 'bg-white'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {format(new Date(notification.createdAt), 'PP')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationList } from './NotificationList';
import { useDialog } from '../../hooks/useDialog';

export function NotificationBell() {
  const { unreadCount } = useNotifications();
  const dialog = useDialog();

  const handleClick = () => {
    dialog.show({
      title: 'Notifications',
      content: <NotificationList />,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
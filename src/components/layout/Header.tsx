import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from '@headlessui/react';
import { LogOut, User } from 'lucide-react';
import { NotificationBell } from '../notifications/NotificationBell';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">K12 Help Desk</h1>
        
        <div className="flex items-center space-x-4">
          <NotificationBell />
          
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </Menu.Button>
            
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Laptop, Ticket, LogIn, LogOut } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';

export function ChromebookLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = usePermissions();

  const isActive = (path: string) => location.pathname.endsWith(path);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Chromebook Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your Chromebook inventory, repairs, and assignments
        </p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/chromebooks')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('chromebooks') && !isActive('devices') && !isActive('tickets')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </div>
        </button>

        <button
          onClick={() => navigate('/chromebooks/devices')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('devices')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Laptop className="h-4 w-4 mr-2" />
            Devices
          </div>
        </button>

        {hasPermission(PERMISSIONS.VIEW_TICKETS) && (
          <button
            onClick={() => navigate('/chromebooks/tickets')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              isActive('tickets')
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Ticket className="h-4 w-4 mr-2" />
              Tickets
            </div>
          </button>
        )}

        {hasPermission(PERMISSIONS.MANAGE_CHROMEBOOKS) && (
          <>
            <button
              onClick={() => navigate('/chromebooks/check-in')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                isActive('check-in')
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Check In
              </div>
            </button>

            <button
              onClick={() => navigate('/chromebooks/check-out')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                isActive('check-out')
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Check Out
              </div>
            </button>
          </>
        )}
      </div>

      <Outlet />
    </div>
  );
}
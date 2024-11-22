import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Laptop, BarChart2, Ticket } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import { AsyncBoundary } from '../../components/error/AsyncBoundary';

export function ChromebookList() {
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
          onClick={() => navigate('/chromebooks/dashboard')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            isActive('dashboard')
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
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
      </div>

      <AsyncBoundary>
        <Outlet />
      </AsyncBoundary>
    </div>
  );
}
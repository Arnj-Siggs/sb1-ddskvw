import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Download, Filter, Search } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

// Mock data - replace with actual API call
const MOCK_LOGS: AuditLog[] = [
  {
    id: '1',
    action: 'USER_LOGIN',
    userId: 'user1',
    userName: 'John Doe',
    details: 'Successful login',
    timestamp: new Date().toISOString(),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
  },
  // Add more mock logs
];

export function AuditLogs() {
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    startDate: '',
    endDate: '',
  });

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['auditLogs', filters],
    queryFn: () => Promise.resolve(MOCK_LOGS),
  });

  const handleExport = () => {
    // Implement export functionality
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Audit Logs</h2>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">All Actions</option>
              <option value="USER_LOGIN">User Login</option>
              <option value="USER_LOGOUT">User Logout</option>
              <option value="SETTINGS_CHANGED">Settings Changed</option>
              <option value="ROLE_MODIFIED">Role Modified</option>
            </select>

            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(log.timestamp), 'PPp')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.userName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
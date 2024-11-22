import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChromebooks } from '../../lib/api/chromebooks';
import { getTickets } from '../../lib/api/tickets';
import { TicketType, TicketStatus } from '../../types/tickets';
import { AssetStatus } from '../../types/assets';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Laptop,
  AlertTriangle,
  Battery,
  WifiOff,
  Users,
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ChromebookDashboard() {
  const { handleError } = useErrorHandler();

  const { data: chromebooks = [], isLoading: loadingChromebooks } = useQuery({
    queryKey: ['chromebooks'],
    queryFn: () => getChromebooks(),
    onError: (error) => handleError(error, 'Failed to fetch Chromebooks'),
  });

  const { data: tickets = [], isLoading: loadingTickets } = useQuery({
    queryKey: ['tickets', { type: TicketType.CHROMEBOOK }],
    queryFn: () => getTickets({ type: TicketType.CHROMEBOOK }),
    onError: (error) => handleError(error, 'Failed to fetch tickets'),
  });

  if (loadingChromebooks || loadingTickets) {
    return <LoadingSpinner />;
  }

  // Calculate metrics
  const totalDevices = chromebooks.length;
  const assignedDevices = chromebooks.filter(cb => cb.status === AssetStatus.ASSIGNED).length;
  const needsAttention = chromebooks.filter(cb => 
    (cb.batteryHealth && cb.batteryHealth < 70) ||
    cb.damageReports.some(r => r.status === 'PENDING')
  ).length;
  const outOfSync = chromebooks.filter(cb => 
    cb.lastSync && new Date(cb.lastSync).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length;

  // Prepare chart data
  const statusDistribution = Object.values(AssetStatus).map(status => ({
    name: status,
    value: chromebooks.filter(cb => cb.status === status).length,
  }));

  const ticketsByStatus = Object.values(TicketStatus).map(status => ({
    name: status,
    count: tickets.filter(t => t.status === status).length,
  }));

  const batteryHealthDistribution = [
    { name: 'Critical (<50%)', value: chromebooks.filter(cb => cb.batteryHealth && cb.batteryHealth < 50).length },
    { name: 'Poor (50-70%)', value: chromebooks.filter(cb => cb.batteryHealth && cb.batteryHealth >= 50 && cb.batteryHealth < 70).length },
    { name: 'Good (70-90%)', value: chromebooks.filter(cb => cb.batteryHealth && cb.batteryHealth >= 70 && cb.batteryHealth < 90).length },
    { name: 'Excellent (>90%)', value: chromebooks.filter(cb => cb.batteryHealth && cb.batteryHealth >= 90).length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Laptop className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-semibold text-gray-900">{totalDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Assigned Devices</p>
              <p className="text-2xl font-semibold text-gray-900">{assignedDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-semibold text-gray-900">{needsAttention}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <WifiOff className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Sync</p>
              <p className="text-2xl font-semibold text-gray-900">{outOfSync}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Battery Health Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={batteryHealthDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {batteryHealthDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
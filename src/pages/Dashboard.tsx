import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getTickets } from '../lib/api/tickets';
import { getAssets } from '../lib/api/assets';
import { getChromebooks } from '../lib/api/chromebooks';
import { TicketStatus, Priority } from '../types/tickets';
import { AssetStatus } from '../types/assets';
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
  Ticket,
  Monitor,
  Laptop,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Dashboard() {
  const { user } = useAuth();
  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => getTickets(),
  });

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: () => getAssets(),
  });

  const { data: chromebooks = [] } = useQuery({
    queryKey: ['chromebooks'],
    queryFn: () => getChromebooks(),
  });

  const ticketsByStatus = Object.values(TicketStatus).map(status => ({
    name: status,
    value: tickets.filter(t => t.status === status).length,
  }));

  const ticketsByPriority = Object.values(Priority).map(priority => ({
    name: priority,
    count: tickets.filter(t => t.priority === priority).length,
  }));

  const urgentTickets = tickets.filter(t => 
    t.priority === Priority.URGENT && t.status !== TicketStatus.CLOSED
  );

  const assetsNeedingAttention = [
    ...assets.filter(a => a.status === AssetStatus.IN_REPAIR),
    ...chromebooks.filter(c => 
      c.batteryHealth && c.batteryHealth < 70 || 
      c.damageReports.some(r => r.status === 'PENDING')
    ),
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name}</h2>
        <p className="mt-1 text-gray-600">Here's an overview of your help desk system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Ticket className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tickets.filter(t => t.status === TicketStatus.OPEN).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Monitor className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-semibold text-gray-900">{assets.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Laptop className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chromebooks</p>
              <p className="text-2xl font-semibold text-gray-900">{chromebooks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-semibold text-gray-900">
                {assetsNeedingAttention.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tickets by Priority</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsByPriority}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {ticketsByStatus.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {urgentTickets.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Urgent Tickets Requiring Attention
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {urgentTickets.map(ticket => (
                    <li key={ticket.id}>{ticket.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../../lib/api/tickets';
import { TicketStatus, Priority, TicketType } from '../../types/tickets';
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
  LineChart,
  Line,
} from 'recharts';
import { Clock, AlertCircle, CheckCircle, XCircle, Link } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function TicketDashboard() {
  const { handleError } = useErrorHandler();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => getTickets(),
    onError: (error) => handleError(error, 'Failed to fetch tickets'),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const incidentTickets = tickets.filter(t => t.type === TicketType.INCIDENT);
  const problemTickets = tickets.filter(t => t.type === TicketType.PROBLEM);

  // Calculate metrics
  const openIncidents = incidentTickets.filter(t => t.status === TicketStatus.OPEN).length;
  const openProblems = problemTickets.filter(t => t.status === TicketStatus.OPEN).length;
  const linkedIncidents = incidentTickets.filter(t => t.linkedProblemId).length;

  // Calculate resolution times
  const getAverageResolutionTime = (tickets: typeof incidentTickets) => {
    const resolvedTickets = tickets.filter(t => t.status === TicketStatus.RESOLVED);
    if (resolvedTickets.length === 0) return 0;
    
    const totalTime = resolvedTickets.reduce((sum, ticket) => {
      const created = new Date(ticket.createdAt).getTime();
      const resolved = new Date(ticket.resolvedAt || ticket.updatedAt).getTime();
      return sum + (resolved - created);
    }, 0);
    
    return Math.round(totalTime / resolvedTickets.length / (1000 * 60 * 60)); // Convert to hours
  };

  const incidentResolutionTime = getAverageResolutionTime(incidentTickets);
  const problemResolutionTime = getAverageResolutionTime(problemTickets);

  // Prepare chart data
  const statusDistribution = Object.values(TicketStatus).map(status => ({
    name: status,
    incidents: incidentTickets.filter(t => t.status === status).length,
    problems: problemTickets.filter(t => t.status === status).length,
  }));

  const priorityDistribution = Object.values(Priority).map(priority => ({
    name: priority,
    incidents: incidentTickets.filter(t => t.priority === priority).length,
    problems: problemTickets.filter(t => t.priority === priority).length,
  }));

  // Time series data for the last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const timeSeriesData = last30Days.map(date => ({
    date,
    incidents: incidentTickets.filter(t => t.createdAt.startsWith(date)).length,
    problems: problemTickets.filter(t => t.createdAt.startsWith(date)).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Incidents</p>
              <p className="text-2xl font-semibold text-gray-900">{openIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Problems</p>
              <p className="text-2xl font-semibold text-gray-900">{openProblems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Link className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Linked Incidents</p>
              <p className="text-2xl font-semibold text-gray-900">{linkedIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Resolution Time</p>
              <div className="text-sm">
                <p>Incidents: {incidentResolutionTime}h</p>
                <p>Problems: {problemResolutionTime}h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" name="Incidents" fill="#EF4444" />
                <Bar dataKey="problems" name="Problems" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" name="Incidents" fill="#EF4444" />
                <Bar dataKey="problems" name="Problems" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Trends (Last 30 Days)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                name="Incidents" 
                stroke="#EF4444" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="problems" 
                name="Problems" 
                stroke="#F59E0B" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
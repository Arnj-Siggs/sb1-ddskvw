import React from 'react';
import { Search } from 'lucide-react';
import { TicketStatus, Priority } from '../../types/tickets';

interface TicketFilters {
  status: TicketStatus | '';
  priority: Priority | '';
  search: string;
  assignedToMe?: boolean;
}

interface TicketFiltersProps {
  filters: TicketFilters;
  onChange: (filters: TicketFilters) => void;
}

export function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>
      
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value as TicketStatus })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Statuses</option>
        {Object.values(TicketStatus).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as Priority })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Priorities</option>
        {Object.values(Priority).map((priority) => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </select>

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={filters.assignedToMe}
          onChange={(e) => onChange({ ...filters, assignedToMe: e.target.checked })}
          className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
        />
        <span className="ml-2 text-sm text-gray-700">Assigned to me</span>
      </label>
    </div>
  );
}
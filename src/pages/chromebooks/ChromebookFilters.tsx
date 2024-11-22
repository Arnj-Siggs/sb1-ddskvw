import React from 'react';
import { Search } from 'lucide-react';
import { AssetStatus } from '../../types/assets';

interface ChromebookFilters {
  status: AssetStatus | '';
  search: string;
  grade: string;
}

interface ChromebookFiltersProps {
  filters: ChromebookFilters;
  onChange: (filters: ChromebookFilters) => void;
}

export function ChromebookFilters({ filters, onChange }: ChromebookFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by serial number, student name..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>
      
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value as AssetStatus })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Statuses</option>
        {Object.values(AssetStatus).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <select
        value={filters.grade}
        onChange={(e) => onChange({ ...filters, grade: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Grades</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
          <option key={grade} value={grade}>Grade {grade}</option>
        ))}
      </select>
    </div>
  );
}
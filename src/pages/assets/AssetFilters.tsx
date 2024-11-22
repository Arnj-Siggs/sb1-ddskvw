import React from 'react';
import { Search } from 'lucide-react';
import { AssetType, AssetStatus } from '../../types/assets';

interface AssetFilters {
  type: AssetType | '';
  status: AssetStatus | '';
  search: string;
  location: string;
}

interface AssetFiltersProps {
  filters: AssetFilters;
  onChange: (filters: AssetFilters) => void;
}

// Define locations as a constant within the component
const LOCATIONS = [
  'Main Building',
  'Science Wing',
  'Library',
  'Gymnasium',
  'Administrative Office',
  'IT Department',
];

export function AssetFilters({ filters, onChange }: AssetFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value as AssetType })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Types</option>
        {Object.values(AssetType).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

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
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      >
        <option value="">All Locations</option>
        {LOCATIONS.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>
    </div>
  );
}
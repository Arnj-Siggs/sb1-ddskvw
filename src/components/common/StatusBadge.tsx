import React from 'react';
import { TicketStatus, Priority } from '../../types/tickets';
import { AssetStatus } from '../../types/assets';

interface StatusBadgeProps {
  status: TicketStatus | AssetStatus | Priority;
  size?: 'sm' | 'md';
}

const statusColors: Record<string, string> = {
  // Ticket Status
  [TicketStatus.OPEN]: 'bg-blue-100 text-blue-800',
  [TicketStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
  [TicketStatus.ON_HOLD]: 'bg-orange-100 text-orange-800',
  [TicketStatus.RESOLVED]: 'bg-green-100 text-green-800',
  [TicketStatus.CLOSED]: 'bg-gray-100 text-gray-800',
  
  // Asset Status
  [AssetStatus.AVAILABLE]: 'bg-green-100 text-green-800',
  [AssetStatus.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [AssetStatus.IN_REPAIR]: 'bg-yellow-100 text-yellow-800',
  [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
  [AssetStatus.LOST]: 'bg-red-100 text-red-800',
  
  // Priority
  [Priority.LOW]: 'bg-gray-100 text-gray-800',
  [Priority.MEDIUM]: 'bg-blue-100 text-blue-800',
  [Priority.HIGH]: 'bg-orange-100 text-orange-800',
  [Priority.URGENT]: 'bg-red-100 text-red-800',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
import React from 'react';
import { format } from 'date-fns';
import { Ticket, TicketStatus, Priority } from '../../types/tickets';
import { StatusBadge } from '../common/StatusBadge';
import { useDialog } from '../../hooks/useDialog';
import { TicketDetails } from '../../pages/tickets/TicketDetails';

interface TicketTableViewProps {
  tickets: Ticket[];
  visibleColumns: Record<string, boolean>;
  onUpdateTicket: (id: string, data: Partial<Ticket>) => void;
}

export function TicketTableView({ tickets, visibleColumns, onUpdateTicket }: TicketTableViewProps) {
  const dialog = useDialog();

  const handleRowClick = (ticket: Ticket) => {
    dialog.show({
      title: `Ticket #${ticket.id}`,
      content: <TicketDetails ticket={ticket} />,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {visibleColumns.id && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            {visibleColumns.status && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            )}
            {visibleColumns.priority && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
            )}
            {visibleColumns.assignee && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
            )}
            {visibleColumns.createdAt && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
            )}
            {visibleColumns.updatedAt && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => handleRowClick(ticket)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {visibleColumns.id && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{ticket.id}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {ticket.title}
                </div>
                <div className="text-sm text-gray-500">
                  {ticket.description.length > 50
                    ? `${ticket.description.slice(0, 50)}...`
                    : ticket.description}
                </div>
              </td>
              {visibleColumns.status && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={ticket.status} size="sm" />
                </td>
              )}
              {visibleColumns.priority && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={ticket.priority} size="sm" />
                </td>
              )}
              {visibleColumns.assignee && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ticket.assignedTo?.name || '-'}
                </td>
              )}
              {visibleColumns.createdAt && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(ticket.createdAt), 'PP')}
                </td>
              )}
              {visibleColumns.updatedAt && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(ticket.updatedAt), 'PP')}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
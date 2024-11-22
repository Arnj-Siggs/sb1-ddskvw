import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Settings } from 'lucide-react';
import { TicketStatus, Priority, TicketType } from '../../../types/tickets';
import { useDialog } from '../../../hooks/useDialog';
import { ChromebookTicketForm } from './ChromebookTicketForm';
import { getTickets } from '../../../lib/api/tickets';
import { TicketCard } from '../../../components/tickets/TicketCard';
import { TicketFilters } from '../../../components/tickets/TicketFilters';
import { usePermissions } from '../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../types/auth';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useViewPreferences } from '../../../hooks/useViewPreferences';
import { ViewToggle } from '../../../components/common/ViewToggle';
import { ColumnToggle } from '../../../components/common/ColumnToggle';
import { TicketTableView } from '../../../components/tickets/TicketTableView';
import { TicketKanbanView } from '../../../components/tickets/TicketKanbanView';

export function ChromebookTickets() {
  const dialog = useDialog();
  const { hasPermission } = usePermissions();
  const { handleError } = useErrorHandler();
  const { ticketView, ticketColumns, setTicketView, setTicketColumn } = useViewPreferences();
  const [filters, setFilters] = useState({
    status: '' as TicketStatus | '',
    priority: '' as Priority | '',
    search: '',
    assignedToMe: false,
  });

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets', { ...filters, type: TicketType.CHROMEBOOK }],
    queryFn: () => getTickets({ ...filters, type: TicketType.CHROMEBOOK }),
    onError: (error) => handleError(error, 'Failed to fetch Chromebook tickets'),
  });

  const handleCreateTicket = () => {
    dialog.show({
      title: 'Create Chromebook Ticket',
      content: <ChromebookTicketForm onSuccess={() => dialog.hide()} />,
    });
  };

  const handleViewChange = (view: 'list' | 'kanban') => {
    setTicketView(view);
  };

  const handleColumnToggle = (column: string) => {
    setTicketColumn(column as keyof typeof ticketColumns, !ticketColumns[column as keyof typeof ticketColumns]);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const ticketId = result.draggableId;
    const newStatus = result.destination.droppableId as TicketStatus;

    // Handle ticket status update
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'createdAt', label: 'Created' },
    { key: 'updatedAt', label: 'Updated' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Chromebook Tickets</h2>
        {hasPermission(PERMISSIONS.CREATE_TICKETS) && (
          <button
            onClick={handleCreateTicket}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 justify-between">
          <TicketFilters filters={filters} onChange={setFilters} />
          <div className="flex space-x-4">
            <ViewToggle view={ticketView} onChange={handleViewChange} showKanban />
            <button
              onClick={() => dialog.show({
                title: 'Column Settings',
                content: (
                  <ColumnToggle
                    columns={columns}
                    visibleColumns={ticketColumns}
                    onChange={handleColumnToggle}
                  />
                ),
              })}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : tickets.length === 0 ? (
          <EmptyState
            icon={Filter}
            title="No Chromebook tickets found"
            description="Create a new ticket to get started"
            action={
              hasPermission(PERMISSIONS.CREATE_TICKETS) && (
                <button
                  onClick={handleCreateTicket}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ticket
                </button>
              )
            }
          />
        ) : ticketView === 'kanban' ? (
          <TicketKanbanView tickets={tickets} onDragEnd={handleDragEnd} />
        ) : (
          <TicketTableView
            tickets={tickets}
            visibleColumns={ticketColumns}
            onUpdateTicket={() => {}}
          />
        )}
      </div>
    </div>
  );
}
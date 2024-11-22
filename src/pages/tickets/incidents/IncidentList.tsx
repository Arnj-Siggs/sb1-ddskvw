import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Settings } from 'lucide-react';
import { TicketStatus, Priority, TicketType } from '../../../types/tickets';
import { useDialog } from '../../../hooks/useDialog';
import { TicketForm } from '../TicketForm';
import { getTickets } from '../../../lib/api/tickets';
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

export function IncidentList() {
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
    queryKey: ['tickets', { ...filters, type: TicketType.INCIDENT }],
    queryFn: () => getTickets({ ...filters, type: TicketType.INCIDENT }),
    onError: (error) => handleError(error, 'Failed to fetch incidents'),
  });

  const handleCreateIncident = () => {
    dialog.show({
      title: 'Create Incident',
      content: (
        <TicketForm
          onSuccess={() => dialog.hide()}
          defaultValues={{ type: TicketType.INCIDENT }}
        />
      ),
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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Incidents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track incident tickets
          </p>
        </div>
        {hasPermission(PERMISSIONS.CREATE_TICKETS) && (
          <button
            onClick={handleCreateIncident}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Incident
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
            title="No incidents found"
            description="Create a new incident to get started"
            action={
              hasPermission(PERMISSIONS.CREATE_TICKETS) && (
                <button
                  onClick={handleCreateIncident}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Incident
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
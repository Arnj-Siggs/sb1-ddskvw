import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Settings, AlertTriangle, Ticket as TicketIcon } from 'lucide-react';
import { TicketStatus, Priority, TicketType } from '../../types/tickets';
import { useDialog } from '../../hooks/useDialog';
import { TicketForm } from './TicketForm';
import { getTickets } from '../../lib/api/tickets';
import { TicketCard } from './TicketCard';
import { TicketFilters } from './TicketFilters';
import { usePermissions } from '../../hooks/usePermissions';
import { useViewPreferences } from '../../hooks/useViewPreferences';
import { ViewToggle } from '../../components/common/ViewToggle';
import { ColumnToggle } from '../../components/common/ColumnToggle';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { TicketTableView } from './TicketTableView';
import { TicketKanbanView } from '../../components/tickets/TicketKanbanView';
import { useAuth } from '../../contexts/AuthContext';

export function TicketList() {
  const dialog = useDialog();
  const { can } = usePermissions();
  const { user } = useAuth();
  const { ticketView, ticketColumns, setTicketView, setTicketColumn } = useViewPreferences();
  const [filters, setFilters] = useState({
    status: '' as TicketStatus | '',
    priority: '' as Priority | '',
    type: '' as TicketType | '',
    search: '',
    assignedToMe: false,
  });

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => getTickets({
      ...filters,
      assignedToId: filters.assignedToMe ? user?.id : undefined,
    }),
    initialData: [], // Initialize with empty array to prevent map errors
  });

  const handleCreateTicket = () => {
    dialog.show({
      title: 'Create Ticket',
      content: <TicketForm onSuccess={() => dialog.hide()} />,
    });
  };

  const handleUpdateTicket = (id: string, data: Partial<Ticket>) => {
    // Handle ticket update logic
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

    handleUpdateTicket(ticketId, { status: newStatus });
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
        <h1 className="text-2xl font-semibold text-gray-900">Tickets</h1>
        <button
          onClick={handleCreateTicket}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex space-x-4">
            <TicketFilters filters={filters} onChange={setFilters} />
            <button
              onClick={() => dialog.show({
                title: 'Advanced Filters',
                content: (
                  <div className="w-full max-w-lg">
                    {/* Add advanced filter form here */}
                  </div>
                ),
              })}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </button>
          </div>
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
            icon={TicketIcon}
            title="No tickets found"
            description="Get started by creating your first ticket"
            action={
              <button
                onClick={handleCreateTicket}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </button>
            }
          />
        ) : ticketView === 'kanban' ? (
          <TicketKanbanView tickets={tickets} onDragEnd={handleDragEnd} />
        ) : (
          <TicketTableView
            tickets={tickets}
            visibleColumns={ticketColumns}
            onUpdateTicket={handleUpdateTicket}
          />
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Ticket, TicketStatus } from '../../types/tickets';
import { TicketCard } from '../../pages/tickets/TicketCard';

interface TicketKanbanViewProps {
  tickets: Ticket[];
  onDragEnd: (result: any) => void;
}

const columns = [
  { id: TicketStatus.OPEN, title: 'Open' },
  { id: TicketStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TicketStatus.ON_HOLD, title: 'On Hold' },
  { id: TicketStatus.RESOLVED, title: 'Resolved' },
  { id: TicketStatus.CLOSED, title: 'Closed' },
];

export function TicketKanbanView({ tickets, onDragEnd }: TicketKanbanViewProps) {
  const getTicketsByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                {column.title} ({getTicketsByStatus(column.id as TicketStatus).length})
              </h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {getTicketsByStatus(column.id as TicketStatus).map(
                      (ticket, index) => (
                        <Draggable
                          key={ticket.id}
                          draggableId={ticket.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TicketCard ticket={ticket} />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
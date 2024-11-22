import React from 'react';
import { Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Ticket, TicketStatus, Priority } from '../../types/tickets';
import { useDialog } from '../../hooks/useDialog';
import { TicketDetails } from './TicketDetails';

const statusColors: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'bg-blue-100 text-blue-800',
  [TicketStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
  [TicketStatus.ON_HOLD]: 'bg-orange-100 text-orange-800',
  [TicketStatus.RESOLVED]: 'bg-green-100 text-green-800',
  [TicketStatus.CLOSED]: 'bg-gray-100 text-gray-800',
};

const priorityIcons: Record<Priority, React.ReactNode> = {
  [Priority.LOW]: <AlertCircle className="h-4 w-4 text-gray-400" />,
  [Priority.MEDIUM]: <AlertCircle className="h-4 w-4 text-blue-500" />,
  [Priority.HIGH]: <AlertCircle className="h-4 w-4 text-orange-500" />,
  [Priority.URGENT]: <AlertCircle className="h-4 w-4 text-red-500" />,
};

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const dialog = useDialog();

  const handleClick = () => {
    dialog.show({
      title: `Ticket #${ticket.id}`,
      content: <TicketDetails ticket={ticket} />,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{ticket.title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{ticket.description}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
            {ticket.status}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                {priorityIcons[ticket.priority]}
                <span className="ml-1">{ticket.priority}</span>
              </div>
              {ticket.comments.length > 0 && (
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {ticket.comments.length}
                </div>
              )}
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>

        {ticket.assignedTo && (
          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {ticket.assignedTo.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{ticket.assignedTo.name}</p>
              <p className="text-sm text-gray-500">Assigned</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicket } from '../../lib/api/tickets';
import { Ticket, TicketStatus, Priority } from '../../types/tickets';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import { TicketTimeline } from '../../components/tickets/TicketTimeline';
import { TicketTimeTracker } from '../../components/tickets/TicketTimeTracker';
import { TicketSatisfactionSurvey } from '../../components/tickets/TicketSatisfactionSurvey';
import { useDialog } from '../../hooks/useDialog';

interface TicketDetailsProps {
  ticket: Ticket;
  onClose?: () => void;
}

export function TicketDetails({ ticket, onClose }: TicketDetailsProps) {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  const { hasPermission } = usePermissions();

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Ticket>) => updateTicket(ticket.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const handleStatusChange = (status: TicketStatus) => {
    updateMutation.mutate({ status });
  };

  const handlePriorityChange = (priority: Priority) => {
    updateMutation.mutate({ priority });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
              <span>#{ticket.id}</span>
              <span>•</span>
              <span>Created by {ticket.createdBy.name}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {hasPermission(PERMISSIONS.UPDATE_TICKETS) && (
              <>
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  {Object.values(TicketStatus).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(e.target.value as Priority)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  {Object.values(Priority).map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{ticket.description}</p>
        </div>

        {ticket.customFields && Object.keys(ticket.customFields).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Information</h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(ticket.customFields).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="text-sm text-gray-900">{value?.toString()}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {ticket.asset && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Related Asset</h4>
            <p className="text-sm text-gray-500">
              {ticket.asset.name} ({ticket.asset.serialNumber})
            </p>
          </div>
        )}

        {hasPermission(PERMISSIONS.UPDATE_TICKETS) && (
          <div className="border-t border-gray-200 pt-4">
            <TicketTimeTracker ticketId={ticket.id} />
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Timeline</h4>
          <TicketTimeline ticket={ticket} />
        </div>

        {ticket.status === TicketStatus.RESOLVED && !ticket.satisfaction && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Feedback</h4>
            <TicketSatisfactionSurvey
              ticketId={ticket.id}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['tickets'] });
                dialog.hide();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
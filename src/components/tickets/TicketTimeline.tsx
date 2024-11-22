import React from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, MessageSquare, AlertCircle, CheckCircle, User, Paperclip } from 'lucide-react';
import { Ticket, Comment, TimeEntry } from '../../types/tickets';

interface TimelineEvent {
  id: string;
  type: 'comment' | 'status' | 'assignment' | 'time' | 'resolution';
  timestamp: string;
  content: React.ReactNode;
  user: {
    id: string;
    name: string;
  };
  isInternal?: boolean;
}

interface TicketTimelineProps {
  ticket: Ticket;
}

export function TicketTimeline({ ticket }: TicketTimelineProps) {
  // Combine all events and sort by timestamp
  const events: TimelineEvent[] = [
    // Comments
    ...ticket.comments.map((comment): TimelineEvent => ({
      id: comment.id,
      type: 'comment',
      timestamp: comment.createdAt,
      content: (
        <div className="space-y-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm max-w-none">
            {comment.content}
          </ReactMarkdown>
          {comment.attachments && comment.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {comment.attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Paperclip className="h-4 w-4 mr-1" />
                  {attachment.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ),
      user: comment.createdBy,
      isInternal: comment.isInternal,
    })),

    // Time entries
    ...ticket.timeEntries.map((entry): TimelineEvent => ({
      id: entry.id,
      type: 'time',
      timestamp: entry.createdAt,
      content: (
        <div>
          <p className="text-sm text-gray-900">{entry.description}</p>
          <p className="text-sm text-gray-500">
            Time spent: {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
          </p>
        </div>
      ),
      user: entry.createdBy,
    })),

    // Status changes
    ...(ticket.resolvedAt ? [{
      id: `resolved-${ticket.id}`,
      type: 'resolution',
      timestamp: ticket.resolvedAt,
      content: (
        <div>
          <p className="text-sm text-gray-900">Ticket resolved</p>
          {ticket.resolution && (
            <p className="mt-1 text-sm text-gray-500">{ticket.resolution}</p>
          )}
        </div>
      ),
      user: ticket.assignedTo || ticket.createdBy,
    }] : []),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.type === 'comment'
                        ? 'bg-blue-50'
                        : event.type === 'time'
                        ? 'bg-green-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    {event.type === 'comment' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                    {event.type === 'time' && <Clock className="h-5 w-5 text-green-500" />}
                    {event.type === 'status' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                    {event.type === 'resolution' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {event.type === 'assignment' && <User className="h-5 w-5 text-purple-500" />}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{event.user.name}</span>
                      {event.isInternal && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Internal
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(new Date(event.timestamp), 'PPp')}
                    </p>
                  </div>
                  <div className="mt-2">{event.content}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
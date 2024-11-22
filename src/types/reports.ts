import { TicketType, TicketStatus, Priority } from './tickets';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'incident' | 'problem' | 'all';
  filters: ReportFilters;
  columns: string[];
  groupBy?: string;
  sortBy?: string;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReportFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  ticketTypes?: TicketType[];
  statuses?: TicketStatus[];
  priorities?: Priority[];
  assignedToId?: string;
  createdById?: string;
}

export interface ReportResult {
  id: string;
  name: string;
  template: ReportTemplate;
  data: any[];
  summary?: {
    totalTickets: number;
    averageResolutionTime: number;
    ticketsByStatus: Record<TicketStatus, number>;
    ticketsByPriority: Record<Priority, number>;
  };
  generatedAt: string;
  format: 'pdf' | 'csv' | 'excel';
}
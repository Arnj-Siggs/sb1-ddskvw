import { z } from 'zod';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TicketType {
  INCIDENT = 'INCIDENT',
  PROBLEM = 'PROBLEM',
  CHROMEBOOK = 'CHROMEBOOK',
  WEBSITE = 'WEBSITE',
  QUOTE = 'QUOTE',
}

export enum TicketCategory {
  HARDWARE = 'HARDWARE',
  SOFTWARE = 'SOFTWARE',
  NETWORK = 'NETWORK',
  ACCESS = 'ACCESS',
  OTHER = 'OTHER',
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  isInternal?: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}

export interface TimeEntry {
  id: string;
  description: string;
  duration: number; // in minutes
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  type: TicketType;
  category: TicketCategory;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  asset?: {
    id: string;
    name: string;
    serialNumber: string;
  };
  linkedProblemId?: string;
  linkedIncidentIds?: string[];
  rootCause?: string;
  resolution?: string;
  workaround?: string;
  comments: Comment[];
  timeEntries: TimeEntry[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  dueDate?: string;
  sla?: {
    responseTime: number; // in minutes
    resolutionTime: number; // in minutes
    breached: boolean;
  };
  tags?: string[];
  customFields?: Record<string, any>;
  watchers?: {
    id: string;
    name: string;
    email: string;
  }[];
  satisfaction?: {
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    submittedAt: string;
  };
}

export const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(TicketType),
  category: z.nativeEnum(TicketCategory),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(TicketStatus).optional(),
  assignedToId: z.string().optional(),
  assetId: z.string().optional(),
  linkedProblemId: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.any()).optional(),
  watchers: z.array(z.string()).optional(),
});
import axios from 'axios';
import { Ticket, TicketStatus, Priority, TicketType, Comment } from '../../types/tickets';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Mock data for development
const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Network connectivity issues in Room 204',
    description: 'Users are experiencing intermittent network drops',
    status: TicketStatus.OPEN,
    priority: Priority.HIGH,
    type: TicketType.INCIDENT,
    createdBy: {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    comments: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Recurring printer connectivity issues',
    description: 'Multiple incidents reported about printer disconnections',
    status: TicketStatus.IN_PROGRESS,
    priority: Priority.MEDIUM,
    type: TicketType.PROBLEM,
    createdBy: {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    assignedTo: {
      id: 'tech1',
      name: 'Tech Support',
      email: 'support@example.com',
    },
    linkedIncidentIds: ['1', '3'],
    rootCause: 'Outdated printer firmware causing network disconnections',
    comments: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface TicketFilters {
  status?: TicketStatus;
  priority?: Priority;
  type?: TicketType;
  search?: string;
  assignedToId?: string;
  linkedProblemId?: string;
}

export async function getTickets(filters: TicketFilters = {}): Promise<Ticket[]> {
  try {
    let filteredTickets = [...MOCK_TICKETS];

    if (filters.status) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
    }
    if (filters.priority) {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === filters.priority);
    }
    if (filters.type) {
      filteredTickets = filteredTickets.filter(ticket => ticket.type === filters.type);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.title.toLowerCase().includes(search) ||
        ticket.description.toLowerCase().includes(search)
      );
    }
    if (filters.assignedToId) {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.assignedTo?.id === filters.assignedToId
      );
    }
    if (filters.linkedProblemId) {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.linkedProblemId === filters.linkedProblemId
      );
    }

    return filteredTickets;
  } catch (error) {
    throw new Error('Failed to fetch tickets. Please try again.');
  }
}

export async function getTicket(id: string): Promise<Ticket> {
  try {
    const ticket = MOCK_TICKETS.find(t => t.id === id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return ticket;
  } catch (error) {
    throw new Error('Failed to fetch ticket details. Please try again.');
  }
}

export async function createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
  try {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      title: ticketData.title!,
      description: ticketData.description!,
      status: TicketStatus.OPEN,
      priority: ticketData.priority || Priority.MEDIUM,
      type: ticketData.type!,
      createdBy: ticketData.createdBy!,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      linkedProblemId: ticketData.linkedProblemId,
      rootCause: ticketData.rootCause,
      resolution: ticketData.resolution,
      workaround: ticketData.workaround,
      tags: ticketData.tags,
      customFields: ticketData.customFields,
    };

    MOCK_TICKETS.push(newTicket);
    return newTicket;
  } catch (error) {
    throw new Error('Failed to create ticket. Please try again.');
  }
}

export async function updateTicket(id: string, ticketData: Partial<Ticket>): Promise<Ticket> {
  try {
    const index = MOCK_TICKETS.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Ticket not found');
    }

    const updatedTicket = {
      ...MOCK_TICKETS[index],
      ...ticketData,
      updatedAt: new Date().toISOString(),
    };

    if (ticketData.status === TicketStatus.RESOLVED && !MOCK_TICKETS[index].resolvedAt) {
      updatedTicket.resolvedAt = new Date().toISOString();
    }
    if (ticketData.status === TicketStatus.CLOSED && !MOCK_TICKETS[index].closedAt) {
      updatedTicket.closedAt = new Date().toISOString();
    }

    MOCK_TICKETS[index] = updatedTicket;
    return updatedTicket;
  } catch (error) {
    throw new Error('Failed to update ticket. Please try again.');
  }
}

export async function addComment(ticketId: string, content: string, userId: string): Promise<Comment> {
  try {
    const ticket = MOCK_TICKETS.find(t => t.id === ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: {
        id: userId,
        name: 'Current User', // In a real app, fetch user details
      },
    };

    ticket.comments.push(newComment);
    ticket.updatedAt = new Date().toISOString();

    return newComment;
  } catch (error) {
    throw new Error('Failed to add comment. Please try again.');
  }
}

export async function linkProblem(ticketId: string, problemId: string): Promise<void> {
  try {
    const ticket = MOCK_TICKETS.find(t => t.id === ticketId);
    const problem = MOCK_TICKETS.find(t => t.id === problemId);

    if (!ticket || !problem) {
      throw new Error('Ticket or problem not found');
    }

    if (problem.type !== TicketType.PROBLEM) {
      throw new Error('Can only link to problem tickets');
    }

    ticket.linkedProblemId = problemId;
    if (!problem.linkedIncidentIds) {
      problem.linkedIncidentIds = [];
    }
    if (!problem.linkedIncidentIds.includes(ticketId)) {
      problem.linkedIncidentIds.push(ticketId);
    }
  } catch (error) {
    throw new Error('Failed to link problem. Please try again.');
  }
}
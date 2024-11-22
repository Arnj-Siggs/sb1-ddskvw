import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Priority, TicketType } from '../../types/tickets';
import { createTicket } from '../../lib/api/tickets';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';

const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(TicketType),
  priority: z.nativeEnum(Priority),
  assetId: z.string().optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  onSuccess: () => void;
}

export function TicketForm({ onSuccess }: TicketFormProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: Priority.MEDIUM,
      type: TicketType.INCIDENT,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TicketFormData) => 
      createTicket({
        ...data,
        createdBy: {
          id: user?.id || '',
          name: user?.name || '',
          email: user?.email || '',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {Object.values(TicketType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}
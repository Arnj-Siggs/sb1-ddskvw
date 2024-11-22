import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const timeEntrySchema = z.object({
  description: z.string().min(1, 'Description is required'),
  hours: z.number().min(0),
  minutes: z.number().min(0).max(59),
});

type TimeEntryFormData = z.infer<typeof timeEntrySchema>;

interface TicketTimeTrackerProps {
  ticketId: string;
  onSuccess?: () => void;
}

export function TicketTimeTracker({ ticketId, onSuccess }: TicketTimeTrackerProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TimeEntryFormData>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      hours: 0,
      minutes: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: TimeEntryFormData) => {
      // Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', ticketId] });
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="What did you work on?"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours
          </label>
          <input
            type="number"
            min="0"
            {...register('hours', { valueAsNumber: true })}
            className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.hours && (
            <p className="mt-1 text-sm text-red-600">{errors.hours.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minutes
          </label>
          <input
            type="number"
            min="0"
            max="59"
            {...register('minutes', { valueAsNumber: true })}
            className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.minutes && (
            <p className="mt-1 text-sm text-red-600">{errors.minutes.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Clock className="h-4 w-4 mr-2" />
          {mutation.isPending ? 'Adding...' : 'Add Time'}
        </button>
      </div>
    </form>
  );
}
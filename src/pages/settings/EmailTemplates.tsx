import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

const templateSchema = z.object({
  ticketCreated: z.string().min(1, 'Template is required'),
  ticketAssigned: z.string().min(1, 'Template is required'),
  ticketResolved: z.string().min(1, 'Template is required'),
  feedbackRequest: z.string().min(1, 'Template is required'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

// Mock template data
const MOCK_TEMPLATES = {
  ticketCreated: `Hi {user},\n\nA new ticket has been created:\nTicket ID: {ticketId}\nTitle: {title}\n\nWe'll get back to you soon.\n\nBest regards,\nIT Support`,
  ticketAssigned: `Hi {user},\n\nYour ticket {ticketId} has been assigned to {assignee}.\n\nBest regards,\nIT Support`,
  ticketResolved: `Hi {user},\n\nYour ticket {ticketId} has been resolved.\n\nResolution: {resolution}\n\nBest regards,\nIT Support`,
  feedbackRequest: `Hi {user},\n\nHow was your experience with ticket {ticketId}?\nPlease take a moment to provide feedback.\n\n{feedbackLink}\n\nBest regards,\nIT Support`,
};

export function EmailTemplates() {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: MOCK_TEMPLATES,
  });

  const mutation = useMutation({
    mutationFn: async (data: TemplateFormData) => {
      // Mock API call
      console.log('Saving templates:', data);
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Created Template
              </label>
              <textarea
                rows={4}
                {...register('ticketCreated')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
              />
              {errors.ticketCreated && (
                <p className="mt-1 text-sm text-red-600">{errors.ticketCreated.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Available variables: {'{user}'}, {'{ticketId}'}, {'{title}'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Assigned Template
              </label>
              <textarea
                rows={4}
                {...register('ticketAssigned')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
              />
              {errors.ticketAssigned && (
                <p className="mt-1 text-sm text-red-600">{errors.ticketAssigned.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Available variables: {'{user}'}, {'{ticketId}'}, {'{assignee}'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Resolved Template
              </label>
              <textarea
                rows={4}
                {...register('ticketResolved')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
              />
              {errors.ticketResolved && (
                <p className="mt-1 text-sm text-red-600">{errors.ticketResolved.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Available variables: {'{user}'}, {'{ticketId}'}, {'{resolution}'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Feedback Request Template
              </label>
              <textarea
                rows={4}
                {...register('feedbackRequest')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
              />
              {errors.feedbackRequest && (
                <p className="mt-1 text-sm text-red-600">{errors.feedbackRequest.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Available variables: {'{user}'}, {'{ticketId}'}, {'{feedbackLink}'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={!isDirty || mutation.isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {mutation.isPending ? 'Saving...' : 'Save Templates'}
          </button>
        </div>
      </div>
    </form>
  );
}
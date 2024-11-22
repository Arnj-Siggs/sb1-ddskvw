import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

const settingsSchema = z.object({
  systemName: z.string().min(1, 'System name is required'),
  defaultTicketQueue: z.string().min(1, 'Default ticket queue is required'),
  ticketPrefix: z.string().min(1, 'Ticket prefix is required'),
  enableUserFeedback: z.boolean(),
  requireMFA: z.boolean(),
  autoAssignTickets: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

// Mock settings data
const MOCK_SETTINGS = {
  systemName: 'K12 Help Desk',
  defaultTicketQueue: 'general',
  ticketPrefix: 'TICK',
  enableUserFeedback: true,
  requireMFA: false,
  autoAssignTickets: true,
};

export function GeneralSettings() {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: MOCK_SETTINGS,
  });

  const mutation = useMutation({
    mutationFn: async (data: SettingsFormData) => {
      // Mock API call
      console.log('Saving settings:', data);
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
                System Name
              </label>
              <input
                type="text"
                {...register('systemName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.systemName && (
                <p className="mt-1 text-sm text-red-600">{errors.systemName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Ticket Queue
              </label>
              <select
                {...register('defaultTicketQueue')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="general">General</option>
                <option value="it">IT Support</option>
                <option value="maintenance">Maintenance</option>
              </select>
              {errors.defaultTicketQueue && (
                <p className="mt-1 text-sm text-red-600">{errors.defaultTicketQueue.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Prefix
              </label>
              <input
                type="text"
                {...register('ticketPrefix')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.ticketPrefix && (
                <p className="mt-1 text-sm text-red-600">{errors.ticketPrefix.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('enableUserFeedback')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Enable user feedback on ticket resolution
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('requireMFA')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Require Multi-Factor Authentication
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('autoAssignTickets')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Automatically assign tickets based on type
                </label>
              </div>
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
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}
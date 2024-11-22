import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TicketType, TicketStatus, Priority } from '../../../types/tickets';

const reportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['incident', 'problem', 'all']),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  ticketTypes: z.array(z.nativeEnum(TicketType)).min(1, 'Select at least one ticket type'),
  statuses: z.array(z.nativeEnum(TicketStatus)).optional(),
  priorities: z.array(z.nativeEnum(Priority)).optional(),
  groupBy: z.string().optional(),
  sortBy: z.string().optional(),
  format: z.enum(['pdf', 'csv', 'excel']),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface CreateReportDialogProps {
  onSuccess: () => void;
}

export function CreateReportDialog({ onSuccess }: CreateReportDialogProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: 'all',
      format: 'pdf',
      ticketTypes: [],
    },
  });

  const onSubmit = (data: ReportFormData) => {
    // Implement report creation logic
    console.log('Creating report:', data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Report Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Report Type</label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="all">All Tickets</option>
          <option value="incident">Incidents Only</option>
          <option value="problem">Problems Only</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            {...register('dateRange.start')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            {...register('dateRange.end')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Include Statuses</label>
        <div className="mt-2 space-y-2">
          {Object.values(TicketStatus).map((status) => (
            <label key={status} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={status}
                {...register('statuses')}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Include Priorities</label>
        <div className="mt-2 space-y-2">
          {Object.values(Priority).map((priority) => (
            <label key={priority} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={priority}
                {...register('priorities')}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{priority}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Group By</label>
        <select
          {...register('groupBy')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">No Grouping</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Export Format</label>
        <select
          {...register('format')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
          <option value="excel">Excel</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Generate Report
        </button>
      </div>
    </form>
  );
}
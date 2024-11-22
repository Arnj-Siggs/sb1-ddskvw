import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TicketStatus, Priority, TicketType } from '../../types/tickets';
import { AssetStatus, AssetType } from '../../types/assets';

const filterSchema = z.object({
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  assignedToMe: z.boolean().optional(),
  status: z.array(z.string()).optional(),
  priority: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
  location: z.array(z.string()).optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface AdvancedFilterDialogProps {
  type: 'ticket' | 'asset' | 'chromebook';
  currentFilters: Record<string, any>;
  onApply: (filters: Record<string, any>) => void;
  onClose: () => void;
}

export function AdvancedFilterDialog({
  type,
  currentFilters,
  onApply,
  onClose,
}: AdvancedFilterDialogProps) {
  const { register, handleSubmit } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: currentFilters,
  });

  const onSubmit = (data: FilterFormData) => {
    onApply(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Filters</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                {...register('dateRange.start')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                {...register('dateRange.end')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          {type === 'ticket' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {Object.values(TicketStatus).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        value={status}
                        {...register('status')}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="space-y-2">
                  {Object.values(Priority).map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="checkbox"
                        value={priority}
                        {...register('priority')}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {type === 'asset' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="space-y-2">
                  {Object.values(AssetType).map((assetType) => (
                    <label key={assetType} className="flex items-center">
                      <input
                        type="checkbox"
                        value={assetType}
                        {...register('type')}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{assetType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {Object.values(AssetStatus).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        value={status}
                        {...register('status')}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
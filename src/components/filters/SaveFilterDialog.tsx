import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFilters } from '../../hooks/useFilters';

const filterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  isDefault: z.boolean().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface SaveFilterDialogProps {
  type: 'ticket' | 'asset' | 'chromebook';
  filters: Record<string, any>;
  onClose: () => void;
}

export function SaveFilterDialog({ type, filters, onClose }: SaveFilterDialogProps) {
  const { savedFilters, addFilter } = useFilters();
  const { register, handleSubmit, formState: { errors } } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterFormData) => {
    addFilter({
      name: data.name,
      type,
      filters,
      isDefault: data.isDefault,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Filter Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="My Custom Filter"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('isDefault')}
          className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
        />
        <span className="text-sm text-gray-700">Set as default filter</span>
      </label>

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
          Save Filter
        </button>
      </div>
    </form>
  );
}
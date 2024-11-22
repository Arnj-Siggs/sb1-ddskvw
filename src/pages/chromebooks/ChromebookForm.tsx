import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AssetStatus } from '../../types/assets';
import { Chromebook } from '../../types/chromebooks';
import { createChromebook, updateChromebook } from '../../lib/api/chromebooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const chromebookSchema = z.object({
  serialNumber: z.string().min(1, 'Serial number is required'),
  model: z.string().min(1, 'Model is required'),
  status: z.nativeEnum(AssetStatus),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  warrantyEnd: z.string().min(1, 'Warranty end date is required'),
  osVersion: z.string().optional(),
  notes: z.string().optional(),
});

type ChromebookFormData = z.infer<typeof chromebookSchema>;

interface ChromebookFormProps {
  chromebook?: Chromebook;
  onSuccess: () => void;
}

export function ChromebookForm({ chromebook, onSuccess }: ChromebookFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<ChromebookFormData>({
    resolver: zodResolver(chromebookSchema),
    defaultValues: chromebook ? {
      ...chromebook,
      purchaseDate: chromebook.purchaseDate.split('T')[0],
      warrantyEnd: chromebook.warrantyEnd.split('T')[0],
    } : {
      status: AssetStatus.AVAILABLE,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ChromebookFormData) => 
      chromebook ? updateChromebook(chromebook.id, data) : createChromebook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Serial Number
        </label>
        <input
          type="text"
          {...register('serialNumber')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.serialNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.serialNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Model
        </label>
        <input
          type="text"
          {...register('model')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.model && (
          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          {Object.values(AssetStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Purchase Date
        </label>
        <input
          type="date"
          {...register('purchaseDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.purchaseDate && (
          <p className="mt-1 text-sm text-red-600">{errors.purchaseDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Warranty End Date
        </label>
        <input
          type="date"
          {...register('warrantyEnd')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.warrantyEnd && (
          <p className="mt-1 text-sm text-red-600">{errors.warrantyEnd.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Chrome OS Version
        </label>
        <input
          type="text"
          {...register('osVersion')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {chromebook ? 'Update' : 'Create'} Chromebook
        </button>
      </div>
    </form>
  );
}
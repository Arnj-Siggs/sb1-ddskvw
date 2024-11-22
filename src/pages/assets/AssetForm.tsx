import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Asset, AssetType, AssetStatus } from '../../types/assets';
import { createAsset, updateAsset } from '../../lib/api/assets';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(AssetType),
  serialNumber: z.string().min(1, 'Serial number is required'),
  status: z.nativeEnum(AssetStatus),
  location: z.string().optional(),
  purchaseDate: z.string().optional(),
  warrantyEnd: z.string().optional(),
  notes: z.string().optional(),
});

type AssetFormData = z.infer<typeof assetSchema>;

interface AssetFormProps {
  asset?: Asset;
  onSuccess: () => void;
}

export function AssetForm({ asset, onSuccess }: AssetFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: asset,
  });

  const mutation = useMutation({
    mutationFn: (data: AssetFormData) => 
      asset ? updateAsset(asset.id, data) : createAsset(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
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
        <label className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          {Object.values(AssetType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

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
          Location
        </label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
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
          {asset ? 'Update' : 'Create'} Asset
        </button>
      </div>
    </form>
  );
}
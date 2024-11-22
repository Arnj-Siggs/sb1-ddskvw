import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChromebookBySerial, unassignChromebook } from '../../lib/api/chromebooks';
import { useDialog } from '../../hooks/useDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AssetStatus } from '../../types/assets';

const searchSchema = z.object({
  serialNumber: z.string().min(1, 'Serial number is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function ChromebookCheckIn() {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  const [searchedSerial, setSearchedSerial] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const { data: chromebook, isLoading } = useQuery({
    queryKey: ['chromebook', searchedSerial],
    queryFn: () => searchedSerial ? getChromebookBySerial(searchedSerial) : null,
    enabled: !!searchedSerial,
  });

  const unassignMutation = useMutation({
    mutationFn: unassignChromebook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      dialog.show({
        title: 'Success',
        content: (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Device has been successfully collected and marked as unassigned.
            </p>
            <button
              onClick={() => {
                dialog.hide();
                reset();
                setSearchedSerial(null);
              }}
              className="mt-4 inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              OK
            </button>
          </div>
        ),
      });
    },
  });

  const onSubmit = (data: SearchFormData) => {
    setSearchedSerial(data.serialNumber);
  };

  const handleCollect = () => {
    if (!chromebook) return;

    dialog.show({
      title: 'Confirm Collection',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to collect this device from {chromebook.assignedTo?.name}?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => dialog.hide()}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                unassignMutation.mutate(chromebook.id);
                dialog.hide();
              }}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Collect
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Check In Chromebook</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the device's serial number to check it in
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              {...register('serialNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter device serial number"
            />
            {errors.serialNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.serialNumber.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Search
            </button>
          </div>
        </form>

        {isLoading && <LoadingSpinner />}

        {chromebook && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Model:</span>
                  <span className="text-sm text-gray-900">{chromebook.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className="text-sm text-gray-900">{chromebook.status}</span>
                </div>
                {chromebook.status === AssetStatus.ASSIGNED ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Assigned To:</span>
                      <span className="text-sm text-gray-900">
                        {chromebook.assignedTo?.name}
                        {chromebook.assignedTo?.grade && ` (Grade ${chromebook.assignedTo.grade})`}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          reset();
                          setSearchedSerial(null);
                        }}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCollect}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                      >
                        Collect
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm text-yellow-600">
                      This device is not currently assigned to anyone.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          reset();
                          setSearchedSerial(null);
                        }}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
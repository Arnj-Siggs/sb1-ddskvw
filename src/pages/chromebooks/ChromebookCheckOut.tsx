import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChromebookBySerial, assignChromebook } from '../../lib/api/chromebooks';
import { useDialog } from '../../hooks/useDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AssetStatus } from '../../types/assets';

const searchSchema = z.object({
  serialNumber: z.string().min(1, 'Serial number is required'),
});

const assignSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  grade: z.string().min(1, 'Grade is required'),
  notes: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;
type AssignFormData = z.infer<typeof assignSchema>;

export function ChromebookCheckOut() {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  const [searchedSerial, setSearchedSerial] = useState<string | null>(null);

  const { register: registerSearch, handleSubmit: handleSubmitSearch, reset: resetSearch, formState: { errors: searchErrors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const { register: registerAssign, handleSubmit: handleSubmitAssign, formState: { errors: assignErrors } } = useForm<AssignFormData>({
    resolver: zodResolver(assignSchema),
  });

  const { data: chromebook, isLoading } = useQuery({
    queryKey: ['chromebook', searchedSerial],
    queryFn: () => searchedSerial ? getChromebookBySerial(searchedSerial) : null,
    enabled: !!searchedSerial,
  });

  const assignMutation = useMutation({
    mutationFn: (data: AssignFormData) => assignChromebook(chromebook!.id, data.studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      dialog.show({
        title: 'Success',
        content: (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Device has been successfully assigned to the student.
            </p>
            <button
              onClick={() => {
                dialog.hide();
                resetSearch();
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

  const onSearch = (data: SearchFormData) => {
    setSearchedSerial(data.serialNumber);
  };

  const handleAssign = () => {
    if (!chromebook) return;

    dialog.show({
      title: 'Assign Device',
      content: (
        <form onSubmit={handleSubmitAssign((data) => {
          assignMutation.mutate(data);
          dialog.hide();
        })} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              {...registerAssign('studentId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            {assignErrors.studentId && (
              <p className="mt-1 text-sm text-red-600">{assignErrors.studentId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <select
              {...registerAssign('grade')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                <option key={grade} value={grade.toString()}>Grade {grade}</option>
              ))}
            </select>
            {assignErrors.grade && (
              <p className="mt-1 text-sm text-red-600">{assignErrors.grade.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              {...registerAssign('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => dialog.hide()}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Assign Device
            </button>
          </div>
        </form>
      ),
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Check Out Chromebook</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the device's serial number to check it out
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmitSearch(onSearch)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              {...registerSearch('serialNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter device serial number"
            />
            {searchErrors.serialNumber && (
              <p className="mt-1 text-sm text-red-600">{searchErrors.serialNumber.message}</p>
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
                {chromebook.status === AssetStatus.AVAILABLE ? (
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        resetSearch();
                        setSearchedSerial(null);
                      }}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssign}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                    >
                      Assign Device
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm text-yellow-600">
                      This device is not available for checkout.
                      {chromebook.status === AssetStatus.ASSIGNED && chromebook.assignedTo && (
                        ` Currently assigned to ${chromebook.assignedTo.name}.`
                      )}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          resetSearch();
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignChromebook } from '../../lib/api/chromebooks';

const assignSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  grade: z.string().min(1, 'Grade is required'),
  notes: z.string().optional(),
});

type AssignFormData = z.infer<typeof assignSchema>;

interface ChromebookAssignFormProps {
  chromebookId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChromebookAssignForm({ chromebookId, onSuccess, onCancel }: ChromebookAssignFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AssignFormData>({
    resolver: zodResolver(assignSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: AssignFormData) => assignChromebook(chromebookId, data.studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chromebooks'] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Student ID
        </label>
        <input
          type="text"
          {...register('studentId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.studentId && (
          <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Grade
        </label>
        <select
          {...register('grade')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select Grade</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <option key={grade} value={grade.toString()}>
              Grade {grade}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes (Optional)
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Assigning...' : 'Assign Chromebook'}
        </button>
      </div>
    </form>
  );
}
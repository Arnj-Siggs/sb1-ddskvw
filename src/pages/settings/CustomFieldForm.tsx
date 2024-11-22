import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFieldType, customFieldSchema } from '../../types/customFields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomField, updateCustomField } from '../../lib/api/customFields';

interface CustomFieldFormProps {
  field?: CustomField;
  onSuccess: () => void;
}

export function CustomFieldForm({ field, onSuccess }: CustomFieldFormProps) {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = React.useState(
    field?.type === CustomFieldType.SELECT || field?.type === CustomFieldType.MULTISELECT
  );

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(customFieldSchema),
    defaultValues: field || {
      required: false,
      options: [''],
      category: 'general',
    },
  });

  const selectedType = watch('type');

  React.useEffect(() => {
    setShowOptions(
      selectedType === CustomFieldType.SELECT ||
      selectedType === CustomFieldType.MULTISELECT
    );
  }, [selectedType]);

  const mutation = useMutation({
    mutationFn: (data: any) => field ? updateCustomField(field.id, data) : createCustomField(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Field Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="ticket_priority"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Display Label
        </label>
        <input
          type="text"
          {...register('label')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Ticket Priority"
        />
        {errors.label && (
          <p className="mt-1 text-sm text-red-600">{errors.label.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Field Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          {Object.values(CustomFieldType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <input
          type="text"
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      {showOptions && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          <div className="mt-2 space-y-2">
            {watch('options')?.map((_, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  {...register(`options.${index}`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
                {index === watch('options').length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const options = watch('options');
                      setValue('options', [...options, '']);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('required')}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label className="ml-2 block text-sm text-gray-700">
          This field is required
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : field ? 'Update Field' : 'Create Field'}
        </button>
      </div>
    </form>
  );
}
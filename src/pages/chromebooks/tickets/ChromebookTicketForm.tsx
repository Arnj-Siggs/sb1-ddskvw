import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Priority, TicketType } from '../../../types/tickets';
import { createTicket } from '../../../lib/api/tickets';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { getCustomFields } from '../../../lib/api/customFields';
import { CustomFieldType } from '../../../types/customFields';
import { getChromebooks } from '../../../lib/api/chromebooks';
import { AssetStatus } from '../../../types/assets';

interface ChromebookTicketFormProps {
  onSuccess: () => void;
}

export function ChromebookTicketForm({ onSuccess }: ChromebookTicketFormProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch custom fields specific to Chromebook tickets
  const { data: customFields = [] } = useQuery({
    queryKey: ['chromebookCustomFields'],
    queryFn: () => getCustomFields('chromebook'),
  });

  // Fetch available Chromebooks
  const { data: chromebooks = [] } = useQuery({
    queryKey: ['chromebooks'],
    queryFn: () => getChromebooks(),
  });

  // Dynamically build the schema based on custom fields
  const ticketSchemaObj: any = {
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    chromebookId: z.string().min(1, 'Chromebook is required'),
    priority: z.nativeEnum(Priority),
    customFields: z.object({}).optional(),
  };

  // Add custom fields to schema
  const customFieldsObj: any = {};
  customFields.forEach(field => {
    let fieldSchema = z.any();
    switch (field.type) {
      case CustomFieldType.TEXT:
      case CustomFieldType.TEXTAREA:
        fieldSchema = z.string();
        break;
      case CustomFieldType.NUMBER:
        fieldSchema = z.number();
        break;
      case CustomFieldType.SELECT:
      case CustomFieldType.MULTISELECT:
        fieldSchema = field.type === CustomFieldType.SELECT 
          ? z.string()
          : z.array(z.string());
        break;
      case CustomFieldType.CHECKBOX:
        fieldSchema = z.boolean();
        break;
      case CustomFieldType.DATE:
        fieldSchema = z.string();
        break;
    }
    if (field.required) {
      fieldSchema = fieldSchema.min(1, `${field.label} is required`);
    } else {
      fieldSchema = fieldSchema.optional();
    }
    customFieldsObj[field.name] = fieldSchema;
  });
  ticketSchemaObj.customFields = z.object(customFieldsObj);

  const ticketSchema = z.object(ticketSchemaObj);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: Priority.MEDIUM,
      customFields: {},
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => 
      createTicket({
        ...data,
        type: TicketType.CHROMEBOOK,
        createdBy: {
          id: user?.id || '',
          name: user?.name || '',
          email: user?.email || '',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      onSuccess();
    },
  });

  const availableChromebooks = chromebooks.filter(
    cb => cb.status !== AssetStatus.RETIRED && cb.status !== AssetStatus.LOST
  );

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Chromebook
        </label>
        <select
          {...register('chromebookId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select a Chromebook</option>
          {availableChromebooks.map((chromebook) => (
            <option key={chromebook.id} value={chromebook.id}>
              {chromebook.serialNumber} - {chromebook.model}
              {chromebook.assignedTo ? ` (${chromebook.assignedTo.name})` : ''}
            </option>
          ))}
        </select>
        {errors.chromebookId && (
          <p className="mt-1 text-sm text-red-600">{errors.chromebookId.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          {...register('priority')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          {Object.values(Priority).map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-4">
            {customFields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.description && (
                  <p className="mt-1 text-sm text-gray-500">{field.description}</p>
                )}

                {field.type === CustomFieldType.TEXT && (
                  <input
                    type="text"
                    {...register(`customFields.${field.name}`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                )}

                {field.type === CustomFieldType.TEXTAREA && (
                  <textarea
                    {...register(`customFields.${field.name}`)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                )}

                {field.type === CustomFieldType.SELECT && (
                  <select
                    {...register(`customFields.${field.name}`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {field.type === CustomFieldType.MULTISELECT && (
                  <select
                    multiple
                    {...register(`customFields.${field.name}`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {field.type === CustomFieldType.CHECKBOX && (
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        {...register(`customFields.${field.name}`)}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                  </div>
                )}

                {field.type === CustomFieldType.DATE && (
                  <input
                    type="date"
                    {...register(`customFields.${field.name}`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                )}

                {field.type === CustomFieldType.NUMBER && (
                  <input
                    type="number"
                    {...register(`customFields.${field.name}`, { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    {...(field.validation?.min !== undefined && { min: field.validation.min })}
                    {...(field.validation?.max !== undefined && { max: field.validation.max })}
                  />
                )}

                {errors.customFields?.[field.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customFields[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}
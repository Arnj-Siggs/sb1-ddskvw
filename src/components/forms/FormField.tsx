import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField as IFormField } from '../../types/forms';
import { GripVertical } from 'lucide-react';

interface FormFieldProps {
  field: IFormField;
}

export function FormField({ field }: FormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 p-4 bg-white border border-gray-200 rounded-lg mb-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="p-2 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.description && (
          <p className="mt-1 text-sm text-gray-500">{field.description}</p>
        )}

        {/* Render appropriate input based on field type */}
        {field.type === 'text' && (
          <input
            type="text"
            placeholder={field.placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            disabled
          />
        )}
        {/* Add other field types here */}
      </div>
    </div>
  );
}
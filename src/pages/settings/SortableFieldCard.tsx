import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { CustomField } from '../../types/customFields';
import { useDialog } from '../../hooks/useDialog';
import { CustomFieldForm } from './CustomFieldForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomField, toggleCustomField } from '../../lib/api/customFields';

interface SortableFieldCardProps {
  field: CustomField;
}

export function SortableFieldCard({ field }: SortableFieldCardProps) {
  const dialog = useDialog();
  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: deleteCustomField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (args: { id: string; isActive: boolean }) => 
      toggleCustomField(args.id, args.isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
    },
  });

  const handleDelete = () => {
    dialog.show({
      title: 'Delete Field',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this field? This action cannot be undone.
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
                deleteMutation.mutate(field.id);
                dialog.hide();
              }}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg"
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{field.label}</h4>
            <p className="text-sm text-gray-500">{field.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleMutation.mutate({ id: field.id, isActive: !field.isActive })}
              className={`p-1 rounded-md ${
                field.isActive
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              {field.isActive ? (
                <ToggleRight className="h-5 w-5" />
              ) : (
                <ToggleLeft className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() =>
                dialog.show({
                  title: 'Edit Field',
                  content: <CustomFieldForm field={field} onSuccess={() => dialog.hide()} />,
                })
              }
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        {field.description && (
          <p className="mt-1 text-sm text-gray-500">{field.description}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {field.type}
          </span>
          {field.required && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              Required
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {field.category}
          </span>
        </div>
      </div>
    </div>
  );
}
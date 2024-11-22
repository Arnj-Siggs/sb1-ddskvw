import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { CustomField } from '../../types/customFields';
import { CustomFieldForm } from './CustomFieldForm';
import { SortableFieldCard } from './SortableFieldCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getCustomFields, reorderCustomFields } from '../../lib/api/customFields';

export function TicketFields() {
  const queryClient = useQueryClient();
  const dialog = useDialog();

  const { data: fields = [], isLoading } = useQuery({
    queryKey: ['customFields', 'ticket'],
    queryFn: () => getCustomFields(),
  });

  const reorderMutation = useMutation({
    mutationFn: reorderCustomFields,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      const newFields = [...fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);

      reorderMutation.mutate(newFields);
    }
  };

  const handleAddField = () => {
    dialog.show({
      title: 'Add Custom Field',
      content: (
        <CustomFieldForm
          onSuccess={() => dialog.hide()}
        />
      ),
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Ticket Fields</h2>
          <p className="mt-1 text-sm text-gray-500">
            Customize fields for tickets
          </p>
        </div>
        <button
          onClick={handleAddField}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {fields.map((field) => (
              <SortableFieldCard key={field.id} field={field} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {fields.length === 0 && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No custom fields</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first custom field
          </p>
          <div className="mt-6">
            <button
              onClick={handleAddField}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
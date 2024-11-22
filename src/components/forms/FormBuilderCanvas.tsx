import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Form } from '../../types/forms';
import { FormField } from './FormField';
import { FormFieldToolbar } from './FormFieldToolbar';

interface FormBuilderCanvasProps {
  initialForm?: Form;
}

export function FormBuilderCanvas({ initialForm }: FormBuilderCanvasProps) {
  const [form, setForm] = React.useState<Form>(
    initialForm || {
      id: '',
      title: 'Untitled Form',
      description: '',
      sections: [
        {
          id: 'section-1',
          title: 'Section 1',
          fields: [],
        },
      ],
      settings: {
        requireAuth: true,
      },
      status: 'draft',
      createdBy: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Handle reordering
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="text-2xl font-bold w-full border-none focus:ring-0 p-0"
            placeholder="Form Title"
          />
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-2 w-full border-none focus:ring-0 p-0 text-gray-500"
            placeholder="Form Description"
          />
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={form.sections[0].fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {form.sections[0].fields.map((field) => (
              <FormField key={field.id} field={field} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <FormFieldToolbar />
    </div>
  );
}
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { getForms } from '../../lib/api/forms';
import { useDialog } from '../../hooks/useDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';

export function FormTemplates() {
  const dialog = useDialog();
  
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['formTemplates'],
    queryFn: () => getForms({ isTemplate: true }),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Form Templates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage reusable form templates
          </p>
        </div>
      </div>

      {templates.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No templates yet"
          description="Get started by creating your first template"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {template.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {template.description}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    // Handle using template
                  }}
                  className="text-sm text-primary hover:text-primary/90"
                >
                  Use template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getForms } from '../../lib/api/forms';
import { useDialog } from '../../hooks/useDialog';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';

export function FormsList() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const { hasPermission } = usePermissions();
  
  const { data: forms = [], isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  });

  const handleCreateForm = () => {
    navigate('/forms/builder');
  };

  const copyFormLink = (formId: string) => {
    const url = `${window.location.origin}/f/${formId}`;
    navigator.clipboard.writeText(url);
    dialog.show({
      title: 'Link Copied',
      content: <p>The form link has been copied to your clipboard.</p>,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Forms</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage custom forms
          </p>
        </div>
        {hasPermission(PERMISSIONS.CREATE_FORMS) && (
          <button
            onClick={handleCreateForm}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </button>
        )}
      </div>

      {forms.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No forms yet"
          description="Get started by creating your first form"
          action={
            hasPermission(PERMISSIONS.CREATE_FORMS) && (
              <button
                onClick={handleCreateForm}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Form
              </button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {form.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {form.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    form.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : form.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {form.status}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/forms/builder/${form.id}`)}
                  className="text-sm text-primary hover:text-primary/90"
                >
                  Edit form
                </button>
                <button
                  onClick={() => copyFormLink(form.id)}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Copy link
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
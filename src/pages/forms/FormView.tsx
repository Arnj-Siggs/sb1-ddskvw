import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../lib/api/forms';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export function FormView() {
  const { formId } = useParams();
  
  const { data: form, isLoading } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => formId ? getForm(formId) : null,
    enabled: !!formId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Form Not Found</h2>
          <p className="mt-2 text-gray-600">
            The form you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
            {form.description && (
              <p className="mt-2 text-gray-600">{form.description}</p>
            )}
          </div>

          <form className="space-y-6">
            {form.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-sm text-gray-500">{section.description}</p>
                )}
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {field.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {field.description}
                        </p>
                      )}
                      {/* Render appropriate input based on field type */}
                      {field.type === 'text' && (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      )}
                      {/* Add other field types here */}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
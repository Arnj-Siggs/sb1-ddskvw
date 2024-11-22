import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../lib/api/forms';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { FormBuilderCanvas } from '../../components/forms/FormBuilderCanvas';

export function FormBuilder() {
  const { formId } = useParams();
  
  const { data: form, isLoading } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => formId ? getForm(formId) : null,
    enabled: !!formId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {formId ? 'Edit Form' : 'Create Form'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Design your form using drag and drop components
        </p>
      </div>

      <FormBuilderCanvas initialForm={form} />
    </div>
  );
}
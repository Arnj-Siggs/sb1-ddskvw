import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { getFormSubmissions } from '../../lib/api/forms';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';

export function FormSubmissions() {
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['formSubmissions'],
    queryFn: () => getFormSubmissions(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Form Submissions</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage form responses
        </p>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          icon={Download}
          title="No submissions yet"
          description="Form submissions will appear here"
        />
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.formId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.submittedBy || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(submission.submittedAt), 'PPp')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-primary/90">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, FileText, Download } from 'lucide-react';
import { useDialog } from '../../../hooks/useDialog';
import { ReportTemplate } from '../../../types/reports';
import { CreateReportDialog } from './CreateReportDialog';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';

// Mock data - replace with actual API calls
const SYSTEM_TEMPLATES: ReportTemplate[] = [
  {
    id: 'daily-incidents',
    name: 'Daily Incident Report',
    description: 'Summary of all incidents created in the last 24 hours',
    type: 'incident',
    filters: {
      dateRange: {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      },
    },
    columns: ['id', 'title', 'status', 'priority', 'assignedTo', 'createdAt'],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more system templates
];

export function TicketReports() {
  const dialog = useDialog();
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['reportTemplates'],
    queryFn: () => Promise.resolve([...SYSTEM_TEMPLATES]), // Replace with actual API call
  });

  const handleCreateReport = () => {
    dialog.show({
      title: 'Create Report',
      content: <CreateReportDialog onSuccess={() => dialog.hide()} />,
    });
  };

  const handleGenerateReport = (template: ReportTemplate) => {
    // Implement report generation logic
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and manage ticket reports
          </p>
        </div>
        <button
          onClick={handleCreateReport}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </button>
      </div>

      {templates.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No report templates"
          description="Get started by creating your first report template"
          action={
            <button
              onClick={handleCreateReport}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {template.name}
                    {template.isSystem && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        System
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleGenerateReport(template)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
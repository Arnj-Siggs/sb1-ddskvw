import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Settings, Laptop } from 'lucide-react';
import { useDialog } from '../../../hooks/useDialog';
import { ChromebookForm } from '../ChromebookForm';
import { getChromebooks } from '../../../lib/api/chromebooks';
import { ChromebookFilters } from '../ChromebookFilters';
import { usePermissions } from '../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../types/auth';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useViewPreferences } from '../../../hooks/useViewPreferences';
import { ViewToggle } from '../../../components/common/ViewToggle';
import { ColumnToggle } from '../../../components/common/ColumnToggle';
import { ChromebookTableView } from './ChromebookTableView';
import { ChromebookGridView } from './ChromebookGridView';
import { ChromebookBulkActions } from '../ChromebookBulkActions';

export function ChromebookDevices() {
  const dialog = useDialog();
  const { hasPermission } = usePermissions();
  const { handleError } = useErrorHandler();
  const { chromebookView, chromebookColumns, setChromebookView, setChromebookColumn } = useViewPreferences();
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    grade: '',
  });

  const { data: chromebooks = [], isLoading } = useQuery({
    queryKey: ['chromebooks', filters],
    queryFn: () => getChromebooks(filters),
    onError: (error) => handleError(error, 'Failed to fetch Chromebooks'),
  });

  const handleAddChromebook = () => {
    dialog.show({
      title: 'Add Chromebook',
      content: <ChromebookForm onSuccess={() => dialog.hide()} />,
    });
  };

  const handleViewChange = (view: 'list' | 'grid') => {
    setChromebookView(view);
  };

  const handleColumnToggle = (column: string) => {
    setChromebookColumn(column as keyof typeof chromebookColumns, !chromebookColumns[column as keyof typeof chromebookColumns]);
  };

  const columns = [
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'model', label: 'Model' },
    { key: 'status', label: 'Status' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'batteryHealth', label: 'Battery Health' },
    { key: 'lastSync', label: 'Last Sync' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Devices</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your Chromebook inventory
          </p>
        </div>
        {hasPermission(PERMISSIONS.CREATE_CHROMEBOOKS) && (
          <button
            onClick={handleAddChromebook}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Chromebook
          </button>
        )}
      </div>

      <ChromebookBulkActions />

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 justify-between">
          <ChromebookFilters filters={filters} onChange={setFilters} />
          <div className="flex space-x-4">
            <ViewToggle view={chromebookView} onChange={handleViewChange} />
            <button
              onClick={() => dialog.show({
                title: 'Column Settings',
                content: (
                  <ColumnToggle
                    columns={columns}
                    visibleColumns={chromebookColumns}
                    onChange={handleColumnToggle}
                  />
                ),
              })}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : chromebooks.length === 0 ? (
          <EmptyState
            icon={Laptop}
            title="No Chromebooks found"
            description="Add your first Chromebook to get started"
            action={
              hasPermission(PERMISSIONS.CREATE_CHROMEBOOKS) && (
                <button
                  onClick={handleAddChromebook}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Chromebook
                </button>
              )
            }
          />
        ) : chromebookView === 'list' ? (
          <ChromebookTableView
            chromebooks={chromebooks}
            visibleColumns={chromebookColumns}
          />
        ) : (
          <ChromebookGridView chromebooks={chromebooks} />
        )}
      </div>
    </div>
  );
}
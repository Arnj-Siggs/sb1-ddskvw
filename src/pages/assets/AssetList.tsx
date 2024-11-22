import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Settings, AlertTriangle, Monitor as MonitorIcon } from 'lucide-react';
import { AssetType, AssetStatus } from '../../types/assets';
import { useDialog } from '../../hooks/useDialog';
import { AssetForm } from './AssetForm';
import { getAssets } from '../../lib/api/assets';
import { AssetCard } from './AssetCard';
import { AssetFilters } from './AssetFilters';
import { useViewPreferences } from '../../hooks/useViewPreferences';
import { ViewToggle } from '../../components/common/ViewToggle';
import { ColumnToggle } from '../../components/common/ColumnToggle';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AssetTableView } from './AssetTableView';
import { FilterMenu } from '../../components/filters/FilterMenu';
import { useFilters } from '../../hooks/useFilters';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';

export function AssetList() {
  const dialog = useDialog();
  const { hasPermission } = usePermissions();
  const { assetView, assetColumns, setAssetView, setAssetColumn } = useViewPreferences();
  const [filters, setFilters] = useState({
    type: '' as AssetType | '',
    status: '' as AssetStatus | '',
    search: '',
    location: '',
  });

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets', filters],
    queryFn: () => getAssets(filters),
    initialData: [], // Initialize with empty array to prevent map errors
  });

  const handleAddAsset = () => {
    dialog.show({
      title: 'Add Asset',
      content: <AssetForm onSuccess={() => dialog.hide()} />,
    });
  };

  const handleUpdateAsset = (id: string, data: Partial<Asset>) => {
    // Handle asset update logic
  };

  const handleViewChange = (view: 'list' | 'grid') => {
    setAssetView(view);
  };

  const handleColumnToggle = (column: string) => {
    setAssetColumn(column as keyof typeof assetColumns, !assetColumns[column as keyof typeof assetColumns]);
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'assignee', label: 'Assigned To' },
    { key: 'warranty', label: 'Warranty' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Asset Management</h1>
        {hasPermission(PERMISSIONS.CREATE_ASSETS) && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddAsset}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex space-x-4">
            <AssetFilters filters={filters} onChange={setFilters} />
            <FilterMenu
              type="asset"
              currentFilters={filters}
              onFilterSelect={setFilters}
            />
          </div>
          <div className="flex space-x-4">
            <ViewToggle view={assetView} onChange={handleViewChange} />
            <button
              onClick={() => dialog.show({
                title: 'Column Settings',
                content: (
                  <ColumnToggle
                    columns={columns}
                    visibleColumns={assetColumns}
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
        ) : assets.length === 0 ? (
          <EmptyState
            icon={MonitorIcon}
            title="No assets found"
            description="Get started by adding your first asset"
            action={
              hasPermission(PERMISSIONS.CREATE_ASSETS) && (
                <button
                  onClick={handleAddAsset}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </button>
              )
            }
          />
        ) : assetView === 'list' ? (
          <AssetTableView
            assets={assets}
            visibleColumns={assetColumns}
            onUpdateAsset={handleUpdateAsset}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
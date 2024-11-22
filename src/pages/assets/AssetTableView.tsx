import React from 'react';
import { format } from 'date-fns';
import { Asset, AssetStatus } from '../../types/assets';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useDialog } from '../../hooks/useDialog';
import { AssetDetails } from './AssetDetails';

interface AssetTableViewProps {
  assets: Asset[];
  visibleColumns: Record<string, boolean>;
  onUpdateAsset: (id: string, data: Partial<Asset>) => void;
}

export function AssetTableView({ assets, visibleColumns, onUpdateAsset }: AssetTableViewProps) {
  const dialog = useDialog();

  const handleRowClick = (asset: Asset) => {
    dialog.show({
      title: `Asset Details`,
      content: <AssetDetails asset={asset} />,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {visibleColumns.id && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            {visibleColumns.type && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            )}
            {visibleColumns.status && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            )}
            {visibleColumns.location && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            )}
            {visibleColumns.assignee && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
            )}
            {visibleColumns.warranty && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Warranty End
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr
              key={asset.id}
              onClick={() => handleRowClick(asset)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {visibleColumns.id && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{asset.id}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {asset.name}
                </div>
                <div className="text-sm text-gray-500">
                  {asset.serialNumber}
                </div>
              </td>
              {visibleColumns.type && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.type}
                </td>
              )}
              {visibleColumns.status && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={asset.status} size="sm" />
                </td>
              )}
              {visibleColumns.location && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.location || '-'}
                </td>
              )}
              {visibleColumns.assignee && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.assignedTo?.name || '-'}
                </td>
              )}
              {visibleColumns.warranty && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.warrantyEnd ? format(new Date(asset.warrantyEnd), 'PP') : '-'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
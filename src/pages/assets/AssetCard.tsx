import React from 'react';
import { Monitor, Laptop, Printer, Tv, HardDrive, Wrench, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Asset, AssetType, AssetStatus } from '../../types/assets';
import { useDialog } from '../../hooks/useDialog';
import { AssetForm } from './AssetForm';

const assetIcons: Record<AssetType, React.ElementType> = {
  [AssetType.DESKTOP_PC]: Monitor,
  [AssetType.CHROMEBOOK]: Laptop,
  [AssetType.MAC]: Monitor,
  [AssetType.INTERACTIVE_PANEL]: Tv,
  [AssetType.PRINTER]: Printer,
  [AssetType.PROJECTOR]: HardDrive,
  [AssetType.OTHER]: HardDrive,
};

const statusColors: Record<AssetStatus, string> = {
  [AssetStatus.AVAILABLE]: 'bg-green-100 text-green-800',
  [AssetStatus.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [AssetStatus.IN_REPAIR]: 'bg-yellow-100 text-yellow-800',
  [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
  [AssetStatus.LOST]: 'bg-red-100 text-red-800',
};

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const dialog = useDialog();
  const Icon = assetIcons[asset.type];

  const handleEdit = () => {
    dialog.show({
      title: 'Edit Asset',
      content: <AssetForm asset={asset} onSuccess={() => dialog.hide()} />,
    });
  };

  const isWarrantyExpiringSoon = asset.warrantyEnd && 
    new Date(asset.warrantyEnd) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{asset.name}</h3>
              <p className="text-sm text-gray-500">{asset.serialNumber}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[asset.status]}`}>
            {asset.status}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {asset.location && (
            <p className="text-sm text-gray-500">
              Location: {asset.location}
            </p>
          )}
          
          {asset.assignedTo && (
            <p className="text-sm text-gray-500">
              Assigned to: {asset.assignedTo.name}
            </p>
          )}

          {asset.warrantyEnd && (
            <div className="flex items-center space-x-1">
              {isWarrantyExpiringSoon && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              <p className="text-sm text-gray-500">
                Warranty ends: {format(new Date(asset.warrantyEnd), 'MMM d, yyyy')}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          {asset.status === AssetStatus.IN_REPAIR && (
            <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-yellow-600 hover:bg-yellow-700">
              <Wrench className="h-4 w-4 mr-1" />
              View Repair
            </button>
          )}
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
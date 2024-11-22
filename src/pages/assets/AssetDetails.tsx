import React from 'react';
import { format } from 'date-fns';
import { Monitor, MapPin, User, Calendar, AlertTriangle } from 'lucide-react';
import { Asset, AssetStatus } from '../../types/assets';
import { StatusBadge } from '../../components/common/StatusBadge';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAsset } from '../../lib/api/assets';
import { useErrorHandler } from '../../hooks/useErrorHandler';

interface AssetDetailsProps {
  asset: Asset;
  onClose?: () => void;
}

export function AssetDetails({ asset, onClose }: AssetDetailsProps) {
  const { hasPermission } = usePermissions();
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Asset>) => updateAsset(asset.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
    onError: (error) => handleError(error, 'Failed to update asset'),
  });

  const handleStatusChange = (status: AssetStatus) => {
    updateMutation.mutate({ status });
  };

  const isWarrantyExpiringSoon = asset.warrantyEnd && 
    new Date(asset.warrantyEnd) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">{asset.name}</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Serial: {asset.serialNumber}</p>
          </div>

          {hasPermission(PERMISSIONS.UPDATE_ASSETS) && (
            <select
              value={asset.status}
              onChange={(e) => handleStatusChange(e.target.value as AssetStatus)}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              {Object.values(AssetStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-500">Location:</span>
              <span className="ml-1 font-medium">{asset.location || 'Not specified'}</span>
            </div>

            {asset.assignedTo && (
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-500">Assigned to:</span>
                <span className="ml-1 font-medium">{asset.assignedTo.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {asset.purchaseDate && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-500">Purchased:</span>
                <span className="ml-1 font-medium">
                  {format(new Date(asset.purchaseDate), 'PP')}
                </span>
              </div>
            )}

            {asset.warrantyEnd && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-500">Warranty Until:</span>
                <span className="ml-1 font-medium">
                  {format(new Date(asset.warrantyEnd), 'PP')}
                </span>
              </div>
            )}
          </div>
        </div>

        {isWarrantyExpiringSoon && (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-md">
            <AlertTriangle className="h-5 w-5" />
            <span>Warranty expires soon</span>
          </div>
        )}

        {asset.notes && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {asset.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
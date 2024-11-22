import React from 'react';
import { Laptop, Battery, AlertTriangle, WifiOff } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Chromebook } from '../../types/chromebooks';
import { AssetStatus } from '../../types/assets';
import { useDialog } from '../../hooks/useDialog';
import { ChromebookDetails } from './ChromebookDetails';

const statusColors: Record<AssetStatus, string> = {
  [AssetStatus.AVAILABLE]: 'bg-green-100 text-green-800',
  [AssetStatus.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [AssetStatus.IN_REPAIR]: 'bg-yellow-100 text-yellow-800',
  [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
  [AssetStatus.LOST]: 'bg-red-100 text-red-800',
};

interface ChromebookCardProps {
  chromebook: Chromebook;
}

export function ChromebookCard({ chromebook }: ChromebookCardProps) {
  const dialog = useDialog();

  const handleClick = () => {
    dialog.show({
      title: `Chromebook Details`,
      content: <ChromebookDetails chromebook={chromebook} />,
    });
  };

  const needsAttention = 
    (chromebook.batteryHealth && chromebook.batteryHealth < 70) ||
    (chromebook.lastSync && new Date(chromebook.lastSync).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000) ||
    chromebook.damageReports.some(report => report.status === 'PENDING');

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Laptop className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{chromebook.model}</h3>
              <p className="text-sm text-gray-500">{chromebook.serialNumber}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[chromebook.status]}`}>
            {chromebook.status}
          </span>
        </div>

        {needsAttention && (
          <div className="mt-4 flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Needs attention</span>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {chromebook.assignedTo && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Assigned to:</span>
              <span className="font-medium">
                {chromebook.assignedTo.name}
                {chromebook.assignedTo.grade && ` (Grade ${chromebook.assignedTo.grade})`}
              </span>
            </div>
          )}

          {chromebook.batteryHealth && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Battery Health:</span>
              <div className="flex items-center">
                <Battery className={`h-4 w-4 mr-1 ${
                  chromebook.batteryHealth < 70 ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <span>{chromebook.batteryHealth}%</span>
              </div>
            </div>
          )}

          {chromebook.lastSync && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Last Sync:</span>
              <div className="flex items-center">
                {new Date(chromebook.lastSync).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                  <WifiOff className="h-4 w-4 mr-1 text-yellow-500" />
                )}
                <span>{formatDistanceToNow(new Date(chromebook.lastSync))} ago</span>
              </div>
            </div>
          )}
        </div>

        {chromebook.damageReports.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {chromebook.damageReports.length} Damage Report{chromebook.damageReports.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
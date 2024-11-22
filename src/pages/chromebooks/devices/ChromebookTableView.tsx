import React from 'react';
import { format } from 'date-fns';
import { Chromebook } from '../../../types/chromebooks';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useDialog } from '../../../hooks/useDialog';
import { ChromebookDetails } from '../ChromebookDetails';
import { Battery, WifiOff } from 'lucide-react';

interface ChromebookTableViewProps {
  chromebooks: Chromebook[];
  visibleColumns: Record<string, boolean>;
}

export function ChromebookTableView({ chromebooks, visibleColumns }: ChromebookTableViewProps) {
  const dialog = useDialog();

  const handleRowClick = (chromebook: Chromebook) => {
    dialog.show({
      title: `Chromebook Details`,
      content: <ChromebookDetails chromebook={chromebook} />,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {visibleColumns.serialNumber && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
            )}
            {visibleColumns.model && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
            )}
            {visibleColumns.status && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            )}
            {visibleColumns.assignedTo && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
            )}
            {visibleColumns.batteryHealth && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Battery Health
              </th>
            )}
            {visibleColumns.lastSync && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Sync
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chromebooks.map((chromebook) => (
            <tr
              key={chromebook.id}
              onClick={() => handleRowClick(chromebook)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {visibleColumns.serialNumber && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {chromebook.serialNumber}
                </td>
              )}
              {visibleColumns.model && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {chromebook.model}
                </td>
              )}
              {visibleColumns.status && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={chromebook.status} size="sm" />
                </td>
              )}
              {visibleColumns.assignedTo && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {chromebook.assignedTo ? (
                    <div>
                      <div className="font-medium text-gray-900">
                        {chromebook.assignedTo.name}
                      </div>
                      {chromebook.assignedTo.grade && (
                        <div className="text-gray-500">Grade {chromebook.assignedTo.grade}</div>
                      )}
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              )}
              {visibleColumns.batteryHealth && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {chromebook.batteryHealth ? (
                    <div className="flex items-center">
                      <Battery className={`h-4 w-4 mr-1 ${
                        chromebook.batteryHealth < 70 ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className="text-sm text-gray-900">{chromebook.batteryHealth}%</span>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              )}
              {visibleColumns.lastSync && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {chromebook.lastSync ? (
                    <div className="flex items-center">
                      {new Date(chromebook.lastSync).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                        <WifiOff className="h-4 w-4 mr-1 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-900">
                        {format(new Date(chromebook.lastSync), 'PP')}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
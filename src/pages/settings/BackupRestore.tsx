import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Download, Upload, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface Backup {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  status: 'completed' | 'failed';
  type: 'manual' | 'automatic';
}

// Mock data - replace with actual API call
const MOCK_BACKUPS: Backup[] = [
  {
    id: '1',
    name: 'Daily Backup',
    size: 1024 * 1024 * 5, // 5MB
    createdAt: new Date().toISOString(),
    status: 'completed',
    type: 'automatic',
  },
  // Add more mock backups
];

export function BackupRestore() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: backups = [], isLoading } = useQuery({
    queryKey: ['backups'],
    queryFn: () => Promise.resolve(MOCK_BACKUPS),
  });

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Implement backup creation
    setTimeout(() => setIsCreatingBackup(false), 2000);
  };

  const handleDownloadBackup = (backup: Backup) => {
    // Implement backup download
  };

  const handleRestore = () => {
    if (!selectedFile) return;
    // Implement restore functionality
  };

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Create Backup</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a backup of your system data
          </p>
          <div className="mt-4">
            <button
              onClick={handleCreateBackup}
              disabled={isCreatingBackup}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isCreatingBackup ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Create Backup
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Restore System</h2>
          <p className="mt-1 text-sm text-gray-500">
            Restore your system from a backup file
          </p>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
              />
              <button
                onClick={handleRestore}
                disabled={!selectedFile}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Restore
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Backup History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {backup.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {backup.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatSize(backup.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(backup.createdAt), 'PPp')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        backup.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDownloadBackup(backup)}
                        className="text-primary hover:text-primary/90"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
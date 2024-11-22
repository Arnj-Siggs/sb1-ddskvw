import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Download, RefreshCw } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { importChromebooks, exportChromebooks, syncWithGoogle } from '../../lib/api/chromebooks';
import { useMutation } from '@tanstack/react-query';

const importSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === 'text/csv', {
    message: 'Only CSV files are allowed',
  }),
});

type ImportFormData = z.infer<typeof importSchema>;

export function ChromebookBulkActions() {
  const dialog = useDialog();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
  });

  const importMutation = useMutation({
    mutationFn: (data: ImportFormData) => importChromebooks(data.file),
    onSuccess: () => {
      setError(null);
      dialog.show({
        title: 'Success',
        content: <p>Chromebooks imported successfully.</p>,
      });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const exportMutation = useMutation({
    mutationFn: exportChromebooks,
    onSuccess: (blob) => {
      setError(null);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chromebooks-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const syncMutation = useMutation({
    mutationFn: syncWithGoogle,
    onSuccess: () => {
      setError(null);
      dialog.show({
        title: 'Success',
        content: <p>Synced successfully with Google Admin SDK.</p>,
      });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          Import CSV
          <input
            type="file"
            accept=".csv"
            className="hidden"
            {...register('file')}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleSubmit((data) => importMutation.mutate(data))();
              }
            }}
          />
        </label>

        <button
          onClick={() => exportMutation.mutate()}
          disabled={exportMutation.isPending}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <Download className="h-4 w-4 mr-2" />
          {exportMutation.isPending ? 'Exporting...' : 'Export CSV'}
        </button>

        <button
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
          {syncMutation.isPending ? 'Syncing...' : 'Sync with Google'}
        </button>
      </div>
    </div>
  );
}
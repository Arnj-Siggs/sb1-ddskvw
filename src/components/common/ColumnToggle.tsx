import React from 'react';
import { Check } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface ColumnToggleProps {
  columns: Column[];
  visibleColumns: Record<string, boolean>;
  onChange: (column: string, visible: boolean) => void;
}

export function ColumnToggle({ columns, visibleColumns, onChange }: ColumnToggleProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Visible Columns</h3>
      <div className="space-y-2">
        {columns.map((column) => (
          <label
            key={column.key}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded border ${
                visibleColumns[column.key]
                  ? 'bg-primary border-primary'
                  : 'border-gray-300'
              } flex items-center justify-center`}
              onClick={() => onChange(column.key, !visibleColumns[column.key])}
            >
              {visibleColumns[column.key] && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700">{column.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
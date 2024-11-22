import React from 'react';
import { 
  Type, 
  AlignLeft, 
  List, 
  CheckSquare, 
  Calendar,
  Mail,
  Hash,
  Upload
} from 'lucide-react';

const FIELD_TYPES = [
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'textarea', icon: AlignLeft, label: 'Paragraph' },
  { type: 'select', icon: List, label: 'Dropdown' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
  { type: 'date', icon: Calendar, label: 'Date' },
  { type: 'email', icon: Mail, label: 'Email' },
  { type: 'number', icon: Hash, label: 'Number' },
  { type: 'file', icon: Upload, label: 'File Upload' },
];

export function FormFieldToolbar() {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-gray-900 mb-4">Form Fields</h3>
      <div className="space-y-2">
        {FIELD_TYPES.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            className="flex items-center w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
            draggable
          >
            <Icon className="h-4 w-4 mr-2 text-gray-500" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
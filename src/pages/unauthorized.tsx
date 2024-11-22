import React from 'react';
import { Shield } from 'lucide-react';

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <Shield className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this resource.
        </p>
      </div>
    </div>
  );
}
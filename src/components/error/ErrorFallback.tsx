import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  message?: string;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  message = 'Something went wrong',
}: ErrorFallbackProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.message}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                onClick={resetErrorBoundary}
                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
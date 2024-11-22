import React, { useCallback } from 'react';
import { useDialog } from './useDialog';
import { AlertTriangle } from 'lucide-react';

export function useErrorHandler() {
  const dialog = useDialog();

  const handleError = useCallback((error: unknown, fallbackMessage = 'An error occurred') => {
    const message = error instanceof Error ? error.message : fallbackMessage;
    
    dialog.show({
      title: 'Error',
      content: (
        <div className="flex items-start space-x-3 text-red-600">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p>{message}</p>
        </div>
      ),
    });

    // In production, you would also log this error to your error tracking service
    console.error(error);
  }, [dialog]);

  return { handleError };
}
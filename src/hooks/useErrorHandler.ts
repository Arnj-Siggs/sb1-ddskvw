import { useCallback } from 'react';
import { useDialog } from './useDialog';

export function useErrorHandler() {
  const dialog = useDialog();

  const handleError = useCallback((error: unknown, fallbackMessage = 'An error occurred') => {
    const message = error instanceof Error ? error.message : fallbackMessage;
    
    dialog.show({
      title: 'Error',
      content: message,
    });

    // In production, you would also log this error to your error tracking service
    console.error(error);
  }, [dialog]);

  return { handleError };
}
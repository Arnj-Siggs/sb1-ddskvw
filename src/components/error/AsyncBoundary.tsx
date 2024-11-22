import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface AsyncBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export function AsyncBoundary({
  children,
  fallback,
  loadingFallback = <LoadingSpinner size="lg" />,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
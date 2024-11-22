import React from 'react';
import { Role } from '../../types/auth';
import { usePermissions } from '../../hooks/usePermissions';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: Role;
  fallback?: React.ReactNode;
}

export function RoleGuard({ children, requiredRole, fallback = null }: RoleGuardProps) {
  const { hasRole } = usePermissions();

  if (!hasRole(requiredRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
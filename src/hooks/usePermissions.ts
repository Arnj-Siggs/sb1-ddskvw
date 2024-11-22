import { useAuth } from '../contexts/AuthContext';
import { useRoles } from '../contexts/RoleContext';
import { PERMISSIONS } from '../types/auth';

export function usePermissions() {
  const { user } = useAuth();
  const { roles } = useRoles();

  const getUserPermissions = () => {
    if (!user) return [];

    // Super admin has all permissions
    if (user.role === 'SUPER_ADMIN') {
      return Object.values(PERMISSIONS);
    }

    // Get role permissions
    const userRole = roles.find(r => r.id === user.role);
    const rolePermissions = userRole?.permissions || [];

    // Combine with user-specific permissions
    return [...new Set([...rolePermissions, ...(user.customPermissions || [])])];
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Super admin has all permissions
    if (user.role === 'SUPER_ADMIN') return true;

    const userPermissions = getUserPermissions();
    return userPermissions.includes(permission);
  };

  return { hasPermission, getUserPermissions };
}
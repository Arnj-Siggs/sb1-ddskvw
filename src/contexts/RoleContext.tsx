import React, { createContext, useContext, useState } from 'react';
import { CustomRole, PERMISSIONS, Role } from '../types/auth';

interface RoleContextType {
  roles: CustomRole[];
  addRole: (role: Omit<CustomRole, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRole: (id: string, role: Partial<CustomRole>) => void;
  deleteRole: (id: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Default system roles
const DEFAULT_ROLES: CustomRole[] = [
  {
    id: Role.SUPER_ADMIN,
    name: 'Super Administrator',
    description: 'Has full access to all system features',
    permissions: Object.values(PERMISSIONS),
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: Role.ADMINISTRATOR,
    name: 'Administrator',
    description: 'Can manage users and system settings',
    permissions: [
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.CREATE_USERS,
      PERMISSIONS.UPDATE_USERS,
      PERMISSIONS.DELETE_USERS,
      PERMISSIONS.MANAGE_SYSTEM_SETTINGS,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.MANAGE_INTEGRATIONS,
    ],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: Role.HELP_DESK,
    name: 'Help Desk',
    description: 'Can manage tickets and assets',
    permissions: [
      PERMISSIONS.VIEW_TICKETS,
      PERMISSIONS.CREATE_TICKETS,
      PERMISSIONS.UPDATE_TICKETS,
      PERMISSIONS.ASSIGN_TICKETS,
      PERMISSIONS.VIEW_ASSETS,
      PERMISSIONS.UPDATE_ASSETS,
      PERMISSIONS.VIEW_REPORTS,
    ],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<CustomRole[]>(DEFAULT_ROLES);

  const addRole = (role: Omit<CustomRole, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRole: CustomRole = {
      ...role,
      id: `role-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoles(current => [...current, newRole]);
  };

  const updateRole = (id: string, updates: Partial<CustomRole>) => {
    setRoles(current =>
      current.map(role =>
        role.id === id
          ? {
              ...role,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : role
      )
    );
  };

  const deleteRole = (id: string) => {
    // Prevent deletion of system roles
    const role = roles.find(r => r.id === id);
    if (role?.isSystem) {
      throw new Error('Cannot delete system roles');
    }
    setRoles(current => current.filter(role => role.id !== id));
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
}
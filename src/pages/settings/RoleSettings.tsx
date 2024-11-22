import React from 'react';
import { useRoles } from '../../contexts/RoleContext';
import { useDialog } from '../../hooks/useDialog';
import { Plus, Edit2, Trash2, Shield } from 'lucide-react';
import { PERMISSION_DETAILS, CustomRole } from '../../types/auth';
import { RoleForm } from './RoleForm';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export function RoleSettings() {
  const { roles, deleteRole } = useRoles();
  const dialog = useDialog();
  const { handleError } = useErrorHandler();

  const handleCreateRole = () => {
    dialog.show({
      title: 'Create Role',
      content: <RoleForm onSuccess={() => dialog.hide()} />,
    });
  };

  const handleEditRole = (role: CustomRole) => {
    dialog.show({
      title: 'Edit Role',
      content: <RoleForm role={role} onSuccess={() => dialog.hide()} />,
    });
  };

  const handleDeleteRole = async (role: CustomRole) => {
    try {
      if (role.isSystem) {
        throw new Error('Cannot delete system roles');
      }

      dialog.show({
        title: 'Confirm Delete',
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the role "{role.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => dialog.hide()}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteRole(role.id);
                  dialog.hide();
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ),
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Role Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage user roles and their permissions
          </p>
        </div>
        <button
          onClick={handleCreateRole}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {roles.map((role) => (
          <div
            key={role.id}
            className="p-6 flex items-center justify-between"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Shield className={`h-6 w-6 ${role.isSystem ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {role.name}
                  {role.isSystem && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      System Role
                    </span>
                  )}
                </h4>
                <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.permissions.slice(0, 3).map((permissionId) => {
                    const permission = PERMISSION_DETAILS.find(p => p.id === permissionId);
                    return permission ? (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {permission.name}
                      </span>
                    ) : null;
                  })}
                  {role.permissions.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      +{role.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditRole(role)}
                disabled={role.isSystem}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                title={role.isSystem ? 'System roles cannot be edited' : 'Edit role'}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteRole(role)}
                disabled={role.isSystem}
                className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                title={role.isSystem ? 'System roles cannot be deleted' : 'Delete role'}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
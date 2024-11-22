import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomRole, PERMISSION_DETAILS, roleSchema } from '../../types/auth';
import { useRoles } from '../../contexts/RoleContext';
import { useMutation } from '@tanstack/react-query';
import { useErrorHandler } from '../../hooks/useErrorHandler';

interface RoleFormProps {
  role?: CustomRole;
  onSuccess: () => void;
}

export function RoleForm({ role, onSuccess }: RoleFormProps) {
  const { addRole, updateRole } = useRoles();
  const { handleError } = useErrorHandler();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: role || {
      permissions: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (role) {
        return updateRole(role.id, data);
      }
      return addRole(data);
    },
    onSuccess,
    onError: (error) => handleError(error),
  });

  const permissionsByCategory = PERMISSION_DETAILS.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof PERMISSION_DETAILS>);

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Permissions
        </label>
        <div className="space-y-6">
          {Object.entries(permissionsByCategory).map(([category, permissions]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 capitalize">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      value={permission.id}
                      {...register('permissions')}
                      className="mt-1 rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{permission.name}</span>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.permissions && (
          <p className="mt-2 text-sm text-red-600">{errors.permissions.message as string}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : role ? 'Update Role' : 'Create Role'}
        </button>
      </div>
    </form>
  );
}
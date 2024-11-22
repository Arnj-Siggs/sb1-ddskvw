import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '../../types/auth';
import { createUser, updateUser } from '../../lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useRoles } from '../../contexts/RoleContext';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8).optional(),
  roleId: z.string().min(1, 'Role is required'),
  customPermissions: z.array(z.string()).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const { roles } = useRoles();
  const { handleError } = useErrorHandler();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      ...user,
      roleId: user.role,
    } : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: UserFormData) => 
      user ? updateUser(user.id, { ...data, role: data.roleId }) : createUser({ ...data, role: data.roleId }),
    onSuccess,
    onError: (error) => handleError(error),
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {!user && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register('roleId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="mt-1 text-sm text-red-600">{errors.roleId.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}
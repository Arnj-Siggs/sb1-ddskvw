import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getUsers, deleteUser } from '../../lib/api/auth';
import { Role } from '../../types/auth';
import { UserForm } from './UserForm';
import { useDialog } from '../../hooks/useDialog';

export function UserList() {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: [], // Initialize with empty array to prevent map errors
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleAddUser = () => {
    dialog.show({
      title: 'Add User',
      content: <UserForm onSuccess={() => {
        dialog.hide();
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }} />,
    });
  };

  const handleEditUser = (user: any) => {
    dialog.show({
      title: 'Edit User',
      content: <UserForm user={user} onSuccess={() => {
        dialog.hide();
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }} />,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <button
          onClick={handleAddUser}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-primary hover:text-primary/90"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
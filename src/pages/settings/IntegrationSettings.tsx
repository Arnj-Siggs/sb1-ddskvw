import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

const integrationSchema = z.object({
  microsoftClientId: z.string().min(1, 'Client ID is required'),
  microsoftTenantId: z.string().min(1, 'Tenant ID is required'),
  googleClientId: z.string().min(1, 'Client ID is required'),
  googleAdminEmail: z.string().email('Invalid email address'),
  jamfUrl: z.string().url('Invalid URL'),
  jamfUsername: z.string().min(1, 'Username is required'),
  jamfPassword: z.string(),
});

type IntegrationFormData = z.infer<typeof integrationSchema>;

export function IntegrationSettings() {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<IntegrationFormData>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      microsoftClientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || '',
      microsoftTenantId: import.meta.env.VITE_MICROSOFT_TENANT_ID || '',
      googleClientId: '',
      googleAdminEmail: '',
      jamfUrl: '',
      jamfUsername: '',
      jamfPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: IntegrationFormData) => {
      // Mock API call
      console.log('Saving integrations:', data);
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900">Microsoft 365 Integration</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Client ID
                  </label>
                  <input
                    type="text"
                    {...register('microsoftClientId')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.microsoftClientId && (
                    <p className="mt-1 text-sm text-red-600">{errors.microsoftClientId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tenant ID
                  </label>
                  <input
                    type="text"
                    {...register('microsoftTenantId')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.microsoftTenantId && (
                    <p className="mt-1 text-sm text-red-600">{errors.microsoftTenantId.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900">Google Workspace Integration</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Client ID
                  </label>
                  <input
                    type="text"
                    {...register('googleClientId')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.googleClientId && (
                    <p className="mt-1 text-sm text-red-600">{errors.googleClientId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    {...register('googleAdminEmail')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.googleAdminEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.googleAdminEmail.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Jamf Pro Integration</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Server URL
                  </label>
                  <input
                    type="url"
                    {...register('jamfUrl')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="https://your-instance.jamfcloud.com"
                  />
                  {errors.jamfUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.jamfUrl.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register('jamfUsername')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.jamfUsername && (
                    <p className="mt-1 text-sm text-red-600">{errors.jamfUsername.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('jamfPassword')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  {errors.jamfPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.jamfPassword.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={!isDirty || mutation.isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {mutation.isPending ? 'Saving...' : 'Save Integrations'}
          </button>
        </div>
      </div>
    </form>
  );
}
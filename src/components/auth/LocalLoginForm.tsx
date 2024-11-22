import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LocalLoginFormProps {
  onSuccess: () => void;
}

export function LocalLoginForm({ onSuccess }: LocalLoginFormProps) {
  const { localLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setError(null);
      await localLogin(data.email, data.password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center text-red-800">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="admin@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="mt-2 text-sm text-gray-500 text-center">
        Default credentials: admin@example.com / password
      </p>
    </form>
  );
}
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Monitor } from 'lucide-react';
import { LocalLoginForm } from '../components/auth/LocalLoginForm';

export function Login() {
  const { isAuthenticated, login, loading } = useAuth();
  const [showLocalLogin, setShowLocalLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Monitor className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">K12 Help Desk</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access the help desk system</p>
        </div>

        {showLocalLogin ? (
          <>
            <LocalLoginForm onSuccess={() => {}} />
            <div className="text-center">
              <button
                onClick={() => setShowLocalLogin(false)}
                className="text-sm text-primary hover:text-primary/90"
              >
                Use Microsoft 365 instead
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={login}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in with Microsoft 365
            </button>
            <div className="text-center">
              <button
                onClick={() => setShowLocalLogin(true)}
                className="text-sm text-primary hover:text-primary/90"
              >
                Use email and password instead
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
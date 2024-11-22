import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/auth';
import { AuthState, Role, User } from '../types/auth';
import { localLogin as apiLocalLogin } from '../lib/api/auth';

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  localLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const msalInstance = new PublicClientApplication(msalConfig);

async function getUserDetails(accessToken: string): Promise<User> {
  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    
    return {
      id: data.id,
      email: data.userPrincipalName,
      name: data.displayName,
      role: Role.END_USER, // Default role, should be updated based on your role management system
      microsoftId: data.id,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details. Please try again.');
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored auth token
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          const { user } = JSON.parse(storedAuth);
          setState({
            isAuthenticated: true,
            user,
            loading: false,
          });
          return;
        }

        // Check for Microsoft auth
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          msalInstance.setActiveAccount(accounts[0]);
          const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          const user = await getUserDetails(response.accessToken);
          setState({
            isAuthenticated: true,
            user,
            loading: false,
          });
          return;
        }

        setState(s => ({ ...s, loading: false }));
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setState(s => ({ ...s, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  const handleLocalLogin = async (email: string, password: string) => {
    try {
      const { user, token } = await apiLocalLogin(email, password);
      
      // Store auth data
      localStorage.setItem('auth', JSON.stringify({ user, token }));
      
      setState({
        isAuthenticated: true,
        user,
        loading: false,
      });
    } catch (error) {
      console.error('Local login failed:', error);
      throw new Error('Invalid email or password');
    }
  };

  const login = async () => {
    try {
      const response = await msalInstance.loginPopup(loginRequest);
      const user = await getUserDetails(response.accessToken);
      
      setState({
        isAuthenticated: true,
        user,
        loading: false,
      });
    } catch (error) {
      console.error('Microsoft login failed:', error);
      throw new Error('Login failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('auth');
      
      // Handle Microsoft logout if needed
      if (msalInstance.getAllAccounts().length > 0) {
        await msalInstance.logoutPopup();
      }

      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, localLogin: handleLocalLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
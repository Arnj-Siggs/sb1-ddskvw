import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MICROSOFT_TENANT_ID || ''}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
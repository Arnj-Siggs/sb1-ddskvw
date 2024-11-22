/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MICROSOFT_CLIENT_ID: string
  readonly VITE_MICROSOFT_TENANT_ID: string
  readonly VITE_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
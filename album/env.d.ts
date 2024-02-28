/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_API_BACKEND_URL: string;
    readonly VITE_ORIGIN_DOMAIN: string;
    readonly VITE_API_KEY_BACKEND: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'bootstrap';

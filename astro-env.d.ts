/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_EMAIL_USER: string;
    readonly PUBLIC_EMAIL_PASS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

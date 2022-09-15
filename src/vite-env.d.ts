/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_STRIPE_PUBLISH_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

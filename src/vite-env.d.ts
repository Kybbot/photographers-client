/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_STRIPE_PUBLISH_KEY: string;
	readonly VITE_SERVER_ENDPOINT: string;
	readonly VITE_SERVER_ENDPOINT2: string;
	readonly VITE_FRONT_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

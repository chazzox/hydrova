declare namespace NodeJS {
	export interface ProcessEnv {
		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;
		REDDIT_CLIENT_ID: string;
		REDDIT_CLIENT_SECRET: string;
	}
}
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		accessToken?: string;
		refreshToken?: string;
		expires_at: number;
	}

	interface Account {
		expires_at: number;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		expires_at: number;
	}
}

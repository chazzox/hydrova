import NextAuth, { NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: NextAuthOptions = {
	providers: [
		RedditProvider({
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
			authorization: {
				params: {
					duration: 'permanent'
				}
			}
		})
	],
	theme: {
		colorScheme: 'light'
	},
	callbacks: {
		async jwt({ token }) {
			token.userRole = 'admin';
			return token;
		}
	}
};

export default NextAuth(authOptions);

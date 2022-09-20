import NextAuth, { NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { fetchRefreshToken } from 'utils/reddit';

export const authOptions: NextAuthOptions = {
	providers: [
		RedditProvider({
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
			authorization: {
				params: {
					duration: 'permanent',
					scope: [
						'read',
						'identity',
						'save',
						'account',
						'mysubreddits',
						'vote',
						'privatemessages',
						'history'
					].join(' ')
				}
			}
		})
	],
	theme: {
		colorScheme: 'dark'
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.expires_at = account.expires_at;
			}

			if (token.expires_at * 1000 < new Date().getTime() && token.refreshToken) {
				const { access_token } = await fetchRefreshToken(token.refreshToken);
				token.accessToken = access_token;
			}

			return token;
		},

		async session({ session, token }) {
			session.expires_at = token.expires_at;
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			return session;
		},

		async signIn(params) {
			// extracting reddit img url and adding to user object
			const icon_url = params.profile.icon_img as string;
			if (icon_url) {
				const imgUrl = new URL(icon_url);
				params.user.image = imgUrl.origin + imgUrl.pathname;
			}

			return true;
		},

		async redirect(params) {
			const { url, baseUrl } = params;
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		}
	},
	pages: {
		signIn: '/login',
		error: '/error'
	}
};

export default NextAuth(authOptions);

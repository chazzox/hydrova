export function generateAuthUrl(): string {
	const scope = ['read', 'identity', 'save', 'account', 'mysubreddits', 'vote', 'privatemessages', 'history'];
	const queryString = new URLSearchParams();

	queryString.append('client_id', process.env.GATSBY_REDDIT_ID ?? '');
	queryString.append('response_type', 'code');
	queryString.append('state', 'hgfjhgdf');
	queryString.append('redirect_uri', process.env.GATSBY_CALLBACK_URL ?? '');
	queryString.append('duration', 'permanent');
	queryString.append('scope', scope.join(','));

	return 'https://www.reddit.com/api/v1/authorize?' + queryString.toString();
}

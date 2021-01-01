function genAuthLogin(): string {
	const scope = ['read', 'identity', 'save', 'account', 'mysubreddits', 'vote', 'privatemessages', 'history'];
	const LoginLink = `https://www.reddit.com/api/v1/authorize?client_id=${
		process.env.GATSBY_REDDIT_ID
	}&response_type=code&state=hgfjhgdf&redirect_uri=${
		process.env.GATSBY_CALLBACK_URL
	}&duration=permanent&scope=${scope.join(',')}`;
	return LoginLink;
}

export default genAuthLogin;

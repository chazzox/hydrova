function genAuthLogin(): string {
	const scope = ['read', 'identity', 'save', 'account', 'mysubreddits', 'vote'];
	const LoginLink = `https://www.reddit.com/api/v1/authorize?client_id=${
		process.env.REACT_APP_REDDIT_ID
	}&response_type=code&state=hgfjhgdf&redirect_uri=${
		process.env.REACT_APP_CALLBACK_URL
	}&duration=permanent&scope=${scope.join(',')}`;
	return LoginLink;
}

export default genAuthLogin;

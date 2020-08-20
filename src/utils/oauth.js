// getting oauth token once the user returns back from signing in
function getOAuthToken() {
	const urlencoded = new URLSearchParams();
	// constructing the query string
	urlencoded.append('grant_type', 'authorization_code');
	urlencoded.append('code', queryStringToJSON(document.location.href.split('?')[1]).code);
	urlencoded.append('redirect_uri', process.env.REACT_APP_CALLBACK_URL);

	fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			// encoding the auth info into a base64 string
			Authorization: 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: urlencoded,
		redirect: 'manual'
	})
		// parsing the promise information
		.then((response) => response.text())
		.then((text) => JSON.parse(text))
		.then((json) => {
			if (json.error === undefined) {
				// since we have no errors then we can proceed with setting login to true and saving the auth information into cookies
				Cookies.set('redditOauth', json);
				this.setState({ isLoggedIn: true, oauthInfo: json });
			} else {
				this.setState({ isLoggedIn: false });
				document.href = document.location.origin;
			}
		})
		.catch((error) => console.log('error', error));
}
// this function is for if the auth infomation stored inside the cookies has expired, we need to get a new auth token
function refreshOAuthToken(token) {
	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'refresh_token');
	urlencoded.append('refresh_token', token);

	fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: urlencoded,
		redirect: 'manual'
	})
		.then((response) => response.text())
		.then((text) => JSON.parse(text))
		.then((json) => {
			if (json.error === undefined) {
				this.setState({ isLoggedIn: true, oauthInfo: json });
			}
		})
		.catch((error) => console.log('error', error));
}

import React from 'react';
import Cookies from 'js-cookie';

import queryStringToJSON from '../utils/querySpit';

import Navbar from './navbar';
import Reddit from './reddit';

const callbackRegex = /^state=([\w-]*)&code=([\w-]*)$/;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReturnFromCallback: callbackRegex.test(document.location.href.split('?')[1]),
			isLoggedIn: false,
			oauthInfo: {}
		};
	}

	componentDidMount() {
		const oAuthCookie = Cookies.getJSON('redditOauth');
		if (oAuthCookie !== undefined) {
			this.refreshOAuthToken(oAuthCookie.refresh_token);
			return;
		}
		if (this.state.isReturnFromCallback) this.getOAuthToken();
	}

	getOAuthToken() {
		const urlencoded = new URLSearchParams();
		urlencoded.append('grant_type', 'authorization_code');
		urlencoded.append('code', queryStringToJSON(document.location.href.split('?')[1]).code);
		urlencoded.append('redirect_uri', process.env.REACT_APP_CALLBACK_URL);

		const auth = 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET);

		fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: auth,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlencoded,
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					Cookies.set('redditOauth', json);
					this.setState({ isLoggedIn: true, oauthInfo: json });
				} else {
					this.setState({ isLoggedIn: false });
					document.href = document.location.origin;
				}
			})
			.catch((error) => console.log('error', error));
	}

	refreshOAuthToken(token) {
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

	render() {
		return (
			<div id="container">
				<Navbar />
				{this.state.isLoggedIn ? <Reddit userAuth={this.state.oauthInfo.access_token} /> : <Login />}
			</div>
		);
	}
}

class Login extends React.Component {
	render() {
		return (
			<a
				href={
					'https://www.reddit.com/api/v1/authorize?client_id=' +
					process.env.REACT_APP_REDDIT_ID +
					'&response_type=code&state=hgfjhgdf&redirect_uri=' +
					process.env.REACT_APP_CALLBACK_URL +
					'&duration=permanent&scope=read'
				}
			>
				login to reddit
			</a>
		);
	}
}

export default App;

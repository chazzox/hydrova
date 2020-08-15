import React from 'react';
import Cookies from 'js-cookie';

import queryStringToJSON from '../utils/querySpit';

import Navbar from './navbar';
import Login from './login';
import Reddit from './reddit';

// regex for detecting if the site has returned from a callback after the user signing in
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
		// checking if we have cookies
		if (oAuthCookie !== undefined) {
			this.refreshOAuthToken(oAuthCookie.refresh_token);
			return;
		}
		if (this.state.isReturnFromCallback) this.getOAuthToken();
	}

	// getting oauth token once the user returns back from signing in
	getOAuthToken() {
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
			<div>
				{/* only rendering the timeline if the logged in boolean is set to true */}
				{this.state.isLoggedIn ? (
					<div id="container">
						<Navbar />
						<Reddit userAuth={this.state.oauthInfo.access_token} />
					</div>
				) : (
					<Login />
				)}
			</div>
		);
	}
}

export default App;

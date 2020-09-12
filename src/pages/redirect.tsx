import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import Logo from '../assets/logo.svg';
import queryStringToJSON from '../utils/queryString';
import './style/redirect.scss';

interface auth {
	scope: string;
	token_type: string;
	access_token: string;
	expires_in: number;
	refresh_token: string;
}

const Redirect: React.FC = () => {
	useEffect(() => {
		if (/^state=([\w-]*)&code=([\w-]*)$/.test(document.location.href.split('?')[1])) {
			const urlencoded = new URLSearchParams();
			// constructing the query string
			urlencoded.append('grant_type', 'authorization_code');
			urlencoded.append('code', queryStringToJSON(document.location.href.split('?')[1]).code);
			urlencoded.append('redirect_uri', process.env.REACT_APP_CALLBACK_URL ? process.env.REACT_APP_CALLBACK_URL : '');

			fetch('https://www.reddit.com/api/v1/access_token', {
				method: 'POST',
				headers: {
					// encoding the auth info into a base64 string
					Authorization:
						'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: urlencoded,
				redirect: 'manual'
			})
				// parsing the promise information
				.then(response => response.text())
				.then(text => JSON.parse(text))
				.then(json => {
					if (json.error === undefined) {
						const refresh_token: string = json.refresh_token;
						Cookies.set('auth', refresh_token, { sameSite: 'Lax', expires: 365 });
						window.close();
					} else {
						// deal with errors from here down
						console.log(json);
					}
				})
				.catch(error => console.log(error));
		}
	}, []);
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'darkMode'
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Redirect from login</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Helmet>

			<div id="loginBox">
				<img src={Logo} alt="logo" id="logo" />
				<div id="loginInfo">
					<h1>Hydrova</h1>
					<h2>This window should close soon</h2>
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Redirect;
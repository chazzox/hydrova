import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import Hydrova from 'assets/icons/logo.svg';
import queryStringToJSON from 'utils/queryString';

import 'styles/redirect.scss';

interface reAuthenticationResponse {
	scope: string;
	token_type: string;
	access_token: string;
	expires_in: number;
	refresh_token: string;
	error: string | undefined | null;
}

const Redirect: React.FC = () => {
	useEffect(() => {
		if (!window.opener && process.env.GATSBY_CALLBACK_URL)
			window.location.href = process.env.GATSBY_CALLBACK_URL.slice(0, process.env.GATSBY_CALLBACK_URL.length - 9);
		if (/^state=([\w-]*)&code=([\w-]*)$/.test(document.location.href.split('?')[1])) {
			const urlencoded = new URLSearchParams();
			// constructing the query string
			urlencoded.append('grant_type', 'authorization_code');
			urlencoded.append('code', queryStringToJSON(document.location.href.split('?')[1]).code);
			urlencoded.append('redirect_uri', process.env.GATSBY_CALLBACK_URL ? process.env.GATSBY_CALLBACK_URL : '');

			fetch('https://www.reddit.com/api/v1/access_token', {
				method: 'POST',
				headers: {
					// encoding the auth info into a base64 string
					Authorization:
						'Basic ' + btoa(process.env.GATSBY_REDDIT_ID + ':' + process.env.GATSBY_REDDIT_SECRET),
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: urlencoded,
				redirect: 'manual'
			})
				// parsing the promise information
				.then((response) => response.text())
				.then((text) => JSON.parse(text) as reAuthenticationResponse)
				.then((json) => {
					if (json.error === undefined) {
						const refresh_token: string = json.refresh_token;
						Cookies.set('refresh_token', refresh_token, { sameSite: 'lax', expires: 365 });
						window.close();
					}
				})
				.catch((error) => console.log(error));
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
				<meta name="description" content="this is the hydrova login redirect page" />
			</Helmet>

			<div id="loginBox">
				<Hydrova />
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

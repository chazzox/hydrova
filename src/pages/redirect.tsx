import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import Hydrova from 'assets/icons/logo.svg';

import 'styles/index.scss';
import 'styles/variables.scss';
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
	const [errorMessage, setErrorMessage] = useState<string>('');
	useEffect(() => {
		if (!window.opener) window.location.href = document.location.origin;

		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		const state = searchParams.get('state');

		if (code && state) {
			const urlencoded = new URLSearchParams();
			// constructing the query string
			urlencoded.append('grant_type', 'authorization_code');
			urlencoded.append('code', code);
			urlencoded.append('redirect_uri', process.env.GATSBY_CALLBACK_URL ?? '');

			setErrorMessage('fetching access token');
			fetch('https://www.reddit.com/api/v1/access_token', {
				method: 'POST',
				headers: {
					// encoding the auth info into a base64 string
					Authorization: 'Basic ' + btoa(process.env.GATSBY_REDDIT_ID + ':' + process.env.GATSBY_REDDIT_SECRET),
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: urlencoded,
				redirect: 'manual'
			})
				// parsing the promise information
				.then((response) => response.json())
				.then((json: reAuthenticationResponse) => {
					if (!json.error) {
						const refresh_token: string = json.refresh_token;
						Cookies.set('refresh_token', refresh_token, { sameSite: 'lax', expires: 365 });
						window.close();
					} else {
						setErrorMessage(`error: ${json.error}`);
					}
				})
				.catch((error) => setErrorMessage(`error: ${error}`));
		} else {
			setErrorMessage('regex not found');
		}
	}, []);

	return (
		<>
			<Helmet
				htmlAttributes={{
					id: 'defaultDarkTheme'
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Redirect from login</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="this is the hydrova login redirect page" />
			</Helmet>

			<div id="loginBox">
				<Hydrova id="logo" height={150} />
				<div id="loginInfo">
					<h1>Hydrova</h1>
					<h2>This window should close soon</h2>
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<h2>{errorMessage}</h2>
				</div>
			</div>
		</>
	);
};

export default Redirect;

import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import WelcomeBox from 'components/WelcomeBox';
import { baseTheme, themes } from 'utils/themes';
import Global from 'utils/Global';

interface reAuthenticationResponse {
	scope: string;
	token_type: string;
	access_token: string;
	expires_in: number;
	refresh_token: string;
	error: string | undefined | null;
}

const Loader = styled.div`
	display: block;
	position: relative;
	width: 80px;
	height: 80px;
	margin: auto;

	& > div {
		position: absolute;
		top: 33px;
		width: ${(props) => props.theme.base.paddingSecondary}px;
		height: ${(props) => props.theme.base.paddingSecondary}px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}

	& div:nth-child(1) {
		left: var(--padding-size-primary);
		animation: lds-ellipsis1 0.6s infinite;
	}

	& div:nth-child(2) {
		left: ${(props) => props.theme.base.paddingPrimary}px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	& div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	& div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}

	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}

	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(${(props) => props.theme.base.paddingTertiary}px, 0);
		}
	}
`;

const Redirect: React.FC = () => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	useEffect(() => {
		// if (!window.opener) navigate('/');

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
						setErrorMessage(`Error: ${json.error}`);
					}
				})
				.catch((error) => setErrorMessage(`Error: ${error}`));
		} else {
			setErrorMessage('Unable to parse redirect string');
		}
	}, []);

	return (
		<ThemeProvider theme={{ colors: themes.defaultDark, base: baseTheme }}>
			<Global />
			<Helmet>
				<title>Hydrova | Redirect from login</title>
				<meta name="description" content="this is the hydrova login redirect page" />
			</Helmet>

			<WelcomeBox
				topText="Hydrova"
				bottomText="This window should close soon"
				innerBoxChild={
					<>
						<Loader>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</Loader>
						<h2>{errorMessage}</h2>
					</>
				}
			/>
		</ThemeProvider>
	);
};

export default Redirect;

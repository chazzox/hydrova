import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Cookies from 'js-cookie';

import WelcomeBox from 'components/WelcomeBox';
import { themes, baseTheme } from 'utils/themes';
import Global from 'utils/Global';
import { generateAuthUrl } from 'utils/generateAuthURL';
import { Button } from 'components/Button';
import { Helmet } from 'react-helmet';

const LoginButton = styled(Button)`
	display: inline-block;
	text-align: center;
	text-decoration: none;
	font-weight: 500;
	&:hover {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
	}
`;

const SignIn = styled(LoginButton)`
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
`;

const Index = () => {
	return (
		// @todo: rework the themes into something more coherency and clean, maybe improve types/data structure
		<ThemeProvider theme={{ colors: themes.defaultDark, base: baseTheme }}>
			<Helmet>
				<title>Hydrova | Reddit Client</title>
				<meta name="description" content="this is the hydrova login redirect page" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</Helmet>
			<Global />
			<WelcomeBox topText="Hydrova" bottomText="High Performance Reddit Client">
				<div>
					<SignIn
						onClick={() => {
							let loginModal = window.open(generateAuthUrl(), '_blank', 'resizable,scrollbars,status');
							let checkLoginModalClosed = setInterval(() => {
								if (loginModal?.closed) {
									console.log(Cookies.getJSON('refresh_token'));
									clearInterval(checkLoginModalClosed);
								}
							}, 50);
						}}
					>
						Sign In
					</SignIn>
					<LoginButton as="a" href="https://www.reddit.com/register">
						Sign Up
					</LoginButton>
				</div>
			</WelcomeBox>
		</ThemeProvider>
	);
};

export default Index;

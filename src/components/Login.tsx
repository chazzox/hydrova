import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getJSON } from 'js-cookie';

import { refreshAccessToken } from '@redux/SettingSlice';
import { AppDispatch } from '@redux/store';
import { Button } from './Button';
import WelcomeBox from './WelcomeBox';

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

function generateAuthUrl(): string {
	const authURl = new URL('https://www.reddit.com/api/v1/authorize');

	authURl.searchParams.append('client_id', process.env.GATSBY_REDDIT_ID ?? '');
	authURl.searchParams.append('response_type', 'code');
	authURl.searchParams.append('state', 'hgfjhgdf');
	authURl.searchParams.append('redirect_uri', process.env.GATSBY_CALLBACK_URL ?? '');
	authURl.searchParams.append('duration', 'permanent');
	authURl.searchParams.append(
		'scope',
		['read', 'identity', 'save', 'account', 'mysubreddits', 'vote', 'privatemessages', 'history'].join(',')
	);

	return authURl.toString();
}

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<WelcomeBox topText="Hydrova" bottomText="High Performance Reddit Client">
			<SignIn
				onClick={() => {
					let loginModal = window.open(generateAuthUrl(), '_blank', 'resizable,scrollbars,status');
					let checkLoginModalClosed = setInterval(() => {
						if (loginModal?.closed) {
							dispatch(refreshAccessToken({ refresh_token: getJSON('refresh_token') }));
							clearInterval(checkLoginModalClosed);
						}
					}, 50);
				}}
			>
				Sign In
			</SignIn>
			<SignIn onClick={() => {}}>Guest Mode</SignIn>
			<LoginButton as="a" href="https://www.reddit.com/register">
				Sign Up
			</LoginButton>
		</WelcomeBox>
	);
};

export default Login;

import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { AppDispatch } from 'reduxStore/reduxWrapper';
import { refreshAccessToken } from 'reduxStore/authReducer';
import generateAuthenticationURL from 'utils/generateLogin';
import GenericButton from 'components/genericButton';

import hydrovaSVG from 'assets/logo.svg';

import 'styles/route/login.scss';

const Login = () => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<div id="loginBox">
			<img src={hydrovaSVG} alt="logo" id="logo" />
			<div id="loginInfo">
				<h1>Hydrova</h1>
				<h2>High Performance Reddit Client</h2>
			</div>
			<GenericButton
				clickEvent={() => {
					let loginModal = window.open(generateAuthenticationURL(), '_blank', 'resizable,scrollbars,status');
					let checkLoginModalClosed = setInterval(() => {
						if (loginModal?.closed) {
							dispatch(refreshAccessToken({ refresh_token: Cookies.getJSON('refresh_token') }));
							clearInterval(checkLoginModalClosed);
						}
					}, 50);
				}}
				text="Sign In"
			/>
			<a href="https://www.reddit.com/register">
				<GenericButton text="Sign Up" />
			</a>
		</div>
	);
};

export default Login;

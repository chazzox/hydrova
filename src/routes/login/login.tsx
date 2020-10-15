import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/reduxWrapper';
import { refreshAccessToken } from '../../redux/authReducer';
import hydrovaSVG from '../../assets/logo.svg';
import './login.scss';
import generateAuthenticationURL from '../../utils/generateLogin';
import Cookies from 'js-cookie';

const Login = () => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<div id="loginBox">
			<img src={hydrovaSVG} alt="logo" id="logo" />
			<div id="loginInfo">
				<h1>Hydrova</h1>
				<h2>High Performance Reddit Client</h2>
			</div>
			<div
				onClick={() => {
					let loginModal = window.open(
						generateAuthenticationURL(),
						'_blank',
						'resizable,scrollbars,status'
					);
					let checkLoginModalClosed = setInterval(() => {
						if (loginModal?.closed) {
							dispatch(refreshAccessToken({ refresh_token: Cookies.getJSON('refresh_token') }));
							clearInterval(checkLoginModalClosed);
						}
					}, 50);
				}}
				id="signIn"
			>
				Sign In
			</div>

			<a href="https://www.reddit.com/register">
				<div id="signUp">Sign Up</div>
			</a>
		</div>
	);
};

export default Login;

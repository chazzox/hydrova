import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/reduxWrapper';
import { refreshToken } from '../../redux/authReducer';
import Logo from '../../assets/logo.svg';
import './login.scss';
import genLink from '../../utils/generateLogin';
import Cookies from 'js-cookie';

const Login = () => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<div id="loginBox">
			<img src={Logo} alt="logo" id="logo" />
			<div id="loginInfo">
				<h1>Hydrova</h1>
				<h2>High Performance Reddit Client</h2>
			</div>
			<div
				onClick={() => {
					let childWindow = window.open(genLink(), '_blank', 'resizable,scrollbars,status');
					let checkWindowClose = setInterval(() => {
						if (childWindow?.closed) {
							dispatch(refreshToken({ refresh_token: Cookies.getJSON('auth') }));
							clearInterval(checkWindowClose);
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

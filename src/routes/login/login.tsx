import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { AppDispatch } from '../../redux/reduxWrapper';
import { refreshAccessToken } from '../../redux/authReducer';
import generateAuthenticationURL from '../../utils/generateLogin';

import hydrovaSVG from '../../assets/logo.svg';
import './login.scss';

const Login = () => {
	const dispatch: AppDispatch = useDispatch();
	const [isMouseOn, setMouseOn] = useState(false);
	return (
		<div
			id="loginBoxContainer"
			onMouseMove={event => {
				const rotY = (-window.innerWidth / 2 + event.pageX) / 15;
				const rotX = (-window.innerHeight / 2 + event.pageY) / 15;
				event.currentTarget.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
			}}
			onMouseEnter={event => {
				setMouseOn(true);
			}}
			onMouseLeave={event => {
				setMouseOn(false);
				event.currentTarget.style.transform = `rotateY(0}deg) rotateX(0deg)`;
			}}
		>
			<div id="loginBox">
				<div id="loginInfo">
					<img
						src={hydrovaSVG}
						alt="logo"
						id="logo"
						style={isMouseOn ? { transform: 'translate(-50%) translateZ(100px)' } : {}}
					/>
					<h1 style={isMouseOn ? { transform: 'translateZ(100px)' } : {}}>Hydrova</h1>
					<h2 style={isMouseOn ? { transform: 'translateZ(100px)' } : {}}>
						High Performance Reddit Client
					</h2>
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
								dispatch(
									refreshAccessToken({ refresh_token: Cookies.getJSON('refresh_token') })
								);
								clearInterval(checkLoginModalClosed);
							}
						}, 50);
					}}
					id="signIn"
					style={isMouseOn ? { transform: 'translateZ(40px)' } : {}}
				>
					Sign In
				</div>

				<a href="https://www.reddit.com/register">
					<div style={isMouseOn ? { transform: 'translateZ(40px)' } : {}} id="signUp">
						Sign Up
					</div>
				</a>
			</div>
		</div>
	);
};

export default Login;

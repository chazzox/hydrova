import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { refreshAccessToken, setNoAuthCookies } from 'reduxStore/authReducer';
import Login from 'routes/login';
import App from 'routes/app';

import 'styles/variables.scss';
import 'styles/index.scss';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const isLoggedIn = useSelector((state: ReduxStateType) => state.auth.isLoggedIn);
	const authenticationResultReturned = useSelector(
		(state: ReduxStateType) => state.auth.authenticationResultReturned
	);
	const styleMode = useSelector((state: ReduxStateType) => state.style.styleMode);

	useEffect(() => {
		const oauthCookieData = Cookies.getJSON('refresh_token') as string;

		if (oauthCookieData) dispatch(refreshAccessToken({ refresh_token: oauthCookieData }));
		else dispatch(setNoAuthCookies());
	}, []);

	return (
		<>
			<Helmet
				htmlAttributes={{
					class: styleMode === true ? 'darkMode' : 'lightMode'
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Reddit Client</title>
				<link
					rel="stylesheet"
					href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
				></link>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					http-equiv="description"
					content="Hydrova is a free to use, high performance, Reddit client"
				/>
			</Helmet>
			{authenticationResultReturned ? isLoggedIn ? <App /> : <Login /> : null}
		</>
	);
};

export default Home;

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

import 'styles/themes/defaultDark.scss';
import 'styles/themes/defaultLight.scss';
import 'styles/themes/bestOfBoth.scss';
import 'styles/themes/gruvboxLight.scss';
import 'styles/themes/gruvboxDark.scss';
import 'styles/themes/dracula.scss';

const Home = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isLoggedIn = useSelector<ReduxStateType, boolean>((state) => state.auth.isLoggedIn);
	const authenticationResultReturned = useSelector<ReduxStateType, boolean>(
		(state) => state.auth.authenticationResultReturned
	);
	const styleMode = useSelector<ReduxStateType, boolean>((state) => state.style.styleMode);

	useEffect(() => {
		const oauthCookieData = Cookies.getJSON('refresh_token') as string;
		if (oauthCookieData) dispatch(refreshAccessToken({ refresh_token: oauthCookieData }));
		else dispatch(setNoAuthCookies());
	}, []);

	return (
		<>
			<Helmet
				htmlAttributes={{
					class: styleMode
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Reddit Client</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					http-equiv="description"
					content="Hydrova is a free to use, high performance, Reddit client"
				/>
			</Helmet>
			{authenticationResultReturned && (isLoggedIn ? <App /> : <Login />)}
		</>
	);
};

export default Home;

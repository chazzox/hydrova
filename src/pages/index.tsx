import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { refreshAccessToken, setNoAuthCookies } from 'reduxStore/authReducer';
import App from 'routes/app';
const Login = lazy(() => import('routes/login'));

import 'styles/index.scss';
import 'styles/variables.scss';

const Home = () => {
	// gatsby does not support react.suspense yet, therefor this is need for build to succeed
	const isSSR = typeof window === 'undefined';

	const dispatch = useDispatch<AppDispatch>();
	const isLoggedIn = useSelector<ReduxStateType, boolean>((state) => state.auth.isLoggedIn);
	const authenticationResultReturned = useSelector<ReduxStateType, boolean>(
		(state) => state.auth.authenticationResultReturned
	);
	const styleMode = useSelector<ReduxStateType, string>((state) => state.settings.styleMode);

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
			{!isSSR && (
				<Suspense fallback={<></>}>
					{authenticationResultReturned && (isLoggedIn ? <App /> : <Login />)}
				</Suspense>
			)}
		</>
	);
};

export default Home;

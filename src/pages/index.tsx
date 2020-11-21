import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import LogRocket from 'logrocket';

import { AppDispatch, ReduxStateType } from '../redux/reduxWrapper';
import { refreshAccessToken, setNoAuthCookies } from '../redux/authReducer';
import Login from '../routes/login/login';
import App from '../routes/app';

import './style/index.scss';
import './style/variables.scss';
LogRocket.init('15kfmg/hydrova');
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

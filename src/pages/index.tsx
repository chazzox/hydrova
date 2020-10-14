import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import _ from 'lodash';

import Login from '../components/login/login';
import App from '../components/app';

import { refreshAccessToken, setNoAuthCookies } from '../redux/authReducer';
import { AppDispatch, ReduxStateType } from '../redux/reduxWrapper';
import './style/index.scss';
import './style/variables.scss';

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
	});

	return (
		<>
			<Helmet
				htmlAttributes={{
					class:
						styleMode === true
							? 'darkMode'
							: styleMode === false
							? 'lightMode'
							: styleMode === 'custom'
							? 'custom'
							: 'darkMode'
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Reddit Client</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					http-equiv="description"
					content="Hydrova is a free to use, high performance, reddit client"
				/>
			</Helmet>
			{authenticationResultReturned ? isLoggedIn ? <App /> : <Login /> : null}
		</>
	);
};

export default Home;

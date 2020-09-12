import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import _ from 'lodash';

import Login from '../components/login/login';
import App from '../components/app';

import { refreshToken, noCookies } from '../redux/authReducer';
import { AppDispatch, RootState } from '../redux/reduxWrapper';
import './style/index.scss';
import './style/variables.scss';

require('dotenv').config();

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const authenticationResultReturned = useSelector((state: RootState) => state.auth.authenticationResultReturned);
	const styleMode = useSelector((state: RootState) => state.style.styleMode);

	useEffect(() => {
		const oauthStorage = Cookies.getJSON('auth') as string;

		if (oauthStorage) dispatch(refreshToken({ refresh_token: oauthStorage }));
		else dispatch(noCookies());
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
			</Helmet>
			{authenticationResultReturned ? isLoggedIn ? <App /> : <Login /> : null}
		</>
	);
};

export default Home;

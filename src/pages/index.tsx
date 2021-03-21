import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJSON } from 'js-cookie';

import { refreshAccessToken, setNoAuthCookies } from 'redux/AuthSlice';
import { AppDispatch, ReduxStateType } from 'redux/store';
import Login from 'components/Login';
import Layout from 'components/Layout';
import Dashboard from 'components/DashBoard';

const Index = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isLoggedIn = useSelector((state: ReduxStateType) => state.auth.isLoggedIn);
	const authenticationResultReturned = useSelector<ReduxStateType, boolean>(
		(state) => state.auth.authenticationResultReturned
	);

	React.useEffect(() => {
		const oauthCookieData = getJSON('refresh_token') as string;
		if (oauthCookieData) dispatch(refreshAccessToken({ refresh_token: oauthCookieData }));
		else dispatch(setNoAuthCookies());
	}, []);

	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			{authenticationResultReturned && (isLoggedIn ? <Dashboard /> : <Login />)}
		</Layout>
	);
};

export default Index;

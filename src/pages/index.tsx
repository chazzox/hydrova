import * as React from 'react';

import Login from 'components/Login';
import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ReduxStateType } from 'redux/store';
import { refreshAccessToken, setNoAuthCookies } from 'redux/AuthSlice';
import { getJSON } from 'js-cookie';

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
			{authenticationResultReturned && (isLoggedIn ? <>Logged in</> : <Login />)}
		</Layout>
	);
};

export default Index;

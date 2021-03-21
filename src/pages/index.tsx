import * as React from 'react';

import Login from 'components/Login';
import Layout from 'components/Layout';
import { useSelector } from 'react-redux';
import { ReduxStateType } from 'redux/store';

const Index = () => {
	const isAuth = useSelector((state: ReduxStateType) => state.counter.isLoggedIn);
	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			{isAuth ? <>test</> : <Login />}
		</Layout>
	);
};

export default Index;

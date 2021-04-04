import * as React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { ReduxStateType } from '@redux/store';
import Login from '@components/Login';
import Layout from '@components/Layout';
import Dashboard from '@components/DashBoard';

const Index = () => {
	const isLoggedIn = useSelector((state: ReduxStateType) => state.settings.isLoggedIn);

	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			{isLoggedIn ? (
				<HashRouter>
					<Route exact path={['/:postId?', '/:listingType(u|r|m)/:listingName/:postId?/']} component={Dashboard} />
				</HashRouter>
			) : (
				<Login />
			)}
		</Layout>
	);
};

export default Index;

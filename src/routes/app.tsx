import React, { Suspense, lazy } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Sidebar from 'components/sidebar';
import Dashboard from './dashboard';

// lazy loading other components
const Settings = lazy(() => import('./settings'));
const Submit = lazy(() => import('./submit'));
const Mail = lazy(() => import('./mail'));
const User = lazy(() => import('./user'));

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/submit" exact render={() => <Submit />} />
					<Route path="/mail" exact render={() => <Mail />} />
					<Route path="/settings" exact render={() => <Settings />} />
					<Route path="/user/:userId" exact render={() => <User />} />
					<Route
						exact
						path={['/', '/r/:subName', '/r/:subName/:postId', '/:postId']}
						render={props => <Dashboard navProps={props} />}
					/>
				</Switch>
			</Suspense>
		</HashRouter>
	);
};

export default App;

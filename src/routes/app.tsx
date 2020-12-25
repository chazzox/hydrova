import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Sidebar from '../components/sidebar';
import Settings from './settings';
import Submit from './submit';
import Mail from './mail';
import User from './user';

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
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
		</HashRouter>
	);
};

export default App;

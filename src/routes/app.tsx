import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from '@reach/router';

import Dashboard from './dashboard/dashboard';
import Sidebar from '../components/sidebar/sidebar';
import Settings from './settings/settings';
import Submit from './submit/submit';
import Mail from './mail/mail';

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
			<Switch>
				<Route path="/submit" exact render={() => <Submit />} />
				<Route path="/mail" exact render={() => <Mail />} />
				<Route path="/settings" exact render={() => <Settings />} />
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

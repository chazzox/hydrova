import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Sidebar from '../components/sidebar/sidebar';
import Subreddit from './subreddit/subreddit';
import Settings from './settings/settings';
import Submit from './submit/submit';
import Home from './home/home';
import Post from './post/post';

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
			<Switch>
				<Route path="/submit" render={() => <Submit />} />
				<Route path="/settings" render={() => <Settings />} />
				<Route path="/r/:subreddit" render={props => <Subreddit {...props} />} />
				<Route path="/post/:permalink" render={props => <Post {...props} />} />
				<Route path="/" render={() => <Home />} />
			</Switch>
		</HashRouter>
	);
};

export default App;

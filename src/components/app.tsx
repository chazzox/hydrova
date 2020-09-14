import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './home/home';
import Subreddit from './subreddit/subreddit';
import Post from './post/post';
import Sidebar from './sidebar/sidebar';

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
			<Switch>
				<Route path="/r/:subreddit" render={props => <Subreddit {...props} />} />
				<Route path="/post/:permalink" render={props => <Post {...props} />} />
				<Route path="/" render={() => <Home />} />
			</Switch>
		</HashRouter>
	);
};

export default App;

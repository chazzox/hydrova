import React, { Suspense, lazy } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Sidebar from 'components/sidebar';
// lazy loading other components
const Settings = lazy(() => import('./settings'));
const Submit = lazy(() => import('./submit'));
const Mail = lazy(() => import('./mail'));

const App: React.FC = () => {
	return (
		<HashRouter>
			<Sidebar />
			{/* the fragment can be changed to 'loading' or something but i personally prefer nothing as it just looks better since the load  
			times are so short, could do some sort of setTimeout for if the internet is really bad, but i don't see the point at that point */}
			<Suspense fallback={() => <></>}>
				<Switch>
					<Route path="/submit" exact component={Submit} />
					<Route path="/mail" exact component={Mail} />
					<Route path="/settings" component={Settings} />
					{/* add subreddit sidebar here in later */}
					<Route
						exact
						path={['/:sortType?', '/:listingType(r|u|m)/:name?/:postId?/:sortType?']}
						component={Dashboard}
					/>
				</Switch>
			</Suspense>
		</HashRouter>
	);
};

export default App;

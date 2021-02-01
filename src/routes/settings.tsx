import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import PillSelector from 'components/pillSelector';
import Accounts from './settings/accounts';
import Appearance from './settings/appearance';
import Content from './settings/content';
import General from './settings/general';
import Keybinds from './settings/keybinds';

import 'styles/route/settings.scss';

const Settings = () => {
	let { path } = useRouteMatch();

	const settingRoutes = ['account', 'appearance', 'content', 'general', 'keybinds'];

	return (
		<div className="main">
			<PillSelector options={settingRoutes} />
			<div className="contentContainer">
				<Switch>
					<Route exact path={`${path}/appearance`} render={() => <Appearance />} />
					<Route exact path={`${path}/content`} render={() => <Content />} />
					<Route exact path={`${path}/general`} render={() => <General />} />
					<Route exact path={`${path}/keybinds`} render={() => <Keybinds />} />
					<Route exact path={`${path}/account`} render={() => <Accounts />} />
					<Route exact path={path}>
						<Redirect to={`${path}/account`} />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default Settings;

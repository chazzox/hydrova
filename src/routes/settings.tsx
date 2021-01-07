import React from 'react';

import PillSelector from 'components/pillSelector';
import Accounts from './settings/accounts';
import Appearance from './settings/appearance';
import Content from './settings/content';
import General from './settings/general';
import Keybinds from './settings/keybinds';
import { Route, Router, Switch, useRouteMatch } from 'react-router-dom';

const Settings = () => {
	let { path } = useRouteMatch();

	const settingRoutes = ['account', 'appearance', 'content', 'general', 'keybinds'];

	return (
		<div className="main">
			<PillSelector options={settingRoutes} />
			<div className="contentContainer">
				<Switch>
					<Route exact path={`${path}/account`} render={props => <Accounts />} />
					<Route exact path={`${path}/appearance`} render={props => <Appearance />} />
					<Route exact path={`${path}/content`} render={props => <Content />} />
					<Route exact path={`${path}/general`} render={props => <General />} />
					<Route exact path={`${path}/keybinds`} render={props => <Keybinds />} />
				</Switch>
			</div>
		</div>
	);
};

export default Settings;

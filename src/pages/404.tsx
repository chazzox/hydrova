import React from 'react';
import { Helmet } from 'react-helmet';

import Logo from '../assets/logo.svg';

const Redirect: React.FC = () => {
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'darkMode'
				}}
			>
				<meta charSet="utf-8" />
				<title>Hydrova | Redirect from login</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="this is the hydrova login redirect page" />
			</Helmet>

			<div id="loginBox">
				<img src={Logo} alt="logo" id="logo" />
				<div id="loginInfo">
					<h1>Hydrova - 404 Site</h1>
					<h2>Tempororary 404 Page</h2>
					<p>This will be refined in a future update</p>
				</div>
			</div>
		</>
	);
};

export default Redirect;

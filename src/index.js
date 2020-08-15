import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import './index.scss';

// connecting the .env files to the system
require('dotenv').config();

// this is where everything is rendered from, don't put any dom elements here, only use it to wrap the site in navigation/store HOC's
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

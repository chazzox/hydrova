import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import './index.scss';
import './variables.scss';

// connecting the .env files to the system
require('dotenv').config();

// this is where everything is rendered from, don't put any dom elements here, only use it to wrap the site in navigation/store HOC's
ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

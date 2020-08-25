import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import queryStringToJSON from '../utils/querySpit';

const auth = createSlice({
	name: 'editMode',
	initialState: {
		isLoaded: false,
		isLoggedIn: false,
		auth: {}
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isLoaded = true;
			state.isLoggedIn = true;
			state.auth = action.payload;
			return;
		},
		loginFailure: (state) => {
			state.isLoaded = true;
			state.isLoggedIn = false;
			state.auth = {};
		},
		logoutSuccess: (state, action) => {
			state.isLoaded = true;
			state.isLoggedIn = false;
			Cookies.remove('redditOauth');
		},
		loggedOut: (state, action) => {
			state.isLoaded = true;
			state.isLoggedIn = false;
		}
	}
});

export const refreshToken = () => async (dispatch) => {
	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'refresh_token');
	urlencoded.append('refresh_token', Cookies.getJSON('redditOauth').refresh_token);

	fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: urlencoded,
		redirect: 'manual'
	})
		.then((response) => response.text())
		.then((text) => JSON.parse(text))
		.then((json) => {
			if (json.error === undefined) {
				dispatch(loginSuccess(json));
			} else {
				dispatch(loginFailure());
			}
		})
		.catch((error) => {
			console.log(error);
			dispatch(loginFailure());
		});
};

export const generateToken = () => async (dispatch) => {
	const urlencoded = new URLSearchParams();
	// constructing the query string
	urlencoded.append('grant_type', 'authorization_code');
	urlencoded.append('code', queryStringToJSON(document.location.href.split('?')[1]).code);
	urlencoded.append('redirect_uri', process.env.REACT_APP_CALLBACK_URL);

	fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			// encoding the auth info into a base64 string
			Authorization: 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: urlencoded,
		redirect: 'manual'
	})
		// parsing the promise information
		.then((response) => response.text())
		.then((text) => JSON.parse(text))
		.then((json) => {
			if (json.error === undefined) {
                Cookies.set('redditOauth', json, { sameSite: 'Lax', expires: 365 });
                window.location.replace(document.location.pathname);
				dispatch(loginSuccess(json));
			} else {
				dispatch(loginFailure());
			}
		})
		.catch((error) => dispatch(loginFailure()));
};

export const { loginSuccess, loginFailure, logoutSuccess, loggedOut } = auth.actions;

export default configureStore({
	reducer: {
		auth: auth.reducer
	}
});

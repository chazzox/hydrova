import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

const callbackRegex = /^state=([\w-]*)&code=([\w-]*)$/;

const auth = createSlice({
	name: 'editMode',
	initialState: {
		isLoggedIn: false,
		auth: {}
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isLoggedIn = true;
			state.auth = action.payload;
			Cookie.set('user', action.payload);
		},
		loginFailure: (state) => {
			state.isLoggedIn = false;
			state.auth = {};
		},
		logoutSuccess: (state, action) => {
			state.isLoggedIn = false;
			localStorage.removeItem('user');
		}
	}
});

export const refreshToken = ({ username, password }) => async (dispatch) => {
	try {
		dispatch(loginSuccess({ username }));
	} catch (e) {
		dispatch(loginFailure());
		return console.error(e.message);
	}
};

export const generateToken = ({ username, password }) => async (dispatch) => {
	try {
		dispatch(loginSuccess({ username }));
	} catch (e) {
		dispatch(loginFailure());
		return console.error(e.message);
	}
};

export const logout = () => async (dispatch) => {
	try {
		return dispatch(logoutSuccess());
	} catch (e) {
		return console.error(e.message);
	}
};

export const { loginSuccess, loginFailure, logoutSuccess } = auth.actions;

export default configureStore({
	reducer: {
		auth: auth.reducer
	}
});

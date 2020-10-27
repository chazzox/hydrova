import { createSlice } from '@reduxjs/toolkit';

import { refreshAccessToken } from './authThunks';
export { refreshAccessToken };

const authSlice = createSlice({
	name: 'authReducer',
	initialState: {
		isLoggedIn: false,
		authenticationResultReturned: false,
		access_token: '',
		expires_in: 0,
		authenticationErrors: [] as string[]
	},
	reducers: {
		setNoAuthCookies: state => {
			state.authenticationResultReturned = true;
		}
	},
	extraReducers: builder => {
		builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.authenticationResultReturned = true;
			state.access_token = action.payload.access_token;
			state.expires_in = action.payload.expires_in;
		});
		builder.addCase(refreshAccessToken.rejected, (state, action) => {
			state.authenticationResultReturned = true;
			if (action.payload?.message) {
				state.authenticationErrors.push(action.payload.message);
			}
		});
	}
});

export const { setNoAuthCookies } = authSlice.actions;

export default authSlice;

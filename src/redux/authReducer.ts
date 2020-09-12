import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

interface responseSuccess {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

interface responseFailure {
	error: number;
	message: string;
}

export const refreshToken = createAsyncThunk<responseSuccess, { refresh_token: string }, { rejectValue: responseFailure }>(
	'users/refreshToken',
	async ({ refresh_token }, thunkApi) => {
		const urlencoded = new URLSearchParams();
		urlencoded.append('grant_type', 'refresh_token');
		urlencoded.append('refresh_token', refresh_token);
		const response = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlencoded,
			redirect: 'manual'
		});
		const responseJSON = await response.json();
		if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as responseFailure);
		return responseJSON as responseSuccess;
	}
);

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
		noCookies: state => {
			state.authenticationResultReturned = true;
		}
	},
	extraReducers: builder => {
		builder.addCase(refreshToken.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.authenticationResultReturned = true;
			state.access_token = action.payload.access_token;
			state.expires_in = action.payload.expires_in;
		});
		builder.addCase(refreshToken.rejected, (state, action) => {
			state.authenticationResultReturned = true;
			if (action.payload?.message) {
				state.authenticationErrors.push(action.payload.message);
			}
		});
	}
});

export const { noCookies } = authSlice.actions;

export default authSlice;
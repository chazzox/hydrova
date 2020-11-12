import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from '../reduxWrapper';

export const GET_USER_INFO = createAsyncThunk<
	userInfoSuccess,
	undefined,
	{ state: ReduxStateType; rejectValue: failure }
>('sidebar/getUserInfo', async (_, { getState, rejectWithValue }) => {
	const response = await fetch('https://oauth.reddit.com/api/v1/me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as failure);
	return responseJSON as userInfoSuccess;
});

export const GET_MULTIREDDITS = createAsyncThunk<
	userMultiSuccess,
	undefined,
	{ state: ReduxStateType; rejectValue: failure }
>('sidebar/getMultiRedditList', async (_, { getState, rejectWithValue }) => {
	const response = await fetch('https://oauth.reddit.com/api/multi/mine', {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as failure);
	return responseJSON as userMultiSuccess;
});

export const GET_SUBREDDITS = createAsyncThunk<
	userSubSuccess,
	string | undefined,
	{ state: ReduxStateType; rejectValue: failure }
>('sidebar/getSubreddits', async (afterId, { getState, rejectWithValue }) => {
	const response = await fetch('https://oauth.reddit.com/subreddits/mine/subscriber?limit=50&after=' + afterId, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as failure);
	const responseJSONSuccess: userSubSuccess = responseJSON;
	return responseJSONSuccess;
});

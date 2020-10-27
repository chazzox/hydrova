import { createAsyncThunk } from '@reduxjs/toolkit';

export const refreshAccessToken = createAsyncThunk<
	responseSuccess,
	{ refresh_token: string },
	{ rejectValue: failure }
>('users/refreshAccessToken', async ({ refresh_token }, thunkApi) => {
	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'refresh_token');
	urlencoded.append('refresh_token', refresh_token);
	const response = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			Authorization:
				'Basic ' + btoa(process.env.GATSBY_REDDIT_ID + ':' + process.env.GATSBY_REDDIT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: urlencoded
	});
	const responseJSON = await response.json();
	if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
	return responseJSON as responseSuccess;
});

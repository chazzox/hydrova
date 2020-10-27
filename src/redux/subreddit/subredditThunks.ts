import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPostArray } from '../postStore/postReducer';
import { ReduxStateType } from '../reduxWrapper';

export const GET_SUBREDDIT_POSTS = createAsyncThunk<
	{ postArray: TimelineResponse; subredditName: string },
	string,
	{ state: ReduxStateType; rejectValue: failure }
>('subreddits/getSubPosts', async (subRedditString, { getState, rejectWithValue, dispatch }) => {
	const response = await fetch(`https://oauth.reddit.com/r/${subRedditString}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	dispatch(setPostArray(responseJSON));
	return { postArray: responseJSON, subredditName: subRedditString };
});

export const GET_SUBREDDIT_ABOUT = createAsyncThunk<
	{ sidebar: AboutApiResponse; subredditName: string },
	string,
	{ state: ReduxStateType; rejectValue: failure }
>('subreddits/getSubAbout', async (subRedditString, { getState, rejectWithValue, dispatch }) => {
	const response = await fetch(`https://oauth.reddit.com/r/${subRedditString}/about`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { sidebar: responseJSON as AboutApiResponse, subredditName: subRedditString as string };
});

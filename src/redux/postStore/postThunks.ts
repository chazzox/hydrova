import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from '../reduxWrapper';

export const GET_LISTING = createAsyncThunk<
	{ postArray: ListingResponse },
	{ listingEndpointName: string; listingQueryParams?: string },
	{ state: ReduxStateType; rejectValue: failure }
>('sidebar/getListing', async ({ listingEndpointName, listingQueryParams }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com${listingEndpointName}${listingQueryParams || ''}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as failure);
	return { postArray: responseJSON };
});

export const GET_POST = createAsyncThunk<
	GetPostResponse,
	{ id: string },
	{ state: ReduxStateType; rejectValue: failure }
>('post/getPost', async ({ id }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return responseJSON as GetPostResponse;
});

export const VOTE = createAsyncThunk<
	voteSuccess,
	{ fullName: string; voteDirection: 1 | 0 | -1 },
	{ state: ReduxStateType; rejectValue: failure & { voteDir: number; fullName: string } }
>('post/vote', async ({ fullName, voteDirection }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com/api/vote?id=${fullName}&dir=${voteDirection}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404)
		return rejectWithValue({ ...responseJSON, voteDir: voteDirection, fullName: fullName });
	return { response: responseJSON } as voteSuccess;
});

export const SAVE = createAsyncThunk<
	saveSuccess,
	{ fullName: string; isSaving: boolean },
	{ state: ReduxStateType; rejectValue: failure }
>('post/save', async ({ fullName, isSaving }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com/api/${isSaving ? 'save' : 'unsave'}?id=${fullName}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { response: responseJSON, fullName: fullName, isSaving: isSaving } as saveSuccess;
});

export const GET_SUBREDDIT_ABOUT = createAsyncThunk<
	{ sidebar: AboutApiResponse },
	string,
	{ state: ReduxStateType; rejectValue: failure }
>('subreddits/getSubAbout', async (subRedditString, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com${subRedditString}/about`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { sidebar: responseJSON as AboutApiResponse };
});

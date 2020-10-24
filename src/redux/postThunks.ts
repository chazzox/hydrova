import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from './reduxWrapper';

export const GET_TIMELINE = createAsyncThunk<
	TimelineResponse,
	string,
	{ state: ReduxStateType; rejectValue: failure }
>('sidebar/getTimeline', async (afterId, { getState, rejectWithValue }) => {
	const response = await fetch('https://oauth.reddit.com/best/?limit=25&after=' + afterId, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as failure);
	return responseJSON as TimelineResponse;
});

export const GET_POST = createAsyncThunk<
	GetPostResponse,
	{ id: string },
	{ state: ReduxStateType; rejectValue: failure }
>('post/fetchPost', async ({ id }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return responseJSON as GetPostResponse;
});

export const VOTE = createAsyncThunk<
	voteSuccess,
	{ fullName: string; voteDirection: 1 | 0 | -1 },
	{ state: ReduxStateType; rejectValue: failure }
>('post/upvote', async ({ fullName, voteDirection }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com/api/vote?id=${fullName}&dir=${voteDirection}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { response: responseJSON, fullName: fullName, voteDir: voteDirection } as voteSuccess;
});

export const SAVE = createAsyncThunk<
	saveSuccess,
	{ fullName: string; isSaving: boolean },
	{ state: ReduxStateType; rejectValue: failure }
>('post/save', async ({ fullName, isSaving }, { getState, rejectWithValue }) => {
	const response = await fetch(
		`https://oauth.reddit.com/api/${isSaving ? 'save' : 'unsave'}?id=${fullName}`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${getState().auth.access_token}` }
		}
	);
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { response: responseJSON, fullName: fullName, isSaving: isSaving } as saveSuccess;
});

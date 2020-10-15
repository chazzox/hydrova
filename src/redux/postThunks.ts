import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetPostResponse {
	[index: string]: any;
}
[];

interface upvoteSuccess {
	[index: string]: any;
}
interface saveSuccess {
	response: {};
	fullName: string;
	isSaving: boolean;
}

interface TimelineResponse {
	kind: string;
	data: {
		modhash: string;
		dist: number;
		children: Child[];
		after: string;
		before: string | null;
	};
}

export const GET_POST = createAsyncThunk<
	GetPostResponse,
	{ access_token: string; id: string },
	{ rejectValue: failure }
>('post/fetchPost', async ({ access_token, id }, thunkApi) => {
	const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404)
		return thunkApi.rejectWithValue(responseJSON as failure);
	return responseJSON as GetPostResponse;
});

export const VOTE = createAsyncThunk<
	upvoteSuccess,
	{ access_token: string; fullName: string; voteDirection: 1 | 0 | -1 },
	{ rejectValue: failure }
>('post/upvote', async ({ access_token, fullName, voteDirection }, thunkApi) => {
	const response = await fetch(`https://oauth.reddit.com/api/vote?id=${fullName}&dir=${voteDirection}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404)
		return thunkApi.rejectWithValue(responseJSON as failure);
	return responseJSON as upvoteSuccess;
});

export const SAVE = createAsyncThunk<
	saveSuccess,
	{ access_token: string; fullName: string; isSaving: boolean },
	{ rejectValue: failure }
>('post/save', async ({ access_token, fullName, isSaving }, thunkApi) => {
	const response = await fetch(
		`https://oauth.reddit.com/api/${isSaving ? 'save' : 'unsave'}?id=${fullName}`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${access_token}` }
		}
	);
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404)
		return thunkApi.rejectWithValue(responseJSON as failure);
	return { response: responseJSON, fullName: fullName, isSaving: isSaving } as saveSuccess;
});

export const GET_TIMELINE = createAsyncThunk<
	TimelineResponse,
	{ access_token: string; afterId: string },
	{ rejectValue: failure }
>('sidebar/getTimeline', async ({ access_token, afterId }, thunkApi) => {
	const response = await fetch('https://oauth.reddit.com/best/?limit=25&after=' + afterId, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
	return responseJSON as TimelineResponse;
});

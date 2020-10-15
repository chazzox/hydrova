import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
	{ access_token: string; id: string; voteDirection: 1 | 0 | -1 },
	{ rejectValue: failure }
>('post/upvote', async ({ access_token, id, voteDirection }, thunkApi) => {
	const response = await fetch(`https://oauth.reddit.com/api/vote?id=${id}&dir${voteDirection}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404)
		return thunkApi.rejectWithValue(responseJSON as failure);
	console.log(responseJSON);
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

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[state: string]: { comments?: { commentArray: any[]; latestComment: string }; postContent: post };
		}
	},
	reducers: {
		setPostContent: (state, action: PayloadAction<{ postId: string; postContent: post }>) => {
			state.posts[action.payload.postId] = { postContent: action.payload.postContent };
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			if (state.posts[action.payload[0].data.children[0].data.id]) {
				state.posts[action.payload[0].data.children[0].data.id].comments = {
					commentArray: action.payload[1].data.children.map(({ data }: any) => data),
					latestComment: action.payload[1].data.after
				};
			} else {
				// this needs to be cleaned up for suuurrreeeeeee
				state.posts[action.payload[0].data.children[0].data.id] = {
					postContent: {
						...action.payload[0].data.children.map(({ data }: { data: ChildData }) => ({
							is_self: data.is_self,
							selftext_html: data.selftext_html,
							is_video: data.is_video,
							media: data.media,
							post_hint: data.post_hint,
							url: data.url,
							id: data.id,
							ups: data.ups,
							title: data.title,
							subreddit_name_prefixed: data.subreddit_name_prefixed,
							author: data.author,
							num_comments: data.num_comments
						}))[0]
					},
					comments: {
						commentArray: action.payload[1].data.children.map(({ data }: any) => data),
						latestComment: action.payload[1].data.after
					}
				};
			}
		});
		builder.addCase(VOTE.fulfilled, (state, action) => {});
		builder.addCase(SAVE.fulfilled, (state, action) => {
			if (state.posts[action.payload.fullName.split('_')[1]])
				state.posts[action.payload.fullName.split('_')[1]].postContent.saved =
					action.payload.isSaving;
			else {
				console.log(JSON.stringify(state.posts));
				console.log(state.posts[action.payload.fullName.split('_')[1]]);
			}
		});
	}
});

export const { setPostContent } = postReducer.actions;

export default postReducer;

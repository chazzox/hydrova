import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface GetPostResponse {
	[index: string]: any;
}

export const GET_POST = createAsyncThunk<GetPostResponse, { access_token: string; id: string }, { rejectValue: failure }>(
	'post/fetchPost',
	async ({ access_token, id }, thunkApi) => {
		const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${access_token}` },
			redirect: 'manual'
		});
		const responseJSON = await response.json();
		if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
		console.log(responseJSON);
		return responseJSON as GetPostResponse;
	}
);

const postReducer = createSlice({
	name: 'postReducer',
	initialState: { posts: {} as { [state: string]: { comments: any; postContent: post } } },
	reducers: {
		setPostContent: (state, action: PayloadAction<{ postId: string; postContent: post }>) => {
			state.posts[action.payload.postId].postContent = action.payload.postContent;
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			console.log(action.payload);
		});
	}
});

export default postReducer;

import { createSlice } from '@reduxjs/toolkit';

import { GET_SUBREDDIT_POSTS, GET_SUBREDDIT_ABOUT } from './subredditThunks';
export { GET_SUBREDDIT_POSTS, GET_SUBREDDIT_ABOUT };

const subredditSlice = createSlice({
	name: 'subredditReducer',
	initialState: {
		subredditKeys: {} as { [key: string]: { sidebar?: AboutApiResponse; postKeys?: string[] } }
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(GET_SUBREDDIT_POSTS.fulfilled, (state, action) => {
			state.subredditKeys[action.payload.subredditName] = {
				postKeys: [
					...(state.subredditKeys[action.payload.subredditName]?.postKeys || []),
					...action.payload.postArray.data.children.map(({ data: { id } }) => id)
				]
			};
		});
		builder.addCase(GET_SUBREDDIT_ABOUT.fulfilled, (state, action) => {
			state.subredditKeys[action.payload.subredditName] = {
				...state.subredditKeys[action.payload.subredditName],
				sidebar: action.payload.sidebar
			};
		});
	}
});

export default subredditSlice;

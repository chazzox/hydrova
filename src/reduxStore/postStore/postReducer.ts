import { createSlice } from '@reduxjs/toolkit';
import getValues from '../../utils/getPostValues';

import { GET_LISTING } from './postThunks';

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[key: string]: {
				comments?: { commentArray: any[]; latestComment: string };
				postContent: post;
			};
		},
		subredditKeys: {} as {
			[key: string]: { postKeys?: string[]; afterId: string; isFetching: boolean };
		},
		userKeys: {} as { [key: string]: { about?: UserAbout; postKeys?: string[] } },
		isFetching: false
	},
	reducers: {},
	extraReducers: builder => {
		// subreddit thunk actions
		// sub fetch succeeds
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			action.payload.postArray.data.children.forEach(
				({ data }) => (state.posts[data.id] = { ...state.posts[data.id], postContent: getValues(data) })
			);
			state.subredditKeys[action.meta.arg.listingEndpointName] = {
				...state.subredditKeys[action.meta.arg.listingEndpointName],
				postKeys: [
					...(state.subredditKeys[action.meta.arg.listingEndpointName]?.postKeys || []),
					...action.payload.postArray.data.children.map(({ data: { id } }) => id)
				],
				afterId: action.payload.postArray.data.after
			};
			state.isFetching = false;
		});

		builder.addCase(GET_LISTING.pending, state => {
			state.isFetching = true;
		});
		//  sub fetch failed
		builder.addCase(GET_LISTING.rejected, (state, action) => {
			state.subredditKeys[action.meta.arg.listingEndpointName] = {
				...state.subredditKeys[action.meta.arg.listingEndpointName],
				isFetching: false
			};
		});
	}
});

export default postReducer;

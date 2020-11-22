import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getValues from '../../utils/getPostValues';

import { GET_POST, GET_LISTING, SAVE, VOTE, GET_SUBREDDIT_ABOUT } from './postThunks';

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[state: string]: {
				comments?: { commentArray: any[]; latestComment: string };
				postContent: post;
			};
		},
		subredditKeys: {} as {
			[key: string]: { sidebar?: AboutApiResponse; postKeys?: string[]; afterId: string; isFetching: boolean };
		},
		userKeys: {} as { [key: string]: { about?: UserAbout; postKeys?: string[] } }
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
				isFetching: false,
				afterId: action.payload.postArray.data.after
			};
		});
		// sub fetch in progress
		builder.addCase(GET_LISTING.pending, (state, action) => {
			state.subredditKeys[action.meta.arg.listingEndpointName].isFetching = true;
		});
		//  sub fetch failed
		builder.addCase(GET_LISTING.rejected, (state, action) => {
			state.subredditKeys[action.meta.arg.listingEndpointName] = {
				...state.subredditKeys[action.meta.arg.listingEndpointName],
				isFetching: false
			};
			// error logic here ...
		});

		// post thunk actions
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			state.posts[action.meta.arg.id] = {
				postContent: {
					...action.payload[0].data.children.map(({ data }: { data: ChildData }) => getValues(data))[0]
				},
				comments: {
					commentArray: action.payload[1].data.children.map(({ data }: any) => data),
					latestComment: action.payload[1].data.after
				}
			};
		});

		// subreddit info thunk actions
		// info fetch success
		builder.addCase(GET_SUBREDDIT_ABOUT.fulfilled, (state, action) => {
			state.subredditKeys[action.meta.arg] = {
				...state.subredditKeys[action.meta.arg],
				sidebar: action.payload.sidebar
			};
		});
		// info fetch failure
		// builder.addCase(GET_SUBREDDIT_ABOUT.rejected, (state, action) => {});

		// save thunk actions
		// save post success
		builder.addCase(SAVE.fulfilled, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.saved = action.meta.arg.isSaving;
		});
		// save post failure
		// builder.addCase(SAVE.rejected, (state, action) => {});

		// vote thunk actions
		// vote post success
		builder.addCase(VOTE.fulfilled, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = [false, null, true][
				action.meta.arg.voteDirection + 1
			];
		});
		// pre-emptively changing the vote talley
		builder.addCase(VOTE.pending, (state, action) => {
			if (action.payload)
				state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = [false, null, true][
					action.meta.arg.voteDirection + 1
				];
		});
		// vote thunk action
		builder.addCase(VOTE.rejected, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = null;
			// more error logic ...
		});
	}
});

export default postReducer;

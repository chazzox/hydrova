import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getValues from '../../utils/getPostValues';

import { GET_POST, GET_LISTING, SAVE, VOTE, GET_SUBREDDIT_ABOUT } from './postThunks';

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[state: string]: { comments?: { commentArray: any[]; latestComment: string }; postContent: post };
		},
		subredditKeys: {} as { [key: string]: { sidebar?: AboutApiResponse; postKeys?: string[] } }
	},
	reducers: {
		setClickedPostID: (state, action: PayloadAction<string>) => {
			console.log(action.payload);
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			action.payload.postArray.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: getValues(data)
					})
			);
			state.subredditKeys[action.meta.arg] = {
				...state.subredditKeys[action.meta.arg],
				postKeys: [
					...(state.subredditKeys[action.meta.arg]?.postKeys || []),
					...action.payload.postArray.data.children.map(({ data: { id } }) => id)
				]
			};
		});
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			state.posts[action.meta.arg.id] = {
				postContent: {
					...action.payload[0].data.children.map(({ data }: { data: ChildData }) =>
						getValues(data)
					)[0]
				},
				comments: {
					commentArray: action.payload[1].data.children.map(({ data }: any) => data),
					latestComment: action.payload[1].data.after
				}
			};
		});
		builder.addCase(VOTE.fulfilled, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = [false, null, true][
				action.meta.arg.voteDirection + 1
			];
		});
		builder.addCase(GET_SUBREDDIT_ABOUT.fulfilled, (state, action) => {
			state.subredditKeys[action.payload.subredditName] = {
				...state.subredditKeys[action.payload.subredditName],
				sidebar: action.payload.sidebar
			};
		});
		builder.addCase(VOTE.pending, (state, action) => {
			if (action.payload)
				state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = [false, null, true][
					action.meta.arg.voteDirection + 1
				];
		});
		builder.addCase(SAVE.fulfilled, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.saved = action.meta.arg.isSaving;
		});
		builder.addCase(VOTE.rejected, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = null;
		});
	}
});

export const { setClickedPostID } = postReducer.actions;

export default postReducer;

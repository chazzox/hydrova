import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getValues from '../../utils/getPostValues';

import { GET_POST, GET_LISTING, SAVE, VOTE } from './postThunks';

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[state: string]: { comments?: { commentArray: any[]; latestComment: string }; postContent: post };
		},
		timelineArr: [] as string[]
	},
	reducers: {
		setPostContent: (state, action: PayloadAction<{ postId: string; postContent: post }>) => {
			state.posts[action.payload.postId] = { postContent: action.payload.postContent };
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			state.timelineArr.push(...action.payload.postArray.data.children.map(({ data: { id } }) => id));
			action.payload.postArray.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: getValues(data)
					})
			);
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
		builder.addCase(VOTE.pending, (state, action) => {
			if (action.payload)
				state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = [false, null, true][
					action.meta.arg.voteDirection + 1
				];
		});
		builder.addCase(VOTE.rejected, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.likes = null;
		});
		builder.addCase(SAVE.fulfilled, (state, action) => {
			state.posts[action.meta.arg.fullName.split('_')[1]].postContent.saved = action.meta.arg.isSaving;
		});
	}
});

export const { setPostContent } = postReducer.actions;

export default postReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getValues from '../utils/getPostValues';

import { GET_POST, GET_TIMELINE, SAVE, VOTE } from './postThunks';
import { GET_SUBREDDIT_POSTS } from './subredditReducer';
export { GET_POST, SAVE, VOTE, GET_TIMELINE };

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
		},
		setPostArray: (state, { payload }: { payload: TimelineResponse }) => {
			payload.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: getValues(data)
					})
			);
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_TIMELINE.fulfilled, (state, action) => {
			state.timelineArr.push(...action.payload.data.children.map(({ data: { id } }) => id));
			action.payload.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: getValues(data)
					})
			);
		});
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
						...action.payload[0].data.children.map(({ data }: { data: ChildData }) =>
							getValues(data)
						)[0]
					},
					comments: {
						commentArray: action.payload[1].data.children.map(({ data }: any) => data),
						latestComment: action.payload[1].data.after
					}
				};
			}
		});
		builder.addCase(VOTE.fulfilled, (state, action) => {
			state.posts[action.payload.fullName.split('_')[1]].postContent.likes = [false, null, true][
				action.payload.voteDir + 1
			];
		});
		builder.addCase(SAVE.fulfilled, (state, action) => {
			if (state.posts[action.payload.fullName.split('_')[1]])
				state.posts[action.payload.fullName.split('_')[1]].postContent.saved =
					action.payload.isSaving;
		});
		builder.addCase(GET_SUBREDDIT_POSTS.fulfilled, (state, action) => {
			action.payload.postArray.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: getValues(data)
					})
			);
		});
	}
});

export const { setPostContent, setPostArray } = postReducer.actions;

export default postReducer;

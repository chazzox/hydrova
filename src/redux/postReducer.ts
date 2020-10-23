import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GET_POST, GET_TIMELINE, SAVE, VOTE } from './postThunks';
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
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_TIMELINE.fulfilled, (state, action) => {
			state.timelineArr.push(...action.payload.data.children.map(({ data: { id } }) => id));
			action.payload.data.children.forEach(
				({ data }) =>
					(state.posts[data.id] = {
						postContent: {
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
							num_comments: data.num_comments,
							name: data.name,
							permalink: data.permalink,
							created: data.created_utc,
							saved: data.saved,
							likes: data.likes
						}
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
							num_comments: data.num_comments,
							name: data.name,
							permalink: data.permalink,
							created: data.created_utc,
							saved: data.saved
						}))[0]
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
	}
});

export const { setPostContent } = postReducer.actions;

export default postReducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

const timelineReducer = createSlice({
	name: 'timelineReducer',
	initialState: { timelineArr: [] as post[], lastPostID: '', beforeNav: null as null | string },
	reducers: {
		setLastPost: (state, action: PayloadAction<string>) => {
			state.lastPostID = action.payload;
		},
		setBeforeNav: (state, action: PayloadAction<string>) => {
			state.beforeNav = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_TIMELINE.fulfilled, (state, action) => {
			state.timelineArr.push(
				...action.payload.data.children.map(({ data }) => ({
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
				}))
			);
		});
	}
});

export const { setLastPost, setBeforeNav } = timelineReducer.actions;

export default timelineReducer;

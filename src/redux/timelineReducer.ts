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
	initialState: { timelineArr: [] as ChildData[], lastPostID: '' },
	reducers: {
		setLastPost: (state, action: PayloadAction<string>) => {
			state.lastPostID = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_TIMELINE.fulfilled, (state, action) => {
			state.timelineArr = state.timelineArr.concat(
				...action.payload.data.children.map(({ data }) => data as ChildData)
			);
		});
	}
});

export const { setLastPost } = timelineReducer.actions;

export default timelineReducer;

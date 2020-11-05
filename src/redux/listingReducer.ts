import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET_LISTING } from './postStore/postThunks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from './reduxWrapper';

export const GET_SUBREDDIT_ABOUT = createAsyncThunk<
	{ sidebar: AboutApiResponse; subredditName: string },
	string,
	{ state: ReduxStateType; rejectValue: failure }
>('subreddits/getSubAbout', async (subRedditString, { getState, rejectWithValue, dispatch }) => {
	const response = await fetch(`https://oauth.reddit.com${subRedditString}/about`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON as failure);
	return { sidebar: responseJSON as AboutApiResponse, subredditName: subRedditString as string };
});

const subredditSlice = createSlice({
	name: 'subredditReducer',
	initialState: {
		subredditKeys: {} as { [key: string]: { sidebar?: AboutApiResponse; postKeys?: string[] } }
	},
	reducers: {
		setClickedPostID: (state, action: PayloadAction<string>) => {
			console.log(action.payload);
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			state.subredditKeys[action.meta.arg] = {
				...state.subredditKeys[action.meta.arg],
				postKeys: [
					...(state.subredditKeys[action.meta.arg]?.postKeys || []),
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

export const { setClickedPostID } = subredditSlice.actions;
export default subredditSlice;

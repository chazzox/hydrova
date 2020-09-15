import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getProfileURL from '../utils/imgQuerySplit';

export const GET_USER_INFO = createAsyncThunk<userInfoSuccess, { access_token: string }, { rejectValue: failure }>(
	'sidebar/getUserInfo',
	async ({ access_token }, thunkApi) => {
		const response = await fetch('https://oauth.reddit.com/api/v1/me', {
			method: 'GET',
			headers: { Authorization: `Bearer ${access_token}` },
			redirect: 'manual'
		});
		const responseJSON = await response.json();
		if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
		return responseJSON as userInfoSuccess;
	}
);

export const GET_MULTIREDDITS = createAsyncThunk<userMultiSuccess, { access_token: string }, { rejectValue: failure }>(
	'sidebar/getMultiRedditList',
	async ({ access_token }, thunkApi) => {
		const response = await fetch('https://oauth.reddit.com/api/multi/mine', {
			method: 'GET',
			headers: { Authorization: `Bearer ${access_token}` },
			redirect: 'manual'
		});
		const responseJSON = await response.json();
		if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
		return responseJSON as userMultiSuccess;
	}
);

export const GET_SUBREDDITS = createAsyncThunk<
	userSubSuccess,
	{ access_token: string; afterId: string | undefined },
	{ rejectValue: failure }
>('sidebar/getSubreddits', async ({ access_token, afterId }, thunkApi) => {
	const response = await fetch('https://oauth.reddit.com/subreddits/mine/subscriber?limit=50&after=' + afterId, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` },
		redirect: 'manual'
	});
	const responseJSON = await response.json();
	if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
	const responseJSONSuccess: userSubSuccess = responseJSON;
	return responseJSONSuccess;
});

const sidebarReducer = createSlice({
	name: 'sidebarReducer',
	initialState: {
		isCollapsed: false,

		multiReddits: [] as { icon_img: string; display_name: string }[],

		subReddits: [] as sub[],

		userInfo: {
			name: '',
			total_karma: 0,
			icon_img: ''
		}
	},
	reducers: {
		SET_SIZE_MODE: (state, action: PayloadAction<boolean>) => {
			state.isCollapsed = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(GET_USER_INFO.fulfilled, (state, action) => {
			state.userInfo.name = action.payload?.name;
			state.userInfo.total_karma = action.payload?.total_karma;
			state.userInfo.icon_img = getProfileURL(action.payload?.icon_img);
		});

		builder.addCase(GET_MULTIREDDITS.fulfilled, (state, action) => {
			action.payload.map(multi =>
				state.multiReddits.push({ display_name: multi.data.display_name, icon_img: multi.data.icon_url })
			);
		});

		builder.addCase(GET_SUBREDDITS.fulfilled, (state, action) => {
			state.subReddits = state.subReddits
				.concat(
					...action.payload.data.children.map(sub => ({
						display_name: sub.data.display_name,
						icon_img: sub.data.icon_img,
						subreddit_type: sub.data.subreddit_type
					}))
				)
				.sort((a, b) => a.display_name.localeCompare(b.display_name));
		});
	}
});

export const { SET_SIZE_MODE } = sidebarReducer.actions;

export default sidebarReducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getProfileURL from '../utils/imgQuerySplit';

interface userInfoSuccess {
	name: string;
	total_karma: number;
	icon_img: string;
}

interface failure {
	message: string;
	error: number;
}

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

interface userMulti {
	kind: string;
	data: {
		display_name: string;
		icon_url: string;
	};
}
type userMultiSuccess = userMulti[];

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

interface sub {
	display_name: string;
	icon_img: string;
	subreddit_type: string;
}

interface userSub {
	kind: string;
	data: sub;
}

type userSubSuccess = {
	kind: string;
	data: {
		after: string | null;
		before: string | null;
		dist: number;
		children: userSub[];
	};
};

export const GET_SUBREDDITS = createAsyncThunk<userSubSuccess[], { access_token: string }, { rejectValue: failure }>(
	'sidebar/getSubreddits',
	async ({ access_token }, thunkApi) => {
		const responses: userSubSuccess[] = [];
		let afterId: string | null = '';
		while (afterId !== null) {
			const response = await fetch('https://oauth.reddit.com/subreddits/mine/subscriber?limit=50&after=' + afterId, {
				method: 'GET',
				headers: { Authorization: `Bearer ${access_token}` },
				redirect: 'manual'
			});
			const responseJSON = await response.json();
			if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as failure);
			const responseJSONSuccess: userSubSuccess = responseJSON;
			responses.push(responseJSONSuccess);
			afterId = responseJSONSuccess.data.after;
		}
		return responses;
	}
);

const sidebarReducer = createSlice({
	name: 'sidebarReducer',
	initialState: {
		isCollapsed: false,

		multiReddits: [] as { icon_img: string; display_name: string }[],

		subReddits: [] as { icon_img: string; display_name: string; subreddit_type: string }[],
		subAfter: '',

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
			// ideally this would happen asynchronously, that way each chunk could be rendered as it loads in
			// i would like to implement this eventually
			state.subReddits = state.subReddits
				.concat(
					...action.payload.map(subChunk =>
						subChunk.data.children.map(sub => ({
							icon_img: sub.data.icon_img,
							display_name: sub.data.display_name,
							subreddit_type: sub.data.subreddit_type
						}))
					)
				)
				.sort((a, b) => a.display_name.localeCompare(b.display_name));
		});
	}
});

export const { SET_SIZE_MODE } = sidebarReducer.actions;

export default sidebarReducer;

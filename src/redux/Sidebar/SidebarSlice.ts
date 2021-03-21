import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GET_MULTIREDDITS, GET_SUBREDDITS, GET_USER_INFO } from './SidebarThunk';
export { GET_MULTIREDDITS, GET_SUBREDDITS, GET_USER_INFO };

import getProfileURL from 'utils/imgQuerySplit';
import colorHash from 'utils/colorHash';
import unique from 'utils/unique';

const sidebarReducer = createSlice({
	name: 'sidebarReducer',
	initialState: {
		isCollapsed: false,

		multiReddits: [] as Multireddit[],

		subReddits: [] as SidebarStoredSub[],

		userInfo: {} as UserAbout
	},
	reducers: {
		SET_SIZE_MODE: (state, action: PayloadAction<boolean>) => {
			state.isCollapsed = action.payload;
			localStorage.setItem('sidebar', JSON.stringify(state));
		}
	},
	extraReducers: (builder) => {
		builder.addCase(GET_USER_INFO.fulfilled, (state, action) => {
			state.userInfo.name = action.payload?.name;
			state.userInfo.total_karma = action.payload?.total_karma;
			state.userInfo.icon_img = getProfileURL(action.payload?.icon_img);
		});

		builder.addCase(GET_MULTIREDDITS.fulfilled, (state, action) => {
			const newMultiArr = unique(
				state.multiReddits.concat(
					...action.payload.map((multi) => ({
						display_name: multi.data.display_name,
						icon_img: multi.data.icon_url,
						icon_color: getColor(multi.data.display_name)
					}))
				),
				(multi: Multireddit) => multi.display_name
			);
			state.multiReddits = newMultiArr;
		});

		builder.addCase(GET_SUBREDDITS.fulfilled, (state, action) => {
			const newSubArr = unique(
				state.subReddits
					.concat(
						// filtering out the unneeded data from the subreddit info
						...action.payload.data.children.map(({ data }) => ({
							display_name: data.display_name,
							icon_img: getProfileURL(data.icon_img ? data.icon_img : data.community_icon || ''),
							subreddit_type: data.subreddit_type,
							icon_color: getColor(data.display_name)
						}))
					)
					.sort((a, b) => a.display_name.localeCompare(b.display_name)),
				(sub: SidebarStoredSub) => sub.display_name
			);

			// if we are in initial load mode
			state.subReddits = newSubArr;
			// once the fetching of all the subreddit list is complete, we want to save the entire list to local storage
			if (action.payload.data.after) localStorage.setItem('sidebar', JSON.stringify(state));
		});
	}
});

export const { SET_SIZE_MODE } = sidebarReducer.actions;

export default sidebarReducer;

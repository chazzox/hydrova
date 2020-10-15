import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const timelineReducer = createSlice({
	name: 'timelineReducer',
	initialState: { lastPostID: '', beforeNav: null as null | string },
	reducers: {
		setAfterID: (state, action: PayloadAction<string>) => {
			state.lastPostID = action.payload;
		},
		setClickedPostID: (state, action: PayloadAction<string>) => {
			state.beforeNav = action.payload;
		}
	}
});

export const { setAfterID, setClickedPostID } = timelineReducer.actions;

export default timelineReducer;

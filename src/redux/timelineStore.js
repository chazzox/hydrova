import { createSlice } from '@reduxjs/toolkit';

const timelineStore = createSlice({
	name: 'timelineSlice',
	initialState: {
		isLoaded: false,
		isLoggedIn: false,
		auth: {}
	},
	reducers: {
		timelineFetchSuccess: (state, action) => {
			state.isLoaded = true;
			state.isLoggedIn = true;
			state.auth = action.payload;
			return;
		},
		timelineFetchFailure: (state) => {
			state.isLoaded = true;
			state.isLoggedIn = false;
			state.auth = {};
			return;
		}
	}
});

export const { timelineFetchSuccess, timelineFetchFailure } = timelineStore.actions;

export const refreshToken = () => async (dispatch) => {
	dispatch(timelineFetchSuccess());
	dispatch(timelineFetchFailure());
};

export default timelineStore;

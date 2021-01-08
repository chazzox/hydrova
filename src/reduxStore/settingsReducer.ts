import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { previousStyle: '', styleMode: 'defaultDark', dynamicExpand: false },
	reducers: {
		SET_STYLE_MODE(state, action: PayloadAction<string>) {
			state.styleMode = action.payload;
			state.previousStyle = action.payload;
		},
		PREVIEW_STYLE_MODE(state, action: PayloadAction<string>) {
			state.previousStyle = state.styleMode;
			state.styleMode = action.payload;
		},
		SET_PREVIOUS_STYLE_MODE(state) {
			state.styleMode = state.previousStyle;
		}
	}
});

export const { SET_STYLE_MODE, PREVIEW_STYLE_MODE, SET_PREVIOUS_STYLE_MODE } = settingsReducer.actions;

export default settingsReducer;

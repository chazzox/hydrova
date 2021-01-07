import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { styleMode: 'defaultDark', dynamicExpand: false },
	reducers: {
		SET_STYLE_MODE(state, action: PayloadAction<string>) {
			state.styleMode = action.payload;
		}
	}
});

export const { SET_STYLE_MODE } = settingsReducer.actions;

export default settingsReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { styleMode: true } as { styleMode: boolean | string },
	reducers: {
		SET_STYLE_MODE: (state, action: PayloadAction<any>) => {
			state.styleMode = action.payload;
		}
	}
});

export default settingsReducer;

import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counterSlice',
	initialState: 1,
	reducers: {
		inc: (state) => {
			state += 1;
		}
	}
});

export const { inc } = counterSlice.actions;

export default counterSlice;

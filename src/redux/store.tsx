import * as React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import AuthSlice from './AuthSlice';

const store = configureStore({
	reducer: { auth: AuthSlice.reducer }
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const Wrapper = ({ element }: any) => {
	return <Provider store={store}>{element}</Provider>;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default Wrapper;

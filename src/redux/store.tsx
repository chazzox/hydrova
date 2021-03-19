import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';

const store = configureStore({
	reducer: { counter: counterSlice.reducer }
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const Wrapper: React.FC = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default Wrapper;

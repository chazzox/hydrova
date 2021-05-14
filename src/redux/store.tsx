import * as React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import SettingSlice from './SettingSlice';
import sidebarReducer from './Sidebar/SidebarSlice';
import ListingSlice from './ListingSlice';

const store = configureStore({
	reducer: { settings: SettingSlice.reducer, sidebar: sidebarReducer.reducer, listing: ListingSlice.reducer }
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const Wrapper = ({ element }: any) => {
	return <Provider store={store}>{element}</Provider>;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default Wrapper;

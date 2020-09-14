import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './settingsReducer';
import sidebarReducer from './sidebarReducer';
import authReducer from './authReducer';

const store = configureStore({
	reducer: {
		style: settingsReducer.reducer,
		sidebar: sidebarReducer.reducer,
		auth: authReducer.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default ({ element }: any) => {
	return <Provider store={store}>{element}</Provider>;
};

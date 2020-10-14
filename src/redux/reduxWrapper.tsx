import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './settingsReducer';
import sidebarReducer from './sidebarReducer';
import authReducer from './authReducer';
import timelineReducer from './timelineReducer';
import postReducer from './postReducer';

let sideBar: null | string = null;
let sideBarJSON: null | any = null;
if (typeof window !== `undefined`) {
	sideBar = localStorage.getItem('sidebar');
	sideBarJSON = sideBar ? JSON.parse(sideBar) : null;
}

const store = configureStore({
	reducer: {
		style: settingsReducer.reducer,
		sidebar: sidebarReducer.reducer,
		auth: authReducer.reducer,
		timeline: timelineReducer.reducer,
		post: postReducer.reducer
	},
	preloadedState: {
		...(sideBarJSON ? { sidebar: sideBarJSON } : null)
	}
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const wrapper = ({ element }: any) => {
	return <Provider store={store}>{element}</Provider>;
};

export default wrapper;

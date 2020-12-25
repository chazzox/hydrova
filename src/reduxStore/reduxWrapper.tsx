import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from './sidebar/sidebarReducer';
import postReducer from './postStore/postReducer';
import settingsReducer from './settingsReducer';
import authReducer from './authReducer';

let sideBar: null | string = null;
let sideBarJSON: null | any = null;

if (typeof window !== `undefined`) {
	sideBar = localStorage.getItem('sidebar');
	sideBarJSON = sideBar ? JSON.parse(sideBar) : null;
}

const store = configureStore({
	reducer: {
		sidebar: sidebarReducer.reducer,
		style: settingsReducer.reducer,
		auth: authReducer.reducer,
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

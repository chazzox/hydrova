import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import subredditReducer from './subreddit/subredditReducer';
import timelineReducer from './timelineReducer';
import settingsReducer from './settingsReducer';
import sidebarReducer from './sidebar/sidebarReducer';
import authReducer from './auth/authReducer';
import postReducer from './postStore/postReducer';

let sideBar: null | string = null;
let sideBarJSON: null | any = null;
if (typeof window !== `undefined`) {
	sideBar = localStorage.getItem('sidebar');
	sideBarJSON = sideBar ? JSON.parse(sideBar) : null;
}

const store = configureStore({
	reducer: {
		auth: authReducer.reducer,
		style: settingsReducer.reducer,
		sidebar: sidebarReducer.reducer,
		timeline: timelineReducer.reducer,
		subreddits: subredditReducer.reducer,
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

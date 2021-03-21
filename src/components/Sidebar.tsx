import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, NavLink } from 'react-router-dom';

import { ReduxStateType, AppDispatch } from 'redux/store';
import { SET_SIZE_MODE, GET_USER_INFO, GET_MULTIREDDITS, GET_SUBREDDITS } from 'redux/Sidebar/SidebarSlice';

import SVGS from 'assets/exportSVG';

import classNames from 'classnames';

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();

	const userInfo = useSelector<ReduxStateType>((state) => state.sidebar);

	// fetching all user subs in batches of 25
	const getUserSubscribedSubreddits = (afterId: string | undefined = '') => {
		dispatch(GET_SUBREDDITS(afterId))
			.then(unwrapResult)
			.then((originalPromiseResult) => {
				if (originalPromiseResult.data.after) getUserSubscribedSubreddits(originalPromiseResult.data.after);
			});
	};

	useEffect(() => {
		dispatch(GET_USER_INFO());
		dispatch(GET_MULTIREDDITS());
		getUserSubscribedSubreddits();
	}, []);

	return (
		<div id="sidebar">
			<div id="navTitleContainer">
				<h1 id="navTitle">Hydrova</h1>
			</div>
		</div>
	);
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { ReduxStateType, AppDispatch } from '../../redux/reduxWrapper';
import GenericButton from '../genericButton/genericButton';
import {
	SET_SIZE_MODE,
	GET_USER_INFO,
	GET_MULTIREDDITS,
	GET_SUBREDDITS
} from '../../redux/sidebar/sidebarReducer';

import hydrovaSVG from '../../assets/logo.svg';
import searchIcon from '../../assets/icons/search.svg';

import './sidebar.scss';

const Sidebar = () => {
	const dispatch: AppDispatch = useDispatch();

	const isCollapsed = useSelector((state: ReduxStateType) => state.sidebar.isCollapsed);
	const userInfo = useSelector((state: ReduxStateType) => state.sidebar.userInfo);
	const multiReddits = useSelector((state: ReduxStateType) => state.sidebar.multiReddits);
	const subReddits = useSelector((state: ReduxStateType) => state.sidebar.subReddits);

	const getUserSubscribedSubreddits = (afterId: string | undefined = '') => {
		dispatch(GET_SUBREDDITS(afterId))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				if (originalPromiseResult.data.after)
					getUserSubscribedSubreddits(originalPromiseResult.data.after);
			});
	};

	useEffect(() => {
		dispatch(GET_USER_INFO());
		dispatch(GET_MULTIREDDITS());
		getUserSubscribedSubreddits();
	}, []);

	return (
		<div id="sidebar" className={isCollapsed ? 'compact' : ''}>
			<Link to="/">
				<img src={hydrovaSVG} id="logo" alt="" />
			</Link>
			<h1 id="navTitle">Hydrova</h1>
			<button id="shrinkSidebarBtn" onClick={() => dispatch(SET_SIZE_MODE(!isCollapsed))} />
			<input
				onClick={() => dispatch(SET_SIZE_MODE(false))}
				className="navButton hasIcon"
				type="text"
				id="searchBar"
				placeholder="Search"
				style={{ backgroundImage: `url(${searchIcon})` }}
			/>

			<GenericButton text="Timeline" svgPath="home" href="/" />
			<GenericButton text="Post" svgPath="new" href="/submit" />
			<GenericButton text="Mail" svgPath="mail" href="/" />
			<GenericButton text="Settings" svgPath="settings" href="/" />

			<div className="scrollSection">
				{/* gradient of scroll section (fades in/out content as user scrolls */}
				<div className="scrollGradient"></div>
				<div className="scrollGradient"></div>
				{/* main sidebar content */}
				<h3>Feeds</h3>
				<GenericButton href="/r/all" text="All" />
				{multiReddits.map((multiReddit, index) => (
					<GenericButton
						key={index}
						href={'/m/' + multiReddit.display_name}
						text={multiReddit.display_name}
					>
						<div
							className="icon"
							style={
								_.isEmpty(multiReddit.icon_img)
									? { backgroundColor: multiReddit.icon_color }
									: { backgroundImage: `url(${multiReddit.icon_img})` }
							}
						>
							{_.isEmpty(multiReddit.icon_img) ? multiReddit.display_name[0].toUpperCase() : ''}
						</div>
					</GenericButton>
				))}
				<h3>My Subreddits</h3>
				{subReddits.map((subreddit, index) => {
					if (subreddit.subreddit_type !== 'user')
						return (
							<GenericButton
								key={index}
								href={'/r/' + subreddit.display_name}
								text={subreddit.display_name}
							>
								<div
									className="icon"
									style={
										_.isEmpty(subreddit.icon_img)
											? { backgroundColor: subreddit.icon_color }
											: { backgroundImage: `url(${subreddit.icon_img})` }
									}
								>
									{_.isEmpty(subreddit.icon_img)
										? subreddit.display_name[0].toUpperCase()
										: ''}
								</div>
							</GenericButton>
						);
				})}
			</div>
			<div id="userDetails">
				<div id="userText">
					<p id="userName">{userInfo.name}</p>
					<p id="userKarma">{userInfo.total_karma}</p>
				</div>
				<div id="profileImage" style={{ backgroundImage: `url(${userInfo.icon_img})` }} />
			</div>
		</div>
	);
};

export default Sidebar;

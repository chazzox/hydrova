import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, NavLink } from 'react-router-dom';

import { ReduxStateType, AppDispatch } from 'reduxStore/reduxWrapper';
import GenericButton from 'components/genericButton';
import { SET_SIZE_MODE, GET_USER_INFO, GET_MULTIREDDITS, GET_SUBREDDITS } from 'reduxStore/sidebar/sidebarReducer';

import hydrovaSVG from 'assets/logo.svg';
import SVGS from 'assets/exportSVG';

import 'styles/component/sidebar.scss';
import 'styles/component/button/round.scss';

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();

	const isCollapsed = useSelector<ReduxStateType, boolean>((state) => state.sidebar.isCollapsed);
	const userInfo = useSelector<ReduxStateType, UserAbout>((state) => state.sidebar.userInfo);
	const multiReddits = useSelector<ReduxStateType, Multireddit[]>((state) => state.sidebar.multiReddits);
	const subReddits = useSelector<ReduxStateType, SidebarStoredSub[]>((state) => state.sidebar.subReddits);

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
		<div id="sidebar" className={isCollapsed ? 'compact' : ''}>
			<div id="navTitleContainer">
				<Link to="/">
					<img src={hydrovaSVG} id="logo" alt="" />
				</Link>
				<h1 id="navTitle">Hydrova</h1>
			</div>
			<GenericButton
				svgPath={isCollapsed ? 'collapse_right' : 'collapse_left'}
				isRound={true}
				clickEvent={() => dispatch(SET_SIZE_MODE(!isCollapsed))}
			/>
			<div id="sidebarSearchWrapper">
				{SVGS['search']}
				<input onClick={() => dispatch(SET_SIZE_MODE(false))} type="text" id="searchBar" placeholder="Search" />
			</div>
			<GenericButton text="Timeline" svgPath="home" href="/" />
			<GenericButton text="Post" svgPath="new" href="/submit" />
			<GenericButton text="Mail" svgPath="mail" href="/mail" />
			<GenericButton text="Settings" svgPath="settings" href="/settings/account" />

			<div className="scrollSection">
				{/* main sidebar content */}
				<h3>Feeds</h3>
				<NavLink to="/r/all" activeClassName="selected">
					<GenericButton text="All" id="rAllFeed" />
				</NavLink>
				{multiReddits.map((multiReddit, index) => (
					<GenericButton key={index} href={'/m/' + multiReddit.display_name} text={multiReddit.display_name}>
						<div
							className="icon"
							style={
								multiReddit.icon_img == ''
									? { backgroundColor: multiReddit.icon_color }
									: { backgroundImage: `url(${multiReddit.icon_img})` }
							}
						>
							{multiReddit.icon_img == '' ? multiReddit.display_name[0].toUpperCase() : ''}
						</div>
					</GenericButton>
				))}
				<h3>{isCollapsed ? 'Subs' : 'My Subreddits'}</h3>
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
										subreddit.icon_img == ''
											? { backgroundColor: subreddit.icon_color }
											: { backgroundImage: `url(${subreddit.icon_img})` }
									}
								>
									{subreddit.icon_img == '' ? subreddit.display_name[0].toUpperCase() : ''}
								</div>
							</GenericButton>
						);
				})}
			</div>
			<div id="userDetails">
				<div id="profileImage" style={{ backgroundImage: `url(${userInfo.icon_img})` }} />
				<div id="userText">
					<p id="userName">{userInfo.name}</p>
					<p id="userKarma">{userInfo.total_karma}</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

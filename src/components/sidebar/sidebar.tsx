import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import _ from 'lodash';

import { RootState, AppDispatch } from '../../redux/reduxWrapper';
import { SET_SIZE_MODE, GET_USER_INFO, GET_MULTIREDDITS, GET_SUBREDDITS } from '../../redux/sidebarReducer';

import Logo from '../../assets/logo.svg';
import searchIcon from './assets/search.svg';
import homeIcon from './assets/home.svg';
import newIcon from './assets/new.svg';
import mailIcon from './assets/mail.svg';
import settingsIcon from './assets/settings.svg';

import './sidebar.scss';

const Sidebar = () => {
	const dispatch: AppDispatch = useDispatch();

	const [colorArray] = useState([
		'40a8c4',
		'81b214',
		'206a5d',
		'ea5455',
		'2d4059',
		'e11d74',
		'776d8a',
		'519872',
		'318fb5',
		'00bcd4',
		'848ccf',
		'93b5e1',
		'cf1b1b',
		'0f4c75',
		'6f4a8e'
	]);

	const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	const userInfo = useSelector((state: RootState) => state.sidebar.userInfo);

	const multiReddits = useSelector((state: RootState) => state.sidebar.multiReddits);

	const subReddits = useSelector((state: RootState) => state.sidebar.subReddits);
	const subAfter = useSelector((state: RootState) => state.sidebar.subAfter);

	useEffect(() => {
		dispatch(GET_USER_INFO({ access_token: access_token }));
		dispatch(GET_MULTIREDDITS({ access_token: access_token }));
		dispatch(GET_SUBREDDITS({ access_token: access_token }));
	}, []);

	return (
		<div id="sidebar" className={isCollapsed ? 'compact' : ''}>
			<Link to="/">
				<img src={Logo} id="logo" alt="" />
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
			<SidebarLink pathname="/" icon={homeIcon} displayName="Timeline" />
			<SidebarLink pathname="/submit" icon={newIcon} displayName="Post" />
			<SidebarLink pathname="/mail" icon={mailIcon} displayName="Mail" />
			<SidebarLink pathname="/settings" icon={settingsIcon} displayName="Settings" />
			{multiReddits ? null : null}

			<div className="scrollSection">
				<h3>Feeds</h3>
				<Link to="r/all">
					<button className="navButton">All</button>
				</Link>
				{multiReddits.map((multiReddit, index) => (
					<SidebarLink
						key={index}
						pathname={'/m/' + multiReddit.display_name}
						displayName={multiReddit.display_name}
					>
						<div
							className="icon"
							style={
								_.isEmpty(multiReddit.icon_img)
									? {
											backgroundColor:
												'#' + colorArray[Math.floor(Math.random() * Math.floor(colorArray.length))]
									  }
									: { backgroundImage: `url(${multiReddit.icon_img})` }
							}
						>
							{_.isEmpty(multiReddit.icon_img) ? multiReddit.display_name[0].toUpperCase() : ''}
						</div>
					</SidebarLink>
				))}
				<h3>My Subreddits</h3>
				{subReddits.map((subreddit, index) => {
					console.log();
					if (subreddit.subreddit_type !== 'user')
						return (
							<SidebarLink
								key={index}
								pathname={'/r/' + subreddit.display_name}
								displayName={subreddit.display_name}
							>
								<div
									className="icon"
									style={
										_.isEmpty(subreddit.icon_img)
											? {
													backgroundColor:
														'#' +
														colorArray[Math.floor(Math.random() * Math.floor(colorArray.length))]
											  }
											: { backgroundImage: `url(${subreddit.icon_img})` }
									}
								>
									{_.isEmpty(subreddit.icon_img) ? subreddit.display_name[0].toUpperCase() : ''}
								</div>
							</SidebarLink>
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

function SidebarLink(props: { pathname: string; displayName: string; icon?: string; children?: any }) {
	return (
		<Link to={props.pathname}>
			<button
				id={'nav' + props.displayName}
				className="navButton hasIcon"
				style={{ backgroundImage: `url(${props.icon})` } as CSS.Properties}
			>
				{props.displayName}
				{props.children}
			</button>
		</Link>
	);
}

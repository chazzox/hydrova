import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { ReduxStateType, AppDispatch } from 'redux/store';
import { GET_USER_INFO, GET_MULTIREDDITS, GET_SUBREDDITS } from 'redux/Sidebar/SidebarSlice';
import { Home, Hydrova, Mail, New, Search, Settings } from 'assets/Icons';
import styled from 'styled-components';
import { Button } from './Button';

const NavHydrova = styled(Hydrova)`
	margin-right: ${(props) => props.theme.base.paddingSecondary}px;
	transition: margin 0.4s ease;
	vertical-align: middle;
	width: 34px;
	height: 34px;
`;

const NavTitle = styled.h1`
	color: ${(props) => props.theme.colors.primaryText};
	display: inline-block;
	font-weight: 600;
	font-size: 13pt;
`;

const TitleContainer = styled.div`
	display: inline-block;
	white-space: nowrap;
	width: fit-content;
	overflow: hidden;
`;

const SidebarContainer = styled.div`
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	color: ${(props) => props.theme.colors.primaryText};
	padding: 16px ${(props) => props.theme.base.paddingTertiary}px;
	box-sizing: border-box;
	justify-self: left;
	position: relative;
	max-width: 300px;
	flex-shrink: 3; // will be the first to compress to save space
	height: 100vh;
	width: 300px;
`;

const SidebarSearchWrapper = styled.div`
	min-height: 44px;
	width: 100%;
	display: block;
	margin: ${(props) => props.theme.base.paddingTertiary}px 0;
	padding: ${(props) => props.theme.base.paddingSecondary}px 16px;
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	background: ${(props) => props.theme.colors.secondaryAccentBackground};
	white-space: nowrap;
	overflow: hidden;
	&:hover {
		filter: brightness(1.35);
	}
	&:focus-within {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
		filter: brightness(1) !important;
	}
`;

const SearchBar = styled.input`
	display: inline-block;
	border: none;
	outline: none;
	background: none;
	font-weight: 400;
	font-size: 11pt;
	width: calc(100% - 20px - ${(props) => props.theme.base.paddingSecondary}px);
	color: ${(props) => props.theme.colors.primaryText};

	&::placeholder {
		color: ${(props) => props.theme.colors.secondaryText};
	}
`;

const Section = styled.h3`
	color: ${(props) => props.theme.colors.secondaryText};
	text-transform: uppercase;
	text-overflow: ellipsis;
	white-space: nowrap;
	letter-spacing: 1px;
	margin-left: 5px;
	overflow: hidden;
	font-weight: 600;
	font-size: 10pt;
`;

const ScrollSection = styled.div`
	display: block;
	position: relative;

	overflow-y: auto;
	overflow-x: hidden;

	margin-top: ${(props) => props.theme.base.paddingTertiary}px;

	padding-bottom: 40px;

	width: 100%;
	max-height: 53%;

	border-radius: ${(props) => props.theme.base.paddingPrimary}px;
	cursor: pointer;

	&::-webkit-scrollbar {
		width: 0 !important;
	}
`;

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();

	const multiReddits = useSelector<ReduxStateType, Multireddit[]>((state) => state.sidebar.multiReddits);
	const subReddits = useSelector<ReduxStateType, SidebarStoredSub[]>((state) => state.sidebar.subReddits);
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
		<SidebarContainer>
			<TitleContainer>
				<NavHydrova />
				<NavTitle>Hydrova</NavTitle>
			</TitleContainer>
			<SidebarSearchWrapper>
				<Search />
				<SearchBar type="text" placeholder="Search" autoComplete="off" />
			</SidebarSearchWrapper>
			<Button>
				<Home />
				Timeline
			</Button>
			<Button>
				<New />
				Post
			</Button>
			<Button>
				<Mail />
				Mail
			</Button>
			<Button>
				<Settings />
				Settings
			</Button>
			<ScrollSection>
				<Section>Feeds</Section>
				{multiReddits.map((multiReddit, index) => (
					<Button as="a" key={index} href={'/m/' + multiReddit.display_name}>
						<div
							className="icon"
							style={
								!multiReddit.icon_img
									? { backgroundColor: multiReddit.icon_color }
									: { backgroundImage: `url(${multiReddit.icon_img})` }
							}
						>
							{!multiReddit.icon_img && multiReddit.display_name[0].toUpperCase()}
						</div>
						{multiReddit.display_name}
					</Button>
				))}
				<Section>My Subreddits</Section>
				{subReddits.map((subreddit, index) => {
					if (subreddit.subreddit_type !== 'user')
						return (
							<Button as="a" key={index} href={'/r/' + subreddit.display_name}>
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
								{subreddit.display_name}
							</Button>
						);
				})}
			</ScrollSection>
			<div id="userDetails">
				<div id="profileImage" style={{ backgroundImage: `url(${userInfo.icon_img})` }} />
				<div id="userText">
					<p id="userName">{userInfo.name}</p>
					<p id="userKarma">{userInfo.total_karma}</p>
				</div>
			</div>
		</SidebarContainer>
	);
};

export default Sidebar;

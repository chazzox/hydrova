import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { ReduxStateType, AppDispatch } from '@redux/store';
import { GET_USER_INFO, GET_MULTIREDDITS, GET_SUBREDDITS } from '@redux/Sidebar/SidebarSlice';
import { Home, Hydrova, Mail, New, Search, Settings } from '@assets/Icons';
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
	flex-shrink: 3;
	height: 100vh;
	width: 250px;
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

const Icon = styled.div`
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	margin-right: ${(props) => props.theme.base.paddingSecondary}px;
	line-height: ${(props) => props.theme.base.paddingTertiary}px;
	width: ${(props) => props.theme.base.paddingTertiary}px;
	height: ${(props) => props.theme.base.paddingTertiary}px;
	background-repeat: no-repeat;
	background-position: 50%;
	background-size: cover;
	text-align: center;
	font-weight: 600;
	font-size: 10pt;
	float: left;
`;

const ScrollSection = styled.div`
	border-radius: ${(props) => props.theme.base.paddingPrimary}px;
	margin-top: ${(props) => props.theme.base.paddingTertiary}px;
	display: block;
	position: relative;
	overflow-y: auto;
	overflow-x: hidden;
	padding-bottom: 40px;
	width: 100%;
	max-height: 53%;
	cursor: pointer;
	&::-webkit-scrollbar {
		width: 0 !important;
	}
`;

const UserDetails = styled.div`
	padding: ${(props) => props.theme.base.paddingSecondary}px ${(props) => props.theme.base.paddingTertiary}px;
	box-shadow: 0 -40px 40px 0 ${(props) => props.theme.colors.secondaryBackground};
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	transition: background-color 1s ease, box-shadow 1s ease, padding 0.4s ease;
	white-space: nowrap;
	position: absolute;
	overflow: hidden;
	font-size: 11pt;
	width: 100%;
	bottom: 0;
	left: 0;
`;

const ProfileImage = styled.div`
	border: 2px solid ${(props) => props.theme.colors.borderColor};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	background-position: 50%;
	background-size: cover;
	vertical-align: middle;
	float: left;
	width: 50px;
	height: 50px;
`;

const UserText = styled.div`
	width: calc(100% - ${(props) => props.theme.base.paddingPrimary}px - 50px);
	margin-left: ${(props) => props.theme.base.paddingPrimary}px;
	position: relative;
	height: 50px;
	display: inline-block;
	overflow: hidden;
	& * {
		position: absolute;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 0;
		left: 0;
	}
	& > #userName {
		color: ${(props) => props.theme.colors.primaryText};
		top: 5px;
	}
	& > #userKarma {
		color: ${(props) => props.theme.colors.secondaryText};
		bottom: 5px;
	}
`;

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();

	const multiReddits = useSelector((state: ReduxStateType) => state.sidebar.multiReddits);
	const subReddits = useSelector((state: ReduxStateType) => state.sidebar.subReddits);
	const userInfo = useSelector((state: ReduxStateType) => state.sidebar.userInfo);

	// fetching all user subs in batches of 25
	const getUserSubscribedSubreddits = (afterId: string = '') => {
		dispatch(GET_SUBREDDITS(afterId))
			.then(unwrapResult)
			.then((originalPromiseResult) => {
				if (originalPromiseResult.data.after) getUserSubscribedSubreddits(originalPromiseResult.data.after);
			});
	};

	React.useEffect(() => {
		dispatch(GET_USER_INFO());
		dispatch(GET_MULTIREDDITS());
		getUserSubscribedSubreddits();
	}, []);

	return (
		<SidebarContainer>
			<TitleContainer>
				<Link to="/">
					<NavHydrova />
				</Link>
				<NavTitle>Hydrova</NavTitle>
			</TitleContainer>

			<SidebarSearchWrapper>
				<Search />
				<SearchBar type="text" placeholder="Search" autoComplete="off" />
			</SidebarSearchWrapper>

			<Link to="/">
				<Button>
					<Home />
					Timeline
				</Button>
			</Link>

			<Link to="/post">
				<Button>
					<New />
					Post
				</Button>
			</Link>

			<Link to="/mail">
				<Button>
					<Mail />
					Mail
				</Button>
			</Link>

			<Link to="/settings/appearance/">
				<Button>
					<Settings />
					Settings
				</Button>
			</Link>

			<ScrollSection>
				<Section>Feeds</Section>
				<Link to="/r/all">
					<Button>All</Button>
				</Link>

				{multiReddits.map(({ display_name, icon_color, icon_img }, index) => (
					<Link key={index} to={`/m/${display_name}`}>
						<Button>
							<Icon
								style={!icon_img ? { backgroundColor: icon_color } : { backgroundImage: `url(${icon_img})` }}
							>
								{!icon_img && display_name[0].toUpperCase()}
							</Icon>
							{display_name}
						</Button>
					</Link>
				))}

				<Section>My Subreddits</Section>
				{subReddits.map(
					(subreddit, index) =>
						subreddit.subreddit_type !== 'user' && (
							<Link key={index} to={`/r/${subreddit.display_name}`}>
								<Button>
									<Icon
										style={
											!subreddit.icon_img
												? { backgroundColor: subreddit.icon_color }
												: { backgroundImage: `url(${subreddit.icon_img})` }
										}
									>
										{!subreddit.icon_img && subreddit.display_name[0].toUpperCase()}
									</Icon>
									{subreddit.display_name}
								</Button>
							</Link>
						)
				)}
			</ScrollSection>

			<UserDetails>
				<ProfileImage style={{ backgroundImage: `url(${userInfo.icon_img})` }} />
				<UserText>
					<p id="userName">{userInfo.name}</p>
					<p id="userKarma">{userInfo.total_karma} Karma</p>
				</UserText>
			</UserDetails>
		</SidebarContainer>
	);
};

export default Sidebar;

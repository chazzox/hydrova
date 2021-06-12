import React from 'react';
import copy from 'copy-to-clipboard';

import { Button } from '@components/Button';
import { Downvote, Upvote, Save, Placeholder, Comment } from '@assets/Icons';
import styled from 'styled-components';

const voteControls = ({ postContent: { likes, permalink, num_comments, ups, saved } }: { postContent: Post }) => {
	return (
		<VoteControlsCointainer>
			<VoteCointainer>
				<Button onClick={() => {}} isSelected={likes === true} isCompact={true}>
					<Upvote />
				</Button>
				<span>{ups + (likes === true ? 1 : likes === false ? -1 : 0)}</span>

				<Button onClick={() => {}} isSelected={likes === false} isCompact={true}>
					<Downvote />
				</Button>
			</VoteCointainer>
			<Button onClick={() => {}} isSelected={saved}>
				<Save />
				{saved ? 'Unsave' : 'Save'}
			</Button>
			<Button onClick={() => copy(`https://www.reddit.com${permalink}`)} isSelected={saved} isCompact={true}>
				<Placeholder />
				Share
			</Button>
			<Button
				onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
				isSelected={saved}
				isCompact={true}
			>
				<Comment />
				{num_comments}
			</Button>
		</VoteControlsCointainer>
	);
};

const VoteControlsCointainer = styled.div`
	color: ${(props) => props.theme.colors.primaryText};
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary};
	padding: ${(props) => props.theme.base.paddingPrimary};
	margin: ${(props) => props.theme.base.paddingPrimary};
	vertical-align: middle;
	&::-webkit-scrollbar {
		width: 0 !important;
		height: 0 !important;
	}
`;

const VoteCointainer = styled.div`
	display: inline-flex;
	margin-right: ${(props) => props.theme.base.paddingPrimary};
	height: 42px;
	padding: calc(${(props) => props.theme.base.paddingPrimary} / 2);
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary};
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	vertical-align: middle;
	button {
		padding: calc(${(props) => props.theme.base.paddingSecondary} - (${(props) => props.theme.base.paddingPrimary} / 2))
			8px;
	}
	span {
		margin: auto ${(props) => props.theme.base.paddingPrimary};
	}
`;

export default voteControls;

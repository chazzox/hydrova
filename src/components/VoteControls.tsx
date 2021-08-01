import React from 'react';
import copy from 'copy-to-clipboard';

import { CompactButton } from '@components/Button';
import { Downvote, Upvote, Save, Placeholder, Comment } from '@assets/Icons';
import styled from 'styled-components';

const voteControls = ({ postContent: { likes, permalink, num_comments, ups, saved } }: { postContent: Post }) => {
	return (
		<VoteControlsCointainer>
			<VoteCointainer>
				<CompactButton onClick={() => {}} isSelected={likes === true}>
					<Upvote />
				</CompactButton>
				<span>{ups + (likes === true ? 1 : likes === false ? -1 : 0)}</span>

				<CompactButton onClick={() => {}} isSelected={likes === false}>
					<Downvote />
				</CompactButton>
			</VoteCointainer>
			<CompactButton onClick={() => {}} isSelected={saved}>
				<Save />
				{saved ? 'Unsave' : 'Save'}
			</CompactButton>
			<CompactButton onClick={() => copy(`https://www.reddit.com${permalink}`)} isSelected={saved}>
				<Placeholder />
				Share
			</CompactButton>
			<CompactButton
				onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
				isSelected={saved}
			>
				<Comment />
				{num_comments}
			</CompactButton>
		</VoteControlsCointainer>
	);
};

const VoteControlsCointainer = styled.div`
	color: ${(props) => props.theme.colors.primaryText};
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	padding: ${(props) => props.theme.base.paddingPrimary}px;
	margin: ${(props) => props.theme.base.paddingPrimary}px;
	vertical-align: middle;
`;

const VoteCointainer = styled.div`
	display: inline-flex;
	margin-right: ${(props) => props.theme.base.paddingPrimary}px;
	height: 42px;
	padding: calc(${(props) => props.theme.base.paddingPrimary} / 2);
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	vertical-align: middle;
	button {
		padding: calc(
				${(props) => props.theme.base.paddingSecondary}px - (${(props) => props.theme.base.paddingPrimary}px / 2)
			)
			8px;
	}
	span {
		margin: auto ${(props) => props.theme.base.paddingPrimary}px;
	}
`;

export default voteControls;

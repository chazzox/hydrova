import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import timeSinceCurrent, { formatTimeSince } from '@utils/timeSinceCurrent';

const PostDetails = styled.p`
	color: ${(props) => props.theme.colors.tertiaryText};
	margin-bottom: ${(props) => props.theme.base.paddingPrimary}px;
	margin-top: 0;
	white-space: nowrap;
`;

const PostInfo = styled.div`
	color: ${(props) => props.theme.colors.primaryText};
	padding-right: ${(props) => props.theme.base.paddingPrimary}px;
	& * {
		visibility: visible;
		text-decoration: none;
	}
`;

const PostTitle = styled.h1<{ expanded?: boolean }>`
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5em;
	height: 3em;
	font-size: ${(props) => (props.expanded ? 14 : 11)}pt;
	font-weight: 400;
`;

const RoundedLink = styled(Link)`
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	padding-right: ${(props) => props.theme.base.paddingPrimary}px;
	padding-left: ${(props) => props.theme.base.paddingPrimary}px;
	color: ${(props) => props.theme.colors.secondaryText};
	border-radius: 100px;
	font-weight: 400;
	&:hover {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
		color: ${(props) => props.theme.colors.buttonTextColor};
	}
`;

interface Props {
	title: string;
	author: string;
	created_utc: number;
	subreddit_name_prefixed: string;
	expanded?: boolean;
}

const PostInformation: React.FC<Props> = ({ title, author, created_utc, subreddit_name_prefixed, expanded }) => (
	<PostInfo>
		<PostDetails>
			<RoundedLink to={'/u/' + author}>{author}</RoundedLink>
			<span>{formatTimeSince(timeSinceCurrent(created_utc))}</span>
			<RoundedLink to={'/' + subreddit_name_prefixed}>{subreddit_name_prefixed}</RoundedLink>
		</PostDetails>
		<PostTitle expanded={expanded}>
			{new DOMParser().parseFromString(title, 'text/html').documentElement.textContent}
		</PostTitle>
	</PostInfo>
);

export default PostInformation;

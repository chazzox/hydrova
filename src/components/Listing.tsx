import React from 'react';
import { navigate } from 'gatsby-link';
import { generatePath, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import styled from 'styled-components';

import { ReduxStateType } from '@redux/store';
import timeSinceCurrent, { formatTimeSince } from '@utils/timeSinceCurrent';
import { Markdown } from '@assets/Icons';
import { Main } from './DashBoard';
import PostInformation from './PostInfo';

interface ListingProps {
	idKeys: string[];
	fetchMore: (num1: number) => void;
}

export const Post = styled.div`
	max-height: calc(80px + ${(props) => props.theme.base.paddingSecondary}px * 2);
	min-height: calc(80px + ${(props) => props.theme.base.paddingSecondary}px * 2);
	border-bottom: solid ${(props) => props.theme.colors.borderColor};
	border-right-color: ${(props) => props.theme.colors.borderColor};
	border-left-color: ${(props) => props.theme.colors.borderColor};
	border-top-color: ${(props) => props.theme.colors.borderColor};
	padding: ${(props) => props.theme.base.paddingSecondary}px;
	color: ${(props) => props.theme.colors.primaryText};
	transition: padding 0.25s ease, border-radius 0.25s ease, margin 0.25s ease, max-height 0.3s ease, min-height 0.3s ease;
	justify-content: space-between;
	flex-direction: row;
	border-width: 2px;
	overflow: hidden;
	font-size: 11pt;
	display: flex;
	cursor: pointer;
`;

const Thumbnail = styled.img`
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	justify-self: right;
	min-width: 80px;
	min-height: 80px;
	max-height: 80px;
	max-width: 80px;
	object-fit: cover;
	visibility: visible;
`;

const Listing: React.FC<ListingProps> = ({ idKeys, fetchMore }) => {
	const postStore = useSelector((state: ReduxStateType) => state.listing.posts);

	return (
		<Virtuoso
			fixedItemHeight={102}
			// maybe replace with map function? performance testing would need to be done
			data={idKeys}
			// need to find way to fix this error in a clean manner
			itemContent={(_, postId) => <Item content={postStore[postId]} />}
			endReached={fetchMore}
			overscan={1000}
		/>
	);
};

const Item: React.FC<{ content: Post }> = ({ content }) => {
	const { listingType, listingName } = useParams<UrlParameters>();
	const { path } = useRouteMatch();

	return (
		<Post
			id={content.id}
			onClick={() => {
				navigate(
					'#' +
						generatePath(path, {
							listingType: listingType ?? 'r',
							listingName: listingName ?? content.subreddit,
							postId: content.id
						})
				);
			}}
		>
			<PostInformation
				title={content.title}
				author={content.author}
				created_utc={content.created_utc}
				subreddit_name_prefixed={content.subreddit_name_prefixed}
			/>

			{content.thumbnail && content.thumbnail.match(/(default)|(self)|(unknown)/) === null ? (
				<Thumbnail src={content.thumbnail} alt={`thumbnail for ${content.id}`} />
			) : (
				<Markdown />
			)}
		</Post>
	);
};

export default Listing;

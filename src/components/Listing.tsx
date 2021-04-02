import React from 'react';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import styled from 'styled-components';

import { ReduxStateType } from '@redux/store';
import timeSinceCurrent, { formatTimeSince } from '@utils/timeSinceCurrent';
import { Markdown } from '@assets/Icons';
import { Main } from './DashBoard';

interface ListingProps {
	idKeys: string[];
	fetchMore: (num1: number) => void;
}

const Post = styled.div`
	max-height: calc(80px + ${(props) => props.theme.base.paddingSecondary}px * 2);
	min-height: calc(80px + ${(props) => props.theme.base.paddingSecondary}px * 2);
	border-bottom: solid ${(props) => props.theme.colors.borderColor};
	border-right-color: ${(props) => props.theme.colors.borderColor};
	border-left-color: ${(props) => props.theme.colors.borderColor};
	padding: ${(props) => props.theme.base.paddingSecondary}px;
	border-top-color: ${(props) => props.theme.colors.borderColor};
	color: ${(props) => props.theme.colors.primaryText};
	transition: padding 0.25s ease, border-radius 0.25s ease, margin 0.25s ease, max-height 0.3s ease, min-height 0.3s ease;
	justify-content: space-between;
	flex-direction: row;
	border-width: 2px;
	overflow: hidden;
	font-size: 11pt;
	display: flex;
`;

const Listing: React.FC<ListingProps> = ({ idKeys, fetchMore }) => {
	const postStore = useSelector((state: ReduxStateType) => state.listing.posts);

	return (
		<Main>
			<Virtuoso
				fixedItemHeight={102}
				// maybe replace with map function? performance testing would need to be done
				data={idKeys}
				// need to find way to fix this error in a clean manner
				itemContent={(_, postId) => <Item content={postStore[postId]} />}
				endReached={fetchMore}
				overscan={1000}
			/>
		</Main>
	);
};

const Item: React.FC<{ content: Post }> = ({ content }) => {
	const { listingType, listingName } = useParams<UrlParameters>();
	const { path } = useRouteMatch();

	return (
		<Link
			to={generatePath(path, {
				listingType: listingType ?? 'r',
				listingName: listingName ?? content.subreddit,
				postId: content.id
			})}
		>
			<object>
				<Post id={content.id}>
					<div className="postInfo roundedLinks">
						<p>
							<Link to={'/u/' + content.author}>{content.author}</Link>
							<span>{formatTimeSince(timeSinceCurrent(content.created_utc))}</span>
							<Link to={'/' + content.subreddit_name_prefixed}>{content.subreddit_name_prefixed}</Link>
						</p>
						<h1 className="postTitle">
							{new DOMParser().parseFromString(content.title, 'text/html').documentElement.textContent}
						</h1>
					</div>
					<div className="data">
						{content.thumbnail && content.thumbnail.match(/(default)|(self)|(unknown)/) === null ? (
							<img src={content.thumbnail} alt={`thumbnail for ${content.id}`} />
						) : (
							<Markdown />
						)}
					</div>
				</Post>
			</object>
		</Link>
	);
};

export default Listing;

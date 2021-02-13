import React from 'react';
import { useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import SVGS from 'assets/exportSVG';

import Sorter from './sorter';
import { ReduxStateType } from 'reduxStore/reduxWrapper';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';

interface ListingProps {
	idKeys: string[];
	fetchMore: (num1: number) => void;
}

const Listing: React.FC<ListingProps> = ({ idKeys, fetchMore }) => {
	const postStore = useSelector((state: ReduxStateType) => state.post.posts);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					<Sorter isCommentSort={false} />
				</div>
				<Virtuoso
					style={{ display: 'flex' }}
					totalCount={idKeys.length}
					fixedItemHeight={102}
					data={idKeys}
					itemContent={(_, postId) => {
						const content = postStore[postId];
						return <>{content && <Item content={content} />}</>;
					}}
					endReached={fetchMore}
					overscan={1530}
				/>
			</div>
		</>
	);
};

interface RowProps {
	data: string[];
	index: number;
	style: React.CSSProperties;
}

const Item: React.FC<{ content: Post }> = ({ content }) => {
	const { listingType, listingName } = useParams<UrlParameters>();
	const { path } = useRouteMatch();

	return (
		<>
			<Link
				to={generatePath(path, {
					listingType: listingType ?? 'r',
					listingName: listingName ?? content.subreddit,
					postId: content.id
				})}
			>
				<object>
					<div id={content.id} className="post">
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
								SVGS['text_post']
							)}
						</div>
					</div>
				</object>
			</Link>
		</>
	);
};

export default Listing;

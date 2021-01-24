import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';
import Sorter from './sorter';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';

const Listing: React.FC<{ idKeys: string[]; endpoint: string }> = ({ idKeys, endpoint }) => {
	const dispatch = useDispatch<AppDispatch>();

	const isListingBeingFetched = useSelector<ReduxStateType, boolean>((state) => state.post.isFetchingListing);
	const listingAfterId = useSelector<ReduxStateType, string | undefined>(
		(state) => state.post.listingKey[endpoint]?.afterId
	);
	const itemCount = idKeys.length + 1;

	useEffect(() => console.log('idKeys'), [idKeys]);
	useEffect(() => console.log('isListingBeingFetched'), [isListingBeingFetched]);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					<Sorter isCommentSort={false} />
				</div>
				<div style={{ height: '100%' }}>
					<AutoSizer>
						{({ height, width }) => (
							<InfiniteLoader
								isItemLoaded={(index: number) => index < idKeys.length}
								itemCount={itemCount}
								loadMoreItems={() =>
									dispatch(
										GET_LISTING({
											listingEndpointName: endpoint,
											listingQueryParams: listingAfterId ? { afterId: listingAfterId } : undefined
										})
									)
								}
							>
								{({ onItemsRendered, ref }) => (
									<FixedSizeList
										itemCount={itemCount}
										onItemsRendered={onItemsRendered}
										ref={ref}
										height={height}
										width={width}
										itemSize={102}
									>
										{({ style, index }) => <Item style={style} id={idKeys[index]} />}
									</FixedSizeList>
								)}
							</InfiniteLoader>
						)}
					</AutoSizer>
				</div>
			</div>
		</>
	);
};

interface RowProps {
	id?: string;
	style: React.CSSProperties;
}

const Item: React.FC<RowProps> = ({ id = '', style }) => {
	const content = useSelector<ReduxStateType, Post>((state) => state.post.posts[id]?.postContent);
	const { path } = useRouteMatch();
	const { listingType, listingName } = useParams<UrlParameters>();

	return (
		<>
			{!id ? (
				<div id={id} style={style} className="post">
					loading
				</div>
			) : (
				<Link
					to={generatePath(path, {
						listingType: listingType ?? 'r',
						listingName: listingName ?? content.subreddit,
						postId: content.id
					})}
				>
					<object>
						<div id={id} style={style} className="post">
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
								{content.thumbnail && content.thumbnail.match(/(default)|(self)|(unknown)/) === null && (
									<img src={content.thumbnail} alt={`thumbnail for ${id}`} />
								)}
							</div>
						</div>
					</object>
				</Link>
			)}
		</>
	);
};

export default Listing;

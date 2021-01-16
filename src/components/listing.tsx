import React from 'react';
import { useSelector } from 'react-redux';
import { List, InfiniteLoader, AutoSizer, ListRowProps, IndexRange, Index } from 'react-virtualized';
import { ReduxStateType } from 'reduxStore/reduxWrapper';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';

import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';
import Sorter from 'components/sorter';

import 'styles/component/postComponent.scss';
import 'styles/component/listing.scss';

const Listing: React.FC<{ idKeys: string[]; fetchMore: (params: IndexRange) => Promise<any> }> = ({ idKeys, fetchMore }) => {
	const isListingBeingFetched = useSelector<ReduxStateType, boolean>((state) => state.post.isFetchingListing);

	const rowCount = idKeys.length + 1;
	const loadMoreRows = isListingBeingFetched ? () => {} : fetchMore;
	const isRowLoaded = ({ index }: Index) => index < idKeys.length;

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
								isRowLoaded={({ index }: Index) => index < idKeys.length}
								// @ts-expect-error
								loadMoreRows={loadMoreRows}
								rowCount={rowCount}
							>
								{({ onRowsRendered, registerChild }) => (
									<List
										ref={registerChild}
										onRowsRendered={onRowsRendered}
										rowRenderer={({ index, key, style }: ListRowProps) => (
											<Item key={key} id={idKeys[index]} style={style} />
										)}
										height={height}
										width={width}
										rowHeight={100}
										rowCount={rowCount}
									/>
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

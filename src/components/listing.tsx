import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import SVGS from 'assets/exportSVG';

import Sorter from './sorter';
import { ReduxStateType } from 'reduxStore/reduxWrapper';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';

interface ListingProps {
	idKeys: string[];
	fetchMore: (num1: number, num2: number) => Promise<any>;
}

const Listing: React.FC<ListingProps> = ({ idKeys, fetchMore }) => {
	const itemCount = idKeys.length + 1;

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
								isItemLoaded={(index) => index < idKeys.length}
								loadMoreItems={fetchMore}
								itemCount={itemCount}
							>
								{({ onItemsRendered, ref }) => (
									<FixedSizeList
										ref={ref}
										onItemsRendered={onItemsRendered}
										height={height}
										width={width}
										itemSize={100}
										itemCount={itemCount}
										itemData={idKeys}
									>
										{Item}
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
	data: string[];
	index: number;
	style: React.CSSProperties;
}

const Item: React.FC<RowProps> = ({ data, index, style }) => {
	const { listingType, listingName } = useParams<UrlParameters>();
	const { path } = useRouteMatch();

	const id = data[index];
	const content = useSelector<ReduxStateType, Post | undefined>((state) => state.post.posts[id]);

	return (
		<>
			{!content ? (
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
					style={style}
				>
					<object>
						<div id={id} className="post">
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
									<img src={content.thumbnail} alt={`thumbnail for ${id}`} />
								) : (
									SVGS['text_post']
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

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import { ReduxStateType } from 'reduxStore/reduxWrapper';
import GenericButton from './genericButton';
import { Link } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';

const Listing: React.FC<{ idKeys: string[]; fetchMore: () => void }> = ({ idKeys, fetchMore }) => {
	// we use the 'as const' part so that we can extract the values as the typings got it
	const sortOptions = ['best', 'hot', 'new', 'recent', 'rising'] as const;
	type sortOptionType = typeof sortOptions[number];
	const [sortType, setSortType] = useState<sortOptionType>('best');

	const isListingBeingFetched = useSelector<ReduxStateType, boolean>(state => state.post.isFetching);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					{
						// mapping the sort type array and creating buttons based on that
						sortOptions.map((sortTypeString: sortOptionType) => (
							<GenericButton
								key={sortTypeString}
								text={sortTypeString}
								isCompact={true}
								svgPath={sortTypeString}
								clickEvent={() => setSortType(sortTypeString)}
								isSelected={sortType == sortTypeString}
							/>
						))
					}
				</div>
				<div style={{ height: '100%' }}>
					<ExampleWrapper
						hasNextPage={true}
						items={idKeys}
						isNextPageLoading={isListingBeingFetched}
						loadNextPage={() => fetchMore()}
					/>
				</div>
			</div>
		</>
	);
};

const ExampleWrapper: React.FC<{
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: string[];
	loadNextPage: () => void;
}> = ({ hasNextPage, isNextPageLoading, items, loadNextPage }) => {
	const itemCount = hasNextPage ? items.length + 1 : items.length;
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
	const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

	return (
		<AutoSizer style={{ marginTop: '5px', paddingBottom: '5px' }}>
			{({ height, width }) => (
				<InfiniteLoader
					isItemLoaded={isItemLoaded}
					itemCount={itemCount}
					// @ts-expect-error
					loadMoreItems={loadMoreItems}
				>
					{({ onItemsRendered, ref }) => (
						<FixedSizeList
							itemCount={itemCount}
							onItemsRendered={onItemsRendered}
							ref={ref}
							height={height}
							width={width}
							itemSize={100}
						>
							{({ style, index }) => <Item style={style} id={items[index]} />}
						</FixedSizeList>
					)}
				</InfiniteLoader>
			)}
		</AutoSizer>
	);
};

interface RowProps {
	id?: string;
	style: React.CSSProperties;
}

const Item: React.FC<RowProps> = ({ id = '', style }) => {
	const content = useSelector<ReduxStateType, Post>(state => state.post.posts[id]?.postContent);

	return (
		<>
			{typeof content === 'string' ? (
				<div id={id} style={style} className="post">
					loading
				</div>
			) : (
				<div id={id} style={style} className="post">
					<div className="postInfo roundedLinks">
						<p>
							<Link to={'/user/' + content.author}>{content.author}</Link>
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
			)}
		</>
	);
};

export default Listing;

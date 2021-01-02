import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import { AppDispatch, ReduxStateType } from '../reduxStore/reduxWrapper';
import GenericButton from 'components/genericButton';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';
import 'styles/component/postComponent.scss';

interface RowProps extends post {
	style: React.CSSProperties;
	index: number;
}

const ListingRow: React.FC<RowProps> = ({
	style,
	id,
	author,
	title,
	subreddit_name_prefixed,
	thumbnail,
	created_utc
}: RowProps) => (
	<div id={id} style={style} className="post">
		<div className="postInfo roundedLinks">
			<p>
				<Link to={'/user/' + author}>{author}</Link>
				<span>{formatTimeSince(timeSinceCurrent(created_utc))}</span>
				<Link to={'/' + subreddit_name_prefixed}>{subreddit_name_prefixed}</Link>
			</p>
			<h1 className="postTitle">
				{new DOMParser().parseFromString(title, 'text/html').documentElement.textContent}
			</h1>
		</div>
		<div className="data">
			{thumbnail && thumbnail.match(/(default)|(self)|(unknown)/) === null && (
				<img src={thumbnail} alt={`thumbnail for ${id}`} />
			)}
		</div>
	</div>
);

interface listingProps {
	idKeys?: string[];
	name: string;
}

const Listing: React.FC<listingProps> = ({ idKeys = [], name }: listingProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const isFetching = useSelector<ReduxStateType, boolean>(state => state.post.isFetching);
	const after = useSelector<ReduxStateType, string>(state => state.post.subredditKeys[name]?.afterId);

	// we use the 'as const' part so that we can extract the values as the typings got it
	const sortOptions = ['best', 'hot', 'new', 'recent', 'rising'] as const;
	type sortOptionType = typeof sortOptions[number];
	// posts for this listing
	const postJSONArr = useSelector<ReduxStateType, post[]>(state =>
		idKeys.map(id => state.post.posts[id].postContent)
	);

	// sorting type variable
	const [sortType, setSortType] = useState<sortOptionType>('best');

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
				<AutoSizer style={{ marginTop: '50px' }}>
					{({ height, width }) => (
						<InfiniteLoader
							isItemLoaded={index => !isFetching || index < idKeys.length}
							itemCount={idKeys.length}
							loadMoreItems={(startIndex, stopIndex) => {
								console.log(startIndex, stopIndex);
								return new Promise<void>(resolve =>
									setTimeout(() => {
										for (let index = startIndex; index <= stopIndex; index++) {
											console.log(index);
										}
										resolve();
									}, 2500)
								);
							}}
							threshold={3}
						>
							{({ onItemsRendered, ref }) => (
								<FixedSizeList
									itemCount={postJSONArr.length + (isFetching ? 25 : 0)}
									onItemsRendered={onItemsRendered}
									ref={ref}
									height={height}
									itemSize={100}
									width={width}
									children={({ index, style }) => (
										<ListingRow key={index} index={index} style={style} {...postJSONArr[index]} />
									)}
								/>
							)}
						</InfiniteLoader>
					)}
				</AutoSizer>
			</div>
		</>
	);
};

export default Listing;

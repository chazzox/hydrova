import React, { useCallback, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import GenericButton from './genericButton';

const Listing = () => {
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		if (isNextPageLoading) {
			setTimeout(() => {
				setHasNextPage(items.length < 100);
				setIsNextPageLoading(false);
				setItems(items.concat(Array.from({ length: 20 }, (_, i) => (1 + i + items.length).toString())));
			}, 2500);
		}
	}, [isNextPageLoading]);

	const itemCount = hasNextPage ? items.length + 1 : items.length;
	const loadAdditionalItems = useCallback(() => {
		if (!isNextPageLoading) setIsNextPageLoading(true);
	}, [isNextPageLoading]);

	// we use the 'as const' part so that we can extract the values as the typings got it
	const sortOptions = ['best', 'hot', 'new', 'recent', 'rising'] as const;
	type sortOptionType = typeof sortOptions[number];
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
				<AutoSizer style={{ marginTop: '5px' }}>
					{({ height, width }) => (
						<InfiniteLoader
							isItemLoaded={(index: number) => !hasNextPage || index < items.length}
							itemCount={itemCount}
							// @ts-expect-error
							loadMoreItems={loadAdditionalItems}
						>
							{({ onItemsRendered, ref }) => (
								<FixedSizeList
									itemCount={itemCount}
									itemSize={100}
									onItemsRendered={onItemsRendered}
									ref={ref}
									height={height}
									width={width}
								>
									{({ index, style }) => <Item content={items[index]} style={style} />}
								</FixedSizeList>
							)}
						</InfiniteLoader>
					)}
				</AutoSizer>
			</div>
		</>
	);
};

interface RowProps {
	content?: string;
	style: React.CSSProperties;
}

const Item: React.FC<RowProps> = ({ content, style }) => {
	return <div style={style}>{!!content ? content : 'loading'}</div>;
};

export default Listing;

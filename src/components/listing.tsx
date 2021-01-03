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

	return (
		<>
			<div className="main">
				<ExampleWrapper
					hasNextPage={hasNextPage}
					isNextPageLoading={isNextPageLoading}
					items={items}
					loadNextPage={useCallback(() => setIsNextPageLoading(true), [])}
				/>
			</div>
		</>
	);
};

interface ExampleWrapperProps {
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: any[];
	loadNextPage: () => void;
}

const ExampleWrapper: React.FC<ExampleWrapperProps> = ({ hasNextPage, isNextPageLoading, items, loadNextPage }) => {
	const itemCount = hasNextPage ? items.length + 1 : items.length;
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
	const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

	interface RowProps {
		index: number;
		style: React.CSSProperties;
	}

	const Item: React.FC<RowProps> = ({ index, style }) => {
		let content;
		if (!isItemLoaded(index)) {
			content = 'Loading...';
		} else {
			content = items[index];
		}

		return <div style={style}>{content}</div>;
	};

	return (
		<AutoSizer style={{ marginTop: '5px' }}>
			{({ height, width }) => (
				// @ts-expect-error
				<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
					{({ onItemsRendered, ref }) => (
						<FixedSizeList
							itemCount={itemCount}
							itemSize={100}
							onItemsRendered={onItemsRendered}
							ref={ref}
							height={height}
							width={width}
						>
							{Item}
						</FixedSizeList>
					)}
				</InfiniteLoader>
			)}
		</AutoSizer>
	);
};

export default Listing;

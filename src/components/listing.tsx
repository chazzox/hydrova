import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import GenericButton from './genericButton';

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {} as { [key: number]: 1 | 2 };

const isItemLoaded = (index: number) => !!itemStatusMap[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
	for (let index = startIndex; index <= stopIndex; index++) {
		itemStatusMap[index] = LOADING;
	}
	return new Promise(resolve =>
		setTimeout(() => {
			for (let index = startIndex; index <= stopIndex; index++) {
				itemStatusMap[index] = LOADED;
			}
			resolve();
		}, 2500)
	);
};

const Row: React.FC<{ index: number; style: React.CSSProperties; data: any }> = ({ index, style, data }) => {
	useEffect(() => console.log(data), []);
	let label;
	if (itemStatusMap[index] === LOADED) {
		label = `Row ${index}`;
	} else {
		label = 'Loading...';
	}
	return (
		<div className="ListItem" style={style}>
			{label}
		</div>
	);
};

const Listing = () => {
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
						<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={1000} loadMoreItems={loadMoreItems}>
							{({ onItemsRendered, ref }) => (
								<FixedSizeList
									itemCount={1000}
									itemSize={100}
									onItemsRendered={onItemsRendered}
									ref={ref}
									height={height}
									width={width}
								>
									{({ index, style, data }) => <Row data={data} index={index} style={style} />}
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

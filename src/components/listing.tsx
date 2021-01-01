import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import GenericButton from 'components/genericButton';
import { AppDispatch, ReduxStateType } from '../reduxStore/reduxWrapper';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/listing.scss';
import 'styles/component/postComponent.scss';
import { Link } from 'react-router-dom';

interface RowProps extends ListChildComponentProps, post {}

const Row: React.FC<RowProps> = ({
	style,
	id,
	author,
	title,
	subreddit_name_prefixed,
	thumbnail,
	created_utc
}: RowProps) => (
	<div key={id} id={id} style={style} className="post">
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

const Listing = ({ postIDArr = [] }: { postIDArr?: string[] }) => {
	const dispatch: AppDispatch = useDispatch();

	// we use the 'as const' part so that we can extract the values as the typings got it
	const sortTypes = ['best', 'hot', 'new', 'recent', 'rising'] as const;

	// posts for this listing
	const postJSONArr = useSelector((state: ReduxStateType) =>
		postIDArr.map(postId => state.post.posts[postId].postContent)
	);

	// variables for fetching new when near bottom of view area

	// sorting type variable
	const [sortType, setSortType] = useState('');

	// ref used for calculating the % of way through listing scroll area

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					{sortTypes.map((sortTypeString: typeof sortTypes[number]) => (
						<GenericButton
							text={sortTypeString}
							isCompact={true}
							svgPath={sortTypeString}
							clickEvent={() => setSortType(sortTypeString)}
							isSelected={sortType == sortTypeString}
						/>
					))}
				</div>
				<AutoSizer style={{ marginTop: '50px' }}>
					{({ height, width }) => (
						<List
							className="List"
							height={height}
							itemCount={postJSONArr.length}
							itemSize={100}
							width={width}
							children={({ index, style }) => <Row index={index} style={style} {...postJSONArr[index]} />}
						/>
					)}
				</AutoSizer>
			</div>
		</>
	);
};

export default Listing;

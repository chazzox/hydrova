import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';
import { AppDispatch, ReduxStateType } from '../reduxStore/reduxWrapper';

import GenericButton from 'components/genericButton';
import PostComponent from 'components/postComponent';

import 'styles/component/listing.scss';

const Listing = ({
	postIDArr = [],
	postClickEvent,
	subKey
}: {
	postIDArr?: string[];
	postClickEvent: (postId: string) => void;
	subKey: string;
}) => {
	const dispatch: AppDispatch = useDispatch();

	// posts for this listing
	const postJSONArr = useSelector((state: ReduxStateType) =>
		postIDArr.map(postId => state.post.posts[postId].postContent)
	);

	// variables for fetching new when near bottom of view area
	// const currentAfter = useSelector((state: ReduxStateType) => state.post.listingKeys[subKey]?.afterId);
	// const isFetchingNew = useSelector((state: ReduxStateType) => state.post.listingKeys[subKey]?.isFetching);
	// const [inScrollArea, setInScrollArea] = useState(false);

	// sorting type variable
	const [sortType, setSortType] = useState('');

	// ref used for calculating the % of way through listing scroll area
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					<GenericButton text="Best" isCompact={true} svgPath="best" clickEvent={() => setSortType('best')} />
					<GenericButton text="Hot" isCompact={true} svgPath="hot" clickEvent={() => setSortType('hot')} />
					<GenericButton
						text="New"
						isCompact={true}
						svgPath="recent"
						clickEvent={() => setSortType('recent')}
					/>
					<GenericButton text="Top" isCompact={true} svgPath="top" clickEvent={() => setSortType('recent')} />
					<GenericButton
						text="Rising"
						isCompact={true}
						svgPath="rising"
						clickEvent={() => setSortType('rising')}
					/>
				</div>
				<div className="contentContainer" style={{ paddingTop: '30px' }} ref={containerRef}>
					{postJSONArr.map((post, index) => (
						<Link
							key={index}
							id={post.id}
							to={{ pathname: '/' + post.id }}
							onClick={() => postClickEvent(post.id)}
						>
							{/* <object> is needed for the site to allow nested <a> tags */}
							<object>
								<PostComponent isSmall={true} postContent={post} />
							</object>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Listing;

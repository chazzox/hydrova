import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_LISTING } from '../../redux/postStore/postThunks';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';

import GenericButton from '../buttons/genericButton';
import PostComponent from '../postComponent/postComponent';

import './listing.scss';

const Listing = ({
	postData = [],
	postClickEvent,
	subKey
}: {
	postData?: string[];
	postClickEvent: (postId: string) => void;
	subKey: string;
}) => {
	const dispatch: AppDispatch = useDispatch();
	const posts = useSelector((state: ReduxStateType) => postData.map(postId => state.post.posts[postId].postContent));
	const isFetchingNew = useSelector((state: ReduxStateType) => {
		return state.post.subredditKeys[subKey]?.isFetching;
	});
	const currentAfter = useSelector((state: ReduxStateType) => state.post.subredditKeys[subKey]?.afterId);

	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					<GenericButton text="Best" isCompact={true} svgPath="best" />
					<GenericButton text="Hot" isCompact={true} svgPath="hot" />
					<GenericButton text="New" isCompact={true} svgPath="recent" />
					<GenericButton text="Top" isCompact={true} svgPath="top" />
					<GenericButton text="Rising" isCompact={true} svgPath="rising" />
				</div>
				<div
					className="contentContainer"
					style={{ paddingTop: '30px' }}
					onScroll={() => {
						if (
							!isFetchingNew &&
							containerRef.current &&
							(containerRef.current.scrollTop / containerRef.current.scrollHeight) * 100 > 60
						)
							dispatch(GET_LISTING({ urlSuffix1: subKey, urlSuffix2: `?afterId=${currentAfter}` }));
					}}
					ref={containerRef}
				>
					{posts.map((post, index) => (
						<Link
							key={index}
							id={post.id}
							to={{ pathname: '/' + post.id }}
							onClick={() => postClickEvent(post.id)}
						>
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

const PostCompact = () => {};

export default Listing;

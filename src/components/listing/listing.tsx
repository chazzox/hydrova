import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setClickedPostID } from '../../redux/listingReducer';

import PostComponent from '../postComponent/postComponent';
import VoteControls from '../voteControls/voteControls';

const Listing = ({ postData }: { postData: string[] }) => {
	const location = useLocation();

	const dispatch: AppDispatch = useDispatch();
	const posts = useSelector((state: ReduxStateType) => state.post.posts);

	const [currentTop, setCurrentTop] = useState<Element | null>(null);
	const [initialLoadComplete, setInitialLoadComplete] = useState(false);

	const postContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => setCurrentTop(postContainerRef.current?.children[0] || null), [
		postContainerRef.current?.children
	]);
	const selectTopPost = () => {
		Array.from(postContainerRef.current?.children || []).forEach(postNode => {
			if (postNode.getBoundingClientRect().top == 0) {
				setCurrentTop(postNode);
			}
		});
	};

	return (
		<>
			{currentTop ? (
				<VoteControls postContent={posts[currentTop?.id].postContent} />
			) : (
				<div className="voteControls" />
			)}
			<div id="contentContainer" className="home" onScroll={selectTopPost}>
				<span ref={postContainerRef}>
					{postData.map((postId, index) => {
						const post = posts[postId].postContent;
						return (
							<Link
								key={index}
								id={post.id}
								onClick={() => dispatch(setClickedPostID(post.id))}
								to={{ pathname: '/post/' + post.id, state: { post: post } }}
								className="expanded"
							>
								<object>
									<PostComponent postContent={post} />
								</object>
							</Link>
						);
					})}
				</span>
			</div>
		</>
	);
};

export default Listing;

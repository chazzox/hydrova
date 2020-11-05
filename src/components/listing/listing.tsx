import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setClickedPostID } from '../../redux/listingReducer';

import PostComponent from '../postComponent/postComponent';
import VoteControls from '../voteControls/voteControls';

const Listing = ({ postData }: { postData: string[] }) => {
	// redux
	const dispatch: AppDispatch = useDispatch();
	const posts = useSelector((state: ReduxStateType) => state.post.posts);
	const isDynamic = useSelector((state: ReduxStateType) => state.style.dynamicExpand);

	// component state
	const [currentTop, setCurrentTop] = useState<Element | null>(null);
	const postContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => setCurrentTop(postContainerRef.current?.children[0] || null), [
		postContainerRef.current?.children
	]);

	useEffect(() => {
		if (currentTop && isDynamic) currentTop.classList.add('expanded');
	}, [currentTop]);

	const selectTopPost = () => {
		if (currentTop?.getBoundingClientRect().top !== 0 && isDynamic) {
			currentTop?.classList.remove('expanded');
		}
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
								className={isDynamic ? undefined : 'expanded'}
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

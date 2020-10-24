import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setClickedPostID } from '../../redux/timelineReducer';

import PostComponent from '../postComponent/postComponent';
import VoteControls from '../voteControls/voteControls';

const Listing = ({ postData }: { postData: string[] }) => {
	const dispatch: AppDispatch = useDispatch();
	const postContainerRef = useRef<HTMLDivElement>(null);
	const [currentTop, setCurrentTop] = useState<Element | null>(null);
	const posts = useSelector((state: ReduxStateType) => state.post.posts);
	useEffect(() => {
		selectTopPost();
	});
	useEffect(() => {
		if (currentTop) currentTop.classList.add('expanded');
	}, [currentTop]);
	const selectTopPost = () => {
		if (currentTop?.getBoundingClientRect().top !== 0) {
			currentTop?.classList.remove('expanded');
		}
		Array.from(postContainerRef.current?.children || []).forEach(postNode => {
			if (postNode.getBoundingClientRect().top == 0) {
				if (currentTop !== postNode) currentTop?.classList.remove('expanded');
				setCurrentTop(postNode);
			}
		});
	};

	return (
		<div id="contentContainer" className="home" onScroll={selectTopPost}>
			{currentTop ? <VoteControls postContent={posts[currentTop?.id].postContent} /> : null}
			<span ref={postContainerRef}>
				{postData.map((postId, index) => {
					const post = posts[postId].postContent;
					return (
						<Link
							key={index}
							id={post.id}
							onClick={() => dispatch(setClickedPostID(post.id))}
							to={{ pathname: '/post/' + post.id, state: { post: post } }}
						>
							<object>
								<PostComponent postContent={post} />
							</object>
						</Link>
					);
				})}
			</span>
		</div>
	);
};

export default Listing;

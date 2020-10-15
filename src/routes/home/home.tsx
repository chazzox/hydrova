import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { setAfterID, setClickedPostID } from '../../redux/timelineReducer';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_TIMELINE } from '../../redux/postReducer';

import PostComponent from '../../components/postComponent/postComponent';
import VoteControls from '../../components/voteControls/voteControls';

import './home.scss';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();

	const timeline = useSelector((state: ReduxStateType) => state.post.timelineArr);
	const posts = useSelector((state: ReduxStateType) => state.post.posts);
	const lastPostID = useSelector((state: ReduxStateType) => state.timeline.lastPostID);
	const lastPostRoute = useSelector((state: ReduxStateType) => state.timeline.beforeNav);
	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

	const postContainerRef = useRef<HTMLDivElement>(null);

	const getTimeline = (afterId: string, total: number) => {
		dispatch(GET_TIMELINE({ access_token: access_token, afterId: afterId }))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				total += originalPromiseResult.data.dist;
				if (total < 75) {
					getTimeline(originalPromiseResult.data.after, total);
				} else {
					dispatch(setAfterID(originalPromiseResult.data.after));
					return;
				}
			});
	};

	// function is run on first mount
	useEffect(() => {
		if (lastPostRoute) document.getElementById(lastPostRoute)?.scrollIntoView();
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getTimeline(lastPostID, timeline.length);
		// the returned function is ran when the component is un-mounted
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);

	const [currentTop, setCurrentTop] = useState<Element | null>(null);

	useEffect(() => {
		if (currentTop) currentTop.classList.add('top');
	}, [currentTop]);

	// scrolling
	const selectTopPost = () => {
		Array.from(postContainerRef.current?.children || []).forEach(postWrapperNode => {
			if (postWrapperNode.getBoundingClientRect().top == 0) {
				setCurrentTop(postWrapperNode);
			}
		});
	};

	return (
		<div id="contentContainer" onScroll={selectTopPost} ref={postContainerRef}>
			{timeline.map((id, index) => {
				const postContent = posts[id].postContent;
				return (
					<div key={index} id={postContent.id}>
						<VoteControls postContent={postContent} />
						<Link
							onClick={() => dispatch(setClickedPostID(postContent.id))}
							to={{ pathname: '/post/' + postContent.id, state: { post: postContent } }}
						>
							<PostComponent postContent={postContent} />
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Home;

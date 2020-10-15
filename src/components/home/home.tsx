import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { setAfterID, setClickedPostID } from '../../redux/timelineReducer';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { SAVE, VOTE, GET_TIMELINE } from '../../redux/postReducer';
import RenderPostContent from '../../utils/renderPostContent';

import './home.scss';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();

	const timeline = useSelector((state: ReduxStateType) => state.post.timelineArr);
	const posts = useSelector((state: ReduxStateType) => state.post.posts);
	const lastPostID = useSelector((state: ReduxStateType) => state.timeline.lastPostID);
	const lastPostRoute = useSelector((state: ReduxStateType) => state.timeline.beforeNav);
	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

	const postContainerRef = useRef<HTMLDivElement>(null);

	const [voteDirection, setVoteDirection] = useState<-1 | 0 | 1>(0);
	const [isPostSaved, setIsPostSaved] = useState(false);

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
				const listingPost = posts[id].postContent;
				return (
					<div key={index} className="postWrapper">
						<div className="postControls">
							<div className="votesContainer">
								<button
									onClick={() => {
										dispatch(
											VOTE({
												access_token: access_token,
												fullName: listingPost.name,
												voteDirection: 1
											})
										);
									}}
									className={listingPost.likes === true ? 'selected' : ''}
								>
									⬆️
								</button>
								<p>{listingPost.ups + voteDirection}</p>
								<button
									onClick={() => {
										dispatch(
											VOTE({
												access_token: access_token,
												fullName: listingPost.name,
												voteDirection: -1
											})
										);
									}}
									className={listingPost.likes === false ? 'selected' : ''}
								>
									⬇️
								</button>
							</div>
							<button
								onClick={() => {
									dispatch(
										SAVE({
											access_token: access_token,
											fullName: listingPost.name,
											isSaving: !isPostSaved
										})
									);
									setIsPostSaved(!isPostSaved);
								}}
								className={isPostSaved ? 'selected' : ''}
							>
								save
							</button>
							<button onClick={() => copy(`https://www.reddit.com/${listingPost.permalink}`)}>
								share
							</button>
							<button>💬{listingPost.num_comments}</button>
						</div>
						<Link
							id={listingPost.id}
							key={index}
							onClick={() => dispatch(setClickedPostID(listingPost.id))}
							to={{ pathname: '/post/' + listingPost.id, state: { post: listingPost } }}
						>
							<div id={listingPost.id} className={listingPost.post_hint + ' post'}>
								<div className="postInfo">
									<h1 className="postTitle">{listingPost.title}</h1>
									<p>
										{listingPost.subreddit_name_prefixed} | u/{listingPost.author} |
										posted {formatTimeSince(timeSinceCurrent(listingPost.created))}
									</p>
								</div>
								<RenderPostContent post={listingPost} />
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Home;

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { SAVE, VOTE, GET_TIMELINE } from '../../redux/postReducer';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setAfterID, setClickedPostID } from '../../redux/timelineReducer';
import RenderPostContent from '../../utils/renderPostContent';

import './home.scss';
import timeSinceCurrent from '../../utils/timeSinceCurrent';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: ReduxStateType) => state.post.timelineArr);
	const posts = useSelector((state: ReduxStateType) => state.post.posts);
	const lastPostID = useSelector((state: ReduxStateType) => state.timeline.lastPostID);
	const lastPostRoute = useSelector((state: ReduxStateType) => state.timeline.beforeNav);
	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

	const timelineContainerDivRef = useRef<HTMLDivElement>(null);
	let postDomArray = Array.from(timelineContainerDivRef.current?.children || []);

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
					calcNewClasses();
					return;
				}
			});
	};

	// function is run on first mount
	useEffect(() => {
		if (lastPostRoute) document.getElementById(lastPostRoute)?.scrollIntoView();
		window.addEventListener('scroll', calcNewClasses, false);
		postDomArray = Array.from(timelineContainerDivRef.current?.children || []);
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getTimeline(lastPostID, timeline.length);
		// the returned function is ran when the component is un-mounted
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);

	// this will reselect the post elements when new posts are fetched
	useEffect(() => {
		postDomArray = Array.from(timelineContainerDivRef.current?.children || []);
		calcNewClasses();
	}, [timeline]);

	// to be improved
	const calcNewClasses = () => {
		if (postDomArray.length > 0) {
			const closestToNum: number = -100;
			// defo can be done in 1 line, just need to do more research
			// creating an array of the bounding rect for each element in the post container div
			const rectArray = postDomArray.map(element => {
				// @ts-ignore
				return element.getBoundingClientRect().top;
			});
			// returning the value of the react array which is closest to 0
			const closestTo = rectArray.reduce((a, b) =>
				Math.abs(b + closestToNum) < Math.abs(a + closestToNum) ? b : a
			);
			// removing all classed that have top in them
			postDomArray.forEach(element => element.classList.remove('top'));
			const closestToTopDom = postDomArray[rectArray.indexOf(closestTo)];
			// adding the top class to the one that has the closest array
			closestToTopDom.classList.add('top');
			Array.from(document.getElementsByClassName('top')).map(el => {
				if (el !== closestToTopDom) el.classList.remove('top');
			});
		}
	};

	return (
		<div ref={timelineContainerDivRef} id="contentContainer" onScroll={calcNewClasses}>
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
										setVoteDirection(voteDirection === 1 ? 0 : 1);
									}}
									className={voteDirection === 1 ? 'selected' : ''}
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
										setVoteDirection(voteDirection === -1 ? 0 : -1);
									}}
									className={voteDirection === -1 ? 'selected' : ''}
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
										posted {timeSinceCurrent(listingPost.created)}
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

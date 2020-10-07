import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { GET_TIMELINE, setLastPost, setBeforeNav } from '../../redux/timelineReducer';
import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import GenPost from '../../utils/renderPost';

import './home.scss';

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: RootState) => state.timeline.timelineArr);
	const lastPostID = useSelector((state: RootState) => state.timeline.lastPostID);
	const lastClicked = useSelector((state: RootState) => state.timeline.beforeNav);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	const postContainerRef = useRef<HTMLDivElement>(null);
	let postDomArray = Array.from(postContainerRef.current?.children || []);

	// this function is very jank, i need to clean it up in a future update, even tho i tell it to not fetch over 100 posts, it manages to yoink 150
	// probably some async bullshitery
	const getSubs = (afterId: string, total: number) => {
		dispatch(GET_TIMELINE({ access_token: access_token, afterId: afterId }))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				total += originalPromiseResult.data.dist;
				if (total < 25) {
					getSubs(originalPromiseResult.data.after, total);
				} else {
					dispatch(setLastPost(originalPromiseResult.data.after));
					calcNewClasses();
					return;
				}
			});
	};

	// function is run on first mount
	useEffect(() => {
		if (lastClicked) document.getElementById(lastClicked)?.scrollIntoView();
		window.addEventListener('scroll', calcNewClasses, false);
		postDomArray = Array.from(postContainerRef.current?.children || []);
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getSubs(lastPostID, timeline.length);
		// the returned function is ran when the component is un-mounted
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);

	// this will reselect the post elements when new posts are fetched
	useEffect(() => {
		postDomArray = Array.from(postContainerRef.current?.children || []);
		calcNewClasses();
	}, [timeline]);

	// to be improved
	const calcNewClasses = () => {
		// if (postDomArray.length > 0) {
		// 	const closestToNum: number = 0;
		// 	// defo can be done in 1 line, just need to do more research
		// 	// creating an array of the bounding rect for each element in the post container div
		// 	const rectArray = postDomArray.map(element => {
		// 		return element.getBoundingClientRect().top;
		// 	});
		// 	// returning the value of the react array which is closest to 0
		// 	const closestTo = rectArray.reduce((a, b) => (Math.abs(b + closestToNum) < Math.abs(a + closestToNum) ? b : a));
		// 	// removing all classed that have top in them
		// 	postDomArray.forEach(element => element.classList.remove('top'));
		// 	const closestToTopDom = postDomArray[rectArray.indexOf(closestTo)];
		// 	// adding the top class to the one that has the closest array
		// 	closestToTopDom.classList.add('top');
		// 	Array.from(document.getElementsByClassName('top')).map(el => {
		// 		if (el !== closestToTopDom) el.classList.remove('top');
		// 	});
		// }
	};

	return (
		<div ref={postContainerRef} id="contentContainer" onScroll={calcNewClasses}>
			{timeline.map((listingPost, index) => (
				<Link
					id={listingPost.id}
					key={index}
					onClick={() => dispatch(setBeforeNav(listingPost.id))}
					to={{ pathname: '/post/' + listingPost.id, state: { post: listingPost } }}
				>
					<GenPost post={listingPost} />
				</Link>
			))}
		</div>
	);
}

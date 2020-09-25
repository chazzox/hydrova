import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { GET_TIMELINE, setLastPost } from '../../redux/timelineReducer';
import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import genPost from '../../utils/renderPost';
import './home.scss';
import _ from 'lodash';

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: RootState) => state.timeline.timelineArr);
	const lastPostID = useSelector((state: RootState) => state.timeline.lastPostID);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	const postContainerRef = useRef<HTMLDivElement>(null);
	let postDomArray = Array.from(postContainerRef.current?.children || []);

	// this function is very jank, i need to clean it up in a future update, even tho i tell it to not fetch over 100 posts, it manages to yoink 150
	// probably some async bullshitery
	const getSubs = (afterId: string, total: number = 0) => {
		dispatch(GET_TIMELINE({ access_token: access_token, afterId: afterId }))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				if (total <= 100) {
					getSubs(originalPromiseResult.data.after, (total += originalPromiseResult.data.children.length));
					calcNewClasses();
				} else {
					dispatch(setLastPost(originalPromiseResult.data.after));
				}
			});
	};

	// function is run on first mount
	useEffect(() => {
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getSubs(lastPostID, timeline.length);
		window.addEventListener('scroll', calcNewClasses);
		// the returned function is ran when the component is un-mounted
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);

	// this will reselect the post elements when new posts are fetched
	useEffect(() => {
		postDomArray = Array.from(postContainerRef.current?.children || []);
	}, [timeline]);

	// to be improved
	const calcNewClasses = () => {
		if (!_.isEmpty(postDomArray)) {
			const closestTo: number = 0;
			// defo can be done in 1 line, just need to do more research
			// creating an array of the bounding rect for each element in the post container div
			const rectArray = postDomArray.map(element => {
				return element.getBoundingClientRect().top;
			});
			// returning the value of the react array which is closest to 0
			const test2 = rectArray.reduce((a, b) => (Math.abs(b + closestTo) < Math.abs(a + closestTo) ? b : a));
			// removing all classed that have top in them
			postDomArray.forEach(element => element.classList.remove('top'));
			// adding the top class to the one that has the closest array
			postDomArray[rectArray.indexOf(test2)].classList.add('top');
		}
	};

	return (
		<>
			<h1>test</h1>
			<div ref={postContainerRef} id="contentContainer">
				{timeline.map((listingPost, index) => genPost(listingPost, index))}
			</div>
		</>
	);
}

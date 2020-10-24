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
import Listing from '../../components/listing/listing';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();

	const timeline = useSelector((state: ReduxStateType) => state.post.timelineArr);
	const lastPostID = useSelector((state: ReduxStateType) => state.timeline.lastPostID);
	const lastPostRoute = useSelector((state: ReduxStateType) => state.timeline.beforeNav);

	const getTimeline = (afterId: string, total: number) => {
		dispatch(GET_TIMELINE(afterId))
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

	return (
		<>
			<Listing postData={timeline} />
		</>
	);
};

export default Home;

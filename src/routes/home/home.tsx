import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GET_TIMELINE } from '../../redux/postStore/postThunks';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import Listing from '../../components/listing/listing';

import './home.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import { setAfterID } from '../../redux/timelineReducer';

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
	useEffect(() => {
		if (lastPostRoute) document.getElementById(lastPostRoute)?.scrollIntoView();
		getTimeline(lastPostID, timeline.length);
		document.getElementById('navTimeline')?.classList.toggle('selected');
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

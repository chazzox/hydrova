import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ReduxStateType } from '../../redux/reduxWrapper';
import Listing from '../../components/listing/listing';

import './home.scss';

const Home = () => {
	const timeline = useSelector((state: ReduxStateType) => state.post.timelineArr);
	const lastPostRoute = useSelector((state: ReduxStateType) => state.timeline.beforeNav);

	useEffect(() => {
		if (lastPostRoute) document.getElementById(lastPostRoute)?.scrollIntoView();
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

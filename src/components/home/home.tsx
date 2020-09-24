import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import { GET_TIMELINE } from '../../redux/timelineReducer';
import genPost from '../../utils/renderPost';

// import timeline from './timeline';
import './home.scss';

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: RootState) => state.timeline.timelineArr);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	const getSubs = (afterId: string = '', total: number = 0) => {
		dispatch(GET_TIMELINE({ access_token: access_token, afterId: afterId }))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				if (total <= 100)
					getSubs(originalPromiseResult.data.after, (total += originalPromiseResult.data.children.length));
			});
	};

	useEffect(() => {
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getSubs('', timeline.length);
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);
	return <div id="contentContainer">{timeline.map((listingPost, index) => genPost(listingPost, index))}</div>;
}

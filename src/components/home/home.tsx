import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { GET_TIMELINE, setLastPost } from '../../redux/timelineReducer';
import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import genPost from '../../utils/renderPost';
import './home.scss';

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: RootState) => state.timeline.timelineArr);
	const lastPostID = useSelector((state: RootState) => state.timeline.lastPostID);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	const getSubs = (afterId: string, total: number = 0) => {
		dispatch(GET_TIMELINE({ access_token: access_token, afterId: afterId }))
			.then(unwrapResult)
			.then(originalPromiseResult => {
				if (total <= 100)
					getSubs(originalPromiseResult.data.after, (total += originalPromiseResult.data.children.length));
				else dispatch(setLastPost(originalPromiseResult.data.after));
			});
	};

	useEffect(() => {
		document.getElementById('navTimeline')?.classList.toggle('selected');
		getSubs(lastPostID, timeline.length);
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	}, []);
	return <div id="contentContainer">{timeline.map((listingPost, index) => genPost(listingPost, index))}</div>;
}

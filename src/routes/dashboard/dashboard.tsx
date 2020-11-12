import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_LISTING, GET_SUBREDDIT_ABOUT } from '../../redux/postStore/postThunks';
import { SET_SIZE_MODE } from '../../redux/sidebar/sidebarReducer';

import Listing from '../../components/listing/listing';
import Post from '../../components/post/post';
import SubredditInfoBar from '../../components/subredditInfoBar/subredditInfoBar';

const Dashboard = ({
	navProps: { match, location }
}: {
	navProps: RouteComponentProps<{ postId?: string; subName?: string }>;
}) => {
	const dispatch: AppDispatch = useDispatch();

	const [listingName, setListingName] = useState('');
	const [postInView, setPostInView] = useState('');

	const listingPointerArray = useSelector((state: ReduxStateType) => state.post.subredditKeys[listingName]?.postKeys);
	const subredditInfoBar = useSelector((state: ReduxStateType) => state.post.subredditKeys[listingName]?.sidebar);

	useEffect(() => {
		if (match.path === '/') {
			setListingName(match.path);
		} else if (match.path === '/:postId') {
			setPostInView(match.params.postId || '');
		} else if (match.path === '/r/:subName') {
			setListingName(`/r/${match.params.subName}`);
		} else if (match.path === '/r/:subName/:postId') {
			setPostInView(match.params.postId || '');
			setListingName(`/r/${match.params.subName}`);
		}
	}, [match, location]);

	useEffect(() => {
		dispatch(GET_LISTING(listingName));
		if (listingName.includes('/r/')) dispatch(GET_SUBREDDIT_ABOUT(listingName));
	}, [listingName]);

	return (
		<>
			{subredditInfoBar ? <SubredditInfoBar infoBar={subredditInfoBar} /> : null}
			<Listing postData={listingPointerArray} postClickEvent={setPostInView} />
			<Post id={postInView || (listingPointerArray || [])[0]} />
		</>
	);
};

export default Dashboard;

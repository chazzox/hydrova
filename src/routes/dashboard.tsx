import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING, GET_SUBREDDIT_ABOUT } from 'reduxStore/postStore/postThunks';
import { SET_SIZE_MODE } from 'reduxStore/sidebar/sidebarReducer';

import Listing from 'components/listing';
import Post from 'components/post';
import SubredditInfoBar from 'components/subredditInfoBar';

const Dashboard = ({
	navProps: { match, location }
}: {
	navProps: RouteComponentProps<{ postId?: string; subName?: string; userId?: string }>;
}) => {
	const dispatch: AppDispatch = useDispatch();

	const [listingName, setListingName] = useState('');
	const [postInView, setPostInView] = useState('');

	const listingPointerArray = useSelector((state: ReduxStateType) => state.post.listingKeys[listingName]?.postKeys);
	const subredditInfoBar = useSelector((state: ReduxStateType) => state.post.listingKeys[listingName]?.sidebar);

	useEffect(() => {
		switch (match.path) {
			case '/':
				setListingName('/');
				break;
			case '/:postId':
				setPostInView(match.params.postId || '');
				break;
			case '/r/:subName':
				SET_SIZE_MODE(true);
				setListingName(`/r/${match.params.subName}`);
				break;
			case '/r/:subName/:postId':
				SET_SIZE_MODE(true);
				setPostInView(match.params.postId || '');
				setListingName(`/r/${match.params.subName}`);
				break;
			case '/user/:userId':
				SET_SIZE_MODE(true);
				setListingName(`/user/${match.params.userId}`);
				break;
			default:
				break;
		}
	}, [match, location]);

	useEffect(() => {
		dispatch(GET_LISTING({ listingEndpointName: listingName }));
		if (listingName.includes('/r/')) dispatch(GET_SUBREDDIT_ABOUT(listingName));
	}, [listingName]);

	return (
		<>
			{subredditInfoBar && <SubredditInfoBar infoBar={subredditInfoBar} />}
			{listingPointerArray && (
				<Listing postIDArr={listingPointerArray} postClickEvent={setPostInView} subKey={listingName} />
			)}
			<Post id={postInView || (listingPointerArray || [])[0]} />
		</>
	);
};

export default Dashboard;

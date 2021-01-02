import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING, GET_SUBREDDIT_ABOUT } from 'reduxStore/postStore/postThunks';

import Listing from 'components/listing';
import SubredditInfoBar from 'components/subredditInfoBar';

const Dashboard = ({
	navProps: { match, location }
}: {
	navProps: RouteComponentProps<{ postId?: string; subName?: string }>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const [listingName, setListingName] = useState('');

	const listingPointerArray = useSelector<ReduxStateType, string[] | undefined>(
		state => state.post.subredditKeys[listingName]?.postKeys
	);
	const subredditInfoBar = useSelector<ReduxStateType, AboutApiResponse | undefined>(
		state => state.post.subredditKeys[listingName]?.sidebar
	);

	useEffect(() => {
		if (match.path === '/') {
			setListingName('/');
		} else if (match.path === '/r/:subName') {
			setListingName(`/r/${match.params.subName}`);
		} else if (match.path === '/r/:subName/:postId') {
			setListingName(`/r/${match.params.subName}`);
		}
	}, [match, location]);

	useEffect(() => {
		dispatch(GET_LISTING({ listingEndpointName: listingName }));
		if (listingName.includes('/r/')) dispatch(GET_SUBREDDIT_ABOUT(listingName));
	}, [listingName]);

	return (
		<>
			{subredditInfoBar && <SubredditInfoBar infoBar={subredditInfoBar} />}
			{listingPointerArray && <Listing postIDArr={listingPointerArray} name={listingName} />}
		</>
	);
};

export default Dashboard;

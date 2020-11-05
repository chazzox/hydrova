import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import SubredditInfoBar from '../../components/subredditInfoBar/subredditInfoBar';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { SET_SIZE_MODE } from '../../redux/sidebar/sidebarReducer';
import { GET_SUBREDDIT_ABOUT } from '../../redux/listingReducer';
import { GET_LISTING } from '../../redux/postStore/postThunks';
import Listing from '../../components/listing/listing';

const SubredditHome: React.FC<RouteComponentProps> = props => {
	const dispatch: AppDispatch = useDispatch();

	const subredditName = props.location.pathname.split('/')[2];
	const subredditPointerArray = useSelector(
		(state: ReduxStateType) => state.listings.subredditKeys[subredditName]?.postKeys
	);
	const subredditInfoBar = useSelector(
		(state: ReduxStateType) => state.listings.subredditKeys[subredditName]?.sidebar
	);

	useEffect(() => {
		dispatch(SET_SIZE_MODE(true));
		if (!subredditPointerArray) dispatch(GET_LISTING(`/r/${subredditName}`));
		if (!subredditInfoBar) dispatch(GET_SUBREDDIT_ABOUT(subredditName));
	}, []);

	return (
		<>
			{subredditInfoBar ? <SubredditInfoBar infoBar={subredditInfoBar} /> : null}
			{subredditPointerArray ? (
				<Listing postData={subredditPointerArray} />
			) : (
				<div id="contentContainer" className="home" />
			)}
		</>
	);
};

export default SubredditHome;

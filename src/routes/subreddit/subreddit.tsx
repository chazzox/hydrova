import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { GET_SUBREDDIT_ABOUT, GET_SUBREDDIT_POSTS } from '../../redux/subreddit/subredditThunks';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { SET_SIZE_MODE } from '../../redux/sidebar/sidebarReducer';
import Listing from '../../components/listing/listing';

const SubredditHome: React.FC<RouteComponentProps> = props => {
	const dispatch: AppDispatch = useDispatch();

	const subredditName = props.location.pathname.split('/')[2];
	const subredditPointerArray = useSelector(
		(state: ReduxStateType) => state.subreddits.subredditKeys[subredditName]?.postKeys
	);
	const subredditInfoBar = useSelector(
		(state: ReduxStateType) => state.subreddits.subredditKeys[subredditName]?.sidebar
	);

	useEffect(() => {
		dispatch(SET_SIZE_MODE(true));
		if (!subredditPointerArray) dispatch(GET_SUBREDDIT_POSTS(subredditName));
		if (!subredditInfoBar) dispatch(GET_SUBREDDIT_ABOUT(subredditName));
	}, []);

	useEffect(() => {
		console.log(subredditInfoBar);
	}, [subredditInfoBar]);

	return (
		<>
			<div id="subredditInfoBar">
				<div
					dangerouslySetInnerHTML={{
						__html:
							new DOMParser().parseFromString(
								subredditInfoBar?.data.description_html || '',
								'text/html'
							).documentElement.textContent || ''
					}}
				/>
			</div>
			{subredditPointerArray ? <Listing postData={subredditPointerArray} /> : null}
		</>
	);
};

export default SubredditHome;

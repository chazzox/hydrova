import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';

import Listing from 'components/listing';

const Dashboard: React.FC<{
	navProps: RouteComponentProps<{ postId?: string; subName?: string; userId?: string }>;
}> = ({ navProps: { match, location } }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [listingName, setListingName] = useState('');
	const listingPointerArray = useSelector<ReduxStateType, string[] | undefined>(
		state => state.post.subredditKeys[listingName]?.postKeys
	);

	const listingAfterId = useSelector<ReduxStateType, string>(state => state.post.subredditKeys[listingName]?.afterId);

	useEffect(() => {
		console.log(match.path);
		if (match.path === '/') {
			setListingName('/');
		} else if (match.path === '/r/:subName') {
			setListingName(`/r/${match.params.subName}`);
		} else if (match.path === '/r/:subName/:postId') {
			setListingName(`/r/${match.params.subName}`);
		} else if (match.path === '/user/:userId') {
			setListingName(`/user/${match.params.userId}/submitted`);
		}
	}, [match, location]);

	useEffect(() => {
		if (listingName != '') dispatch(GET_LISTING({ listingEndpointName: listingName }));
	}, [listingName]);

	return (
		<>
			{listingPointerArray && (
				<Listing
					idKeys={listingPointerArray}
					fetchMore={() =>
						dispatch(
							GET_LISTING({
								listingEndpointName: listingName,
								listingQueryParams: `?after=${listingAfterId}`
							})
						)
					}
				/>
			)}
		</>
	);
};

export default Dashboard;

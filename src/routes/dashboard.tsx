import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';
import { setSortType } from 'reduxStore/postStore/postReducer';

import Listing from 'components/listing';
import PostPreview from 'components/PostPreview';

interface DashboardProps {
	listingType?: string;
	postId?: string;
	name?: string;
	sortType?: SortOptionType;
}

const Dashboard: React.FC<RouteComponentProps<DashboardProps>> = ({ match, location }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [listingName, setListingName] = useState('');
	const listingPointerArray = useSelector<ReduxStateType, string[] | undefined>(
		(state) => state.post.listingKey[listingName]?.postKeys
	);
	const postSort = useSelector<ReduxStateType, SortOptionType>((state) => state.post.postSortType);
	const listingAfterId = useSelector<ReduxStateType, string>((state) => state.post.listingKey[listingName]?.afterId);

	useEffect(() => {
		setListingName('/');
	}, [match, location]);

	useEffect(() => {
		if (listingName) dispatch(GET_LISTING({ listingEndpointName: listingName }));
	}, [listingName]);

	return (
		<>
			{listingPointerArray && (
				<Listing
					idKeys={listingPointerArray}
					fetchMore={() =>
						dispatch(
							GET_LISTING({
								listingEndpointName: '/',
								listingQueryParams: { afterId: listingAfterId }
							})
						)
					}
				/>
			)}
			{listingPointerArray && <PostPreview postKey={listingPointerArray[0]} />}
		</>
	);
};

export default Dashboard;

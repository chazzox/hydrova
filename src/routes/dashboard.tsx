import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';

import Listing from 'components/listing';
import PostPreview from 'components/postPreview';

const Dashboard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { listingType, listingName, postId } = useParams<UrlParameters>();
	const routeMap = {
		u: ['user', listingName, 'submitted'],
		m: ['me', 'm', listingName],
		r: ['r', listingName],
		'': []
	};

	const [endpointName, setEndPointName] = useState('');
	const listingPointerArray =
		useSelector<ReduxStateType, string[] | undefined>((state) => state.post.listingKey[endpointName]?.postKeys) ?? [];

	const listingAfterId = useSelector<ReduxStateType, string | undefined>(
		(state) => state.post.listingKey[endpointName]?.afterId
	);

	useEffect(() => {
		setEndPointName('/' + routeMap[listingType ?? ''].join('/'));
	}, [listingType, listingName]);

	useEffect(() => {
		if (endpointName) dispatch(GET_LISTING({ listingEndpointName: endpointName }));
	}, [endpointName]);

	return (
		<>
			{listingPointerArray && (
				<Listing
					idKeys={listingPointerArray}
					fetchMore={(_, __) =>
						dispatch(
							GET_LISTING({
								listingEndpointName: endpointName,
								listingQueryParams: listingAfterId ? { afterId: listingAfterId } : undefined
							})
						)
					}
				/>
			)}
			{listingPointerArray && <PostPreview postKey={postId ?? listingPointerArray[0]} />}
		</>
	);
};

export default Dashboard;

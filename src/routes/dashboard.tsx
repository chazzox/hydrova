import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_LISTING } from 'reduxStore/postStore/postThunks';

import Listing from 'components/listing';
import PostPreview from 'components/PostPreview';

const Dashboard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { listingType, listingName, postId, sortType } = useParams<UrlParameters>();
	const routeMap = {
		u: ['user', listingName, 'submitted'],
		m: ['m', listingName],
		r: ['r', listingName],
		'': []
	};

	const [endPointName, setEndPointName] = useState('');
	const listingPointerArray = useSelector<ReduxStateType, string[] | undefined>(
		(state) => state.post.listingKey[endPointName]?.postKeys
	);
	const listingAfterId = useSelector<ReduxStateType, string | undefined>(
		(state) => state.post.listingKey[endPointName]?.afterId
	);

	useEffect(() => {
		const posName = routeMap[listingType ?? ''].join('/');
		setEndPointName('/' + posName);
	}, [listingType]);

	useEffect(() => {
		if (endPointName) dispatch(GET_LISTING({ listingEndpointName: endPointName }));
	}, [endPointName]);

	return (
		<>
			{listingPointerArray && (
				<Listing
					idKeys={listingPointerArray}
					fetchMore={(_, __) =>
						dispatch(
							GET_LISTING({
								listingEndpointName: endPointName,
								sortType: sortType ?? '',
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

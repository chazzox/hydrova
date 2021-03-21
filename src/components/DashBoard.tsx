import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_LISTING } from 'redux/Listing/ListingThunks';
import { AppDispatch, ReduxStateType } from 'redux/store';

import Sidebar from './Sidebar';
import WelcomeBox from './WelcomeBox';

const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { listingType, listingName } = useParams<UrlParameters>();

	const routeMap = {
		u: ['user', listingName, 'submitted'],
		m: ['me', 'm', listingName],
		r: ['r', listingName],
		'': []
	};

	const [endpointName, setEndPointName] = React.useState('');
	// const listingPointerArray =
	// 	useSelector<ReduxStateType, string[] | undefined>((state) => state.listing.listingKey[endpointName]?.postKeys) ?? [];

	// const listingAfterId = useSelector<ReduxStateType, string | undefined>(
	// 	(state) => state.listing.listingKey[endpointName]?.afterId
	// );

	React.useEffect(() => {
		setEndPointName('/' + routeMap[listingType ?? ''].join('/'));
	}, [listingType, listingName]);

	React.useEffect(() => {
		if (endpointName) dispatch(GET_LISTING({ listingEndpointName: endpointName }));
	}, [endpointName]);

	return (
		<>
			<Sidebar />
			<WelcomeBox topText="Welcome" bottomText="You are logged in" />
		</>
	);
};

export default Dashboard;

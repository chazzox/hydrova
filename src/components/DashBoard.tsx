import { GET_LISTING } from '@redux/Listing/ListingThunks';
import { AppDispatch, ReduxStateType } from '@redux/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Listing from './Listing';

import Sidebar from './Sidebar';

export const Main = styled.div`
	max-height: calc(100vh - 2 * (${(props) => props.theme.base.paddingSecondary}px));
	background-color: ${(props) => props.theme.colors.tertiaryBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusSecondary}px;
	padding-bottom: ${(props) => props.theme.base.paddingPrimary}px;
	padding-top: ${(props) => props.theme.base.paddingPrimary}px;
	margin: ${(props) => props.theme.base.paddingSecondary}px;
	position: relative;
	overflow: hidden;
	max-width: 100%;
	margin-right: 0;
	flex-shrink: 1;
	flex-grow: 2;
	width: 50%;
	flex: 1;
`;

const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { listingType, listingName, postId } = useParams<UrlParameters>();
	const routeMap = {
		u: ['user', listingName, 'submitted'],
		m: ['me', 'm', listingName],
		r: ['r', listingName],
		'': []
	};

	const [endpointName, setEndPointName] = React.useState('');
	const listingPointerArray =
		useSelector<ReduxStateType, string[] | undefined>((state) => state.listing.listingKey[endpointName]?.postKeys) ?? [];

	const listingAfterId = useSelector<ReduxStateType, string | undefined>(
		(state) => state.listing.listingKey[endpointName]?.afterId
	);

	React.useEffect(() => {
		setEndPointName('/' + routeMap[listingType ?? ''].join('/'));
	}, [listingType, listingName]);

	React.useEffect(() => {
		if (endpointName) dispatch(GET_LISTING({ listingEndpointName: endpointName }));
	}, [endpointName]);

	return (
		<>
			<Sidebar />

			{listingPointerArray.length > 0 && (
				<Listing
					idKeys={listingPointerArray}
					fetchMore={(_) => {
						dispatch(
							GET_LISTING({
								listingEndpointName: endpointName,
								listingQueryParams: !!listingAfterId ? { after: listingAfterId } : undefined
							})
						);
					}}
				/>
			)}
		</>
	);
};

export default Dashboard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_LISTING } from '../../redux/postStore/postThunks';
import Listing from '../../components/listing/listing';

import './home.scss';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const timeline = useSelector((state: ReduxStateType) => state.listings.subredditKeys['/']?.postKeys);

	useEffect(() => {
		dispatch(GET_LISTING('/'));
	}, []);

	return (
		<>
			<Listing postData={timeline || []} />
		</>
	);
};

export default Home;

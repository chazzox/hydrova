import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../redux/reduxWrapper';

import RenderPost from '../../utils/renderPost';

const Home: React.FC<RouteComponentProps<{ post?: any }, any, { post: post } | undefined>> = props => {
	return (
		<div id="contentContainer">
			{props.location.state?.post ? <RenderPost post={props.location.state.post} /> : null}
		</div>
	);
};

export default Home;

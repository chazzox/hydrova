import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import { setPostContent, GET_POST } from '../../redux/postReducer';
import RenderPost from '../../utils/renderPost';

const Home: React.FC<RouteComponentProps<{ post?: any }, any, { post: post } | undefined>> = props => {
	const dispatch: AppDispatch = useDispatch();
	const id = props.location.pathname.split('/')[2];
	const post = useSelector((state: RootState) => state.post.posts[id]);
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	useEffect(() => {
		if (props.location.state?.post) {
			dispatch(setPostContent({ postId: id, postContent: props.location.state.post }));
			dispatch(GET_POST({ access_token: access_token, id: id }));
		} else {
			dispatch(GET_POST({ access_token: access_token, id: id }));
		}
	}, []);

	return (
		<div id="contentContainer">
			{post && post.postContent ? <RenderPost post={post.postContent} /> : null}
			{post && post.comments ? <Comments /> : null}
		</div>
	);
};

const Comments: React.FC = () => {
	return (
		<>
			<h1>test</h1>
		</>
	);
};

export default Home;

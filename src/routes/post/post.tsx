import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setPostContent, GET_POST, VOTE, SAVE } from '../../redux/postReducer';

import VoteControls from '../../components/voteControls/voteControls';
import PostComponent from '../../components/postComponent/postComponent';
import Comment from '../../components/comment/comment';

const Home: React.FC<RouteComponentProps<{ post?: any }, any, { post: post } | undefined>> = props => {
	const dispatch: AppDispatch = useDispatch();
	const id = props.location.pathname.split('/')[2];
	const postContent = useSelector((state: ReduxStateType) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: ReduxStateType) => state.post.posts[id]?.comments?.commentArray);
	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

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
			{postContent ? (
				<>
					<VoteControls postContent={postContent} />
					<PostComponent postContent={postContent} />
				</>
			) : null}
			{comments ? comments.map(comment => <Comment comment={comment} />) : null}
		</div>
	);
};

export default Home;

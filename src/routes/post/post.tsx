import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setPostContent, GET_POST } from '../../redux/postStore/postReducer';

import VoteControls from '../../components/voteControls/voteControls';
import PostComponent from '../../components/postComponent/postComponent';
import Comment from '../../components/comment/comment';

const Home: React.FC<RouteComponentProps<any, any, any>> = props => {
	const dispatch: AppDispatch = useDispatch();
	const id = props.location.pathname.split('/')[2];
	const postContent = useSelector((state: ReduxStateType) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: ReduxStateType) => state.post.posts[id]?.comments?.commentArray);

	useEffect(() => {
		if (props.location.state?.post) {
			dispatch(setPostContent({ postId: id, postContent: props.location.state.post }));
			dispatch(GET_POST({ id: id }));
		} else {
			dispatch(GET_POST({ id: id }));
		}
	}, []);

	return (
		<>
			{postContent ? (
				<>
					<VoteControls postContent={postContent} />
					<div id="contentContainer">
						<PostComponent postContent={postContent} isExpanded={true} />{' '}
						{comments ? comments.map(comment => <Comment comment={comment} />) : null}
					</div>
				</>
			) : null}
		</>
	);
};

export default Home;

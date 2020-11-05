import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_POST } from '../../redux/postStore/postThunks';

import VoteControls from '../../components/voteControls/voteControls';
import PostComponent from '../../components/postComponent/postComponent';
import Comment from '../../components/comment/comment';

const Home: React.FC<RouteComponentProps<any, any, any>> = props => {
	const dispatch: AppDispatch = useDispatch();
	const id = props.location.pathname.split('/')[2];
	const postContent = useSelector((state: ReduxStateType) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: ReduxStateType) => state.post.posts[id]?.comments?.commentArray);

	useEffect(() => {
		dispatch(GET_POST({ id: id }));
	}, []);

	return (
		<>
			{postContent ? (
				<>
					<VoteControls postContent={postContent} />
					<div id="contentContainer">
						<PostComponent postContent={postContent} isExpanded={true} />{' '}
						{comments
							? comments.map((comment, index) => <Comment key={index} comment={comment} />)
							: null}
					</div>
				</>
			) : null}
		</>
	);
};

export default Home;

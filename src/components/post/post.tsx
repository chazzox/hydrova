import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_POST } from '../../redux/postStore/postThunks';

import VoteControls from '../voteControls/voteControls';
import PostComponent from '../postComponent/postComponent';
import Comment from '../comment/comment';

const Post = ({ id }: { id: string }) => {
	const dispatch: AppDispatch = useDispatch();
	const postContent = useSelector((state: ReduxStateType) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: ReduxStateType) => state.post.posts[id]?.comments?.commentArray);

	useEffect(() => {
		if ((!comments || !postContent) && id) dispatch(GET_POST({ id: id }));
	}, [id]);

	return (
		<div className="main">
			{postContent ? (
				<>
					<div className="contentContainer">
						<VoteControls postContent={postContent} />
						<PostComponent postContent={postContent} isExpanded={true} />
						<div id="comments" />
						{comments ? comments.map((comment, index) => <Comment key={index} comment={comment} />) : null}
					</div>
				</>
			) : (
				<>
					<div className="contentContainer"></div>
				</>
			)}
		</div>
	);
};

export default Post;

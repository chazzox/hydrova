import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { GET_POST } from 'reduxStore/postStore/postThunks';
import VoteControls from 'components/voteControls';
import PostComponent from 'components/postComponent';
import Comment from 'components/comment';

const Post = ({ id }: { id: string }) => {
	const dispatch: AppDispatch = useDispatch();
	const postContent = useSelector((state: ReduxStateType) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: ReduxStateType) => state.post.posts[id]?.comments?.commentArray);

	useEffect(() => {
		if ((!comments || !postContent) && id) dispatch(GET_POST({ id: id }));
	}, [id]);

	return (
		<div className="main">
			<div className="contentContainer">
				{postContent && (
					<>
						<VoteControls postContent={postContent} />
						<PostComponent postContent={postContent} isExpanded={true} />
						<div id="comments" />
						{comments && comments.map((comment, index) => <Comment key={index} comment={comment} />)}
					</>
				)}
			</div>
		</div>
	);
};

export default Post;

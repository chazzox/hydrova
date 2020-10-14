import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { AppDispatch, RootState } from '../../redux/reduxWrapper';
import { setPostContent, GET_POST } from '../../redux/postReducer';
import RenderPost from '../../utils/renderPost';

import './post.scss';

const Home: React.FC<RouteComponentProps<{ post?: any }, any, { post: post } | undefined>> = props => {
	const dispatch: AppDispatch = useDispatch();
	const id = props.location.pathname.split('/')[2];
	const postContent = useSelector((state: RootState) => state.post.posts[id]?.postContent);
	const comments = useSelector((state: RootState) => state.post.posts[id]?.comments?.commentArray);
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
			{postContent ? <RenderPost post={postContent} /> : null}
			{comments ? comments.map(comment => <Comments comment={comment} />) : null}
		</div>
	);
};

const Comments = ({ comment }: { comment: any }) => {
	return (
		<>
			<div className="comment post">
				<div className="commentContent">
					<div
						className="commentBody"
						dangerouslySetInnerHTML={{
							__html:
								new DOMParser().parseFromString(comment.body_html, 'text/html').documentElement
									.textContent || ''
						}}
					/>
					<div className="commentButtonMenu">
						<button>Upvote</button>
						<button>Downvote</button>
					</div>
				</div>

				{comment.replies
					? comment.replies.data.children.map((childComments: any, index: any) => {
							if (childComments.kind === 't1') return <Comments comment={childComments.data} key={index} />;
					  })
					: null}
			</div>
		</>
	);
};

export default Home;

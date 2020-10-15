import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setPostContent, GET_POST, VOTE, SAVE } from '../../redux/postReducer';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';
import RenderPostContent from '../../utils/renderPostContent';

import './post.scss';

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
				<div className="postWrapper">
					<div className="postControls">
						<div className="votesContainer">
							<button
								onClick={() => {
									dispatch(
										VOTE({
											access_token: access_token,
											fullName: postContent.name,
											voteDirection: 1
										})
									);
								}}
								className={postContent.likes === true ? 'selected' : ''}
							>
								⬆️
							</button>
							<p>{postContent.ups}</p>
							<button
								onClick={() => {
									dispatch(
										VOTE({
											access_token: access_token,
											fullName: postContent.name,
											voteDirection: -1
										})
									);
								}}
								className={postContent.likes === false ? 'selected' : ''}
							>
								⬇️
							</button>
						</div>
						<button
							onClick={() => {
								dispatch(
									SAVE({
										access_token: access_token,
										fullName: postContent.name,
										isSaving: !postContent.saved
									})
								);
							}}
							className={postContent.saved ? 'selected' : ''}
						>
							save
						</button>
						<button onClick={() => copy(`https://www.reddit.com/${postContent.permalink}`)}>
							share
						</button>
						<button>💬{postContent.num_comments}</button>
					</div>

					<div id={postContent.id} className={postContent.post_hint + ' post'}>
						<div className="postInfo">
							<h1 className="postTitle">{postContent.title}</h1>
							<p>
								{postContent.subreddit_name_prefixed} | u/{postContent.author} | posted{' '}
								{formatTimeSince(timeSinceCurrent(postContent.created))}
							</p>
						</div>
						<RenderPostContent post={postContent} />
					</div>
				</div>
			) : null}
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
								new DOMParser().parseFromString(comment.body_html, 'text/html')
									.documentElement.textContent || ''
						}}
					/>
					<div className="commentButtonMenu">
						<button>Upvote</button>
						<button>Downvote</button>
					</div>
				</div>

				{comment.replies
					? comment.replies.data.children.map((childComments: any, index: any) => {
							if (childComments.kind === 't1')
								return <Comments comment={childComments.data} key={index} />;
					  })
					: null}
			</div>
		</>
	);
};

export default Home;

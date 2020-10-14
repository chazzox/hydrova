import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VOTE, SAVE } from '../redux/postReducer';
import { AppDispatch, ReduxStateType } from '../redux/reduxWrapper';

const RedditPostComponent = ({ post }: { post: post }) => {
	const dispatch: AppDispatch = useDispatch();

	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

	const PostContent = () => {
		if (post.is_self && post.selftext_html) {
			const innerHTML = new DOMParser().parseFromString(post.selftext_html, 'text/html').documentElement
				.textContent;
			return (
				<div
					className="postContent"
					dangerouslySetInnerHTML={{
						__html: innerHTML ? innerHTML : ''
					}}
				/>
			);
		} else if (post.is_video && post.media) {
			return (
				<video controls={true}>
					<source src={post.media.reddit_video.fallback_url} type="video/mp4" />
				</video>
			);
		} else if (post.post_hint === 'link') return <p>this is a link, support will be added soon</p>;
		else if (post.post_hint === 'image') return <img src={post.url} alt="" />;
		else {
			return <p>this is a reddit collage</p>;
		}
	};
	return (
		<div className="postWrapper">
			<div id={post.id} className={post.post_hint + ' post'}>
				<div className="postControls">
					<p>Votes: {post.ups}</p>
					<p>Comments: {post.num_comments}</p>
					<button
						onClick={() =>
							dispatch(VOTE({ access_token: access_token, id: post.id, voteDirection: 0 }))
						}
					>
						upvote
					</button>
					<button
						onClick={() =>
							dispatch(VOTE({ access_token: access_token, id: post.id, voteDirection: 0 }))
						}
					>
						downvote
					</button>
					<button
						onClick={() =>
							dispatch(
								SAVE({ access_token: access_token, fullName: post.name, isSaving: true })
							)
						}
					>
						save
					</button>
				</div>
				<div className="postInfo">
					<h1 className="postTitle">{post.title}</h1>
					<p>
						{post.subreddit_name_prefixed} | u/{post.author}
					</p>
				</div>
				<PostContent />
			</div>
		</div>
	);
};

export default RedditPostComponent;

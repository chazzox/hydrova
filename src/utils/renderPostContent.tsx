import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VOTE, SAVE } from '../redux/postReducer';
import { AppDispatch, ReduxStateType } from '../redux/reduxWrapper';

const PostContent = ({ post }: { post: post }) => {
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
	} else if (post.post_hint === 'link') return <div className="postContent">this is a link, support will be added soon</div>;
	else if (post.post_hint === 'image') return <img src={post.url} alt="" />;
	else {
		return <div className="postContent">this is a reddit collage</div>;
	}
};

export default PostContent;

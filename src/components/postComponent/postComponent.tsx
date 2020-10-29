import React from 'react';
import { Link } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import './postComponent.scss';

const postComponent = ({ postContent }: { postContent: post }) => {
	const PostContent = () => {
		if (postContent.is_self && postContent.selftext_html) {
			return (
				<div
					className="postContent"
					dangerouslySetInnerHTML={{
						__html:
							new DOMParser().parseFromString(postContent.selftext_html, 'text/html')
								.documentElement.textContent || ''
					}}
				/>
			);
		} else if (postContent.is_video && postContent.media) {
			return (
				<video controls={true}>
					<source src={postContent.media.reddit_video.fallback_url} type="video/mp4" />
				</video>
			);
		} else if (postContent.post_hint === 'link')
			return <div className="postContent">this is a link, support will be added soon</div>;
		else if (postContent.post_hint === 'image') return <img src={postContent.url} alt="" />;
		else {
			return <div className="postContent">this is a reddit collage</div>;
		}
	};

	return (
		<div id={postContent.id} className="post">
			<div className="postInfo">
				<h1 className="postTitle">{postContent.title}</h1>
				<div>
					<p>
						<Link to={'/' + postContent.subreddit_name_prefixed}>
							{postContent.subreddit_name_prefixed}
						</Link>{' '}
						| u/{postContent.author} | posted{' '}
						{formatTimeSince(timeSinceCurrent(postContent.created_utc))}
					</p>
				</div>
			</div>
			<PostContent />
		</div>
	);
};

export default postComponent;

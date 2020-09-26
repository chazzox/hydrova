import React from 'react';
import { withRouter } from 'react-router-dom';

const RedditPostComponent = (props: sub, index: number) => {
	const PostContent = () => {
		if (props.is_self && props.selftext_html) {
			const innerHTML = new DOMParser().parseFromString(props.selftext_html, 'text/html').documentElement.textContent;
			return (
				<div
					className="postContent"
					dangerouslySetInnerHTML={{
						__html: innerHTML ? innerHTML : ''
					}}
				/>
			);
		} else if (props.is_video && props.media) {
			return (
				<video controls={true}>
					<source src={props.media.reddit_video.fallback_url} type="video/mp4" />
				</video>
			);
		} else {
			if (props.post_hint === 'link') return <p>this is a link, support will be added soon</p>;
			else if (props.post_hint === 'image') return <img src={props.url} alt="" />;
			else {
				return <p>this is a reddit collage</p>;
			}
		}
	};
	return (
		<span key={index}>
			<div id={props.id} className="post">
				<p>updoots: {props.ups}</p>
				<p className="postTitle">{props.title}</p>
				<PostContent />
				<p className="postInfo">
					{props.subreddit_name_prefixed} | u/{props.author}
					/comments: {props.num_comments}
				</p>
			</div>
		</span>
	);
};

export default RedditPostComponent;

import React from 'react';

const RedditPostComponent = ({ post }: { post: post }) => {
	const PostContent = () => {
		if (post.is_self && post.selftext_html) {
			const innerHTML = new DOMParser().parseFromString(post.selftext_html, 'text/html').documentElement.textContent;
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

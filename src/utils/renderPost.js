import React from 'react';

export default function renderPost({ is_self, is_video, selftext_html, media, post_hint, url }) {
	if (is_self)
		return (
			<div
				className="postContent"
				dangerouslySetInnerHTML={{
					__html: new DOMParser().parseFromString(selftext_html, 'text/html').documentElement.textContent
				}}
			/>
		);
	else if (is_video) {
		return (
			<video controls={true}>
				<source src={media.reddit_video.fallback_url} type="video/mp4" />
			</video>
		);
	} else {
		if (post_hint === 'link') return <p>this is a link, support will be added soon</p>;
		else if (post_hint === 'image') return <img src={url} alt="" />;
		else {
			return <p>this is a reddit collage</p>;
		}
	}
}

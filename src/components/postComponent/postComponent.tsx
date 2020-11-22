import React from 'react';
import { Link } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import './postComponent.scss';

interface propTypes {
	postContent: post;
	isExpanded?: boolean | null;
	additionalClassNames?: string[];
	isSmall?: boolean;
}

const postComponent = ({ postContent, isExpanded, additionalClassNames, isSmall = false }: propTypes) => {
	return (
		<div
			id={postContent.id}
			className={'post' + [additionalClassNames, ...[isExpanded ? 'expanded' : []]]?.join(' ')}
		>
			<div className="postInfo roundedLinks">
				<p>
					{postContent.author}
					<span>{formatTimeSince(timeSinceCurrent(postContent.created_utc))}</span>
					<Link to={'/' + postContent.subreddit_name_prefixed}>{postContent.subreddit_name_prefixed}</Link>
				</p>
				<h1 className="postTitle">
					{new DOMParser().parseFromString(postContent.title, 'text/html').documentElement.textContent}
				</h1>
			</div>
			<div className="postContent">
				{!isSmall ? (
					<RenderPostType postContent={postContent} />
				) : postContent.thumbnail.match(/(default)|(self)|(unknown)/) === null && postContent.thumbnail ? (
					<img src={postContent.thumbnail} alt={`thumbnail for ${postContent.id}`} />
				) : null}
			</div>
		</div>
	);
};

const RenderPostType = ({ postContent }: { postContent: post }) => {
	if (postContent.is_self && postContent.selftext_html) {
		return (
			<span
				dangerouslySetInnerHTML={{
					__html:
						new DOMParser().parseFromString(postContent.selftext_html, 'text/html').documentElement
							.textContent || ''
				}}
			/>
		);
	} else if (postContent.is_video && postContent.media?.reddit_video) {
		return (
			<video controls={true}>
				<source src={postContent.media.reddit_video.fallback_url} type="video/mp4" />
				<source
					src={postContent.media.reddit_video.fallback_url.replace(
						/(DASH_)(\d*)(.mp4)/,
						(_ign1, part1: string, _ign2, part3: string, _ign3) => part1 + 'AUDIO' + part3
					)}
					type="audio/mp4"
				/>
			</video>
		);
	} else if (postContent.post_hint === 'image') return <img src={postContent.url} alt="" />;
	else if (
		postContent.post_hint === 'link' ||
		(postContent.url == postContent.url_overridden_by_dest && postContent.domain !== 'i.redd.it')
	) {
		console.log(postContent);
		return <a href={postContent.url_overridden_by_dest}>{postContent.url_overridden_by_dest}</a>;
	} else if (postContent.is_gallery)
		return (
			<span className="galleryContent">
				{postContent.gallery_data?.items.map(({ media_id }, index) => {
					if (postContent?.media_meta)
						return (
							<img
								key={index}
								src={unescape(postContent?.media_meta[media_id].p.slice(-1)[0].u)}
								alt={`img${index} of collage`}
							/>
						);
					else return <p>json returned from reddit is not formed correctly</p>;
				})}
			</span>
		);
	else {
		console.log(postContent);
		return <>post type unknown</>;
	}
};

export default postComponent;

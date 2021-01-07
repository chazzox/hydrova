import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReduxStateType } from 'reduxStore/reduxWrapper';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

const PostPreview: React.FC<{ postKey: string | undefined }> = ({ postKey }) => {
	const content = useSelector<ReduxStateType, Post>((state) => state.post.posts[postKey || '']?.postContent);
	return (
		<div id={content.id} className={'post'}>
			<div className="postInfo roundedLinks">
				<p>
					<Link to={'/u/' + content.author}>{content.author}</Link>
					<span>{formatTimeSince(timeSinceCurrent(content.created_utc))}</span>
					<Link to={'/' + content.subreddit_name_prefixed}>{content.subreddit_name_prefixed}</Link>
				</p>
				<h1 className="postTitle">
					{new DOMParser().parseFromString(content.title, 'text/html').documentElement.textContent}
				</h1>
			</div>
			<div className="postContent">
				<RenderPostType postContent={content} />
			</div>
		</div>
	);
};

const RenderPostType = ({ postContent }: { postContent: Post }) => {
	if (postContent.is_self && postContent.selftext_html)
		return (
			<span
				dangerouslySetInnerHTML={{
					__html:
						new DOMParser().parseFromString(postContent.selftext_html, 'text/html').documentElement
							.textContent || ''
				}}
			/>
		);
	else if (postContent.is_video && postContent.media?.reddit_video)
		return (
			<video controls={true}>
				<source src={postContent.media.reddit_video.fallback_url} type="video/mp4" />
			</video>
		);
	else if (postContent.post_hint === 'image') return <img src={postContent.url} alt="" />;
	else if (
		postContent.post_hint === 'link' ||
		(postContent.url == postContent.url_overridden_by_dest && postContent.domain !== 'i.redd.it')
	)
		return <a href={postContent.url_overridden_by_dest}>{postContent.url_overridden_by_dest}</a>;
	else if (postContent.is_gallery)
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
	else return <>post type unknown</>;
};

export default PostPreview;

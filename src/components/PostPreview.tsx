import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styled from 'styled-components';

import { GET_POST } from '@redux/ListingSlice';
import { AppDispatch } from '@redux/store';

import PostInformation from './PostInfo';
import { PostStyles } from '@components/Listing';
import getPostValues from '@utils/getPostValues';

const ExpandedPost = styled.div`
	${PostStyles}
	display: block;
	max-height: fit-content;
`;

const PostContent = styled.div`
	visibility: visible;
	margin: 0 auto;
	width: fit-content;
`;

const Video = styled.video`
	height: auto;
	min-height: auto;
	max-height: 75vh;
	width: auto;
	min-width: auto;
	max-width: 100%;
	object-fit: contain;
`;

const GalleryContent = styled.div`
	overflow-y: hidden;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	max-height: 75vh;
	white-space: nowrap;
	scroll-snap-type: x mandatory;
`;

const GalleryImage = styled.img`
	scroll-snap-align: start;
	width: 100%;
	display: inline-block;
	text-align: center;
	max-height: calc(75vh - 16px);
	margin: 0 var(--padding-size-primary);
	border-radius: var(--border-radius-primary);
`;

const PostPreview: React.FC<{ postKey: string }> = ({ postKey }) => {
	const dispatch = useDispatch<AppDispatch>();
	const refTop = useRef<HTMLDivElement>(null);

	const [content, setContent] = React.useState<Post | null>(null);

	React.useEffect(() => {
		refTop?.current?.scrollIntoView();
		postKey &&
			dispatch(GET_POST({ id: postKey }))
				.then(unwrapResult)
				.then((originalPromiseResult) => {
					setContent(getPostValues(originalPromiseResult[0].data.children[0].data));
				});
	}, [postKey]);

	console.log(content?.is_gallery);

	return (
		<ExpandedPost id={content?.id} ref={refTop} style={{ height: '100%' }}>
			{content && (
				<>
					<PostInformation
						title={new DOMParser().parseFromString(content.title, 'text/html').documentElement.textContent ?? ''}
						author={content.author}
						created_utc={content.created_utc}
						subreddit_name_prefixed={content.subreddit_name_prefixed}
						expanded
					/>
					<PostContent>
						<RenderPostType postContent={content} />
					</PostContent>
				</>
			)}
		</ExpandedPost>
	);
};

const RenderPostType = ({ postContent }: { postContent: Post }) => {
	if (postContent.is_self && postContent.selftext_html)
		return (
			<span
				dangerouslySetInnerHTML={{
					__html:
						new DOMParser().parseFromString(postContent.selftext_html, 'text/html').documentElement
							.textContent ?? ''
				}}
			/>
		);
	else if (postContent.is_video && postContent.media?.reddit_video)
		return (
			<Video controls={true}>
				<source src={postContent.media.reddit_video.fallback_url} type="video/mp4" />
			</Video>
		);
	else if (postContent.post_hint === 'image') return <Video as="img" src={postContent.url} alt="" />;
	else if (postContent.is_gallery)
		return (
			<GalleryContent>
				{postContent.gallery_data?.items.map(({ media_id }: any, index: number) => (
					<GalleryImage
						key={index}
						src={decodeURIComponent(
							new DOMParser().parseFromString(postContent?.media_meta[media_id].p.slice(-1)[0].u, 'text/html')
								.documentElement.textContent ?? ''
						)}
						alt={`img ${index} of collage`}
					/>
				))}
			</GalleryContent>
		);
	else if (
		postContent.post_hint === 'link' ||
		(postContent.url == postContent.url_overridden_by_dest && postContent.domain !== 'i.redd.it')
	)
		return <a href={postContent.url_overridden_by_dest}>{postContent.url_overridden_by_dest}</a>;
	else return <>post type unknown</>;
};

export default PostPreview;

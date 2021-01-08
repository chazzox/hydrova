export default function getValues(data: ChildData): Post {
	return {
		is_self: data.is_self,
		selftext_html: data.selftext_html,
		is_video: data.is_video,
		post_hint: data.post_hint,
		url: data.url,
		id: data.id,
		ups: data.ups,
		title: data.title,
		subreddit_name_prefixed: data.subreddit_name_prefixed,
		author: data.author,
		num_comments: data.num_comments,
		name: data.name,
		permalink: data.permalink,
		created_utc: data.created_utc,
		saved: data.saved,
		likes: data.likes,
		is_gallery: data.is_gallery,
		gallery_data: data.gallery_data,
		thumbnail: data.thumbnail,
		url_overridden_by_dest: data.url_overridden_by_dest,
		domain: data.domain,
		subreddit: data.subreddit,
		media_meta: data.media_meta,
		media: data.media
	};
}

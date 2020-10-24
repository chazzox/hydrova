export default function getValues(data: ChildData): post {
	return {
		is_self: data.is_self,
		selftext_html: data.selftext_html,
		is_video: data.is_video,
		media: data.media,
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
		likes: data.likes
	};
}

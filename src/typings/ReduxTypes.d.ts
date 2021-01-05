interface Post {
	is_self: boolean;
	is_video: boolean;
	created_utc: number;
	saved: boolean;
	likes: boolean | null;
	is_gallery?: boolean;
	gallery_data?: boolean;
	url_overridden_by_dest?: boolean;
	domain: string;
	ups: number;
	num_comments: number;
	post_hint?: string;
	selftext_html: string | null;
	thumbnail?: string;
	url: string;
	id: string;
	title: string;
	subreddit_name_prefixed: string;
	author: string;
	name: string;
	permalink: string;
}

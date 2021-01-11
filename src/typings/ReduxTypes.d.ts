interface Post {
	subreddit: string;
	media_meta: any;
	media: any;
	is_self: boolean;
	is_video: boolean;
	created_utc: number;
	saved: boolean;
	likes: boolean | null;
	is_gallery?: boolean;
	gallery_data?: any;
	url_overridden_by_dest?: string;
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

type SortOptionType = 'best' | 'hot' | 'new' | 'top' | 'rising' | '';

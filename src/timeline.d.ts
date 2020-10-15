interface TimelineResponse {
	kind: string;
	data: TimelineData;
}

interface TimelineData {
	modhash: string;
	dist: number;
	children: Child[];
	after: string;
	before: string | null;
}

interface Child {
	kind: 't3';
	data: ChildData;
}

interface ChildData {
	saved: boolean;
	title: string;
	subreddit: string;
	subreddit_name_prefixed: string;
	selftext: string;
	name: string;
	author_flair_background_color: null | string;
	subreddit_type: string;
	ups: number;
	total_awards_received: number;
	thumbnail_width: number | null;
	author_flair_template_id: null | string;
	is_original_content: boolean;
	user_reports: any[];
	secure_media: Media | null;
	is_reddit_media_domain: boolean;
	is_meta: boolean;
	link_flair_text: null | string;
	score: number;
	thumbnail: string;
	edited: boolean | number;
	author_flair_css_class: null | string;
	post_hint?: string;
	is_self: boolean;
	created: number;
	wls: number | null;
	selftext_html: null | string;
	no_follow: boolean;
	is_crosspostable: boolean;
	media_only: boolean;
	spoiler: boolean;
	locked: boolean;
	treatment_tags: any[];
	visited: boolean;
	subreddit_id: string;
	link_flair_background_color: string;
	id: string;
	author: string;
	num_comments: number;
	send_replies: boolean;
	author_patreon_flair: boolean;
	permalink: string;
	url: string;
	subreddit_subscribers: number;
	num_crossposts: number;
	media: Media | null;
	is_video: boolean;
}

interface ResizedIcon {
	url: string;
	width: number;
	height: number;
}

interface Media {
	reddit_video: RedditVideo;
}

interface RedditVideo {
	fallback_url: string;
	height: number;
	width: number;
	scrubber_media_url: string;
	dash_url: string;
	duration: number;
	hls_url: string;
	is_gif: boolean;
	transcoding_status: string;
}

interface Image {
	source: ResizedIcon;
	resolutions: ResizedIcon[];
	variants: MediaEmbed;
	id: string;
}

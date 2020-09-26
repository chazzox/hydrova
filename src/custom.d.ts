// fixes error when trying to import SVGs using the gatsby-svg plugin
declare module '*.svg' {
	const content: any;
	export default content;
}

interface userInfoSuccess {
	name: string;
	total_karma: number;
	icon_img: string;
}

interface failure {
	message: string;
	error: number;
}

interface userMulti {
	kind: string;
	data: {
		display_name: string;
		icon_url: string;
	};
}
type userMultiSuccess = userMulti[];

interface sub {
	is_self: boolean;
	selftext_html: string | null;
	is_video: boolean;
	media: {
		reddit_video: {
			fallback_url: string;
			height: number;
			width: number;
			scrubber_media_url: string;
			dash_url: string;
			duration: number;
			hls_url: string;
			is_gif: boolean;
			transcoding_status: string;
		};
	} | null;
	post_hint?: PostHint;
	url: string;
	id: string;
	ups: number;
	title: string;
	subreddit_name_prefixed: string;
	author: string;
	num_comments: number;
}

interface storedSub {
	display_name: string;
	icon_img: string;
	subreddit_type: string;
	icon_color: string;
}

interface multi {
	icon_img: string;
	display_name: string;
	icon_color: string;
}

interface userSubSuccess {
	kind: string;
	data: {
		after: string | null | undefined;
		before: string | null;
		dist: number;
		children: {
			kind: string;
			data: sub;
		}[];
	};
}

interface responseSuccess {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

interface indexType {
	[state: string]: any;
}

interface post {
	subreddit: string;
	selftext: string;
	name: string;
	author_flair_background_color: null | string;
	subreddit_type: SubredditType;
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
	post_hint?: PostHint;
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

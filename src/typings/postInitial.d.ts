interface GenericPost {
	kind: string;
	data: GenericPostData;
}
interface GenericPostData {
	modhash: string;
	dist: number;
	children: Child[];
	after: null;
	before: null;
}
interface Child {
	kind: string;
	data: ChildData;
}

interface ChildData {
	quarantine: boolean;
	total_awards_received: number;
	secure_media: null;
	category: null;
	link_flair_text: null;
	thumbnail: string;
	post_hint: string;
	content_categories: null;
	link_flair_type: string;
	wls: number;
	domain: string;
	allow_live_comments: boolean;
	suggested_sort: null;
	url_overridden_by_dest: string;
	view_count: null;
	archived: boolean;
	no_follow: boolean;
	pinned: boolean;
	spoiler: boolean;
	treatment_tags: any[];
	link_flair_background_color: string;
	is_robot_indexable: boolean;
	num_duplicates: number;
	discussion_type: null;
	contest_mode: boolean;
	whitelist_status: string;
	stickied: boolean;
	subreddit_subscribers: number;
	link_flair_richtext: FlairRichtext[] | [];

	// useless author stuff
	link_flair_text_color: string;
	author_premium: boolean;
	author_flair_css_class: null;
	author_flair_richtext: any[];
	author_flair_type: string;
	author_flair_text: null;
	author_patreon_flair: boolean;
	author_flair_text_color: null;
	author_flair_background_color: null;

	// post information
	name: string;
	id: string;
	url: string;
	subreddit_type: string;
	thumbnail_width: null;
	author_flair_template_id: null;
	author_fullname: string;
	is_reddit_media_domain: boolean;
	is_original_content: boolean;
	is_meta: boolean;
	approved_by: null;
	distinguished: null;
	subreddit_id: string;

	// rendered things
	upvote_ratio: number;
	saved: boolean;
	ups: number;
	score: number;
	edited: boolean;
	created: number;
	selftext_html: null;
	likes: null;
	awarders: any[];
	media_only: boolean;
	visited: boolean;
	author: string;
	num_comments: number;
	send_replies: boolean;
	media: Media | null;
	crosspost_parent: string;
	permalink: string;
	num_crossposts: number;
	created_utc: number;
	title: string;
	subreddit_name_prefixed: string;

	// moderation
	mod_reports: any[];
	mod_note: null;
	removed_by_category: null;
	banned_by: null;
	banned_at_utc: null;
	over_18: boolean;
	can_gild: boolean;
	removed_by: null;
	report_reasons: null;
	can_mod_post: boolean;
	locked: boolean;
	num_reports: null;
	mod_reason_by: null;
	removal_reason: null;

	// media related
	media_embed: MediaEmbed | {};
	secure_media_embed: MediaEmbed | {};
	gildings: Media | {};
	is_reddit_media_domain: boolean;
	media_metadata?: { [key: string]: MediaMetadatum };
	all_awardings: AllAwarding[] | [];
	gallery_data?: GalleryDataClass;

	// post type indications
	is_self: boolean;
	is_crosspostable: boolean;
	is_video: boolean;
	is_gallery: boolean;

	// crossposting specifics
	crosspost_parent_list?: ChildData[];
	preview?: Preview;
}

interface AllAwarding {
	giver_coin_reward: null;
	subreddit_id: null;
	is_new: boolean;
	days_of_drip_extension: number;
	coin_price: number;
	id: string;
	penny_donate: null;
	coin_reward: number;
	icon_url: string;
	days_of_premium: number;
	icon_height: number;
	tiers_by_required_awardings: null;
	resized_icons: ResizedIcon[];
	icon_width: number;
	static_icon_width: number;
	start_date: null;
	is_enabled: boolean;
	awardings_required_to_grant_benefits: null;
	description: string;
	end_date: null;
	subreddit_coin_reward: number;
	count: number;
	static_icon_height: number;
	name: string;
	resized_static_icons: ResizedIcon[];
	icon_format: null;
	award_sub_type: string;
	penny_price: null;
	award_type: string;
	static_icon_url: string;
}

interface ResizedIcon {
	url: string;
	width: number;
	height: number;
}

// crossposting specifics

interface Preview {
	images: Image[];
	enabled: boolean;
}

interface Image {
	source: ResizedIcon;
	resolutions: ResizedIcon[];
	variants: {};
	id: string;
}

// media
interface Media {
	oembed?: Oembed;
	type?: string;
	reddit_video?: RedditVideo;
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
interface Oembed {
	provider_url: string;
	url: string;
	html: string;
	author_name: string;
	height: number;
	width: number;
	version: string;
	author_url: string;
	provider_name: string;
	cache_age: number;
	type: string;
}
interface MediaEmbed {
	content: string;
	width: number;
	scrolling: boolean;
	height: number;
	media_domain_url?: string;
}

interface MediaMetadatum {
	status: string;
	e: string;
	m: string;
	p: S[];
	s: S;
	id: string;
}

interface GalleryDataClass {
	items: {
		media_id: string;
		id: number;
	}[];
}

// rando shit
interface FlairRichtext {
	e: string;
	t: string;
}

interface Gildings {}

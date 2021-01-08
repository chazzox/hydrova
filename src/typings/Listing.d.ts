interface Listing {
	kind: string;
	data: ListingData;
}

interface ListingData {
	modhash: string;
	dist: number;
	children: Child[];
	after: string;
	before: null;
}

interface Child {
	kind: Kind;
	data: ChildData;
}

interface ChildData {
	media_meta: any;
	approved_at_utc: null;
	subreddit: string;
	selftext: string;
	author_fullname?: string;
	saved: boolean;
	mod_reason_title: null;
	gilded: number;
	clicked: boolean;
	title: string;
	link_flair_richtext: LinkFlairRichtext[];
	subreddit_name_prefixed: string;
	hidden: boolean;
	pwls: number | null;
	link_flair_css_class: null | string;
	downs: number;
	thumbnail_height: number | null;
	top_awarded_type: null | string;
	hide_score: boolean;
	name: string;
	quarantine: boolean;
	link_flair_text_color: FlairTextColor;
	upvote_ratio: number;
	author_flair_background_color: null | string;
	subreddit_type: SubredditType;
	ups: number;
	total_awards_received: number;
	media_embed: DataMediaEmbed;
	thumbnail_width: number | null;
	author_flair_template_id: null | string;
	is_original_content: boolean;
	user_reports: any[];
	secure_media: Media | null;
	is_reddit_media_domain: boolean;
	is_meta: boolean;
	category: null;
	secure_media_embed: DataMediaEmbed;
	link_flair_text: null | string;
	can_mod_post: boolean;
	score: number;
	approved_by: null;
	author_premium?: boolean;
	thumbnail: string;
	edited: boolean | number;
	author_flair_css_class: null | string;
	author_flair_richtext?: AuthorFlairRichtext[];
	gildings: DataGildings;
	post_hint?: string;
	content_categories: null;
	is_self: boolean;
	mod_note: null;
	created: number;
	link_flair_type: AuthorFlairType;
	wls: number | null;
	removed_by_category: null;
	banned_by: null;
	author_flair_type?: AuthorFlairType;
	domain: string;
	allow_live_comments: boolean;
	selftext_html: null | string;
	likes: null;
	suggested_sort: null | string;
	banned_at_utc: null;
	url_overridden_by_dest?: string;
	view_count: null;
	archived: boolean;
	no_follow: boolean;
	is_crosspostable: boolean;
	pinned: boolean;
	over_18: boolean;
	preview?: DataPreview;
	all_awardings: AllAwarding[];
	awarders: any[];
	media_only: boolean;
	link_flair_template_id?: string;
	can_gild: boolean;
	spoiler: boolean;
	locked: boolean;
	author_flair_text: null | string;
	treatment_tags: any[];
	visited: boolean;
	removed_by: null;
	num_reports: null;
	distinguished: null;
	subreddit_id: string;
	mod_reason_by: null;
	removal_reason: null;
	link_flair_background_color: string;
	id: string;
	is_robot_indexable: boolean;
	report_reasons: null;
	author: string;
	discussion_type: null;
	num_comments: number;
	send_replies: boolean;
	whitelist_status: WhitelistStatus | null;
	contest_mode: boolean;
	mod_reports: any[];
	author_patreon_flair?: boolean;
	author_flair_text_color: FlairTextColor | null;
	permalink: string;
	parent_whitelist_status: WhitelistStatus | null;
	stickied: boolean;
	url: string;
	subreddit_subscribers: number;
	created_utc: number;
	num_crossposts: number;
	media: Media | null;
	is_video: boolean;
	crosspost_parent_list?: CrosspostParentList[];
	crosspost_parent?: string;
	is_gallery?: boolean;
	media_metadata?: boolean;
	gallery_data?: boolean;
}

interface AllAwarding {
	giver_coin_reward: number | null;
	subreddit_id: null;
	is_new: boolean;
	days_of_drip_extension: number;
	coin_price: number;
	id: string;
	penny_donate: number | null;
	award_sub_type: AwardSubType;
	coin_reward: number;
	icon_url: string;
	days_of_premium: number;
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
	icon_format: IconFormat | null;
	icon_height: number;
	penny_price: number | null;
	award_type: AwardType;
	static_icon_url: string;
}

enum AwardSubType {
	Global = 'GLOBAL',
	Premium = 'PREMIUM'
}

enum AwardType {
	Global = 'global'
}

enum IconFormat {
	Apng = 'APNG',
	PNG = 'PNG'
}

interface ResizedIcon {
	url: string;
	width: number;
	height: number;
}

interface AuthorFlairRichtext {
	e: string;
	t?: string;
	a?: string;
	u?: string;
}

enum FlairTextColor {
	Dark = 'dark',
	Light = 'light'
}

enum AuthorFlairType {
	Richtext = 'richtext',
	Text = 'text'
}

interface CrosspostParentList {
	approved_at_utc: null;
	subreddit: string;
	selftext: string;
	author_fullname: string;
	saved: boolean;
	mod_reason_title: null;
	gilded: number;
	clicked: boolean;
	title: string;
	link_flair_richtext: any[];
	subreddit_name_prefixed: string;
	hidden: boolean;
	pwls: number;
	link_flair_css_class: string;
	downs: number;
	thumbnail_height: number;
	top_awarded_type: null;
	hide_score: boolean;
	name: string;
	quarantine: boolean;
	link_flair_text_color: FlairTextColor;
	upvote_ratio: number;
	author_flair_background_color: null;
	subreddit_type: SubredditType;
	ups: number;
	total_awards_received: number;
	media_embed: VariantsClass;
	thumbnail_width: number;
	author_flair_template_id: null;
	is_original_content: boolean;
	user_reports: any[];
	secure_media: null;
	is_reddit_media_domain: boolean;
	is_meta: boolean;
	category: null;
	secure_media_embed: VariantsClass;
	link_flair_text: string;
	can_mod_post: boolean;
	score: number;
	approved_by: null;
	author_premium: boolean;
	thumbnail: string;
	edited: boolean;
	author_flair_css_class: null;
	author_flair_richtext: any[];
	gildings: CrosspostParentListGildings;
	post_hint: string;
	content_categories: null;
	is_self: boolean;
	mod_note: null;
	created: number;
	link_flair_type: AuthorFlairType;
	wls: number;
	removed_by_category: null;
	banned_by: null;
	author_flair_type: AuthorFlairType;
	domain: string;
	allow_live_comments: boolean;
	selftext_html: null;
	likes: null;
	suggested_sort: null;
	banned_at_utc: null;
	url_overridden_by_dest: string;
	view_count: null;
	archived: boolean;
	no_follow: boolean;
	is_crosspostable: boolean;
	pinned: boolean;
	over_18: boolean;
	preview: CrosspostParentListPreview;
	all_awardings: AllAwarding[];
	awarders: any[];
	media_only: boolean;
	can_gild: boolean;
	spoiler: boolean;
	locked: boolean;
	author_flair_text: null;
	treatment_tags: any[];
	visited: boolean;
	removed_by: null;
	num_reports: null;
	distinguished: null;
	subreddit_id: string;
	mod_reason_by: null;
	removal_reason: null;
	link_flair_background_color: string;
	id: string;
	is_robot_indexable: boolean;
	report_reasons: null;
	author: string;
	discussion_type: null;
	num_comments: number;
	send_replies: boolean;
	whitelist_status: WhitelistStatus;
	contest_mode: boolean;
	mod_reports: any[];
	author_patreon_flair: boolean;
	author_flair_text_color: null;
	permalink: string;
	parent_whitelist_status: WhitelistStatus;
	stickied: boolean;
	url: string;
	subreddit_subscribers: number;
	created_utc: number;
	num_crossposts: number;
	media: null;
	is_video: boolean;
}

interface CrosspostParentListGildings {
	gid_1: number;
	gid_2: number;
}

interface VariantsClass {}

enum WhitelistStatus {
	AllAds = 'all_ads',
	NoAds = 'no_ads',
	SomeAds = 'some_ads'
}

interface CrosspostParentListPreview {
	images: Image[];
	enabled: boolean;
}

interface Image {
	source: ResizedIcon;
	resolutions: ResizedIcon[];
	variants: VariantsClass;
	id: string;
}

enum SubredditType {
	Public = 'public'
}

interface DataGildings {
	gid_1?: number;
	gid_3?: number;
}

interface LinkFlairRichtext {
	e: AuthorFlairType;
	t: string;
}

interface Media {
	oembed?: Oembed;
	type?: string;
	reddit_video?: RedditVideo;
}

interface Oembed {
	provider_url: string;
	description?: string;
	title: string;
	author_name?: string;
	height: number;
	width: number;
	html: string;
	thumbnail_width: number;
	version: string;
	provider_name: string;
	thumbnail_url: string;
	type: string;
	thumbnail_height: number;
	author_url?: string;
}

interface RedditVideo {
	bitrate_kbps: number;
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

interface DataMediaEmbed {
	content?: string;
	width?: number;
	scrolling?: boolean;
	height?: number;
	media_domain_url?: string;
}

interface DataPreview {
	images: Image[];
	enabled: boolean;
	reddit_video_preview?: RedditVideo;
}

enum Kind {
	T3 = 't3'
}

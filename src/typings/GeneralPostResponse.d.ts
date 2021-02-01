type GeneralPostResponse = [Listing, GeneralPostResponseData];

interface GeneralPostResponseData {
	kind: string;
	data: FluffyData;
}

interface FluffyData {
	modhash: string;
	dist: null;
	children: PurpleChild[];
	after: null;
	before: null;
}

interface PurpleChild {
	kind: Kind;
	data: PurpleData;
}

interface PurpleData {
	total_awards_received: number;
	approved_at_utc: null;
	comment_type: null;
	awarders: any[];
	mod_reason_by: null;
	banned_by: null;
	ups: number;
	author_flair_type: AuthorFlairType;
	removal_reason: null;
	link_id: string;
	author_flair_template_id: null | string;
	likes: null;
	replies: GeneralPostResponseData | '';
	user_reports: any[];
	saved: boolean;
	id: string;
	banned_at_utc: null;
	mod_reason_title: null;
	gilded: number;
	archived: boolean;
	no_follow: boolean;
	author: string;
	can_mod_post: boolean;
	send_replies: boolean;
	parent_id: string;
	score: number;
	author_fullname: string;
	report_reasons: null;
	approved_by: null;
	all_awardings: any[];
	subreddit_id: string;
	body: string;
	edited: boolean;
	downs: number;
	author_flair_css_class: null | string;
	is_submitter: boolean;
	collapsed: boolean;
	author_flair_richtext: AuthorFlairRichtext[];
	author_patreon_flair: boolean;
	body_html: string;
	gildings: {};
	collapsed_reason: null;
	associated_award: null;
	stickied: boolean;
	author_premium: boolean;
	subreddit_type: SubredditType;
	can_gild: boolean;
	top_awarded_type: null;
	author_flair_text_color: AuthorFlairTextColor;
	score_hidden: boolean;
	permalink: string;
	num_reports: null;
	locked: boolean;
	name: string;
	created: number;
	subreddit: Subreddit;
	author_flair_text: string;
	treatment_tags: any[];
	created_utc: number;
	subreddit_name_prefixed: SubredditNamePrefixed;
	controversiality: number;
	depth: number;
	author_flair_background_color: null | string;
	collapsed_because_crowd_control: null;
	mod_reports: any[];
	mod_note: null;
	distinguished: null;
	author_cakeday?: boolean;
}

interface AuthorFlairRichtext {
	e: E;
	t: string;
}

enum E {
	Text = 'text'
}

enum AuthorFlairTextColor {
	Dark = 'dark',
	Light = 'light'
}

enum AuthorFlairType {
	Richtext = 'richtext'
}

interface Gildings {}

enum string {
	T3Kt3Nhu = 't3_kt3nhu'
}

interface PurpleReplies {
	kind: string;
	data: FluffyData;
}

enum Subreddit {
	Formuladank = 'formuladank'
}

enum SubredditNamePrefixed {
	RFormuladank = 'r/formuladank'
}

enum SubredditType {
	Public = 'public'
}

enum Kind {
	T1 = 't1'
}

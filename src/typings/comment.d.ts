export interface Comments {
	kind: ChildKind;
	data: CommentData;
}

export interface CommentData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null | string;
	likes?: null;
	replies?: PurpleReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	send_replies?: boolean;
	parent_id: ID;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	body?: string;
	edited?: boolean;
	downs?: number;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	collapsed?: boolean;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null | string;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null | string;
	treatment_tags?: any[];
	created_utc?: number;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null | string;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null | string;
	count?: number;
	children?: string[];
}

export enum AuthorFlairType {
	Text = 'text'
}

export interface Gildings {}

export enum ID {
	T3Jsvfqh = 't3_jsvfqh'
}

export interface PurpleReplies {
	kind: RepliesKind;
	data: PurpleData;
}

export interface PurpleData {
	modhash: Modhash;
	dist: null;
	children: PurpleChild[];
	after: null;
	before: null;
}

export interface PurpleChild {
	kind: ChildKind;
	data: FluffyData;
}

export interface FluffyData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: FluffyReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	send_replies?: boolean;
	parent_id: string;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	collapsed?: boolean;
	body?: string;
	edited?: boolean | number;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	downs?: number;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	created_utc?: number;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
	count?: number;
	children?: string[];
}

export interface FluffyReplies {
	kind: RepliesKind;
	data: TentacledData;
}

export interface TentacledData {
	modhash: Modhash;
	dist: null;
	children: FluffyChild[];
	after: null;
	before: null;
}

export interface FluffyChild {
	kind: ChildKind;
	data: StickyData;
}

export interface StickyData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: TentacledReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	created_utc?: number;
	send_replies?: boolean;
	parent_id: string;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	body?: string;
	edited?: boolean;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	downs?: number;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	collapsed?: boolean;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
	count?: number;
	children?: string[];
}

export interface TentacledReplies {
	kind: RepliesKind;
	data: IndigoData;
}

export interface IndigoData {
	modhash: Modhash;
	dist: null;
	children: TentacledChild[];
	after: null;
	before: null;
}

export interface TentacledChild {
	kind: ChildKind;
	data: IndecentData;
}

export interface IndecentData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: StickyReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	send_replies?: boolean;
	parent_id: string;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	body?: string;
	edited?: boolean;
	downs?: number;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	collapsed?: boolean;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	created_utc?: number;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
	count?: number;
	children?: string[];
}

export interface StickyReplies {
	kind: RepliesKind;
	data: HilariousData;
}

export interface HilariousData {
	modhash: Modhash;
	dist: null;
	children: StickyChild[];
	after: null;
	before: null;
}

export interface StickyChild {
	kind: ChildKind;
	data: AmbitiousData;
}

export interface AmbitiousData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: IndigoReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	send_replies?: boolean;
	parent_id: string;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	collapsed?: boolean;
	body?: string;
	edited?: boolean;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	downs?: number;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	created_utc?: number;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
	count?: number;
	children?: string[];
}

export interface IndigoReplies {
	kind: RepliesKind;
	data: CunningData;
}

export interface CunningData {
	modhash: Modhash;
	dist: null;
	children: IndigoChild[];
	after: null;
	before: null;
}

export interface IndigoChild {
	kind: ChildKind;
	data: MagentaData;
}

export interface MagentaData {
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: IndecentReplies | string;
	user_reports?: any[];
	saved?: boolean;
	id: string;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	created_utc?: number;
	send_replies?: boolean;
	parent_id: string;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	body?: string;
	edited?: boolean;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	downs?: number;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	name: string;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	collapsed?: boolean;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	depth: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
	count?: number;
	children?: string[];
}

export interface IndecentReplies {
	kind: RepliesKind;
	data: FriskyData;
}

export interface FriskyData {
	modhash: Modhash;
	dist: null;
	children: IndecentChild[];
	after: null;
	before: null;
}

export interface IndecentChild {
	kind: ChildKind;
	data: MischievousData;
}

export interface MischievousData {
	count?: number;
	name: string;
	id: string;
	parent_id: string;
	depth: number;
	children?: string[];
	total_awards_received?: number;
	approved_at_utc?: null;
	comment_type?: null;
	awarders?: any[];
	mod_reason_by?: null;
	banned_by?: null;
	ups?: number;
	author_flair_type?: AuthorFlairType;
	removal_reason?: null;
	link_id?: ID;
	author_flair_template_id?: null;
	likes?: null;
	replies?: string;
	user_reports?: any[];
	saved?: boolean;
	banned_at_utc?: null;
	mod_reason_title?: null;
	gilded?: number;
	archived?: boolean;
	no_follow?: boolean;
	author?: string;
	can_mod_post?: boolean;
	send_replies?: boolean;
	score?: number;
	author_fullname?: string;
	report_reasons?: null;
	approved_by?: null;
	all_awardings?: any[];
	subreddit_id?: SubredditID;
	body?: string;
	edited?: boolean;
	downs?: number;
	author_flair_css_class?: null;
	is_submitter?: boolean;
	collapsed?: boolean;
	author_flair_richtext?: any[];
	author_patreon_flair?: boolean;
	body_html?: string;
	gildings?: Gildings;
	collapsed_reason?: null;
	associated_award?: null;
	stickied?: boolean;
	author_premium?: boolean;
	subreddit_type?: SubredditType;
	can_gild?: boolean;
	top_awarded_type?: null;
	author_flair_text_color?: null;
	score_hidden?: boolean;
	permalink?: string;
	num_reports?: null;
	locked?: boolean;
	created?: number;
	subreddit?: Subreddit;
	author_flair_text?: null;
	treatment_tags?: any[];
	created_utc?: number;
	subreddit_name_prefixed?: SubredditNamePrefixed;
	controversiality?: number;
	author_flair_background_color?: null;
	collapsed_because_crowd_control?: null;
	mod_reports?: any[];
	mod_note?: null;
	distinguished?: null;
}

export enum Subreddit {
	Fightporn = 'fightporn'
}

export enum SubredditID {
	T52U5Un = 't5_2u5un'
}

export enum SubredditNamePrefixed {
	RFightporn = 'r/fightporn'
}

export enum SubredditType {
	Public = 'public'
}

export enum ChildKind {
	More = 'more',
	T1 = 't1'
}

export enum Modhash {
	Lmvj96Xxew43Fb7B68E4019354Bf185Bdd60E9A7E6Ff04600C = 'lmvj96xxew43fb7b68e4019354bf185bdd60e9a7e6ff04600c'
}

export enum RepliesKind {
	Listing = 'Listing'
}

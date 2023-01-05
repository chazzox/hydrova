import { PrefixObject, Spread } from './utils.d';

/**
 * An enum that describes all the different possible reddit 'things'
 */
export enum REDDIT_THING_TYPES {
	COMMENT = 't1',
	ACCOUNT = 't2',
	LINK = 't3',
	MESSAGE = 't4',
	SUBREDDIT = 't5',
	AWARD = 't6',
	LISTING = 'Listing',
	MULTI = 'LabeledMulti'
}

export enum VISIBILITY_TYPES {
	PRIVATE = 'private',
	PUBLIC = 'public',
	HIDDEN = 'hidden'
}

type ReturnType<K extends REDDIT_THING_TYPES, D> = { kind: K; data: D };

/**
 * @todo FIX ANY
 */
type POST_LISTING_DATA = ReturnType<REDDIT_THING_TYPES.LINK, any>;
type SUBREDDIT_LISTING_DATA = ReturnType<
	REDDIT_THING_TYPES.SUBREDDIT,
	Spread<
		[
			{
				user_flair_background_color: null | string;
				submit_text_html: string;
				restrict_posting: boolean;
				user_is_banned: boolean;
				free_form_reports: boolean;
				wiki_enabled: boolean;
				user_is_muted: boolean;
				user_can_flair_in_sr: null | boolean;
				header_img: string;
				title: string;
				allow_galleries: boolean;
				/**
				 * @todo FIX ANY
				 */
				icon_size: null | any;
				primary_color: string;
				active_user_count: null | number;
				icon_img: string;
				accounts_active: null | number;
				public_traffic: boolean;
				subscribers: number;
				user_flair_richtext: string[];
				videostream_links_count: number;
			},
			PrefixObject<{ display_name: string }, 'display_name', 'display_name_prefixed', 'r/'>
		]
	>
>;

type MULTI_DATA = {
	can_edit: boolean;
	display_name: string;
	name: string;
	description_html: string;
	num_subscribers: number;
	/**
	 * @todo FIX ANY
	 */
	copied_from: null | any;
	icon_url: string;
	subreddits: { name: string }[];
	created_utc: number;
	visibility: VISIBILITY_TYPES;
	created: number;
	over_18: boolean;
	path: string;
	owner: string;
	/**
	 * @todo FIX ANY
	 */
	key_color: null | any;
	is_subscriber: boolean;
	owner_id: `${REDDIT_THING_TYPES.ACCOUNT}_${string}`;
	description_md: string;
	is_favorited: boolean;
};

type Listing<T extends REDDIT_THING_TYPES, TData> = {
	after: `${T}_${string}` | null;
	before: `${T}_${string}` | null;
	dist: number;
	modhash: string;
	children: TData[];
};

// actual reddit endpoints
export type Subreddit = ReturnType<
	REDDIT_THING_TYPES.LISTING,
	Listing<REDDIT_THING_TYPES.SUBREDDIT, SUBREDDIT_LISTING_DATA>
>;
export type Post = ReturnType<
	REDDIT_THING_TYPES.LISTING,
	Listing<REDDIT_THING_TYPES.LINK, POST_LISTING_DATA>
>;
export type Multi = ReturnType<REDDIT_THING_TYPES.MULTI, MULTI_DATA>[];
export type Comments = ReturnType<
	REDDIT_THING_TYPES.LISTING,
	Listing<REDDIT_THING_TYPES.COMMENT, {}>
>;

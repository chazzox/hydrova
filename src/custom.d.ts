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

interface post {
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
	// 	galleryData: {
	// 		items: {
	// 			media_id: string;
	// 			id: number;
	// 		}[];
	// 	};
}

interface SidebarStoredSub {
	display_name: string;
	icon_img: string;
	subreddit_type: string;
	icon_color: string;
	community_icon?: string;
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
			data: SidebarStoredSub;
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

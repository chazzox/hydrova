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
	display_name: string;
	community_icon: string;
	icon_img: string;
	subreddit_type: string;
	primary_color: string;
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

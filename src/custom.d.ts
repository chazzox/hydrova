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
	icon_img: string;
	subreddit_type: string;
}

interface userSub {
	kind: string;
	data: sub;
}

type userSubSuccess = {
	kind: string;
	data: {
		after: string | null | undefined;
		before: string | null;
		dist: number;
		children: userSub[];
	};
};

interface responseSuccess {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

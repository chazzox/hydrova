import { Listing } from 'typings/reddit';

const REDDIT_BASE = 'https://oauth.reddit.com/' as const;

enum METHODS {
	GET = 'GET',
	POST = 'POST'
}

const REDDIT_ENDPOINTS = {
	REFRESH_TOKEN: new URL('api/v1/access_token', REDDIT_BASE),
	LISTING: new URL(REDDIT_BASE),
	SUBREDDIT: new URL('/subreddits/mine/subscriber', REDDIT_BASE),
	MULTI_SUBREDDIT: new URL('/api/multi/mine', REDDIT_BASE)
} as const;

type fetch_refresh_token_call_sig = (b: string) => Promise<{
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}>;
export const fetchRefreshToken: fetch_refresh_token_call_sig = async (refreshToken) => {
	const req_url = new URL(REDDIT_ENDPOINTS.REFRESH_TOKEN);
	req_url.searchParams.append('grant_type', 'refresh_token');
	req_url.searchParams.append('refresh_token', refreshToken);
	req_url.searchParams.append('raw_json', '1');

	const req = await fetch(req_url, {
		method: METHODS.POST,
		headers: {
			Authorization:
				'Basic ' +
				btoa(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_CLIENT_SECRET)
		}
	});

	const res = await req.json();
	return res;
};

type get_listing_call_sig = (
	accessToken: string,
	searchParams?: { [key: string]: string }
) => Promise<Listing>;
export const getListing: get_listing_call_sig = async (
	accessToken,
	searchParams = { raw_json: '1' }
) => {
	const req_url = new URL(REDDIT_ENDPOINTS.LISTING);

	// adding any parameters to request url
	Object.entries(searchParams).forEach(([k, v]) => {
		req_url.searchParams.append(k, v);
	});

	const req = await fetch(req_url, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
	});

	const res = (await req.json()) as Listing;

	return res;
};

type get_subreddit_call_sig = (token: string) => Promise<any>;
export const getSubreddit: get_subreddit_call_sig = async (token) => {
	const req = await fetch(REDDIT_ENDPOINTS.SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});

	const res = await req.json();

	return res;
};

type get_multi_subreddit_call_sig = (token: string) => Promise<any>;
export const getMulti = async (token: any) => {
	const req = await fetch(REDDIT_ENDPOINTS.MULTI_SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});

	const res = await req.json();

	return res;
};

export const post = async () => {
	return;
};

export const comments = async () => {
	return;
};

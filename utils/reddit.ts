import { Multi, Post, Subreddit } from 'typings/reddit';

const REDDIT_BASE = 'https://oauth.reddit.com/' as const;

const METHODS = {
	GET: 'GET',
	POST: 'POST'
} as const;

const REDDIT_ENDPOINTS = {
	REFRESH_TOKEN: new URL('api/v1/access_token', REDDIT_BASE),
	LISTING: new URL(REDDIT_BASE),
	SUBREDDIT: new URL('/subreddits/mine/subscriber', REDDIT_BASE),
	MULTI_SUBREDDIT: new URL('/api/multi/mine', REDDIT_BASE)
} as const;

export const fetchRefreshToken = async (refreshToken: string) => {
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
	const res = (await req.json()) as {
		access_token: string;
		expires_in: number;
		scope: string;
		token_type: string;
	};
	return res;
};

export const getListing = async (
	accessToken: string,
	searchParams: { [key: string]: string } = { raw_json: '1' }
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
	const res = (await req.json()) as Post;
	return res;
};

export const getSubreddit = async (token: string) => {
	const req = await fetch(REDDIT_ENDPOINTS.SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});
	const res = (await req.json()) as Subreddit;
	return res;
};

export const getMulti = async (token: string) => {
	const req = await fetch(REDDIT_ENDPOINTS.MULTI_SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});
	const res = (await req.json()) as Multi;
	return res;
};

export const post = async () => {
	return;
};

export const comments = async () => {
	return;
};

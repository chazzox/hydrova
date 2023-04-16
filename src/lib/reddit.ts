import type { Multi, Post, Subreddit } from './types/reddit';

const REDDIT_BASE = 'https://api.reddit.com/' as const;
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
				'Basic ' + btoa(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_CLIENT_SECRET)
		}
	});
	/**
	 * @todo: create better types for this response.
	 */
	const res = (await req.json()) as {
		access_token: string;
		expires_in: number;
		scope: string;
		token_type: string;
	};
	return res;
};

// improve getListing and getFullPost types

/**
 * fetches a subreddit or user listing from reddit
 * @param listing_string the url reddit sub listing
 * @param searchParams an object representing a search params
 * @returns listing object
 */
export const getListing = async (listing_string: string, searchParams?: { [key: string]: any }) => {
	const req_url = new URL(listing_string, REDDIT_ENDPOINTS.LISTING);
	req_url.searchParams.append('raw_json', '1');

	// adding any parameters to request url
	Object.entries(searchParams || {}).forEach(([k, v]) => {
		req_url.searchParams.append(k, v);
	});

	const req = await fetch(req_url, {
		method: METHODS.GET
	});
	const res = (await req.json()) as Post;
	return res;
};

export const getFullPost = async (post_id: string) => {
	return await getListing(post_id);
};

export const getUserSubreddit = async (token: string) => {
	const req = await fetch(REDDIT_ENDPOINTS.SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});
	const res = (await req.json()) as Subreddit;
	return res;
};

export const getUserMultireddits = async (token: string) => {
	const req = await fetch(REDDIT_ENDPOINTS.MULTI_SUBREDDIT, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${token}` }
	});
	const res = (await req.json()) as Multi;
	return res;
};

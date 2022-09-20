import { Listing } from 'typings/reddit';

enum METHODS {
	GET = 'GET',
	POST = 'POST'
}

type listing_call_sig = (
	accessToken: string,
	searchParams?: { [key: string]: string }
) => Promise<Listing>;
export const getListing: listing_call_sig = async (
	accessToken,
	searchParams = { raw_json: '1' }
) => {
	const req_url = new URL('https://oauth.reddit.com/');

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

type fetch_refresh_token_call_sig = (
	a: string,
	b: string
) => Promise<{ accessToken: string; refreshToken: string }>;
export const fetchRefreshToken: fetch_refresh_token_call_sig = async (a, r) => {
	return Promise.resolve({ accessToken: '', refreshToken: '' });
};
export const multi = async () => {
	return;
};
export const post = async () => {
	return;
};
export const comments = async () => {
	return;
};

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

export const refreshToken = async () => {
	return;
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

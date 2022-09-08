enum METHODS {
	GET = 'GET',
	POST = 'POST'
}

type listing_call_sig = (accessToken: string, listingParams?: string) => Promise<Listing>;
export const listing: listing_call_sig = async (accessToken, listParams = '') => {
	const req_url = new URL('https://oauth.reddit.com/');
	const req = await fetch(req_url, {
		method: METHODS.GET,
		headers: { Authorization: `Bearer ${accessToken}` }
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

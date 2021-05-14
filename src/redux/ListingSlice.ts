import { createSlice } from '@reduxjs/toolkit';
import getValues from '@utils/getPostValues';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkInterface } from '@typings/Thunk';

export const GET_LISTING = createAsyncThunk<
	Listing,
	{ listingEndpointName: string; params?: { [key: string]: any } },
	ThunkInterface
>('post/getListing', async ({ listingEndpointName, params }, { getState, rejectWithValue }) => {
	const ListingURL = new URL(`https://oauth.reddit.com/${listingEndpointName}`);
	if (params) Object.keys(params).forEach((key) => ListingURL.searchParams.append(key, params[key]));

	const response = await fetch(ListingURL.toString(), {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().settings.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON);
	return responseJSON;
});

export const GET_POST = createAsyncThunk<[Listing, Listing], { id: string }, ThunkInterface>(
	'post/getPost',
	async ({ id }, { getState, rejectWithValue }) => {
		const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${getState().settings.access_token}` }
		});
		const responseJSON = await response.json();
		if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON);
		return responseJSON;
	}
);

const ListingSlice = createSlice({
	name: 'ListingSlice',
	initialState: {
		posts: {} as {
			[key: string]: Post | undefined;
		},
		listingKey: {} as {
			[key: string]: { postKeys?: string[]; afterId: string; isFetchingListing: boolean };
		},
		isFetchingListing: false,
		isFetchingComment: false
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			action.payload.data.children.forEach(
				({ data }) => (state.posts[data.id] = { ...state.posts[data.id], ...getValues(data) })
			);
			state.listingKey[action.meta.arg.listingEndpointName] = {
				...state.listingKey[action.meta.arg.listingEndpointName],
				postKeys: [
					...(state.listingKey[action.meta.arg.listingEndpointName]?.postKeys || []),
					...action.payload.data.children.map(({ data: { id } }) => id)
				],
				afterId: action.payload.data.after
			};
			state.isFetchingListing = false;
		});

		builder.addCase(GET_LISTING.pending, (state) => {
			state.isFetchingListing = true;
		});

		//  sub fetch failed
		builder.addCase(GET_LISTING.rejected, (state, action) => {
			state.isFetchingListing = false;
			console.log('failure', action);
		});

		// get post thunk actions
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			state.posts[action.meta.arg.id] = getValues(action.payload[0].data.children[0].data);
		});
	}
});

export default ListingSlice;

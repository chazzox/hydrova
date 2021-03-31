import { createSlice } from '@reduxjs/toolkit';
import getValues from '@utils/getPostValues';

import { GET_LISTING, GET_POST } from './ListingThunks';

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
		isFetchingComment: false,
		postSortType: '' as SortOptionType
	},
	reducers: {},
	extraReducers: (builder) => {
		// subreddit thunk actions
		// sub fetch succeeds
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
		builder.addCase(GET_LISTING.rejected, (state) => {
			state.isFetchingListing = false;
		});

		// get post thunk actions
		builder.addCase(GET_POST.fulfilled, (state, action) => {
			state.isFetchingListing = true;
			state.posts[action.meta.arg.id] = getValues(action.payload[0].data.children[0].data);
		});
		builder.addCase(GET_POST.pending, (state) => {
			state.isFetchingListing = false;
		});
	}
});

export default ListingSlice;

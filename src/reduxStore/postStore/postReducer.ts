import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getValues from '../../utils/getPostValues';

import { GET_LISTING } from './postThunks';

const postReducer = createSlice({
	name: 'postReducer',
	initialState: {
		posts: {} as {
			[key: string]: {
				comments?: { commentArray: any[]; latestComment: string };
				postContent: Post;
			};
		},
		listingKey: {} as {
			[key: string]: { postKeys?: string[]; afterId: string; isFetching: boolean };
		},
		isFetching: false,
		postSortType: '' as SortOptionType,
		commentSortType: '' as SortOptionType
	},
	reducers: {
		setSortType(
			state,
			{
				payload: { isCommentSort, sortType }
			}: PayloadAction<{ isCommentSort: boolean; sortType: SortOptionType }>
		) {
			state[isCommentSort ? 'commentSortType' : 'postSortType'] = sortType;
		}
	},
	extraReducers: (builder) => {
		// subreddit thunk actions
		// sub fetch succeeds
		builder.addCase(GET_LISTING.fulfilled, (state, action) => {
			action.payload.data.children.forEach(
				({ data }) => (state.posts[data.id] = { ...state.posts[data.id], postContent: getValues(data) })
			);
			state.listingKey[action.meta.arg.listingEndpointName] = {
				...state.listingKey[action.meta.arg.listingEndpointName],
				postKeys: [
					...(state.listingKey[action.meta.arg.listingEndpointName]?.postKeys || []),
					...action.payload.data.children.map(({ data: { id } }) => id)
				],
				afterId: action.payload.data.after
			};
			state.isFetching = false;
		});

		builder.addCase(GET_LISTING.pending, (state) => {
			state.isFetching = true;
		});

		//  sub fetch failed
		builder.addCase(GET_LISTING.rejected, (state, action) => {
			state.listingKey[action.meta.arg.listingEndpointName] = {
				...state.listingKey[action.meta.arg.listingEndpointName],
				isFetching: false
			};
		});
	}
});

export const { setSortType } = postReducer.actions;

export default postReducer;

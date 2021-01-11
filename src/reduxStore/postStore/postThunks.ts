import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkInterface } from 'typings/Thunk';

export const GET_LISTING = createAsyncThunk<
	Listing,
	{
		listingEndpointName: string;
		sortType?: SortOptionType;
		listingQueryParams?: { [key: string]: string };
	},
	ThunkInterface
>(
	'post/getListing',
	async ({ listingEndpointName, sortType = '', listingQueryParams }, { getState, rejectWithValue }) => {
		const response = await fetch(
			`https://oauth.reddit.com${listingEndpointName}${sortType}${
				typeof listingQueryParams != 'undefined'
					? '?' +
					  Object.keys(listingQueryParams)
							.map((key: string) => key + '=' + listingQueryParams[key])
							.join('&')
					: ''
			}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${getState().auth.access_token}` }
			}
		);
		const responseJSON = await response.json();
		if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON);
		return responseJSON;
	}
);

export const GET_POST = createAsyncThunk<GeneralPostResponse, { id: string }, ThunkInterface>(
	'post/getPost',
	async ({ id }, { getState, rejectWithValue }) => {
		const response = await fetch(`https://oauth.reddit.com/comments/${id}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${getState().auth.access_token}` }
		});
		const responseJSON = await response.json();
		if (response.status === 400 || response.status === 404) return rejectWithValue(responseJSON);
		return responseJSON;
	}
);

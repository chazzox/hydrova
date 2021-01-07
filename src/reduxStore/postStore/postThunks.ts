import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from '../reduxWrapper';

export const GET_LISTING = createAsyncThunk<
	Listing,
	{
		listingEndpointName: string;
		sortType?: SortOptionType;
		listingQueryParams?: { [key: string]: string };
	},
	{ state: ReduxStateType; rejectValue: Failure }
>(
	'sidebar/getListing',
	async ({ listingEndpointName, sortType = '', listingQueryParams }, { getState, rejectWithValue }) => {
		const response = await fetch(
			`https://oauth.reddit.com${listingEndpointName}${sortType}?${
				typeof listingQueryParams != 'undefined'
					? Object.keys(listingQueryParams)
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
		if (response.status === 400) return rejectWithValue(responseJSON as Failure);
		return responseJSON;
	}
);

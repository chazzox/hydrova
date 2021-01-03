import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxStateType } from '../reduxWrapper';

export const GET_LISTING = createAsyncThunk<
	{ postArray: ListingResponse },
	{ listingEndpointName: string; listingQueryParams?: string },
	{ state: ReduxStateType; rejectValue: Failure }
>('sidebar/getListing', async ({ listingEndpointName, listingQueryParams = '' }, { getState, rejectWithValue }) => {
	const response = await fetch(`https://oauth.reddit.com${listingEndpointName}${listingQueryParams}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${getState().auth.access_token}` }
	});
	const responseJSON = await response.json();
	if (response.status === 400) return rejectWithValue(responseJSON as Failure);
	return { postArray: responseJSON };
});

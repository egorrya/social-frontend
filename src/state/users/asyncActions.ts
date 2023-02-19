import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchFollowUsersOptions,
	FollowApi,
} from '../../services/api/FollowApi';

export const getFollowUsers = createAsyncThunk(
	'followUsers',
	async (options: fetchFollowUsersOptions, { rejectWithValue }) => {
		try {
			const response = await FollowApi.getList(options);

			return response;
		} catch (error: any) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

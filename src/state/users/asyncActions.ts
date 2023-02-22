import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchFollowUsersOptions,
	FollowApi,
} from '../../services/api/FollowApi';
import { UsersApi } from '../../services/api/UsersApi';

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

export const getUser = createAsyncThunk(
	'oneUser',
	async (username: string, { rejectWithValue }) => {
		try {
			const { data } = await UsersApi.getOne(username);

			return data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

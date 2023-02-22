import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { Status } from '../../types/fetchStatus';
import { getUser } from './asyncActions';

interface SingleUserState {
	user: User | null;
	error: unknown;
	status: Status;
}

const initialState: SingleUserState = {
	user: null,
	error: null,
	status: Status.NEVER,
};

const singleUserSlice = createSlice({
	name: 'singleUser',
	initialState,
	reducers: {
		initializeUser(state, action) {
			state.user = action.payload;
			state.status = Status.SUCCESS;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.status = Status.LOADING;
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = Status.SUCCESS;
				state.error = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload;
			});
	},
});

export const { initializeUser } = singleUserSlice.actions;
export default singleUserSlice.reducer;

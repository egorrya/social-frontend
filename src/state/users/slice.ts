import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { Status } from '../../types/fetchStatus';
import { getFollowUsers } from './asyncActions';

interface UsersState {
	users: User[];
	error: unknown;
	lastPage: number | null;
	currentPage: number;

	status: Status;
}

const initialState: UsersState = {
	users: [],
	error: null,
	lastPage: null,
	currentPage: 1,

	status: Status.LOADING,
};

function handlePending(state: UsersState) {
	state.status = Status.LOADING;
}

function handleRejected(state: UsersState, action: PayloadAction<unknown>) {
	state.status = Status.ERROR;
	state.error = action.payload;
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUsers: (state) => {
			state.users = [];
			state.error = null;
			state.lastPage = null;
			state.status = Status.NEVER;
			state.currentPage = 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFollowUsers.pending, (state) => handlePending(state))
			.addCase(
				getFollowUsers.fulfilled,
				(state, action: PayloadAction<any>) => {
					const users = action.payload.data.map(
						(item: { target_user: User }) => item.target_user
					);

					state.users = [...state.users, ...users];

					state.status = Status.SUCCESS;
					state.lastPage = action.payload.last_page;
					state.currentPage = action.payload.page;
				}
			)
			.addCase(getFollowUsers.rejected, (state, action) =>
				handleRejected(state, action)
			);
	},
});

export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;

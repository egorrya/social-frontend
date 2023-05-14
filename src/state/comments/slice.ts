import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import { Status } from '../../types/fetchStatus';
import { getAllComments } from './asyncActions';

interface CommentsState {
	comments: Comment[];
	error: unknown;
	lastPage: number | null;
	currentPage: number;
	status: Status;
}

const initialState: CommentsState = {
	comments: [],
	error: null,
	lastPage: null,
	currentPage: 1,
	status: Status.LOADING,
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		clearComments: (state) => {
			state.comments = [];
			state.error = null;
			state.lastPage = null;
			state.status = Status.NEVER;
			state.currentPage = 1;
		},
		addNewComment: (state, action: PayloadAction<Comment>) => {
			state.comments = [action.payload, ...state.comments];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllComments.pending, (state) => {
				state.status = Status.LOADING;
				state.error = null;
			})
			.addCase(getAllComments.fulfilled, (state, action) => {
				state.comments = [...state.comments, ...action.payload.data];
				state.status = Status.SUCCESS;
				state.error = null;
				state.lastPage = action.payload.last_page;
				state.currentPage = action.payload.page;
			})
			.addCase(getAllComments.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload as string;
			});
	},
});

export const { clearComments, addNewComment } = commentsSlice.actions;
export default commentsSlice.reducer;

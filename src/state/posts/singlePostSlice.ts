import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../components/ui/PostCard/types';
import { Status } from '../../types/fetchStatus';
import { getPost } from './asyncActions';

interface SinglePostState {
	post: Post | null;
	error: unknown;
	status: Status;
}

const initialState: SinglePostState = {
	post: null,
	error: null,
	status: Status.NEVER,
};

const postEditSlice = createSlice({
	name: 'singlePost',
	initialState,
	reducers: {
		addCommentCountToSinglePost: (state) => {
			if (state.post) {
				state.post.commentsCount += 1;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPost.pending, (state) => {
				state.status = Status.LOADING;
				state.error = null;
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.post = action.payload;
				state.status = Status.SUCCESS;
				state.error = null;
			})
			.addCase(getPost.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload;
			});
	},
});

export const { addCommentCountToSinglePost } = postEditSlice.actions;
export default postEditSlice.reducer;

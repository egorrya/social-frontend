import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../components/ui/PostCard/types';
import { Status } from '../../types/fetchStatus';

import { getPosts } from './asyncActions';

export interface PostsState {
	posts: Post[];
	error: unknown;
	lastPage: number | null;
	currentPage: number;
	activeFilter: string;

	status: Status;
}

const initialState: PostsState = {
	posts: [],
	error: null,
	lastPage: null,
	currentPage: 1,
	activeFilter: '',

	status: Status.NEVER,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		clearPosts: (state) => {
			state.posts = [];
			state.error = null;
			state.lastPage = 1;
			state.status = Status.NEVER;
			state.currentPage = 1;

			state.activeFilter = '';
		},
		addNewPost: (state, action: PayloadAction<Post>) => {
			state.posts = [action.payload, ...state.posts];
		},
		editPost: (state, action: PayloadAction<Post>) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload._id) {
					return action.payload;
				}
				return post;
			});
		},
		deletePost: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		addCommentsCount: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload) {
					return { ...post, commentsCount: post.commentsCount + 1 };
				}
				return post;
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPosts.pending, (state) => {
				state.status = Status.LOADING;
				state.error = null;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				if (action.payload.clearPosts) {
					state.posts = action.payload.data;
				} else {
					state.posts = [...state.posts, ...action.payload.data];
				}
				state.status = Status.SUCCESS;
				state.error = null;
				state.lastPage = action.payload.last_page;
				state.currentPage = action.payload.page;

				state.activeFilter = action.payload.activeFilter;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload as string;
			});
	},
});

export const {
	clearPosts,
	addNewPost,
	editPost,
	deletePost,
	addCommentsCount,
} = postsSlice.actions;
export default postsSlice.reducer;

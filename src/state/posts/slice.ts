import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/fetchStatus';
import { getAllPosts } from './asyncActions';

interface Post {
  _id: string;
  text: string;
}

interface PostsState {
  posts: Post[] | [];
  status: Status;
  error: unknown;
  lastPage: number | null;
}

const initialState: PostsState = {
  posts: [],
  status: Status.NEVER,
  error: null,
  lastPage: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.data];
        state.status = Status.SUCCESS;
        state.error = null;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as string;
      });
  },
});

// export const { incrementPage } = postsSlice.actions;
export default postsSlice.reducer;

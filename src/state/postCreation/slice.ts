import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/fetchStatus';
import { createPost } from './asyncActions';

interface PostCreationState {
  postData: any;
  error: unknown;
  status: Status;
}

const initialState: PostCreationState = {
  postData: null,
  error: null,
  status: Status.NEVER,
};

const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postData = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload;
      });
  },
});

export default postCreationSlice.reducer;

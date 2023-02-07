import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/fetchStatus';
import { auth, getMe } from './asyncActions';
import { authSliceState, User } from './types';

const initialState: authSliceState = {
  user: null,
  status: Status.NEVER,
  error: null,
  loggedIn: localStorage.getItem('token') ? true : false,
  loggedInWithSubmit: false,
};

const handlePending = (state: authSliceState) => {
  state.user = null;
  state.status = Status.LOADING;
  state.error = null;
  state.loggedIn = false;
  state.loggedInWithSubmit = false;
};

const handleFulfilled = (
  state: authSliceState,
  action: PayloadAction<User | null>,
  loggedInWithSubmit: boolean
) => {
  state.user = action.payload;
  state.status = Status.SUCCESS;
  state.error = null;
  state.loggedIn = true;
  state.loggedInWithSubmit = loggedInWithSubmit;
};

const handleRejected = (
  state: authSliceState,
  action: PayloadAction<unknown>
) => {
  state.user = null;
  state.status = Status.ERROR;
  state.error = action.payload;
  state.loggedIn = false;
  state.loggedInWithSubmit = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = Status.NEVER;
      state.error = null;
      state.loggedIn = false;
      state.loggedInWithSubmit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => handlePending(state))
      .addCase(auth.fulfilled, (state, action) =>
        handleFulfilled(state, action, true)
      )
      .addCase(auth.rejected, (state, action) => handleRejected(state, action));

    builder
      .addCase(getMe.pending, (state) => handlePending(state))
      .addCase(getMe.fulfilled, (state, action) =>
        handleFulfilled(state, action, false)
      )
      .addCase(getMe.rejected, (state, action) =>
        handleRejected(state, action)
      );
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;

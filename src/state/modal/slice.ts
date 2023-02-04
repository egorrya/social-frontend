import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModalId: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModalId: (state, action: PayloadAction<string>) => {
      state.activeModalId = action.payload;
    },
  },
});

export const { setActiveModalId } = modalSlice.actions;

export default modalSlice.reducer;

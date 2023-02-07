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
    disableModal: (state) => {
      state.activeModalId = '';
    },
  },
});

export const { setActiveModalId, disableModal } = modalSlice.actions;

export default modalSlice.reducer;

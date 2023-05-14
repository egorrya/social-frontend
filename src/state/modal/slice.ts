import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeModalId: '',
	showModal: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setActiveModalId: (state, action: PayloadAction<string>) => {
			state.activeModalId = action.payload;
			state.showModal = true;
		},
		disableModal: (state) => {
			state.activeModalId = '';
			state.showModal = false;
		},
	},
});

export const { setActiveModalId, disableModal } = modalSlice.actions;

export default modalSlice.reducer;

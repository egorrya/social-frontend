import { createSlice } from '@reduxjs/toolkit';

interface NotificationPopupState {
	isOpen: boolean;
	message: string;
	status: 'success' | 'error';
}

const initialState: NotificationPopupState = {
	isOpen: false,
	message: '',
	status: 'success',
};

export const notificationPopupSlice = createSlice({
	name: 'notificationPopup',
	initialState,
	reducers: {
		openPopup: (state, action) => {
			state.isOpen = true;
			state.message = action.payload.message;
			state.status = action.payload.status;
		},
		closePopup: (state) => {
			state.isOpen = false;
			state.message = '';
		},
	},
});

export const { openPopup, closePopup } = notificationPopupSlice.actions;

export default notificationPopupSlice.reducer;

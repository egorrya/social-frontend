import { createSlice } from '@reduxjs/toolkit';
import { homeFilterType } from '../../types/index';

interface FiltersState {
	activeHomeFilter: homeFilterType;
}

const initialState: FiltersState = {
	activeHomeFilter: 'all',
};

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveHomeFilter: (state, action) => {
			state.activeHomeFilter = action.payload;
		},
	},
});

export const { setActiveHomeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;

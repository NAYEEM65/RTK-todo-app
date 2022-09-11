import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "All",
  selectedColors: [],
};
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusChanged: (state, action) => {
      state.status = action.payload;
    },
    colorAdded: (state, action) => {
      state.selectedColors.push(action.payload);
    },
    colorRemoved: (state, action) => {
      state.selectedColors = state.selectedColors.filter(
        (color) => color !== action.payload
      );
    },
  },
});

export default filterSlice.reducer;
export const { statusChanged, colorAdded, colorRemoved } = filterSlice.actions;

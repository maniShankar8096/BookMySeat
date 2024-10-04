import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader", //name of the slice
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true; //mutable way of changing state
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = loaderSlice.actions; //action creators

export default loaderSlice.reducer;

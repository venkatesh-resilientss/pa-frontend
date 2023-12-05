// apiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "userInfo",
  initialState: {
    responseData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDataStart: (state) => {
      state.isLoading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.isLoading = false;
      state.responseData = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = apiSlice.actions;
export const UserInfo = (state) => state.roles;
export default apiSlice.reducer;
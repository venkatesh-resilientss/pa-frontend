import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteClientPopup: { status: false, helperData: null },
};

const clientsSlice = createSlice({
  initialState,
  name: "clients",
  reducers: {
    //**clients */

    //Delete

    openDeleteClientPopup(state, action) {
      state.deleteClientPopup.helperData = action.payload;
      state.deleteClientPopup.status = true;
    },

    closeDeleteClientPopup(state, action) {
      state.deleteClientPopup.status = false;
      state.deleteClientPopup.helperData = null;
    },
  },
});

export const { openDeleteClientPopup, closeDeleteClientPopup } =
  clientsSlice.actions;

export default clientsSlice.reducer;

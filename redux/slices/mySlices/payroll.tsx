import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: {
    deleteDepartmentPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  }
};

const payrollSlice = createSlice({
  initialState,
  name: "payroll",
  reducers: {
    //**Project */

    //Delete

    openDeleteProjectPopup(state, action) {
      state.project.deleteDepartmentPopup.helperData = action.payload;
      state.project.deleteDepartmentPopup.status = true;
    },

    closeDeleteProjectPopup(state, action) {
      state.project.deleteDepartmentPopup.status = false;
      state.project.deleteDepartmentPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadProjectPopup(state, action) {
      state.project.bulkUploadPopup.helperData = action.payload;
      state.project.bulkUploadPopup.status = true;
    },

    closeBulkUploadProjectPopup(state, action) {
      state.project.bulkUploadPopup.status = false;
      state.project.bulkUploadPopup.helperData = null;
    }  
  }
});

export const {
  openDeleteProjectPopup,
  closeDeleteProjectPopup,
  openBulkUploadProjectPopup,
  closeBulkUploadProjectPopup
} = payrollSlice.actions;

export default payrollSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  assignRSSLPopup: { status: false, helperData: null }
}

const productionsSlice = createSlice({
  initialState,
  name: 'productions',
  reducers: {
    //**Productions */

    //Pending Productions

    // Assign Rssl
    openAssignRSSLPopup(state, action) {
      state.assignRSSLPopup.helperData = action.payload
      state.assignRSSLPopup.status = true
    },

    closeAssignRSSLPopup(state, action) {
      state.assignRSSLPopup.status = false
      state.assignRSSLPopup.helperData = null
    }
  }
})

export const { openAssignRSSLPopup, closeAssignRSSLPopup } = productionsSlice.actions

export default productionsSlice.reducer

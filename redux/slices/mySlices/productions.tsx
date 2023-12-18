import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  assignRSSLPopup: { status: false, helperData: null },
  refetch: false
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
    },

    refetchProductions(state, action) {
      state.refetch = action.payload
    }
  }
})

export const { openAssignRSSLPopup, closeAssignRSSLPopup, refetchProductions } = productionsSlice.actions

export const productionsRefetch = (state) => state.productions.refetch

export default productionsSlice.reducer

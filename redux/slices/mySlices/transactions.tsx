import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchaseOrder: {
    deletePurchaseOrderPopup: { status: false, helperData: null },
  },
  journalEntry: {
    deleteJournalEntryPopup: { status: false, helperData: null },
  },
  pettyCash: { deletePettyCashPopup: { status: false, helperData: null } },
  payroll: { deletePayRollPopup: { status: false, helperData: null } },
  accountPayable: {
    deleteAccountPayablePopup: { status: false, helperData: null },
  },
};

const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {
    //**Purchase Order */

    //Delete

    openDeletePurchaseOrderPopup(state, action) {
      state.purchaseOrder.deletePurchaseOrderPopup.helperData = action.payload;
      state.purchaseOrder.deletePurchaseOrderPopup.status = true;
    },

    closeDeletePurchaseOrderPopup(state, action) {
      state.purchaseOrder.deletePurchaseOrderPopup.status = false;
      state.purchaseOrder.deletePurchaseOrderPopup.helperData = null;
    },

    //**Journal ENtry */

    //Delete

    openDeleteSJornalEntryPopup(state, action) {
      state.journalEntry.deleteJournalEntryPopup.helperData = action.payload;
      state.journalEntry.deleteJournalEntryPopup.status = true;
    },

    closeDeleteJournalEntryPopup(state, action) {
      state.journalEntry.deleteJournalEntryPopup.status = false;
      state.journalEntry.deleteJournalEntryPopup.helperData = null;
    },

    //**Petty CAsh */

    //Delete

    openDeletePettyCashPopup(state, action) {
      state.pettyCash.deletePettyCashPopup.helperData = action.payload;
      state.pettyCash.deletePettyCashPopup.status = true;
    },

    closeDeletePettyCashPopup(state, action) {
      state.pettyCash.deletePettyCashPopup.status = false;
      state.pettyCash.deletePettyCashPopup.helperData = null;
    },

    //**payroll */

    //Delete

    openDeletePayrollPopup(state, action) {
      state.payroll.deletePayRollPopup.helperData = action.payload;
      state.payroll.deletePayRollPopup.status = true;
    },

    closeDeletePayrollPopup(state, action) {
      state.payroll.deletePayRollPopup.status = false;
      state.payroll.deletePayRollPopup.helperData = null;
    },

    //**Account Payable */

    //Delete

    openDeleteAccountPayablePopup(state, action) {
      state.accountPayable.deleteAccountPayablePopup.helperData =
        action.payload;
      state.accountPayable.deleteAccountPayablePopup.status = true;
    },

    closeDeleteAccountPayablePopup(state, action) {
      state.accountPayable.deleteAccountPayablePopup.status = false;
      state.accountPayable.deleteAccountPayablePopup.helperData = null;
    },
  },
});

export const {
  openDeletePayrollPopup,
  closeDeleteJournalEntryPopup,
  openDeletePettyCashPopup,
  closeDeletePayrollPopup,
  openDeletePurchaseOrderPopup,
  closeDeletePettyCashPopup,
  openDeleteSJornalEntryPopup,
  closeDeletePurchaseOrderPopup,
  openDeleteAccountPayablePopup,
  closeDeleteAccountPayablePopup,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

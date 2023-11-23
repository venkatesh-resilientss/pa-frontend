import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchaseOrder: {
    deletePurchaseOrderPopup: { status: false, helperData: null },
    approvePurchaseOrderPopup: { status: false, helperData: null },
    rejectPurchaseOrderPopup: { status: false, helperData: null },
  },
  journalEntry: {
    deleteJournalEntryPopup: { status: false, helperData: null },
    approveJournalEntryPopup: { status: false, helperData: null },
    rejectJournalEntryPopup: { status: false, helperData: null },
  },
  pettyCash: {
    deletePettyCashPopup: { status: false, helperData: null },
    approvePettyCashPopup: { status: false, helperData: null },
    rejectPettyCashPopup: { status: false, helperData: null },
  },
  payroll: {
    deletePayRollPopup: { status: false, helperData: null },
    approvePayRollPopup: { status: false, helperData: null },
    rejectPayRollPopup: { status: false, helperData: null },
  },
  accountPayable: {
    deleteAccountPayablePopup: { status: false, helperData: null },
    approveAccountPayablePopup: { status: false, helperData: null },
    rejectAccountPayablePopup: { status: false, helperData: null },
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

    //Approve

    openApprovePurchaseOrderPopup(state, action) {
      state.purchaseOrder.approvePurchaseOrderPopup.helperData = action.payload;
      state.purchaseOrder.approvePurchaseOrderPopup.status = true;
    },

    closeApprovePurchaseOrderPopup(state, action) {
      state.purchaseOrder.approvePurchaseOrderPopup.status = false;
      state.purchaseOrder.approvePurchaseOrderPopup.helperData = null;
    },

    //Reject

    openRejectPurchaseOrderPopup(state, action) {
      state.purchaseOrder.rejectPurchaseOrderPopup.helperData = action.payload;
      state.purchaseOrder.rejectPurchaseOrderPopup.status = true;
    },

    closeRejectPurchaseOrderPopup(state, action) {
      state.purchaseOrder.rejectPurchaseOrderPopup.status = false;
      state.purchaseOrder.rejectPurchaseOrderPopup.helperData = null;
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

    //Approve

    openApproveJornalEntryPopup(state, action) {
      state.journalEntry.approveJournalEntryPopup.helperData = action.payload;
      state.journalEntry.approveJournalEntryPopup.status = true;
    },

    closeApproveJournalEntryPopup(state, action) {
      state.journalEntry.approveJournalEntryPopup.status = false;
      state.journalEntry.approveJournalEntryPopup.helperData = null;
    },

    //Reject

    openRejectJornalEntryPopup(state, action) {
      state.journalEntry.rejectJournalEntryPopup.helperData = action.payload;
      state.journalEntry.rejectJournalEntryPopup.status = true;
    },

    closeRejectJournalEntryPopup(state, action) {
      state.journalEntry.rejectJournalEntryPopup.status = false;
      state.journalEntry.rejectJournalEntryPopup.helperData = null;
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

    //Approve

    openApprovePettyCashPopup(state, action) {
      state.pettyCash.approvePettyCashPopup.helperData = action.payload;
      state.pettyCash.approvePettyCashPopup.status = true;
    },

    closeApprovePettyCashPopup(state, action) {
      state.pettyCash.approvePettyCashPopup.status = false;
      state.pettyCash.approvePettyCashPopup.helperData = null;
    },

    //Reject

    openRejectPettyCashPopup(state, action) {
      state.pettyCash.rejectPettyCashPopup.helperData = action.payload;
      state.pettyCash.rejectPettyCashPopup.status = true;
    },

    closeRejectPettyCashPopup(state, action) {
      state.pettyCash.rejectPettyCashPopup.status = false;
      state.pettyCash.rejectPettyCashPopup.helperData = null;
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

    //Approve

    openApprovePayrollPopup(state, action) {
      state.payroll.approvePayRollPopup.helperData = action.payload;
      state.payroll.approvePayRollPopup.status = true;
    },

    closeApprovePayrollPopup(state, action) {
      state.payroll.approvePayRollPopup.status = false;
      state.payroll.approvePayRollPopup.helperData = null;
    },

    //Reject

    openRejectPayrollPopup(state, action) {
      state.payroll.rejectPayRollPopup.helperData = action.payload;
      state.payroll.rejectPayRollPopup.status = true;
    },

    closeRejectPayrollPopup(state, action) {
      state.payroll.rejectPayRollPopup.status = false;
      state.payroll.rejectPayRollPopup.helperData = null;
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

    //Approve

    openApproveAccountPayablePopup(state, action) {
      state.accountPayable.approveAccountPayablePopup.helperData =
        action.payload;
      state.accountPayable.approveAccountPayablePopup.status = true;
    },

    closeApproveAccountPayablePopup(state, action) {
      state.accountPayable.approveAccountPayablePopup.status = false;
      state.accountPayable.approveAccountPayablePopup.helperData = null;
    },

    //Reject

    openRejectAccountPayablePopup(state, action) {
      state.accountPayable.rejectAccountPayablePopup.helperData =
        action.payload;
      state.accountPayable.rejectAccountPayablePopup.status = true;
    },

    closeRejectAccountPayablePopup(state, action) {
      state.accountPayable.rejectAccountPayablePopup.status = false;
      state.accountPayable.rejectAccountPayablePopup.helperData = null;
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
  openApprovePurchaseOrderPopup,
  closeApprovePurchaseOrderPopup,
  openRejectPurchaseOrderPopup,
  closeRejectPurchaseOrderPopup,
  openApproveAccountPayablePopup,
  closeApproveAccountPayablePopup,
  openApproveJornalEntryPopup,
  closeApproveJournalEntryPopup,
  openApprovePayrollPopup,
  closeApprovePayrollPopup,
  openApprovePettyCashPopup,
  closeApprovePettyCashPopup,
  openRejectAccountPayablePopup,
  closeRejectJournalEntryPopup,
  openRejectJornalEntryPopup,
  closeRejectPayrollPopup,
  openRejectPayrollPopup,
  closeRejectPettyCashPopup,
  openRejectPettyCashPopup,
  closeRejectAccountPayablePopup,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

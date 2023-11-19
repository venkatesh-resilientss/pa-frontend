import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  department: {
    deleteDepartmentPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  sets: {
    deleteSetPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  currency: {
    deleteCurrencyPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  locations: {
    deleteLocationPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  states: {
    deleteStatePopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  countries: {
    deleteCountryPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  series: {
    deleteSeriesPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  taxcodes: {
    deleteTaxCodePopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  banks: {
    deleteBankPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  vendors: {
    deleteVendorPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  periods: {
    deletePeriodPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  coa: {
    deleteCOAPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
  budgets: {
    deleteBudgetPopup: { status: false, helperData: null },
    bulkUploadPopup: { status: false, helperData: null },
  },
};

const configurationsSlice = createSlice({
  initialState,
  name: "configurations",
  reducers: {
    //**Departments */

    //Delete

    openDeleteDepartmentPopup(state, action) {
      state.department.deleteDepartmentPopup.helperData = action.payload;
      state.department.deleteDepartmentPopup.status = true;
    },

    closeDeleteDepartmentPopup(state, action) {
      state.department.deleteDepartmentPopup.status = false;
      state.department.deleteDepartmentPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadDepartmentPopup(state, action) {
      state.department.bulkUploadPopup.helperData = action.payload;
      state.department.bulkUploadPopup.status = true;
    },

    closeBulkUploadDepartmentPopup(state, action) {
      state.department.bulkUploadPopup.status = false;
      state.department.bulkUploadPopup.helperData = null;
    },

    //**Sets */

    //Delete

    openDeleteSetPopup(state, action) {
      state.sets.deleteSetPopup.helperData = action.payload;
      state.sets.deleteSetPopup.status = true;
    },

    closeDeleteSetPopup(state, action) {
      state.sets.deleteSetPopup.status = false;
      state.sets.deleteSetPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadSetsPopup(state, action) {
      state.sets.bulkUploadPopup.helperData = action.payload;
      state.sets.bulkUploadPopup.status = true;
    },

    closeBulkUploadSetsPopup(state, action) {
      state.sets.bulkUploadPopup.status = false;
      state.sets.bulkUploadPopup.helperData = null;
    },

    //**Locations */

    //Delete

    openDeleteLocationPopup(state, action) {
      state.locations.deleteLocationPopup.helperData = action.payload;
      state.locations.deleteLocationPopup.status = true;
    },

    closeDeleteLocationPopup(state, action) {
      state.locations.deleteLocationPopup.status = false;
      state.locations.deleteLocationPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadLocationsPopup(state, action) {
      state.locations.bulkUploadPopup.helperData = action.payload;
      state.locations.bulkUploadPopup.status = true;
    },

    closeBulkUploadLocationsPopup(state, action) {
      state.locations.bulkUploadPopup.status = false;
      state.locations.bulkUploadPopup.helperData = null;
    },

    //**Currency */

    //Delete

    openDeleteCurrencyPopup(state, action) {
      state.currency.deleteCurrencyPopup.helperData = action.payload;
      state.currency.deleteCurrencyPopup.status = true;
    },

    closeDeleteCurrencyPopup(state, action) {
      state.currency.deleteCurrencyPopup.status = false;
      state.currency.deleteCurrencyPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadCurrenciesPopup(state, action) {
      state.currency.bulkUploadPopup.helperData = action.payload;
      state.currency.bulkUploadPopup.status = true;
    },

    closeBulkUploadCurrenciesPopup(state, action) {
      state.currency.bulkUploadPopup.status = false;
      state.currency.bulkUploadPopup.helperData = null;
    },

    //**Banks */

    //Delete

    openDeleteBanksPopup(state, action) {
      state.banks.deleteBankPopup.helperData = action.payload;
      state.banks.deleteBankPopup.status = true;
    },

    closeDeleteBanksPopup(state, action) {
      state.banks.deleteBankPopup.status = false;
      state.banks.deleteBankPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadBanksPopup(state, action) {
      state.banks.bulkUploadPopup.helperData = action.payload;
      state.banks.bulkUploadPopup.status = true;
    },

    closeBulkUploadBanksPopup(state, action) {
      state.banks.bulkUploadPopup.status = false;
      state.banks.bulkUploadPopup.helperData = null;
    },

    //**States */

    //Delete

    openDeleteStatePopup(state, action) {
      state.states.deleteStatePopup.helperData = action.payload;
      state.states.deleteStatePopup.status = true;
    },

    closeDeleteStatePopup(state, action) {
      state.states.deleteStatePopup.status = false;
      state.states.deleteStatePopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadStatesPopup(state, action) {
      state.states.bulkUploadPopup.helperData = action.payload;
      state.states.bulkUploadPopup.status = true;
    },

    closeBulkUploadStatesPopup(state, action) {
      state.states.bulkUploadPopup.status = false;
      state.states.bulkUploadPopup.helperData = null;
    },

    //**Countries */

    //Delete

    openDeleteCountryPopup(state, action) {
      state.countries.deleteCountryPopup.helperData = action.payload;
      state.countries.deleteCountryPopup.status = true;
    },

    closeDeleteCountryPopup(state, action) {
      state.countries.deleteCountryPopup.status = false;
      state.countries.deleteCountryPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadCountriesPopup(state, action) {
      state.countries.bulkUploadPopup.helperData = action.payload;
      state.countries.bulkUploadPopup.status = true;
    },

    closeBulkUploadCountriesPopup(state, action) {
      state.countries.bulkUploadPopup.status = false;
      state.countries.bulkUploadPopup.helperData = null;
    },

    //**Series */

    //Delete

    openDeleteSeriesPopup(state, action) {
      state.series.deleteSeriesPopup.helperData = action.payload;
      state.series.deleteSeriesPopup.status = true;
    },

    closeDeleteSeriesPopup(state, action) {
      state.series.deleteSeriesPopup.status = false;
      state.series.deleteSeriesPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadSeriesPopup(state, action) {
      state.series.bulkUploadPopup.helperData = action.payload;
      state.series.bulkUploadPopup.status = true;
    },

    closeBulkUploadSeriesPopup(state, action) {
      state.series.bulkUploadPopup.status = false;
      state.series.bulkUploadPopup.helperData = null;
    },

    //**Tax codes */

    //Delete

    openDeleteTaxCodesPopup(state, action) {
      state.taxcodes.deleteTaxCodePopup.helperData = action.payload;
      state.taxcodes.deleteTaxCodePopup.status = true;
    },

    closeDeleteTaxCodesPopup(state, action) {
      state.taxcodes.deleteTaxCodePopup.status = false;
      state.taxcodes.deleteTaxCodePopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadTaxCodesPopup(state, action) {
      state.taxcodes.bulkUploadPopup.helperData = action.payload;
      state.taxcodes.bulkUploadPopup.status = true;
    },

    closeBulkUploadTaxCodesPopup(state, action) {
      state.taxcodes.bulkUploadPopup.status = false;
      state.taxcodes.bulkUploadPopup.helperData = null;
    },

    //**COA */

    //Delete

    openDeleteCOAPopup(state, action) {
      state.coa.deleteCOAPopup.helperData = action.payload;
      state.coa.deleteCOAPopup.status = true;
    },

    closeDeleteCOAPopup(state, action) {
      state.coa.deleteCOAPopup.status = false;
      state.coa.deleteCOAPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadCOAPopup(state, action) {
      state.coa.bulkUploadPopup.helperData = action.payload;
      state.coa.bulkUploadPopup.status = true;
    },

    closeBulkUploadCOAPopup(state, action) {
      state.coa.bulkUploadPopup.status = false;
      state.coa.bulkUploadPopup.helperData = null;
    },

    //**Periods */

    //Delete

    openDeletePeriodPopup(state, action) {
      state.periods.deletePeriodPopup.helperData = action.payload;
      state.periods.deletePeriodPopup.status = true;
    },

    closeDeletePeriodPopup(state, action) {
      state.periods.deletePeriodPopup.status = false;
      state.periods.deletePeriodPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadPeriodsPopup(state, action) {
      state.periods.bulkUploadPopup.helperData = action.payload;
      state.periods.bulkUploadPopup.status = true;
    },

    closeBulkUploadPeriodsPopup(state, action) {
      state.periods.bulkUploadPopup.status = false;
      state.periods.bulkUploadPopup.helperData = null;
    },

    //**Vendors */

    //Delete

    openDeleteVendorPopup(state, action) {
      state.vendors.deleteVendorPopup.helperData = action.payload;
      state.vendors.deleteVendorPopup.status = true;
    },

    closeDeleteVendorPopup(state, action) {
      state.vendors.deleteVendorPopup.status = false;
      state.vendors.deleteVendorPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadVendorsPopup(state, action) {
      state.vendors.bulkUploadPopup.helperData = action.payload;
      state.vendors.bulkUploadPopup.status = true;
    },

    closeBulkUploadVendorsPopup(state, action) {
      state.vendors.bulkUploadPopup.status = false;
      state.vendors.bulkUploadPopup.helperData = null;
    },

    ///Budgets

    //Delete

    openDeleteBudgetPopup(state, action) {
      state.budgets.deleteBudgetPopup.helperData = action.payload;
      state.budgets.deleteBudgetPopup.status = true;
    },

    closeDeleteBudgetPopup(state, action) {
      state.budgets.deleteBudgetPopup.status = false;
      state.budgets.deleteBudgetPopup.helperData = null;
    },

    //Bulk Upload

    openBulkUploadBudgetsPopup(state, action) {
      state.budgets.bulkUploadPopup.helperData = action.payload;
      state.budgets.bulkUploadPopup.status = true;
    },

    closeBulkUploadBudgetsPopup(state, action) {
      state.budgets.bulkUploadPopup.status = false;
      state.budgets.bulkUploadPopup.helperData = null;
    },
  },
});

export const {
  openDeleteDepartmentPopup,
  closeDeleteDepartmentPopup,
  openBulkUploadDepartmentPopup,
  closeBulkUploadDepartmentPopup,
  openDeleteSetPopup,
  closeDeleteSetPopup,
  openDeleteLocationPopup,
  closeDeleteLocationPopup,
  openDeleteCurrencyPopup,
  closeDeleteCurrencyPopup,
  openDeleteBanksPopup,
  closeDeleteBanksPopup,
  openDeleteCountryPopup,
  closeDeleteCountryPopup,
  openDeleteStatePopup,
  closeDeleteStatePopup,
  openDeleteSeriesPopup,
  closeDeleteSeriesPopup,
  openDeleteTaxCodesPopup,
  closeDeleteTaxCodesPopup,
  openDeleteCOAPopup,
  closeDeleteCOAPopup,
  openDeletePeriodPopup,
  closeDeletePeriodPopup,
  openDeleteVendorPopup,
  closeDeleteVendorPopup,
  openBulkUploadBanksPopup,
  closeBulkUploadBanksPopup,
  openBulkUploadCOAPopup,
  closeBulkUploadCOAPopup,
  openBulkUploadCountriesPopup,
  closeBulkUploadCountriesPopup,
  openBulkUploadCurrenciesPopup,
  closeBulkUploadCurrenciesPopup,
  openBulkUploadLocationsPopup,
  closeBulkUploadLocationsPopup,
  openBulkUploadPeriodsPopup,
  closeBulkUploadPeriodsPopup,
  openBulkUploadSeriesPopup,
  closeBulkUploadSeriesPopup,
  openBulkUploadSetsPopup,
  closeBulkUploadSetsPopup,
  openBulkUploadStatesPopup,
  closeBulkUploadStatesPopup,
  openBulkUploadTaxCodesPopup,
  closeBulkUploadTaxCodesPopup,
  openBulkUploadVendorsPopup,
  closeBulkUploadVendorsPopup,
  openBulkUploadBudgetsPopup,
  closeBulkUploadBudgetsPopup,
  openDeleteBudgetPopup,
  closeDeleteBudgetPopup,
} = configurationsSlice.actions;

export default configurationsSlice.reducer;

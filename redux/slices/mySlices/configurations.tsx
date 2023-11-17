import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  department: { deleteDepartmentPopup: { status: false, helperData: null } },
  sets: { deleteSetPopup: { status: false, helperData: null } },
  currency: { deleteCurrencyPopup: { status: false, helperData: null } },
  locations: { deleteLocationPopup: { status: false, helperData: null } },
  states: { deleteStatePopup: { status: false, helperData: null } },
  countries: { deleteCountryPopup: { status: false, helperData: null } },
  series: { deleteSeriesPopup: { status: false, helperData: null } },
  taxcodes: { deleteTaxCodePopup: { status: false, helperData: null } },
  banks: { deleteBankPopup: { status: false, helperData: null } },
  vendors: { deleteVendorPopup: { status: false, helperData: null } },
  periods: { deletePeriodPopup: { status: false, helperData: null } },
  coa: { deleteCOAPopup: { status: false, helperData: null } },
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
  },
});

export const {
  openDeleteDepartmentPopup,
  closeDeleteDepartmentPopup,
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
} = configurationsSlice.actions;

export default configurationsSlice.reducer;

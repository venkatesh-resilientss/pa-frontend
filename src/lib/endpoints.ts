const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;


export const GET_BANKS = `${baseUrl}api/banks/`; //Banks
export const GET_COUNTRIES = `${baseUrl}api/countries/`; //Countries
export const CREATE_COUNTRIES = `${baseUrl}api/countries/`; //Create Countries

export const GET_SERIES = `${baseUrl}api/series/`; //Series
export const CREATE_SERIES = `${baseUrl}api/series/`; //Create Series

export const GET_CURRENCIES = `${baseUrl}api/currencies/`; //Currencies
export const CREATE_CURRENCIES = `${baseUrl}api/currencies/`; //Create Currencies

export const GET_DEPARTMENTS = `${baseUrl}api/departments/`; //Departments
export const CREATE_DEPARTMENTS = `${baseUrl}api/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (id: any)=>`${baseUrl}api/departments/${id}`; //DELETE Departments

export const GET_SETS = `${baseUrl}api/sets/`; //Sets
export const CREATE_SETS = `${baseUrl}api/sets/`; //Create Sets
export const GET_VENDORS = `${baseUrl}api/vendors/`; //Vendors
export const GET_STATES = `${baseUrl}api/states/`; //States
export const CREATE_STATES = `${baseUrl}api/states/`; //Create States
export const GET_TAXCODES = `${baseUrl}api/taxcodes/`; //TaxCodes
export const CREATE_TAXCODES = `${baseUrl}api/taxcodes/`; // Create TaxCodes
export const GET_LOCATIONS = `${baseUrl}api/locations/`; //Locations
export const CREATE_LOCATIONS = `${baseUrl}api/locations/`; //Create Locations

export const GET_COAACCOUNTS = `${baseUrl}api/coaaccounts/`; //COA(ACCOUNTS)
export const GET_FORGETPASSWORD = `${baseUrl}api/forgot-password`; //Forgot Password
export const GET_CLIENTS = `${baseUrl}api/clients/`; //Clients
export const GET_PERIODS = `${baseUrl}api/periods/`; //periods















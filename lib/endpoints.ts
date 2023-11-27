export const baseUrl = process.env.NEXT_PUBLIC_APP_ENV === "production"? process.env.NEXT_PUBLIC_BASE_PROD : process.env.NEXT_PUBLIC_APP_ENV === "staging" ? process.env.NEXT_PUBLIC_BASE_STAGING: process.env.NEXT_PUBLIC_BASE_LOCAL;

export const GET_COMPANIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/companies`; //Get Companies

export const GET_PROJECTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/projects/` //Projects
export const DELETE_PROJECTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/clients/${id}`; //DELETE projects
export const EDIT_PROJECTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/clients/${id}`; //EDIT projects
export const PROJECTS_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/clients/${id}`; //projects Details


export const RESET_PASSWORD =  `${baseUrl}/api/reset-password`


export const GET_DASHBOARD_STATS =(tenant_id)=> `${baseUrl}/api/${tenant_id}/overview`; //Dashboard Stats
export const GET_RECENT_PRODUCTIONS = (tenant_id) => `${baseUrl}/api/${tenant_id}/recent-productions`; //Recent Productions
export const GET_ONBOARDED_CLIENTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/onboarded-clients`; //OnBoarded Clients

export const DELETE_USER = (tenant_id:any,id: any) => `${baseUrl}/api/${tenant_id}/users/${id}` //Users Details

export const LOGIN = `${baseUrl}/api/login`; //Banks

export const GET_BANKS = (tenant_id) => `${baseUrl}/api/${tenant_id}/banks/`; //Banks
export const CREATE_BANK = (tenant_id) => `${baseUrl}/api/${tenant_id}/banks/`; //Create banks
export const DELETE_BANKS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/banks/${id}`; //DELETE banks
export const EDIT_BANKS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/banks/${id}`; //EDIT banks
export const BANKS_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/banks/${id}`; // Bank Details

// export const TENANT_LOGIN =  `${baseUrl}/api/users/tenants`
export const TENANT_LOGIN =  `${baseUrl}/api/tenants/search`


export const GET_ROLES = (tenant_id) => `${baseUrl}/api/${tenant_id}/roles/` //Users

export const GET_SERIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/series/`; //Series
export const CREATE_SERIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/series/`; //Create Series
export const DELETE_SERIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/series/${id}`; //DELETE series
export const EDIT_SERIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/series/${id}`; //EDIT series
export const SERIES_DETAIL_ENDPOINT = (tenant_id:any,id: any) => `${baseUrl}/api/${tenant_id}/series/${id}`; //Series Details

export const GET_CURRENCIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/currencies/`; //Currencies
export const CREATE_CURRENCIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/currencies/`; //Create Currencies
export const DELETE_CURRENCIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/currencies/${id}`; //DELETE Currencies
export const EDIT_CURRENCIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/currencies/${id}`; //EDIT currencies
export const CURRENCY_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/currencies/${id}`; //currencies Details

export const GET_BUDGETS= (tenant_id) => `${baseUrl}/api/${tenant_id}/budgets/` //budgets
export const CREATE_BUDGET = (tenant_id) => `${baseUrl}/api/${tenant_id}/budgets/`; //Create Currencies

export const DELETE_BUDGET = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/budgets/${id}` //DELETE budgets
export const EDIT_BUDGET = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/budgets/${id}` //EDIT budgets
export const BUDGETS_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/budgets/${id}` // budgets Details


export const GET_COUNTRIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/countries/` //Countries
export const CREATE_COUNTRIES = (tenant_id) => `${baseUrl}/api/${tenant_id}/countries/` //Create Countries
export const DELETE_COUNTRIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/countries/${id}` //DELETE countries
export const EDIT_COUNTRIES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/countries/${id}` //EDIT countries
export const COUNTRIES_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/countries/${id}` //countries Details


export const GET_DEPARTMENTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/departments/`; //Departments
export const CREATE_DEPARTMENTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/departments/${id}`; //DELETE Departments
export const EDIT_DEPARTMENTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/departments/${id}`; //EDIT Departments
export const DEPARTMENT_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/departments/${id}`;

export const GET_SETS = (tenant_id) => `${baseUrl}/api/${tenant_id}/sets/`; //Sets
export const DELETE_SETS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/sets/${id}`; //DELETE Sets
export const EDIT_SETS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/sets/${id}`; //EDIT Sets
export const CREATE_SETS = (tenant_id) => `${baseUrl}/api/${tenant_id}/sets/`; //Create Sets
export const SETS_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/sets/${id}`; //Sets Details

export const GET_VENDORS = (tenant_id) => `${baseUrl}/api/${tenant_id}/vendors/`; //Vendors
export const CREATE_VENDORS = (tenant_id) => `${baseUrl}/api/${tenant_id}/vendors/`; //Create vendors

export const DELETE_VENDORS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/vendors/${id}`; //DELETE vendors
export const EDIT_VENDORS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/vendors/${id}`; //EDIT Vendors
export const VENDORS_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/vendors/${id}`; //Vendors Details

export const GET_STATES = (tenant_id) => `${baseUrl}/api/${tenant_id}/states/`; //States
export const DELETE_STATES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/states/${id}`; //DELETE states
export const EDIT_STATES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/states/${id}`; //EDIT States
export const CREATE_STATES = (tenant_id) => `${baseUrl}/api/${tenant_id}/states/`; //Create States
export const STATES_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/states/${id}`; //States Details

export const GET_TAXCODES = (tenant_id) => `${baseUrl}/api/${tenant_id}/taxcodes/`; //TaxCodes
export const DELETE_TAXCODES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/taxcodes/${id}`; //DELETE taxcodes
export const EDIT_TAXCODES = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/taxcodes/${id}`; //EDIT Taxcodes
export const CREATE_TAXCODES = (tenant_id) => `${baseUrl}/api/${tenant_id}/taxcodes/`; // Create TaxCodes
export const TAXCODES_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/taxcodes/${id}`; //Tax Codes Details

export const GET_LOCATIONS = (tenant_id) => `${baseUrl}/api/${tenant_id}/locations/`; //Locations
export const CREATE_LOCATIONS = (tenant_id) => `${baseUrl}/api/${tenant_id}/locations/`; //Create Locations
export const DELETE_LOCATION = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/locations/${id}`; //DELETE Locations
export const EDIT_LOCATION = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/locations/${id}`; //EDIT Locations
export const LOCATION_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/locations/${id}`; //Location Details

export const CREATE_COAACCOUNTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/coaaccounts/`;
export const GET_COAACCOUNTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/coaaccounts/`; //COA(ACCOUNTS)
export const DELETE_COAACCOUNTS = (id: any,tenant_id:any) =>
  `${baseUrl}/api/${tenant_id}/coaaccounts/${id}`; //DELETE coaaccounts
export const EDIT_COAACCOUNTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/coaaccounts/${id}`; //EDIT coaaccounts
export const COAACCOUNTS_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/coaaccounts/${id}`; //coa Accounts Details

export const GET_FORGETPASSWORD = `${baseUrl}/api/forgot-password`; //Forgot Password

export const GET_CLIENTS = (tenant_id) => `${baseUrl}/api/${tenant_id}/clients/`; //Clients
export const DELETE_CLIENTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/clients/${id}`; //DELETE clients
export const EDIT_CLIENTS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/clients/${id}`; //EDIT clients
export const CLIENTS_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/clients/${id}`; //clients Details

export const GET_PERIODS = (tenant_id) => `${baseUrl}/api/${tenant_id}/periods/`; //periods
export const DELETE_PERIODS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/periods/${id}`; //DELETE periods
export const EDIT_PERIODS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/periods/${id}`; //EDIT periods
export const PERIODS_DETAIL_ENDPOINT = (tenant_id: any,id:any) =>
  `${baseUrl}/api/${tenant_id}/periods/${id}`; //periods Details

export const GET_USERS = (tenant_id) => `${baseUrl}/api/${tenant_id}/users/?limit=100&offset=0`; //Users
export const CREATE_USERS = (tenant_id) => `${baseUrl}/api/${tenant_id}/users/`; //Create Users
export const EDIT_USERS = (tenant_id:any,id:any) => `${baseUrl}/api/${tenant_id}/users/${id}`; //EDIT users
export const USERS_DETAIL_ENDPOINT = (tenant_id: any,id:any) => `${baseUrl}/api/${tenant_id}/users/${id}`; //Users Details


export const GET_ROLE_BY_ID = (id:any,tenant_id:any) => `${baseUrl}/api/${tenant_id}/roles/${id}` //Users
export const GET_USER_FROM_TOKEN  = (tenant_id:any) => `${baseUrl}/api/${tenant_id}/users/userinfo`; //GET USER FROM TOKEN

export const GET_TENANT = (prefix: any) => `${baseUrl}/api/tenants/name?name=${prefix}`;
//bulupload api's
export const UPLOAD_DEPARTMENT_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/departments/departments-upload`;
export const UPLOAD_SET_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/sets/sets-upload`;
export const UPLOAD_LOCATION_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/locations/locations-upload`;
export const UPLOAD_CURRENCIES_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/currencies/currencies-upload`;
export const UPLOAD_TAX_CODE_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/taxcodes/tax-codes-upload`;
export const UPLOAD_BANK_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/banks/bank-upload`;
export const UPLOAD_PERIODS_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/periods/periods-upload`;
export const UPLOAD_COUNTRIES_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/countries/countries-upload`;
export const UPLOAD_STATES_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/states/states-upload`;
export const UPLOAD_SERIES_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/series/series-upload`;
export const UPLOAD_BUDGET_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/budget/budget-upload`;
export const UPLOAD_VENDORS_LIST =(tenant_id:any)=> `${baseUrl}/api/${tenant_id}/vendors/upload`;
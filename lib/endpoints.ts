export const baseUrl = process.env.NEXT_PUBLIC_APP_ENV === "production"? process.env.NEXT_PUBLIC_BASE_PROD : process.env.NEXT_PUBLIC_APP_ENV === "staging" ? process.env.NEXT_PUBLIC_BASE_STAGING: process.env.NEXT_PUBLIC_BASE_LOCAL;

export const GET_COMPANIES = `${baseUrl}/api/1/companies/`; //Get Companies

export const GET_PROJECTS = `${baseUrl}/api/1/projects/` //Projects


// export const TENANT_LOGIN =  `${baseUrl}/api/users/tenants`
// export const TENANT_LOGIN =  `${baseUrl}/api/tenants/search`
export const LOGIN = `${baseUrl}/api/login`; //Banks
export const RESET_PASSWORD =  `${baseUrl}/api/reset-password`
export const GET_FORGETPASSWORD = `${baseUrl}/api/forgot-password`; //Forgot Password


export const GET_DASHBOARD_STATS = `${baseUrl}/api/1/overview`; //Dashboard Stats
export const GET_RECENT_PRODUCTIONS = `${baseUrl}/api/1/recent-productions`; //Recent Productions
export const GET_ONBOARDED_CLIENTS = `${baseUrl}/api/1/onboarded-clients`; //OnBoarded Clients

export const DELETE_USER = (id: string) => `${baseUrl}/api/1/users/${id}` //Users Details



export const GET_BANKS = `${baseUrl}/api/1/banks/`; //Banks
export const CREATE_BANK = `${baseUrl}/api/1/banks/`; //Create banks
export const DELETE_BANKS = (id: any) => `${baseUrl}/api/1/banks/${id}`; //DELETE banks
export const EDIT_BANKS = (id: any) => `${baseUrl}/api/1/banks/${id}`; //EDIT banks
export const BANKS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/banks/${id}`; // Bank Details

export const TENANT_LOGIN =  `${baseUrl}/api/tenants/search`

export const GET_ROLES = `${baseUrl}/api/1/roles/` //Users

export const GET_SERIES = `${baseUrl}/api/1/series/`; //Series
export const CREATE_SERIES = `${baseUrl}/api/1/series/`; //Create Series
export const DELETE_SERIES = (id: any) => `${baseUrl}/api/1/series/${id}`; //DELETE series
export const EDIT_SERIES = (id: any) => `${baseUrl}/api/1/series/${id}`; //EDIT series
export const SERIES_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/series/${id}`; //Series Details

export const GET_CURRENCIES = `${baseUrl}/api/1/currencies/`; //Currencies
export const CREATE_CURRENCIES = `${baseUrl}/api/1/currencies/`; //Create Currencies
export const DELETE_CURRENCIES = (id: any) => `${baseUrl}/api/1/currencies/${id}`; //DELETE Currencies
export const EDIT_CURRENCIES = (id: any) => `${baseUrl}/api/1/currencies/${id}`; //EDIT currencies
export const CURRENCY_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/currencies/${id}`; //currencies Details

export const GET_BUDGETS= `${baseUrl}/api/1/budgets/` //budgets
export const CREATE_BUDGET = `${baseUrl}/api/1/budgets/`; //Create Currencies

export const DELETE_BUDGET = (id: any) => `${baseUrl}/api/1/budgets/${id}` //DELETE budgets
export const EDIT_BUDGET = (id: any) => `${baseUrl}/api/1/budgets/${id}` //EDIT budgets
export const BUDGETS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/budgets/${id}` // budgets Details


export const GET_COUNTRIES = `${baseUrl}/api/1/countries/` //Countries
export const CREATE_COUNTRIES = `${baseUrl}/api/1/countries/` //Create Countries
export const DELETE_COUNTRIES = (id: any) => `${baseUrl}/api/1/countries/${id}` //DELETE countries
export const EDIT_COUNTRIES = (id: any) => `${baseUrl}/api/1/countries/${id}` //EDIT countries
export const COUNTRIES_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/countries/${id}` //countries Details


export const GET_DEPARTMENTS = `${baseUrl}/api/1/departments/`; //Departments
export const CREATE_DEPARTMENTS = `${baseUrl}/api/1/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (id: any) =>
  `${baseUrl}/api/1/departments/${id}`; //DELETE Departments
export const EDIT_DEPARTMENTS = (id: any) => `${baseUrl}/api/1/departments/${id}`; //EDIT Departments
export const DEPARTMENT_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/departments/${id}`;

export const GET_SETS = `${baseUrl}/api/1/sets/`; //Sets
export const DELETE_SETS = (id: any) => `${baseUrl}/api/1/sets/${id}`; //DELETE Sets
export const EDIT_SETS = (id: any) => `${baseUrl}/api/1/sets/${id}`; //EDIT Sets
export const CREATE_SETS = `${baseUrl}/api/1/sets/`; //Create Sets
export const SETS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/1/sets/${id}`; //Sets Details

export const GET_VENDORS = `${baseUrl}/api/1/vendors/`; //Vendors
export const CREATE_VENDORS = `${baseUrl}/api/1/vendors/`; //Create vendors

export const DELETE_VENDORS = (id: any) => `${baseUrl}/api/1/vendors/${id}`; //DELETE vendors
export const EDIT_VENDORS = (id: any) => `${baseUrl}/api/1/vendors/${id}`; //EDIT Vendors
export const VENDORS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/vendors/${id}`; //Vendors Details

export const GET_STATES = `${baseUrl}/api/1/states/`; //States
export const DELETE_STATES = (id: any) => `${baseUrl}/api/1/states/${id}`; //DELETE states
export const EDIT_STATES = (id: any) => `${baseUrl}/api/1/states/${id}`; //EDIT States
export const CREATE_STATES = `${baseUrl}/api/1/states/`; //Create States
export const STATES_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/states/${id}`; //States Details

export const GET_TAXCODES = `${baseUrl}/api/1/taxcodes/`; //TaxCodes
export const DELETE_TAXCODES = (id: any) => `${baseUrl}/api/1/taxcodes/${id}`; //DELETE taxcodes
export const EDIT_TAXCODES = (id: any) => `${baseUrl}/api/1/taxcodes/${id}`; //EDIT Taxcodes
export const CREATE_TAXCODES = `${baseUrl}/api/1/taxcodes/`; // Create TaxCodes
export const TAXCODES_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/taxcodes/${id}`; //Tax Codes Details

export const GET_LOCATIONS = `${baseUrl}/api/1/locations/`; //Locations
export const CREATE_LOCATIONS = `${baseUrl}/api/1/locations/`; //Create Locations
export const DELETE_LOCATION = (id: any) => `${baseUrl}/api/1/locations/${id}`; //DELETE Locations
export const EDIT_LOCATION = (id: any) => `${baseUrl}/api/1/locations/${id}`; //EDIT Locations
export const LOCATION_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/locations/${id}`; //Location Details

export const CREATE_COAACCOUNTS = `${baseUrl}/api/1/coaaccounts/`;
export const GET_COAACCOUNTS = `${baseUrl}/api/1/coaaccounts/`; //COA(ACCOUNTS)
export const DELETE_COAACCOUNTS = (id: any) =>
  `${baseUrl}/api/1/coaaccounts/${id}`; //DELETE coaaccounts
export const EDIT_COAACCOUNTS = (id: any) => `${baseUrl}/api/1/coaaccounts/${id}`; //EDIT coaaccounts
export const COAACCOUNTS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/coaaccounts/${id}`; //coa Accounts Details



export const GET_CLIENTS = `${baseUrl}/api/1/clients/`; //Clients
export const DELETE_CLIENTS = (id: any) => `${baseUrl}/api/1/clients/${id}`; //DELETE clients
export const EDIT_CLIENTS = (id: any) => `${baseUrl}/api/1/clients/${id}`; //EDIT clients
export const CLIENTS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/clients/${id}`; //clients Details

export const GET_PERIODS = `${baseUrl}/api/1/periods/`; //periods
export const DELETE_PERIODS = (id: any) => `${baseUrl}/api/1/periods/${id}`; //DELETE periods
export const EDIT_PERIODS = (id: any) => `${baseUrl}/api/1/periods/${id}`; //EDIT periods
export const PERIODS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/periods/${id}`; //periods Details

export const GET_USERS = `${baseUrl}/api/1/users/?limit=1000&offset=0`; //Users
export const CREATE_USERS = `${baseUrl}/api/1/users/`; //Create Users
export const EDIT_USERS = (id: any) => `${baseUrl}/api/1/users/${id}`; //EDIT users
export const USERS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/1/users/${id}`; //Users Details


export const GET_ROLE_BY_ID = (id) => `${baseUrl}/api/1/roles/${id}` //Users
export const GET_USER_FROM_TOKEN  = `${baseUrl}/api/1/users/userinfo`; //GET USER FROM TOKEN

export const DELETE_ROLE = (id) => `${baseUrl}/api/1/roles/${id}`


//bulupload api's
export const UPLOAD_DEPARTMENT_LIST = `${baseUrl}/api/1/departments/upload`;
export const UPLOAD_SET_LIST = `${baseUrl}/api/1/sets/upload`;
export const UPLOAD_LOCATION_LIST = `${baseUrl}/api/1/locations/upload`;
export const UPLOAD_CURRENCIES_LIST = `${baseUrl}/api/1/currencies/upload`;
export const UPLOAD_TAX_CODE_LIST = `${baseUrl}/api/1/taxcodes/upload`;
export const UPLOAD_BANK_LIST = `${baseUrl}/api/1/banks/upload`;
export const UPLOAD_PERIODS_LIST = `${baseUrl}/api/1/periods/upload`;
export const UPLOAD_COUNTRIES_LIST = `${baseUrl}/api/1/countries/upload`;
export const UPLOAD_STATES_LIST = `${baseUrl}/api/1/states/upload`;
export const UPLOAD_SERIES_LIST = `${baseUrl}/api/1/series/upload`;
export const UPLOAD_BUDGET_LIST = `${baseUrl}/api/1/budget/upload`;
export const UPLOAD_VENDORS_LIST = `${baseUrl}/api/1/vendors/upload`;
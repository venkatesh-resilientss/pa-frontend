export const baseUrl = process.env.NEXT_PUBLIC_APP_ENV === "production"? process.env.NEXT_PUBLIC_BASE_PROD : process.env.NEXT_PUBLIC_APP_ENV === "staging" ? process.env.NEXT_PUBLIC_BASE_STAGING: process.env.NEXT_PUBLIC_BASE_LOCAL;

export const GET_COMPANIES = `${baseUrl}/api/companies`; //Get Companies

export const GET_PROJECTS = `${baseUrl}/api/projects/` //Projects


export const RESET_PASSWORD =  `${baseUrl}/api/reset-password`


export const GET_DASHBOARD_STATS = `${baseUrl}/api/overview`; //Dashboard Stats
export const GET_RECENT_PRODUCTIONS = `${baseUrl}/api/recent-productions`; //Recent Productions
export const GET_ONBOARDED_CLIENTS = `${baseUrl}/api/onboarded-clients`; //OnBoarded Clients

export const DELETE_USER = (id: string) => `${baseUrl}/api/users/${id}` //Users Details

export const LOGIN = `${baseUrl}/api/login`; //Banks

export const GET_BANKS = `${baseUrl}/api/banks/`; //Banks
export const CREATE_BANK = `${baseUrl}/api/banks/`; //Create banks
export const DELETE_BANKS = (id: any) => `${baseUrl}/api/banks/${id}`; //DELETE banks
export const EDIT_BANKS = (id: any) => `${baseUrl}/api/banks/${id}`; //EDIT banks
export const BANKS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/banks/${id}`; // Bank Details

export const TENANT_LOGIN =  `${baseUrl}/api/users/tenants`

export const GET_ROLES = `${baseUrl}/api/roles/` //Users

export const GET_SERIES = `${baseUrl}/api/series/`; //Series
export const CREATE_SERIES = `${baseUrl}/api/series/`; //Create Series
export const DELETE_SERIES = (id: any) => `${baseUrl}/api/series/${id}`; //DELETE series
export const EDIT_SERIES = (id: any) => `${baseUrl}/api/series/${id}`; //EDIT series
export const SERIES_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/series/${id}`; //Series Details

export const GET_CURRENCIES = `${baseUrl}/api/currencies/`; //Currencies
export const CREATE_CURRENCIES = `${baseUrl}/api/currencies/`; //Create Currencies
export const DELETE_CURRENCIES = (id: any) => `${baseUrl}/api/currencies/${id}`; //DELETE Currencies
export const EDIT_CURRENCIES = (id: any) => `${baseUrl}/api/currencies/${id}`; //EDIT currencies
export const CURRENCY_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/currencies/${id}`; //currencies Details

export const GET_BUDGETS= `${baseUrl}/api/budgets/` //budgets
export const CREATE_BUDGET = `${baseUrl}/api/budgets/`; //Create Currencies

export const DELETE_BUDGET = (id: any) => `${baseUrl}/api/budgets/${id}` //DELETE budgets
export const EDIT_BUDGET = (id: any) => `${baseUrl}/api/budgets/${id}` //EDIT budgets
export const BUDGETS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/budgets/${id}` // budgets Details


export const GET_COUNTRIES = `${baseUrl}/api/countries/` //Countries
export const CREATE_COUNTRIES = `${baseUrl}/api/countries/` //Create Countries
export const DELETE_COUNTRIES = (id: any) => `${baseUrl}/api/countries/${id}` //DELETE countries
export const EDIT_COUNTRIES = (id: any) => `${baseUrl}/api/countries/${id}` //EDIT countries
export const COUNTRIES_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/countries/${id}` //countries Details


export const GET_DEPARTMENTS = `${baseUrl}/api/departments/`; //Departments
export const CREATE_DEPARTMENTS = `${baseUrl}/api/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (id: any) =>
  `${baseUrl}/api/departments/${id}`; //DELETE Departments
export const EDIT_DEPARTMENTS = (id: any) => `${baseUrl}/api/departments/${id}`; //EDIT Departments
export const DEPARTMENT_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/departments/${id}`;

export const GET_SETS = `${baseUrl}/api/sets/`; //Sets
export const DELETE_SETS = (id: any) => `${baseUrl}/api/sets/${id}`; //DELETE Sets
export const EDIT_SETS = (id: any) => `${baseUrl}/api/sets/${id}`; //EDIT Sets
export const CREATE_SETS = `${baseUrl}/api/sets/`; //Create Sets
export const SETS_DETAIL_ENDPOINT = (id: string) => `${baseUrl}/api/sets/${id}`; //Sets Details

export const GET_VENDORS = `${baseUrl}/api/vendors/`; //Vendors
export const DELETE_VENDORS = (id: any) => `${baseUrl}/api/vendors/${id}`; //DELETE vendors
export const EDIT_VENDORS = (id: any) => `${baseUrl}/api/vendors/${id}`; //EDIT Vendors
export const VENDORS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/vendors/${id}`; //Vendors Details

export const GET_STATES = `${baseUrl}/api/states/`; //States
export const DELETE_STATES = (id: any) => `${baseUrl}/api/states/${id}`; //DELETE states
export const EDIT_STATES = (id: any) => `${baseUrl}/api/states/${id}`; //EDIT States
export const CREATE_STATES = `${baseUrl}/api/states/`; //Create States
export const STATES_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/states/${id}`; //States Details

export const GET_TAXCODES = `${baseUrl}/api/taxcodes/`; //TaxCodes
export const DELETE_TAXCODES = (id: any) => `${baseUrl}/api/taxcodes/${id}`; //DELETE taxcodes
export const EDIT_TAXCODES = (id: any) => `${baseUrl}/api/taxcodes/${id}`; //EDIT Taxcodes
export const CREATE_TAXCODES = `${baseUrl}/api/taxcodes/`; // Create TaxCodes
export const TAXCODES_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/taxcodes/${id}`; //Tax Codes Details

export const GET_LOCATIONS = `${baseUrl}/api/locations/`; //Locations
export const CREATE_LOCATIONS = `${baseUrl}/api/locations/`; //Create Locations
export const DELETE_LOCATION = (id: any) => `${baseUrl}/api/locations/${id}`; //DELETE Locations
export const EDIT_LOCATION = (id: any) => `${baseUrl}/api/locations/${id}`; //EDIT Locations
export const LOCATION_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/locations/${id}`; //Location Details

export const CREATE_COAACCOUNTS = `${baseUrl}/api/coaaccounts/`;
export const GET_COAACCOUNTS = `${baseUrl}/api/coaaccounts/`; //COA(ACCOUNTS)
export const DELETE_COAACCOUNTS = (id: any) =>
  `${baseUrl}/api/coaaccounts/${id}`; //DELETE coaaccounts
export const EDIT_COAACCOUNTS = (id: any) => `${baseUrl}/api/coaaccounts/${id}`; //EDIT coaaccounts
export const COAACCOUNTS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/coaaccounts/${id}`; //coa Accounts Details

export const GET_FORGETPASSWORD = `${baseUrl}/api/forgot-password`; //Forgot Password

export const GET_CLIENTS = `${baseUrl}/api/clients/`; //Clients
export const DELETE_CLIENTS = (id: any) => `${baseUrl}/api/clients/${id}`; //DELETE clients
export const EDIT_CLIENTS = (id: any) => `${baseUrl}/api/clients/${id}`; //EDIT clients
export const CLIENTS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/clients/${id}`; //clients Details

export const GET_PERIODS = `${baseUrl}/api/periods/`; //periods
export const DELETE_PERIODS = (id: any) => `${baseUrl}/api/periods/${id}`; //DELETE periods
export const EDIT_PERIODS = (id: any) => `${baseUrl}/api/periods/${id}`; //EDIT periods
export const PERIODS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/periods/${id}`; //periods Details

export const GET_USERS = `${baseUrl}/api/users/`; //Users
export const CREATE_USERS = `${baseUrl}/api/users`; //Create Users
export const EDIT_USERS = (id: any) => `${baseUrl}/api/users/${id}`; //EDIT users
export const USERS_DETAIL_ENDPOINT = (id: string) =>
  `${baseUrl}/api/users/${id}`; //Users Details

import cookie from "js-cookie";
const tenant_id = cookie.get("tenant_id");
export const baseUrl =
  process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_PROD
    : process.env.NEXT_PUBLIC_APP_ENV === "staging"
    ? process.env.NEXT_PUBLIC_BASE_STAGING
    : process.env.NEXT_PUBLIC_BASE_LOCAL;
const tenantIdEndpoint = `${baseUrl}/api/${tenant_id}`;
const withoutTenantIdEndpoint = `${baseUrl}/api`;

export const RESET_PASSWORD = `${withoutTenantIdEndpoint}/reset-password`;
export const LOGIN = `${withoutTenantIdEndpoint}/login`; //Banks
export const OKTA_LOGIN = `${baseUrl}/api/okta/login`;
// export const TENANT_LOGIN =  `${withoutTenantIdEndpoint}users/tenants`
export const TENANT_LOGIN = `${withoutTenantIdEndpoint}/tenants/search`;
export const GET_FORGETPASSWORD = `${withoutTenantIdEndpoint}/forgot-password`; //Forgot Password

export const GET_COMPANIES = `${tenantIdEndpoint}/companies/`; //Get Companies

export const GET_PROJECTS = `${tenantIdEndpoint}/projects/`; //Projects
export const GET_PO_APPROVERS = (id: any) =>
  `${tenantIdEndpoint}/approvers/level-po?id=${id}`; //GET_PurchaseOrder_APPROVERS
export const GET_AP_APPROVERS = (id: any) =>
  `${tenantIdEndpoint}/approvers/level-ap?id=${id}`; //GET_PurchaseOrder_APPROVERS
export const EDIT_PROJECTS = (id: any) => `${tenantIdEndpoint}/projects/${id}`; //EDIT Projects
export const PROJECT_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/projects/${id}`;

export const GET_PURCHASE_ORDERS = `${tenantIdEndpoint}/purchaseorders/`; //Purchase Orders
export const DELETE_PURCHASE_ORDER = (id: any) =>
  `${tenantIdEndpoint}/purchaseorders/${id}`; //DELETE purchaseorders
export const CREATE_PURCHASE_ORDER = `${tenantIdEndpoint}/purchaseorders/`; //Create purchaseorders

export const GET_TRANSACTION_LINES = `${tenantIdEndpoint}/transactionlines/`; //transactionlines
export const DELETE_TRANSACTION_LINES = (id: any) =>
  `${tenantIdEndpoint}/transactionlines/${id}`; //DELETE transactionlines
export const CREATE_TRANSACTION_LINES = `${tenantIdEndpoint}/transactionlines/`; //Create transactionlines

export const CREATE_PROJECT = `${tenantIdEndpoint}/projects/`; //Create projects
export const GET_DASHBOARD_STATS = `${tenantIdEndpoint}/overview`; //Dashboard Stats
export const GET_RECENT_PRODUCTIONS = `${tenantIdEndpoint}/recent-productions`; //Recent Productions
export const GET_ONBOARDED_CLIENTS = `${tenantIdEndpoint}/onboarded-clients`; //OnBoarded Clients
export const CREATE_APPROVERS = `${tenantIdEndpoint}/approvers/`; //Projects

export const DELETE_USER = (id: any) => `${tenantIdEndpoint}/users/${id}`; //Users Details

export const GET_BANKS = `${tenantIdEndpoint}/banks/search`; //Banks
export const CREATE_BANK = `${tenantIdEndpoint}/banks/`; //Create banks
export const DELETE_BANKS = (id: any) => `${tenantIdEndpoint}/banks/${id}`; //DELETE banks
export const EDIT_BANKS = (id: any) => `${tenantIdEndpoint}/banks/${id}`; //EDIT banks
export const BANKS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/banks/${id}`; // Bank Details

export const GET_ROLES = `${withoutTenantIdEndpoint}/roles/`; //Users

export const GET_SERIES = `${tenantIdEndpoint}/series/search`; //Series
export const CREATE_SERIES = `${tenantIdEndpoint}/series/`; //Create Series
export const DELETE_SERIES = (id: any) => `${tenantIdEndpoint}/series/${id}`; //DELETE series
export const EDIT_SERIES = (id: any) => `${tenantIdEndpoint}/series/${id}`; //EDIT series
export const SERIES_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/series/${id}`; //Series Details

export const GET_ENTITIES = `${tenantIdEndpoint}/entitytypes`; // Entities
export const CREATE_ENTITIES = `${tenantIdEndpoint}/entitytypes`; // Entity Types
export const EDIT_ENTITIY = (id: any) =>
  `${tenantIdEndpoint}/entitytypes/${id}`;
export const DELETE_ENTITY = (id: any) =>
  `${tenantIdEndpoint}/entitytypes/${id}`;

export const GET_CURRENCIES = `${tenantIdEndpoint}/currencies/`; //Currencies
export const CREATE_CURRENCIES = `${tenantIdEndpoint}/currencies/`; //Create Currencies
export const DELETE_CURRENCIES = (id: any) =>
  `${tenantIdEndpoint}/currencies/${id}`; //DELETE Currencies
export const EDIT_CURRENCIES = (id: any) =>
  `${tenantIdEndpoint}/currencies/${id}`; //EDIT currencies
export const CURRENCY_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/currencies/${id}`; //currencies Details

export const GET_BUDGETS = `${tenantIdEndpoint}/budgets/search`; //budgets
export const CREATE_BUDGET = `${tenantIdEndpoint}/budgets/`; //Create Currencies

export const DELETE_BUDGET = (id: any) => `${tenantIdEndpoint}/budgets/${id}`; //DELETE budgets
export const EDIT_BUDGET = (id: any) => `${tenantIdEndpoint}/budgets/${id}`; //EDIT budgets
export const BUDGETS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/budgets/${id}`; // budgets Details

export const GET_COUNTRIES = `${tenantIdEndpoint}/countries/`; //Countries
export const CREATE_COUNTRIES = `${tenantIdEndpoint}/countries/`; //Create Countries
export const DELETE_COUNTRIES = (id: any) =>
  `${tenantIdEndpoint}/countries/${id}`; //DELETE countries
export const EDIT_COUNTRIES = (id: any) =>
  `${tenantIdEndpoint}/countries/${id}`; //EDIT countries
export const COUNTRIES_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/countries/${id}`; //countries Details

export const GET_DEPARTMENTS = `${tenantIdEndpoint}/departments/search`; //Departments
export const CREATE_DEPARTMENTS = `${tenantIdEndpoint}/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (id: any) =>
  `${tenantIdEndpoint}/departments/${id}`; //DELETE Departments
export const EDIT_DEPARTMENTS = (id: any) =>
  `${tenantIdEndpoint}/departments/${id}`; //EDIT Departments
export const DEPARTMENT_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/departments/${id}`;

export const GET_SETS = `${tenantIdEndpoint}/sets/search`; //Sets
export const DELETE_SETS = (id: any) => `${tenantIdEndpoint}/sets/${id}`; //DELETE Sets
export const EDIT_SETS = (id: any) => `${tenantIdEndpoint}/sets/${id}`; //EDIT Sets
export const CREATE_SETS = `${tenantIdEndpoint}/sets/`; //Create Sets
export const SETS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/sets/${id}`; //Sets Details

export const GET_VENDORS = `${tenantIdEndpoint}/vendors/`; //Vendors
export const CREATE_VENDORS = `${tenantIdEndpoint}/vendors/`; //Create vendors

export const DELETE_VENDORS = (id: any) => `${tenantIdEndpoint}/vendors/${id}`; //DELETE vendors
export const EDIT_VENDORS = (id: any) => `${tenantIdEndpoint}/vendors/${id}`; //EDIT Vendors
export const VENDORS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/vendors/${id}`; //Vendors Details

export const GET_STATES = `${tenantIdEndpoint}/states/`; //States
export const DELETE_STATES = (id: any) => `${tenantIdEndpoint}/states/${id}`; //DELETE states
export const EDIT_STATES = (id: any) => `${tenantIdEndpoint}/states/${id}`; //EDIT States
export const CREATE_STATES = `${tenantIdEndpoint}/states/`; //Create States
export const STATES_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/states/${id}`; //States Details

export const GET_TAXCODES = `${tenantIdEndpoint}/taxcodes/`; //TaxCodes
export const DELETE_TAXCODES = (id: any) =>
  `${tenantIdEndpoint}/taxcodes/${id}`; //DELETE taxcodes
export const EDIT_TAXCODES = (id: any) => `${tenantIdEndpoint}/taxcodes/${id}`; //EDIT Taxcodes
export const CREATE_TAXCODES = `${tenantIdEndpoint}/taxcodes/`; // Create TaxCodes
export const TAXCODES_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/taxcodes/${id}`; //Tax Codes Details

export const GET_LOCATIONS = `${tenantIdEndpoint}/locations/search`; //Locations
export const CREATE_LOCATIONS = `${tenantIdEndpoint}/locations/`; //Create Locations
export const DELETE_LOCATION = (id: any) =>
  `${tenantIdEndpoint}/locations/${id}`; //DELETE Locations
export const EDIT_LOCATION = (id: any) => `${tenantIdEndpoint}/locations/${id}`; //EDIT Locations
export const LOCATION_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/locations/${id}`; //Location Details

export const CREATE_COAACCOUNTS = `${tenantIdEndpoint}/coaaccounts/`;
export const GET_COAACCOUNTS = `${tenantIdEndpoint}/coaaccounts/search`; //COA(ACCOUNTS)
export const DELETE_COAACCOUNTS = (id: any) =>
  `${tenantIdEndpoint}/coaaccounts/${id}`; //DELETE coaaccounts
export const EDIT_COAACCOUNTS = (id: any) =>
  `${tenantIdEndpoint}/coaaccounts/${id}`; //EDIT coaaccounts
export const COAACCOUNTS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/coaaccounts/${id}`; //coa Accounts Details

export const GET_CLIENTS = `${withoutTenantIdEndpoint}/clients/`; //Clients
export const DELETE_CLIENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //DELETE clients
export const EDIT_CLIENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //EDIT clients
export const CREATE_CLIENT = `${withoutTenantIdEndpoint}/clients/`; //CREATE clients
export const CLIENTS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //clients Details

export const GET_PERIODS = `${tenantIdEndpoint}/periods/`; //periods
export const DELETE_PERIODS = (id: any) => `${tenantIdEndpoint}/periods/${id}`; //DELETE periods
export const EDIT_PERIODS = (id: any) => `${tenantIdEndpoint}/periods/${id}`; //EDIT periods
export const PERIODS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/periods/${id}`; //periods Details

export const GET_USERS = `${tenantIdEndpoint}/users/`; //Users
export const CREATE_USERS = `${tenantIdEndpoint}/users/`; //Create Users
export const EDIT_USERS = (id: any) => `${tenantIdEndpoint}/users/${id}`; //EDIT users
export const USERS_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/users/${id}`; //Users Details

export const GET_ROLE_BY_ID = (id: any) =>
  `${withoutTenantIdEndpoint}/roles/${id}`; //Users
export const GET_USER_FROM_TOKEN = `${withoutTenantIdEndpoint}/users/me`;
export const GET_USER_DETAILS = `${withoutTenantIdEndpoint}/users/me`; //GET USER FROM TOKEN

//bulupload api's
export const UPLOAD_DEPARTMENT_LIST = `${tenantIdEndpoint}/departments/upload`;
export const UPLOAD_SET_LIST = `${tenantIdEndpoint}/sets/upload`;
export const UPLOAD_LOCATION_LIST = `${tenantIdEndpoint}/locations/upload`;
export const UPLOAD_CURRENCIES_LIST = `${tenantIdEndpoint}/currencies/upload`;
export const UPLOAD_TAX_CODE_LIST = `${tenantIdEndpoint}/taxcodes/upload`;
export const UPLOAD_BANK_LIST = `${tenantIdEndpoint}/banks/upload`;
export const UPLOAD_PERIODS_LIST = `${tenantIdEndpoint}/periods/upload`;
export const UPLOAD_COUNTRIES_LIST = `${tenantIdEndpoint}/countries/upload`;
export const UPLOAD_STATES_LIST = `${tenantIdEndpoint}/states/upload`;
export const UPLOAD_SERIES_LIST = `${tenantIdEndpoint}/series/upload`;
export const UPLOAD_BUDGET_LIST = `${tenantIdEndpoint}/budget/upload`;
export const UPLOAD_VENDORS_LIST = `${tenantIdEndpoint}/vendors/upload`;
export const UPLOAD_COA_LIST = `${tenantIdEndpoint}/coaaccounts/upload`;

export const GET_SOFTWARES = `${tenantIdEndpoint}/softwares/`;

//addresss
export const ADDRESSES = `${tenantIdEndpoint}/addresses/`;
export const EDIT_ADDRESSES = (id: any) =>
  `${tenantIdEndpoint}/addresses/${id}`;
export const BANK_CONFIG = `${tenantIdEndpoint}/bankconfigs/`;
export const BANK_CONFIG_details = (id) =>
  `${tenantIdEndpoint}/bankconfigs/${id}`;
export const BANK_ACHES = `${tenantIdEndpoint}/bankaches/`;
export const BANK_ACH_DETAILS = (id) => `${tenantIdEndpoint}/bankaches/${id}`;
export const GET_PRODUCTIONS = `${tenantIdEndpoint}/projects/userprojects`;

// EMPLOYEE ENDPOINTS
export const GET_EMPLOYEES = (tenant_id) =>
  `${baseUrl}/api/${tenant_id}/employees/?limit=100&offset=0`; //Employees
export const CREATE_EMPLOYEE = (tenant_id) =>
  `${baseUrl}/api/${tenant_id}/employees/`; //Create Employees
export const EDIT_EMPLOYEE = (tenant_id: any, id: any) =>
  `${baseUrl}/api/${tenant_id}/employees/${id}`; //EDIT employees
export const EMPLOYEES_DETAIL_ENDPOINT = (tenant_id: any, id: any) =>
  `${baseUrl}/api/${tenant_id}/employees/${id}`; //Employees Details
export const DELETE_EMPLOYEE = (tenant_id: any, id: any) =>
  `${baseUrl}/api/${tenant_id}/employees/${id}`; //DELETE employees

// create client
export const GET_CLIENT_TYPES = `${tenantIdEndpoint}/clienttypes/`;
export const GET_CLIENT_COUNTRIES = `${tenantIdEndpoint}/countries/`;
export const GET_STATES_BY_COUNTRY = (id) =>
  `${tenantIdEndpoint}/states/country/${id}`;
export const UPLOAD_FILE_S3 = `/s3-upload`;
export const GET_USERS_BY_ROLE = (id) => `${tenantIdEndpoint}/users/role/${id}`; //Users

export const getProductionByClint = (id) =>
  `${tenantIdEndpoint}/projects/clientprojects/${id}`;

export const CREATE_PRODUCTION = (id: any) =>
  `${withoutTenantIdEndpoint}/${id}/projects/`; //Create projects

export const CREATE_PRODUCTION_APPROVER = (id: any) =>
  `${withoutTenantIdEndpoint}/${id}/approvers/`; //Create projects

export const PROJECT_DETAILS = (id: any) =>
  `${withoutTenantIdEndpoint}/projects/${id}`;

export const GET_ALL_USERS = `${withoutTenantIdEndpoint}/users/`; //get Users

export const GET_ALL_PROJECTS = `${withoutTenantIdEndpoint}/projects/`; //Projects

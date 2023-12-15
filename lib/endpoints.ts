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

export const GET_COMPANIES = `${withoutTenantIdEndpoint}/companies/`; //Get Companies

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

export const CREATE_PROJECT = `${withoutTenantIdEndpoint}/projects/`; //Create projects
export const GET_DASHBOARD_STATS = `${withoutTenantIdEndpoint}/overview`; //Dashboard Stats
export const GET_RECENT_PRODUCTIONS = `${withoutTenantIdEndpoint}/recent-productions`; //Recent Productions
export const GET_ONBOARDED_CLIENTS = `${withoutTenantIdEndpoint}/onboarded-clients`; //OnBoarded Clients
export const CREATE_APPROVERS = `${tenantIdEndpoint}/approvers/`; //Projects
export const ON_BOARDED_PROJECTS = (id: any) =>
  `${withoutTenantIdEndpoint}/onboarded-projects?id=${id}`; //onboarded projects with id
export const ALL_PRODUCTIONS = `${withoutTenantIdEndpoint}/onboarded-projects`; //onboarded projects
export const PRODUCTION_DASHBOARD_CARDS = (id: any) =>
  `${withoutTenantIdEndpoint}/production-overview?id=${id}`; //production overview
export const ALL_PRODUCTION_CARDS = `${withoutTenantIdEndpoint}/production-overview`; //production overview

export const DELETE_USER = (id: any) => `${tenantIdEndpoint}/users/${id}`; //Users Details

export const GET_BANKS = `${withoutTenantIdEndpoint}/banks/search`; //Banks
export const CREATE_BANK = `${withoutTenantIdEndpoint}/banks/`; //Create banks
export const DELETE_BANKS = (id: any) =>
  `${withoutTenantIdEndpoint}/banks/${id}`; //DELETE banks
export const EDIT_BANKS = (id: any) => `${withoutTenantIdEndpoint}/banks/${id}`; //EDIT banks
export const BANKS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/banks/${id}`; // Bank Details

export const GET_ROLES = `${withoutTenantIdEndpoint}/roles/`; //Users

export const GET_SERIES = `${withoutTenantIdEndpoint}/series/search`; //Series
export const CREATE_SERIES = `${withoutTenantIdEndpoint}/series/`; //Create Series
export const DELETE_SERIES = (id: any) =>
  `${withoutTenantIdEndpoint}/series/${id}`; //DELETE series
export const EDIT_SERIES = (id: any) =>
  `${withoutTenantIdEndpoint}/series/${id}`; //EDIT series
export const SERIES_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/series/${id}`; //Series Details

export const GET_ENTITIES = `${withoutTenantIdEndpoint}/entitytypes/`; // Entities
export const CREATE_ENTITIES = `${withoutTenantIdEndpoint}/entitytypes`; // Entity Types
export const EDIT_ENTITIY = (id: any) =>
  `${withoutTenantIdEndpoint}/entitytypes/${id}`;
export const DELETE_ENTITY = (id: any) =>
  `${withoutTenantIdEndpoint}/entitytypes/${id}`;

export const GET_CURRENCIES = `${withoutTenantIdEndpoint}/currencies/`; //Currencies
export const CREATE_CURRENCIES = `${withoutTenantIdEndpoint}/currencies/`; //Create Currencies
export const DELETE_CURRENCIES = (id: any) =>
  `${withoutTenantIdEndpoint}/currencies/${id}`; //DELETE Currencies
export const EDIT_CURRENCIES = (id: any) =>
  `${withoutTenantIdEndpoint}/currencies/${id}`; //EDIT currencies
export const CURRENCY_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/currencies/${id}`; //currencies Details

export const GET_BUDGETS = `${withoutTenantIdEndpoint}/budgets/search`; //budgets
export const CREATE_BUDGET = `${withoutTenantIdEndpoint}/budgets/`; //Create Currencies

export const DELETE_BUDGET = (id: any) =>
  `${withoutTenantIdEndpoint}/budgets/${id}`; //DELETE budgets
export const EDIT_BUDGET = (id: any) =>
  `${withoutTenantIdEndpoint}/budgets/${id}`; //EDIT budgets
export const BUDGETS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/budgets/${id}`; // budgets Details

export const GET_COUNTRIES = `${withoutTenantIdEndpoint}/countries/`; //Countries
export const CREATE_COUNTRIES = `${withoutTenantIdEndpoint}/countries/`; //Create Countries
export const DELETE_COUNTRIES = (id: any) =>
  `${withoutTenantIdEndpoint}/countries/${id}`; //DELETE countries
export const EDIT_COUNTRIES = (id: any) =>
  `${withoutTenantIdEndpoint}/countries/${id}`; //EDIT countries
export const COUNTRIES_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/countries/${id}`; //countries Details

export const GET_DEPARTMENTS = `${withoutTenantIdEndpoint}/departments/search`; //Departments
export const CREATE_DEPARTMENTS = `${withoutTenantIdEndpoint}/departments/`; //Create Departments
export const DELETE_DEPARTMENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/departments/${id}`; //DELETE Departments
export const EDIT_DEPARTMENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/departments/${id}`; //EDIT Departments
export const DEPARTMENT_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/departments/${id}`;

export const GET_SETS = `${withoutTenantIdEndpoint}/sets/search`; //Sets
export const DELETE_SETS = (id: any) => `${withoutTenantIdEndpoint}/sets/${id}`; //DELETE Sets
export const EDIT_SETS = (id: any) => `${withoutTenantIdEndpoint}/sets/${id}`; //EDIT Sets
export const CREATE_SETS = `${withoutTenantIdEndpoint}/sets/`; //Create Sets
export const SETS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/sets/${id}`; //Sets Details

export const GET_VENDORS = `${withoutTenantIdEndpoint}/vendors/search`; //Vendors
export const CREATE_VENDORS = `${withoutTenantIdEndpoint}/vendors/`; //Create vendors

export const DELETE_VENDORS = (id: any) =>
  `${withoutTenantIdEndpoint}/vendors/${id}`; //DELETE vendors
export const EDIT_VENDORS = (id: any) =>
  `${withoutTenantIdEndpoint}/vendors/${id}`; //EDIT Vendors
export const VENDORS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/vendors/${id}`; //Vendors Details

export const GET_STATES = `${withoutTenantIdEndpoint}/states/`; //States
export const DELETE_STATES = (id: any) =>
  `${withoutTenantIdEndpoint}/states/${id}`; //DELETE states
export const EDIT_STATES = (id: any) =>
  `${withoutTenantIdEndpoint}/states/${id}`; //EDIT States
export const CREATE_STATES = `${withoutTenantIdEndpoint}/states/`; //Create States
export const STATES_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/states/${id}`; //States Details

export const GET_TAXCODES = `${withoutTenantIdEndpoint}/taxcodes/`; //TaxCodes
export const DELETE_TAXCODES = (id: any) =>
  `${withoutTenantIdEndpoint}/taxcodes/${id}`; //DELETE taxcodes
export const EDIT_TAXCODES = (id: any) =>
  `${withoutTenantIdEndpoint}/taxcodes/${id}`; //EDIT Taxcodes
export const CREATE_TAXCODES = `${withoutTenantIdEndpoint}/taxcodes/`; // Create TaxCodes
export const TAXCODES_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/taxcodes/${id}`; //Tax Codes Details

export const GET_LOCATIONS = `${withoutTenantIdEndpoint}/locations/search`; //Locations
export const CREATE_LOCATIONS = `${withoutTenantIdEndpoint}/locations/`; //Create Locations
export const DELETE_LOCATION = (id: any) =>
  `${withoutTenantIdEndpoint}/locations/${id}`; //DELETE Locations
export const EDIT_LOCATION = (id: any) =>
  `${withoutTenantIdEndpoint}/locations/${id}`; //EDIT Locations
export const LOCATION_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/locations/${id}`; //Location Details

export const CREATE_COAACCOUNTS = `${withoutTenantIdEndpoint}/coaaccounts/`;
export const GET_COAACCOUNTS = `${withoutTenantIdEndpoint}/coaaccounts/search`; //COA(ACCOUNTS)
export const DELETE_COAACCOUNTS = (id: any) =>
  `${withoutTenantIdEndpoint}/coaaccounts/${id}`; //DELETE coaaccounts
export const EDIT_COAACCOUNTS = (id: any) =>
  `${withoutTenantIdEndpoint}/coaaccounts/${id}`; //EDIT coaaccounts
export const COAACCOUNTS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/coaaccounts/${id}`; //coa Accounts Details

export const GET_CLIENTS = `${withoutTenantIdEndpoint}/clients/search`; //Clients
export const DELETE_CLIENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //DELETE clients
export const EDIT_CLIENTS = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //EDIT clients
export const CREATE_CLIENT = `${withoutTenantIdEndpoint}/clients/`; //CREATE clients
export const CLIENTS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}`; //clients Details

export const GET_PERIODS = `${withoutTenantIdEndpoint}/periods/search`; //periods
export const CREATE_PERIOD = `${withoutTenantIdEndpoint}/periods/`;
export const DELETE_PERIODS = (id: any) =>
  `${withoutTenantIdEndpoint}/periods/${id}`; //DELETE periods
export const EDIT_PERIODS = (id: any) =>
  `${withoutTenantIdEndpoint}/periods/${id}`; //EDIT periods
export const PERIODS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/periods/${id}`; //periods Details

export const GET_USERS = `${withoutTenantIdEndpoint}/users/`; //Users
export const RESEND_RESET_PASSWORD_LINK = `${withoutTenantIdEndpoint}/resendPasswordLink/`; //Users
export const CREATE_USERS = `${withoutTenantIdEndpoint}/users/`; //Create Users
export const EDIT_USERS = (id: any) => `${withoutTenantIdEndpoint}/users/${id}`; //EDIT users
export const USERS_DETAIL_ENDPOINT = (id: any) =>
  `${withoutTenantIdEndpoint}/users/${id}`; //Users Details

export const GET_ROLE_BY_ID = (id: any) =>
  `${withoutTenantIdEndpoint}/roles/${id}`; //Users
export const GET_USER_FROM_TOKEN = `${withoutTenantIdEndpoint}/users/me`;
export const GET_USER_DETAILS = `${withoutTenantIdEndpoint}/users/me`; //GET USER FROM TOKEN

//bulupload api's
export const UPLOAD_DEPARTMENT_LIST = `${withoutTenantIdEndpoint}/departments/upload`;
export const UPLOAD_SET_LIST = `${withoutTenantIdEndpoint}/sets/upload`;
export const UPLOAD_LOCATION_LIST = `${withoutTenantIdEndpoint}/locations/upload`;
export const UPLOAD_CURRENCIES_LIST = `${withoutTenantIdEndpoint}/currencies/upload`;
export const UPLOAD_TAX_CODE_LIST = `${withoutTenantIdEndpoint}/taxcodes/upload`;
export const UPLOAD_BANK_LIST = `${tenantIdEndpoint}/banks/upload`;
export const UPLOAD_PERIODS_LIST = `${withoutTenantIdEndpoint}/periods/upload`;
export const UPLOAD_COUNTRIES_LIST = `${withoutTenantIdEndpoint}/countries/upload`;
export const UPLOAD_STATES_LIST = `${withoutTenantIdEndpoint}/states/upload`;
export const UPLOAD_SERIES_LIST = `${withoutTenantIdEndpoint}/series/upload`;
export const UPLOAD_BUDGET_LIST = `${tenantIdEndpoint}/budget/upload`;
export const UPLOAD_VENDORS_LIST = `${tenantIdEndpoint}/vendors/upload`;
export const UPLOAD_COA_LIST = `${withoutTenantIdEndpoint}/coaaccounts/upload`;
export const UPLOAD_PROJECTTYPE_LIST = `${tenantIdEndpoint}/projecttypes/upload`;
export const UPLOAD_OCCUPATIONCODES_LIST = `${tenantIdEndpoint}/occupationCode/upload`;
export const UPLOAD_EMPLOYEETYPE_LIST = `${tenantIdEndpoint}/employeetypes/upload`;
export const UPLOAD_WCCLASSCODES_LIST = `${tenantIdEndpoint}/wc-class-code/upload`;

export const GET_SOFTWARES = `${tenantIdEndpoint}/softwares/`;

//addresss
export const ADDRESSES = `${tenantIdEndpoint}/addresses/`;
export const EDIT_ADDRESSES = (id: any) =>
  `${tenantIdEndpoint}/addresses/${id}`;
export const BANK_CONFIG = `${tenantIdEndpoint}/bankconfigs/`;
export const BANK_CONFIG_details = (id) =>
  `${withoutTenantIdEndpoint}/bankconfigs/${id}`;
export const BANK_ACHES = `${tenantIdEndpoint}/bankaches/`;
export const BANK_ACH_DETAILS = (id) =>
  `${withoutTenantIdEndpoint}/bankaches/${id}`;
export const GET_PRODUCTIONS = (search) =>
  `${withoutTenantIdEndpoint}/projects/userprojects?search=${search}`;

export const UPLOAD_FILE_S3 = `/s3-upload`;

export const getProductionByClint = (id) =>
  `${withoutTenantIdEndpoint}/projects/clientprojects/${id}`;

export const PROJECT_DETAILS = (id: any) =>
  `${withoutTenantIdEndpoint}/projects/${id}`;

export const GET_ALL_USERS = `${withoutTenantIdEndpoint}/users/`; //get Users
export const GET_CLIENT_USERS = (id: any) =>
  `${withoutTenantIdEndpoint}/clients/${id}/users`; //get Users

export const GET_ALL_PROJECTS = `${withoutTenantIdEndpoint}/projects/`; //Projects

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

//PROJECTTYPES ENDPOINTS

export const GET_PROJECTTYPES = `${tenantIdEndpoint}/projecttypes/?limit=${100}&offset=0`; //Projecttypes
export const CREATE_PROJECTTYPE = `${tenantIdEndpoint}/projecttypes/`; //Create Projecttypes
export const DELETE_PROJECTTYPE = (id: any) =>
  `${tenantIdEndpoint}/projecttypes/${id}`; //DELETE Projecttypes
export const EDIT_PROJECTTYPE = (id: any) =>
  `${tenantIdEndpoint}/projecttypes/${id}`; //EDIT Projecttypes
export const PROJECTTYPES_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/projecttypes/${id}`;

export const GET_CLIENT_TYPES = `${withoutTenantIdEndpoint}/clienttypes/`;
export const GET_CLIENT_COUNTRIES = `${withoutTenantIdEndpoint}/countries/`;
export const GET_STATES_BY_COUNTRY = (id) =>
  `${withoutTenantIdEndpoint}/countries/${id}/states`;

export const GET_ALL_PROJECTS_LIST = `${withoutTenantIdEndpoint}/projects/search`; //Projects
export const CREATE_PRODUCTION = `${withoutTenantIdEndpoint}/projects/`; //Create projects

export const CREATE_PRODUCTION_APPROVER = `${withoutTenantIdEndpoint}/approvers/`; //Create projects

export const GET_CLIENTS_LIST = `${withoutTenantIdEndpoint}/clients/search`; //Clients
export const GET_CLIENTS_FILTERS = `${withoutTenantIdEndpoint}/clients/filters`; //Clients
export const UPDATE_PRODUCTION = (id: any) =>
  `${withoutTenantIdEndpoint}/projects/${id}`; //Create projects
  //LEGISLATIVES ENDPOINTS

export const GET_LEGISLATIVES = `${tenantIdEndpoint}/legislatives/?limit=${100}&offset=0`; //legislatives
export const CREATE_LEGISLATIVE = `${tenantIdEndpoint}/legislatives/`; //Create legislatives
export const DELETE_LEGISLATIVE = (id: any) =>
  `${tenantIdEndpoint}/legislatives/${id}`; //DELETE legislatives
export const EDIT_LEGISLATIVE = (id: any) =>
  `${tenantIdEndpoint}/legislatives/${id}`; //EDIT legislatives
export const LEGISLATIVE_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/legislatives/${id}`;


//PAYCODES ENDPOINTS

export const GET_PAYCODES = `${tenantIdEndpoint}/pay-code/?limit=${100}&offset=0`; //pay-code
export const CREATE_PAYCODE = `${tenantIdEndpoint}/pay-code/`; //Create pay-code
export const DELETE_PAYCODE = (id: any) =>
  `${tenantIdEndpoint}/pay-code/${id}`; //DELETE pay-code
export const EDIT_PAYCODE = (id: any) =>
  `${tenantIdEndpoint}/pay-code/${id}`; //EDIT pay-code
export const PAYCODE_DETAIL_ENDPOINT = (id: any) =>
  `${tenantIdEndpoint}/pay-code/${id}`;

//EMPLOYEETYPES ENDPOINTS
export const GET_EMPLOYEETYPES = `${tenantIdEndpoint}/employee-type/?limit=${100}&offset=0`; //Employeetypes
export const CREATE_EMPLOYEETYPE = `${tenantIdEndpoint}/employee-type/`; //Create Employeetypes
export const DELETE_EMPLOYEETYPE = (id: any) => `${tenantIdEndpoint}/employee-type/${id}`; //DELETE Employeetypes
export const EDIT_EMPLOYEETYPE = (id: any) => `${tenantIdEndpoint}/employee-type/${id}`; //EDIT Employeetypes
export const EMPLOYEETYPES_DETAIL_ENDPOINT = (id: any) => `${tenantIdEndpoint}/employee-type/${id}`;

//OCCUPATIONCODES ENDPOINTS
export const GET_OCCUPATIONCODES = `${tenantIdEndpoint}/occupationCode/?limit=${100}&offset=0`; //occupationCode
export const CREATE_OCCUPATIONCODE = `${tenantIdEndpoint}/occupationCode/`; //Create occupationCode
export const DELETE_OCCUPATIONCODE = (id: any) => `${tenantIdEndpoint}/occupationCode/${id}`; //DELETE occupationCode
export const EDIT_OCCUPATIONCODE = (id: any) => `${tenantIdEndpoint}/occupationCode/${id}`; //EDIT occupationCode
export const OCCUPATIONCODES_DETAIL_ENDPOINT = (id: any) => `${tenantIdEndpoint}/occupationCode/${id}`;

//WCCLASSCODES ENDPOINTS
export const GET_WCCLASS = `${tenantIdEndpoint}/wc-class/?limit=${100}&offset=0`; //wc-class-code
export const CREATE_WCCLASS = `${tenantIdEndpoint}/wc-class/`; //Create wc-class-code
export const DELETE_WCCLASS = (id: any) => `${tenantIdEndpoint}/wc-class/${id}`; //DELETE wc-class-code
export const EDIT_WCCLASS = (id: any) => `${tenantIdEndpoint}/wc-class/${id}`; //EDIT wc-class-code
export const WCCLASS_DETAIL_ENDPOINT = (id: any) => `${tenantIdEndpoint}/wc-class/${id}`;

//WCCODES ENDPOINTS
export const GET_WCCLASSCODES = `${tenantIdEndpoint}/wc-class-code/?limit=${100}&offset=0`; //wc-code
export const CREATE_WCCLASSCODE = `${tenantIdEndpoint}/wc-class-code/`; //Create wc-code
export const DELETE_WCCLASSCODE = (id: any) => `${tenantIdEndpoint}/wc-class-code/${id}`; //DELETE wc-code
export const EDIT_WCCLASSCODE = (id: any) => `${tenantIdEndpoint}/wc-class-code/${id}`; //EDIT wc-code
export const WCCLASSCODES_DETAIL_ENDPOINT = (id: any) => `${tenantIdEndpoint}/wc-class-code/${id}`;

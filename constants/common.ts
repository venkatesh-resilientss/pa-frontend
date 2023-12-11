export const DEFAULT_APP_STATE = "local";
export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: state.isDisabled ? "#e3e3e3" : "#fff",
    borderColor: "#9e9e9e",
    minHeight: "31px",
    height: "31px",
    boxShadow: state.isFocused ? null : null,
    border: state.isFocused ? "1px solid #00aeef" : "1px solid #dee2e6",
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "31px",
    padding: "0 6px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "31px",
  }),
  option: (provided, state) => {
    return {
      ...provided,
      cursor: state.isDisabled ? "not-allowed" : "default",
    };
  },
};

export const roleCreationData1 = {
  "Transaction Management": {
    state: false,
    value: "transaction_management",
    permissions: {
      "Create Purchase Order": { state: false, value: "create_purchase_order" },
      "Edit Purchase Order": { state: false, value: "edit_purchase_order" },
      "View Purchase Order List": {
        state: false,
        value: "view_purchase_order_list",
      },
      "Approve or Reject Purchase Order": {
        state: false,
        value: "approve_or_reject_purchase_order",
      },
      "Create Account Pay": { state: false, value: "create_account_pay" },
      "Edit Account Pay": { state: false, value: "edit_account_pay" },
      "View Account Pay List": { state: false, value: "view_account_pay_list" },
      "Approve or Reject Account Payable": {
        state: false,
        value: "approve_or_reject_account_pay",
      },
      "Create Journal Entry": { state: false, value: "create_journal_entry" },
      "Edit Journal Entry": { state: false, value: "edit_journal_entry" },
      "View Journal Entry List": {
        state: false,
        value: "view_journal_entry_list",
      },
      "Create Petty Cash": { state: false, value: "create_petty_cash" },
      "Edit Petty Cash": { state: false, value: "edit_petty_cash" },
      "View Petty Cash List": { state: false, value: "view_petty_cash_list" },
      "Approve or Reject Petty Cash": {
        state: false,
        value: "approve_or_reject_petty_cash",
      },
      "Create Payroll": { state: false, value: "create_payroll" },
      "Edit Payroll": { state: false, value: "edit_payroll" },
      "View Payroll List": { state: false, value: "view_payroll_list" },
      "Approve or Reject Payroll": {
        state: false,
        value: "approve_or_reject_payroll",
      },
    },
  },
};
export const roleCreationData2 = {
  "Payments Management": {
    state: false,
    value: "payments_management",
    permissions: {
      "View All Payments": { state: false, value: "view_all_payments" },
      "Check Signature Access": {
        state: false,
        value: "check_signature_access",
      },
      "Check Payment Processing": {
        state: false,
        value: "check_payment_processing",
      },
      "EFT Payment Processing": {
        state: false,
        value: "eft_payment_processing",
      },
      "Wire Payment Processing": {
        state: false,
        value: "wire_payment_processing",
      },
      "Manual Check Processing": {
        state: false,
        value: "manual_check_processing",
      },
      "Approve or Reject Payment": {
        state: false,
        value: "approve_or_reject_payment",
      },
    },
  },
  "Reports Management": {
    state: false,
    value: "reports_management",
    permissions: {
      "Trail Balance": { state: false, value: "trail_balance" },
      "General Ledger Reporting": {
        state: false,
        value: "general_ledger_reporting",
      },
      "Cost Report": { state: false, value: "cost_report" },
      "Purchase Order Reporting": {
        state: false,
        value: "purchase_order_reporting",
      },
      "Check Register": { state: false, value: "check_register" },
      "Vendor Reporting": { state: false, value: "vendor_reporting" },
      "Vendor Listing": { state: false, value: "vendor_listing" },
      "Chart of Accounts": { state: false, value: "chart_of_accounts" },
      "Asset Report": { state: false, value: "asset_report" },
      "Audit Report by Transaction": {
        state: false,
        value: "audit_report_by_transaction",
      },
      "Audit Report by Account": {
        state: false,
        value: "audit_report_by_account",
      },
      "Posting Report by Transaction": {
        state: false,
        value: "posting_report_by_transaction",
      },
      "Posting Report by Account": {
        state: false,
        value: "posting_report_by_account",
      },
      "Bank Reconciliation Report": {
        state: false,
        value: "bank_reconciliation_report",
      },
    },
  },
};
export const roleCreationData = {
  "Client Management": {
    state: false,
    value: "client_management",
    permissions: {
      "Create Client": { state: false, value: "create_client" },
      "Edit Client": { state: false, value: "edit_client" },
      "View All Clients": { state: false, value: "view_all_clients" },
      "Document Signature": { state: false, value: "document_signature" },
      "Deactivate Client": { state: false, value: "deactivate_client" },
    },
  },

  "Production Management": {
    state: false,
    value: "production_management",
    permissions: {
      "Approve Production": { state: false, value: "approve_production" },
      "Create Production": { state: false, value: "create_production" },
      "Edit Production": { state: false, value: "edit_production" },
      "View All Productions": { state: false, value: "view_all_productions" },
      "Deactivate Production": { state: false, value: "deactivate_production" },
    },
  },
  "Configuration Management": {
    state: false,
    value: "configuration_management",
    permissions: {
      "Create Configuration": { state: false, value: "create_configuration" },
      "Edit Configuration": { state: false, value: "edit_configuration" },
      "View All Configurations": {
        state: false,
        value: "view_all_configurations",
      },
      "Deactivate Configuration": {
        state: false,
        value: "deactivate_configuration",
      },
    },
  },
  "User & Role Management": {
    state: false,
    value: "user_and_role_management",
    permissions: {
      "Create User": { state: false, value: "create_user" },
      "Edit User": { state: false, value: "edit_user" },
      "Deactivate User": { state: false, value: "deactivate_user" },
      "View All Users": { state: false, value: "view_all_users" },

      "Create Role": { state: false, value: "create_role" },
      "Edit Role": { state: false, value: "edit_role" },
      "View All Roles": { state: false, value: "view_all_Roles" },

      "Deactivate Role": { state: false, value: "deactivate_role" },
    },
  },
};
export const sidebarRoutesMaster = [
  {
    name: "Dashboard",
    icon: "/icons/dashboardIcon.svg",
    path: "/dashboard",
  },
  {
    name: "Clients",
    icon: "/icons/clientIcon.svg",
    path: "/clients",
  },
  {
    name: "Productions",
    icon: "/icons/productionIcon.svg",
    path: "/productions",
  },

  {
    name: "Reports",
    icon: "/icons/report.svg",
    path: "/reports",
  },
  {
    name: "Configurations",
    icon: "/icons/configurationIcon.svg",
    path: "/configurations",
    children: [
      {
        name: "Currencies",
        path: "/currencies",
      },
      {
        name: "Countries",
        path: "/countries",
      },
      {
        name: "States",
        path: "/states",
      },
      {
        name: "Tax Codes",
        path: "/taxcodes",
      },
    ],
  },
  {
    name: "Payroll",
    icon: "/icons/list.svg",
    path: "/payroll",
    children: [
      {
        name: "Projects",
        path: "/projects",
      },
      {
        name: "Employees",
        path: "/employees",
      },
    ],
  },
  {
    name: "Settings",
    icon: "/icons/settingIcon.svg",
    path: "/settings",
    children: [
      {
        name: "User Management",
        path: "/usermanagement",
      },
      {
        name: "Role Management",
        path: "/rolemanagement",
      },
    ],
  },
];
export const sidebarRoutesProduction = [
  {
    name: "Dashboard",
    icon: "/icons/dashboardIcon.svg",
    path: "/dashboard",
  },
  {
    name: "Transactions",
    icon: "/icons/transactionIcon.svg",
    path: "/transactions",
    children: [
      {
        name: "Purchase Order",
        path: "/purchase-order",
      },
      {
        name: "Account Payable",
        path: "/account-payable",
      },
      {
        name: "Journal Entry",
        path: "/journal-entry",
      },
      {
        name: "Petty Cash",
        path: "/petty-cash",
      },
      {
        name: "Payroll",
        path: "/payroll",
      },
    ],
  },
  {
    name: "Payments",
    icon: "/icons/paymentIcon.svg",
    path: "/payments",
    children: [
      {
        name: "All Payments",
        path: "",
      },
      {
        name: "Payment Processing",
        path: "",
      },
    ],
  },
  // {
  //   name: "Reports",
  //   icon: "/icons/report.svg",
  //   path: "/reports",
  // },
  {
    name: "Configurations",
    icon: "/icons/configurationIcon.svg",
    path: "/configurations",
    children: [
      {
        name: "Agents",
        path: "/agent",
      },

      {
        name: "Budget",
        path: "/budgets",
      },
      {
        name: "Chart of Accounts (COA)",
        path: "/coaaccounts",
      },
      {
        name: "Departments",
        path: "/departments",
      },
      {
        name: "Locations",
        path: "/locations",
      },
      {
        name: "Periods",
        path: "/periods",
      },
      {
        name: "Sets",
        path: "/sets",
      },
      {
        name: "Series",
        path: "/series",
      },
      {
        name: "Vendors",
        path: "/vendors",
      },
      {
        name: "Company",
        path: "/company",
      },
      {
        name: "Project Types",
        path: "/project-type",
      },
    ],
  },
  {
    name: "Payroll",
    icon: "/icons/list.svg",
    path: "/payroll",
    children: [
      {
        name: "Projects",
        path: "/projects",
      },
      {
        name: "Employees",
        path: "/employees",
      },
    ],
  },
];

export const sidebarRoutesNonStaff = [
  {
    name: "Dashboard",
    icon: "/icons/dashboardIcon.svg",
    path: "/dashboard",
  },
  {
    name: "Productions",
    icon: "/icons/productionIcon.svg",
    path: "/productions",
  },
  {
    name: "Reports",
    icon: "/icons/report.svg",
    path: "/reports",
  },
  {
    name: "Configurations",
    icon: "/icons/configurationIcon.svg",
    path: "/configurations",
    children: [
      {
        name: "Banks",
        path: "/banks",
      },

      {
        name: "Departments",
        path: "/departments",
      },
      {
        name: "Occupation Codes",
        path: "/OccupationCodes",
      },
      {
        name: "WC Codes",
        path: "/Wccodes",
      },
      {
        name: "MPIPHP Production code",
        path: "/MPIPHP",
      },
    ],
  },
  {
    name: "Payroll",
    icon: "/icons/list.svg",
    path: "/payroll",
    children: [
      {
        name: "Projects",
        path: "/projects",
      },
      {
        name: "Employees",
        path: "/employees",
      },
    ],
  },
  {
    name: "Settings",
    icon: "/icons/settingIcon.svg",
    path: "/settings",
    children: [
      {
        name: "User Management",
        path: "/usermanagement",
      },
    ],
  },
];

/**Chart of accounts */
export const COAAccountyTypeOptions = [
  {
    label: "Asset",
    value: "asset",
  },
  {
    label: "Asset: Inventory",
    value: "asset_inventroy",
  },
  {
    label: "Cost Of Goods",
    value: "cost_of_goods",
  },
  {
    label: "Expense: Other",
    value: "expense_other",
  },
  {
    label: "Expense: ATL",
    value: "expense_atl",
  },
  {
    label: "Expense: BTL",
    value: "expense_btl",
  },
  {
    label: "Expense: Post",
    value: "expense_post",
  },
  {
    label: "Liability",
    value: "liability",
  },
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Capital",
    value: "capital",
  },
  {
    label: "Header - Separate Table",
    value: "header_seperate_table",
  },
];

/**Payment Options */
export const PaymentOptions = [
  { value: "cheque", label: "Cheque" },
  { value: "wire_transfer", label: "Wire Transfer" },
  { value: "manual_cheque", label: "Manual Cheque" },
  { value: "eft", label: "EFT" },
];

/**Address Types */
export const VendorsAddressTypes = [
  { label: "Mailing Address", value: "mailing_address" },
  { label: "Billing Address", value: "billing_address" },
  { label: "Contact Address", value: "contact_address" },
];

/**Form Validation Rules */
const ALPHA_NUMERIC = /^[A-Za-z0-9_ ]+$/i;
const CODE_PATTERN = /^[A-Za-z0-9]+$/i;
const NUMERIC = /^[0-9.]+[ ]*$/i;
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
const TAX_ID_PATTERN = /^\d{2}-\d{7}$/i;
const ZIP_CODE_PATTERN = /^[0-9-]+$/i;
const PHONE_NUMBER_PATTERN =
  /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/i;
const FULL_NAME_PATTERN = /^[A-Za-z0-9_. ]+$/i;
const CONTACT_TITLE_MAX_LENGTH = 10;
const NAME_MAX_LENGTH = 30;
const FULL_NAME_MAX_LENGTH = 100;
const CODE_MAX_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 250;
const ADDRESS_LINE_MAX_LENGTH = 50;
const ZIP_CODE_MAX_LENGTH = 12;
const ACCOUNT_NUMBER_MAX_LENGTH = 12;
const ROUTING_NUMBER_MAX_LENGTH = 9;
const EMAIL_MAX_LENGTH = 30;
const PHONE_MAX_LENGTH = 30;

const contactValidationRules = {
  fullName: {
    required : "Name is required",
    maxLength: {
      value: FULL_NAME_MAX_LENGTH,
      message: `Name must not contain more than ${FULL_NAME_MAX_LENGTH} characters`,
    },
    pattern: {
      value: FULL_NAME_PATTERN,
      message: "Name cannot contain special characters",
    },
  },
  title: {
    maxLength: {
      value: CONTACT_TITLE_MAX_LENGTH,
      message: `Title cannot contain more than ${CONTACT_TITLE_MAX_LENGTH} characters`,
    },
    pattern: {
      value: FULL_NAME_PATTERN,
      message: "Title cannot contain special characters",
    },
  },
  officePhone: {
    required : "Phone Number is required",
    maxLength: {
      value: PHONE_MAX_LENGTH,
      message: `Phone Number cannot contain more than ${PHONE_MAX_LENGTH} characters`,
    },
    pattern: {
      value: PHONE_NUMBER_PATTERN,
      message: "Invalid Phone Number",
    },
  },
  cellPhone: {
    maxLength: {
      value: PHONE_MAX_LENGTH,
      message: `Cell Phone Number cannot contain more than ${PHONE_MAX_LENGTH} characters`,
    },
    pattern: {
      value: PHONE_NUMBER_PATTERN,
      message: "Invalid Phone Number",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Please enter a valid email",
    },
    maxLength: {
      value: EMAIL_MAX_LENGTH,
      message: `Email must contain less than ${EMAIL_MAX_LENGTH} characters`,
    },
  },
};
export const formValidationRules = {
  department: {
    name: {
      required: "Department Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Department Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Department Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Department Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  sets: {
    name: {
      required: "Set Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Set Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Set Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Set Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  countries: {
    name: {
      required: "Country Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Country Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Country Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Country Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  states: {
    name: {
      required: "State Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: "State Name must be contain less than 30 characters",
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "State Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `State Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
    country: {
      required: "Country is required",
    },
  },
  series: {
    name: {
      required: "Series Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Department Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Series Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Series Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  locations: {
    name: {
      required: "Loaction Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Location Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Location Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Location Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: "Description cannot contain more than 250 characters",
      },
    },
  },
  budgets: {
    name: {
      required: "Budget Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: "Budget Name must be contain less than 30 characters",
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Budget Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Budget Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    company: {
      required: "Company is required",
    },
    production: {
      required: "Production is required",
    },
    currency: {
      required: "Currency is required",
    },
    series: {
      required: "Series is required",
    },
    location: {
      required: "Location is required",
    },
    set: {
      required: "Set is required",
    },
    budgetfile: {
      required: "File is required",
    },
  },
  currencies: {
    name: {
      required: "Currency Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Currency Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Currency Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Currency Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    symbol: {
      required: "Currency Symbol is required",
      maxLength: {
        value: 1,
        message: "Currency Symbol cannot be more than 1 character",
      },
    },
    currentRate: {
      required: "Base Value is required",
      pattern: {
        value: NUMERIC,
        message: "Base Value must be a number",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  chartofaccounts: {
    name: {
      required: "COA Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `COA Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "COA Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `COA Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    parent: {},
    accountType: {
      required: "Account Type is required",
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
    postable: {
      requuired: "Postable is required",
    },
  },
  taxCodes: {
    code: {
      required: "Tax Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Tax Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    name: {
      required: "Tax Code Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Tax Code Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    country: {
      required: "Tax Code Country is required",
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
  },
  periods: {
    name: {
      required: "Period Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Period Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
    startDate: {
      required: "Start Date is required",
    },
  },
  address: {
    line1: {
      maxLength: {
        value: ADDRESS_LINE_MAX_LENGTH,
        message: `Line 1 cannot have more than ${ADDRESS_LINE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    line2: {
      maxLength: {
        value: ADDRESS_LINE_MAX_LENGTH,
        message: `Line 2 cannot have more than ${ADDRESS_LINE_MAX_LENGTH} characters`,
      },
    },
    city: {
      
    },
    state: {

    },
    country: {
    },
    zipCode: {
      maxLength: {
        value: ZIP_CODE_MAX_LENGTH,
        message: `Zip Code cannot contain more than ${ZIP_CODE_MAX_LENGTH} character`,
      },
      pattern: {
        value: ZIP_CODE_PATTERN,
        message: "Zip Code cannot contain special characters",
      },
    },
  },
  productions: {
    name: {
      required: "Production Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: "Production Name must be contain less than 30 characters",
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Production Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Set Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
  },
  vendors: {
    name: {
      required: "Vendor Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Department Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Vendor Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Vendor Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    legalName: {
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Vendor Legal Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    paymentType: {
      required: "Payment Type Name is required",
    },
    deafultAccount: {},
    entityType: {
      required: "Entity Type is required",
    },
    defaultAddress: {
      required: "Default Address is required",
    },
    country : {
      required : "Country is required"
    },
    workState: {
      required: "Work State is required",
    },
    deafutltAccount: {
      required: "Default Account is required",
    },
    payeename: {
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Payee Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    accountNumber: {
      required: "Account Number is required",
      maxLength: {
        value: ACCOUNT_NUMBER_MAX_LENGTH,
        message: `Account Number must contain less than ${ACCOUNT_NUMBER_MAX_LENGTH} numbers`,
      },
      pattern: {
        value: NUMERIC,
        message: "Account Number must contain only numbers",
      },
    },
    routingNumber: {
      required: "Routing Number is required",
      maxLength: {
        value: ROUTING_NUMBER_MAX_LENGTH,
        message: `Routing Number must contain less than ${ROUTING_NUMBER_MAX_LENGTH} numbers`,
      },
      pattern: {
        value: NUMERIC,
        message: "Routing Number must contain only numbers",
      },
    },
    taxID: {
      pattern: {
        value: TAX_ID_PATTERN,
        message: "Required Tax ID pattern (xx-xxxxxxx)",
      },
    },
    pettyCashAccount: {
      required: "Petty Cash Account is required",
    },
    email: contactValidationRules.email,
    contactname: contactValidationRules.fullName,
    contactNumber: contactValidationRules.officePhone,
  },
  banks: {
    name: {
      required: "Bank Name is required",
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Bank Name must be contain less than ${NAME_MAX_LENGTH} characters`,
      },
      pattern: {
        value: ALPHA_NUMERIC,
        message: "Special characters are not allowed",
      },
    },
    code: {
      required: "Bank Code is required",
      maxLength: {
        value: CODE_MAX_LENGTH,
        message: `Vendor Code must be contain less than ${CODE_MAX_LENGTH} characters`,
      },
      pattern: {
        value: CODE_PATTERN,
        message: "Special characters and spaces are not allowed",
      },
    },
    description: {
      maxLength: {
        value: DESCRIPTION_MAX_LENGTH,
        message: `Description cannot contain more than ${DESCRIPTION_MAX_LENGTH} characters`,
      },
    },
    accountNumber: {
      required: "Account Number is required",
      maxLength: {
        value: ACCOUNT_NUMBER_MAX_LENGTH,
        message: `Account Number must contain less than ${ACCOUNT_NUMBER_MAX_LENGTH} characters`,
      },
      pattern: {
        value: NUMERIC,
        message: "Account Number must contain only numbers",
      },
    },
    routingNumber: {
      required: "Routing Number is required",
      maxLength: {
        value: ROUTING_NUMBER_MAX_LENGTH,
        message: `Routing Number must contain less than ${ROUTING_NUMBER_MAX_LENGTH} characters`,
      },
      pattern: {
        value: NUMERIC,
        message: "Routing Number must contain only numbers",
      },
    },
    currency: {
      required: "Currency is required",
    },
    branchNumber: {
      required: "Branch Number is required",
      pattern: {
        value: NUMERIC,
        message: "Branch Number must contain only numbers",
      },
      maxLength: {
        value: 10,
        message: "Branch Number must be less than 10 numbers",
      },
    },
    accountFraction: {
      required: "Account Fraction is required",
    },
    email: contactValidationRules.email,
    contactName: contactValidationRules.fullName,
  },
};

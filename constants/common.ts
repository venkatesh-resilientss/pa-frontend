export const DEFAULT_APP_STATE = "local"
export const roleCreationData = {
  "Client Management": {
    state: false,
    value: "client_management",
    permissions: {
      "Create Client": { state: false, value: "create_client" },
      "Edit Client": { state: false, value: "edit_client" },
      "Deactivate Client": { state: false, value: "deactivate_client" },
    },
  },

  "Production Management": {
    state: false,
    value: "production_management",
    permissions: {
      "Create Production": { state: false, value: "create_production" },
      "Edit Production": { state: false, value: "edit_production" },
      "Deactivate Production": { state: false, value: "deactivate_production" },
    },
  },
  "Configuration Management": {
    state: false,
    value: "configuration_management",
    permissions: {
      "Create Configuration": { state: false, value: "create_configuration" },
      "Edit Configuration": { state: false, value: "edit_configuration" },
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
      "Create Role": { state: false, value: "create_role" },
      "Edit Role": { state: false, value: "edit_role" },
      "Deactivate Role": { state: false, value: "deactivate_role" },
    },
  },
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
      "Approve or Reject Account Pay": {
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
}
export const sidebarRoutes = [
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
        name: "Pay Roll",
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
        name: "Departments",
        path: "/departments",
      },
      {
        name: "Sets",
        path: "/sets",
      },
      {
        name: "Locations",
        path: "/locations",
      },
      {
        name: "Currencies",
        path: "/currencies",
      },
      {
        name: "Chart of Accounts (COA)",
        path: "/coaaccounts",
      },
      {
        name: "Vendors",
        path: "/vendors",
      },
      {
        name: "Tax Codes",
        path: "/taxcodes",
      },
      {
        name: "Banks",
        path: "/banks",
      },
      {
        name: "Periods",
        path: "/periods",
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
        name: "Series",
        path: "/series",
      },

      {
        name: "Budget",
        path: "/budgets",
      },
    ],
  },
  {
    name: "Payroll",
    icon: "/icons/configurationIcon.svg",
    path: "/payroll",
    children: [
      {
        name: "Projects",
        path: "/projects"
      }
    ]
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
]

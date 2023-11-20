export const DEFAULT_APP_STATE = "local";
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
        path: "/configurations/budgets",
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

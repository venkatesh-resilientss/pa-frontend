import { lazy } from "react";

const TransactionsRoutes = [
  {
    path: "/purchase-order",
    component: lazy(() =>
      import("../../../views/MyProject/Transactions/PurchaseOrder/index")
    ),
  },

  {
    path: "/account-payable",
    component: lazy(() =>
      import("../../../views/MyProject/Transactions/AccountPayable/index")
    ),
  },

  {
    path: "/journal-entry",
    component: lazy(() =>
      import("../../../views/MyProject/Transactions/JournalEntry/index")
    ),
  },

  {
    path: "/petty-cash",
    component: lazy(() =>
      import("../../../views/MyProject/Transactions/PettyCash/index")
    ),
  },
];

export default TransactionsRoutes;

// ** Icons Import
import icon from "@src/assets/myIcons/transactionIcon.svg";

export default [
  {
    id: "transactions",
    title: "Transactions",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    children: [
      {
        id: "purchase-order",
        title: "Purchase Order",
        navLink: "/purchase-order",
      },
      {
        id: "account-payable",
        title: "Account Payable",
        navLink: "/account-payable",
      },
      {
        id: "journal-entry",
        title: "Journal Entry",
        navLink: "/journal-entry",
      },
      {
        id: "petty-cash",
        title: "Petty Cash",
        navLink: "/petty-cash",
      },
    ],
  },
];

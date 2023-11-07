// ** Icons Import
import { PieChart, Circle } from "react-feather";
import { LiaSlidersHSolid } from "react-icons/lia";
import icon from "@src/assets/myIcons/configurationIcon.svg";

export default [
  {
    id: "configurations",
    title: "Configurations",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    children: [
      {
        id: "departments",
        title: "Departments",
        navLink: "/departments",
      },
      {
        id: "sets",
        title: "Sets",
        navLink: "/sets",
      },
      {
        id: "locations",
        title: "Locations",
        navLink: "/locations",
      },
      {
        id: "currencies",
        title: "Currencies",
        navLink: "/currencies",
      },
      {
        id: "chart-of-accounts",
        title: "Chart of Accounts (COA)",
        navLink: "/chart-of-accounts",
      },
      {
        id: "vendors",
        title: "Vendors",
        navLink: "/vendors",
      },

      {
        id: "taxcodes",
        title: "Tax Codes",
        navLink: "/tax-codes",
      },

      {
        id: "banks",
        title: "Banks",
        navLink: "/banks",
      },

      {
        id: "periods",
        title: "Periods",
        navLink: "/periods",
      },

      {
        id: "countries",
        title: "Countries",
        navLink: "/countries",
      },

      {
        id: "states",
        title: "States",
        navLink: "/states",
      },

      {
        id: "series",
        title: "Series",
        navLink: "/series",
      },
    ],
  },
];

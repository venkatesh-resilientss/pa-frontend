// ** Icons Import
import { ShoppingBag, Table, User } from "react-feather";
import icon from "@src/assets/myIcons/dashboardIcon.svg";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    navLink: "/dashboard",
    action: "read",
  },
];

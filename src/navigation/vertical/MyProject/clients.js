// ** Icons Import
import { ShoppingBag, Table, User } from "react-feather";
import { BiUserCircle } from "react-icons/bi";
import icon from "@src/assets/myIcons/clientIcon.svg";

export default [
  {
    id: "clients",
    title: "Clients",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    navLink: "/clients",
    action: "read",
  },
];

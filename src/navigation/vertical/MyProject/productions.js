// ** Icons Import
import { ShoppingBag, Table, User } from "react-feather";
import { FcFilmReel } from "react-icons/fc";
import icon from "@src/assets/myIcons/productionIcon.svg";

export default [
  {
    id: "productions",
    title: "Productions",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    navLink: "/productions",
    action: "read",
  },
];

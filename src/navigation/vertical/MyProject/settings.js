// ** Icons Import
import { PieChart, Circle } from "react-feather";
import { FiSettings } from "react-icons/fi";
import icon from "@src/assets/myIcons/settingIcon.svg";

export default [
  {
    id: "settings",
    title: "Settings",
    icon: (
      <div>
        <img src={icon} style={{ width: "14px", height: "14px" }} />
      </div>
    ),
    children: [
      {
        id: "user-management",
        title: "User Management",
        navLink: "/user-management",
      },

      {
        id: "role-management",
        title: "Role Management",
        navLink: "/role-management",
      },

      {
        id: "agreement-management",
        title: "Agreement Management",
        navLink: "/agreement-management",
      },
    ],
  },
];

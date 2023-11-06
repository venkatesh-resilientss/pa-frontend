import { lazy } from "react";

const SettingsRoutes = [
  {
    path: "/user-management",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/UserManagement/index")
    ),
  },

  {
    path: "/add-user",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/UserManagement/AddUser/index")
    ),
  },

  {
    path: "/edit-user",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/UserManagement/EditUser/index")
    ),
  },

  {
    path: "/role-management",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/RoleManagement/index")
    ),
  },

  {
    path: "/add-role",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/RoleManagement/AddRole/index")
    ),
  },

  {
    path: "/edit-role",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/RoleManagement/EditRole/index")
    ),
  },

  {
    path: "/agreement-management",
    component: lazy(() =>
      import("../../../views/MyProject/Settings/AgreementManagement/index")
    ),
  },
];

export default SettingsRoutes;

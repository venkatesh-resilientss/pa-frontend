import { lazy } from "react";

const MyDashboardRoutes = [
  {
    path: "/dashboard",

    component: lazy(() => import("../../../views/MyProject/Dashboard/index")),
  },
];

export default MyDashboardRoutes;

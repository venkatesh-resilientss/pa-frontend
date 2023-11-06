import { lazy } from "react";

const ClientsRoutes = [
  {
    path: "/clients",
    component: lazy(() => import("../../../views/MyProject/Clients/index")),
  },

  {
    path: "/create-client",
    component: lazy(() =>
      import("../../../views/MyProject/Clients/CreateClient/index")
    ),
  },

  {
    path: "/client-details",
    component: lazy(() =>
      import("../../../views/MyProject/Clients/ClientDetails/index")
    ),
  },
];

export default ClientsRoutes;

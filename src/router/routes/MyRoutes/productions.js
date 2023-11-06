import { lazy } from "react";

const ProductionsRoutes = [
  {
    path: "/Productions",
    component: lazy(() => import("../../../views/MyProject/Productions/index")),
  },

  {
    path: "/create-production",
    component: lazy(() =>
      import("../../../views/MyProject/Productions/AddProductions/index")
    ),
  },
];

export default ProductionsRoutes;

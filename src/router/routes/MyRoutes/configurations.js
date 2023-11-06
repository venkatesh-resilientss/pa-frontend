import { lazy } from "react";

const ConfigurationsRoutes = [
  {
    path: "/departments",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Departments/index")
    ),
  },

  {
    path: "/add-department",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Departments/AddDepartment/index"
      )
    ),
  },

  {
    path: "/edit-department/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Departments/EditDepartment/index"
      )
    ),
  },

  {
    path: "/sets",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Sets/index")
    ),
  },

  {
    path: "/add-set",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Sets/AddSet/index")
    ),
  },

  {
    path: "/edit-set/:id",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Sets/EditSet/index")
    ),
  },

  {
    path: "/locations",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Locations/index")
    ),
  },

  {
    path: "/add-location",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Locations/AddLocation/index"
      )
    ),
  },

  {
    path: "/edit-location/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Locations/EditLocation/index"
      )
    ),
  },

  {
    path: "/currencies",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Currencies/index")
    ),
  },

  {
    path: "/add-currency",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Currencies/AddCurrency/index"
      )
    ),
  },

  {
    path: "/edit-currency/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Currencies/EditCurrency/index"
      )
    ),
  },

  {
    path: "/chart-of-accounts",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/ChartOfAccounts/index")
    ),
  },

  {
    path: "/add-chart-of-accounts",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/ChartOfAccounts/AddChartOfAccounts/index"
      )
    ),
  },

  {
    path: "/edit-chart-of-accounts/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/ChartOfAccounts/EditChartOfAccounts/index"
      )
    ),
  },

  {
    path: "/vendors",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Vendors/index")
    ),
  },

  {
    path: "/add-vendor",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Vendors/AddVendors/index")
    ),
  },

  {
    path: "/edit-vendor/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Vendors/EditVendors/index"
      )
    ),
  },

  {
    path: "/tax-codes",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/TaxCodes/index")
    ),
  },

  {
    path: "/add-tax-code",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/TaxCodes/AddTaxCodes/index"
      )
    ),
  },

  {
    path: "/edit-tax-code/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/TaxCodes/EditTaxCodes/index"
      )
    ),
  },

  {
    path: "/banks",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Banks/index")
    ),
  },

  {
    path: "/add-bank",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Banks/AddBank/index")
    ),
  },

  {
    path: "/edit-bank/:id",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Banks/EditBank/index")
    ),
  },

  {
    path: "/periods",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Periods/index")
    ),
  },

  {
    path: "/add-period",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Periods/AddPeriod/index")
    ),
  },

  {
    path: "/edit-period/:id",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Periods/EditPeriod/index")
    ),
  },

  {
    path: "/countries",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Countries/index")
    ),
  },

  {
    path: "/add-country",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Countries/AddCountry/index"
      )
    ),
  },

  {
    path: "/edit-country/:id",
    component: lazy(() =>
      import(
        "../../../views/MyProject/Configurations/Countries/EditCountry/index"
      )
    ),
  },

  {
    path: "/states",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/States/index")
    ),
  },

  {
    path: "/add-state",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/States/AddState/index")
    ),
  },

  {
    path: "/edit-state/:id",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/States/EditState/index")
    ),
  },

  {
    path: "/series",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Series/index")
    ),
  },

  {
    path: "/add-series",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Series/AddSeries/index")
    ),
  },

  {
    path: "/edit-series/:id",
    component: lazy(() =>
      import("../../../views/MyProject/Configurations/Series/EditSeries/index")
    ),
  },
];

export default ConfigurationsRoutes;

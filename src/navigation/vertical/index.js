// ** Navigation imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import others from "./others";
import charts from "./charts";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";

import table from "./MyProject/table";
import configurations from "./MyProject/configurations";
import dashboard from "./MyProject/dashboard";
import clients from "./MyProject/clients";
import productions from "./MyProject/productions";
import settings from "./MyProject/settings";
import transactions from "./MyProject/transactions";

// ** Merge & Export
export default [
  //   ...dashboards,
  //   ...apps,
  //   ...pages,
  //   ...uiElements,
  //   ...forms,
  //   ...tables,
  //   ...charts,
  //   ...others,

  ...dashboard,
  ...clients,
  ...productions,
  ...transactions,
  ...configurations,
  ...settings,
  // ...table,
];

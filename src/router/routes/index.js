// ** Routes Imports
import AppRoutes from "./Apps";
import FormRoutes from "./Forms";
import PagesRoutes from "./Pages";
import TablesRoutes from "./Tables";
import ChartsRoutes from "./Charts";
import DashboardRoutes from "./Dashboards";
import UiElementRoutes from "./UiElements";
import ExtensionsRoutes from "./Extensions";
import PageLayoutsRoutes from "./PageLayouts";
import TableRoutes from "./MyRoutes/table";
import ConfigurationsRoutes from "./MyRoutes/configurations";
import MyDashboardRoutes from "./MyRoutes/dashboard";
import ClientsRoutes from "./MyRoutes/clients";
import ProductionsRoutes from "./MyRoutes/productions";
import SettingsRoutes from "./MyRoutes/settings";
import TransactionsRoutes from "./MyRoutes/transactions";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartsRoutes,

  ...MyDashboardRoutes,
  ...ClientsRoutes,
  ...TableRoutes,
  ...ProductionsRoutes,
  ...TransactionsRoutes,
  ...ConfigurationsRoutes,
  ...SettingsRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };

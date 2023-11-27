import productions from "./slices/mySlices/productions";
import clients from "./slices/mySlices/clients";
import configurations from "./slices/mySlices/configurations";
import transactions from "./slices/mySlices/transactions";
import roles from "./slices/mySlices/roles";
import payroll from "./slices/mySlices/payroll";

const rootReducer = {
  productions,
  clients,
  configurations,
  transactions,
  roles,
  payroll

  // [restApi.reducerPath]: restApi.reducer
};

export default rootReducer;

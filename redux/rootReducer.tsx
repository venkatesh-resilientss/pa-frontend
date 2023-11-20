import productions from "./slices/mySlices/productions";
import clients from "./slices/mySlices/clients";
import configurations from "./slices/mySlices/configurations";
import transactions from "./slices/mySlices/transactions";
import roles from "./slices/mySlices/roles";

const rootReducer = {
  productions,
  clients,
  configurations,
  transactions,roles,

  // [restApi.reducerPath]: restApi.reducer
};

export default rootReducer;

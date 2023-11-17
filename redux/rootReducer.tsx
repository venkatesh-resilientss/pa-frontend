import productions from "./slices/mySlices/productions";
import clients from "./slices/mySlices/clients";
import configurations from "./slices/mySlices/configurations";
import transactions from "./slices/mySlices/transactions";

const rootReducer = {
  productions,
  clients,
  configurations,
  transactions,

  // [restApi.reducerPath]: restApi.reducer
};

export default rootReducer;

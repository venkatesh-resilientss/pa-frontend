// ** Redux Imports
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import restApi from "./api/restApi";

const middleware = [restApi.middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware);
  },
});

setupListeners(store.dispatch);

export { store };

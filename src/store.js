import { api } from "./core/state/api";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./core/state";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./core/state/api/user";
import { productApi } from "./core/state/api/product";
import cartSlice from "./core/state/api/cart";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartSlice,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware, userApi.middleware, productApi.middleware),
});
setupListeners(store.dispatch);

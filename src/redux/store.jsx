import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

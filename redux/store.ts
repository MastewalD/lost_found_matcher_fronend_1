"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  });

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

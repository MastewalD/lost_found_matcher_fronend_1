import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: [
    "Reports",
  ],
  refetchOnFocus: true,
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});

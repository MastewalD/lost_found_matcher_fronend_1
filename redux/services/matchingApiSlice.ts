import { apiSlice } from "../features/apiSlice";

export const matchingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reportLostItems: builder.mutation({
      query: (data) => ({
        url: "/reports",
        method: "POST",
        body: data,
      }),
    }),

    findMatchingItems: builder.mutation({
      query: (data) => ({
        url: "/reports/matches",
        method: "POST",
        body: data,
      }),
    }),

    getAllReports: builder.query<
      ReportsResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: "/reports",
        method: "GET",
        params: { limit, offset },
      }),
    }),

    getSingleReport: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useReportLostItemsMutation,
  useFindMatchingItemsMutation,
  useGetAllReportsQuery,
  useGetSingleReportQuery,
} = matchingApiSlice;

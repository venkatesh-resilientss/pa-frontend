import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserData } from "@utils";

const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const restApi = createApi({
  reducerPath: "restApi",

  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers) => {
      const token = getUserData()?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [],

  endpoints: (builder) => ({
    getAllBanks: builder.query({
      query: (data) => `${baseUrl}api/banks`,
    }),

    getAllCountries: builder.query({
      query: (data) => `${baseUrl}api/countries/`,
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}api/forgot-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllBanksQuery,
  useGetAllCountriesQuery,
  useForgotPasswordMutation,
} = restApi;

export default restApi;

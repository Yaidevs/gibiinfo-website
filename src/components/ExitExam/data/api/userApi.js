import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";
import { BASE_URL, USER_URL } from "../../../../constants";


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/user/get-or-create/`,
        method: "POST",
        body: data,
      }),
    }),
    validateToken: builder.query({
      query: (id) => ({ url: `/user/auth/validate-token/` }),
    }),
  }),
});

export const { useCreateUserMutation, useValidateTokenQuery } = userApi;

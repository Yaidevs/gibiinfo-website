import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";

const apiBasePath = "/exit-exam";

export const exitexamApi = createApi({
  reducerPath: "exitexamApi",
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
    getAllExitExamVersion: builder.query({
      query: () => `${apiBasePath}`,
    }),
    getExitExamQuestions: builder.query({
      query: (params) => {
        // If params is just an ID string, handle it for backward compatibility
        if (typeof params === "string") {
          return `/exit-question/by/exit-exam/${params}`;
        }

        // Otherwise, extract id, page, and limit from params
        const { id, page = 1, limit = 100 } = params;
        return `/exit-question/by/exit-exam/${id}?page=${page}&limit=${limit}`;
      },
    }),
    getExitExamByDepartment: builder.query({
      query: (id) => `/exit-exam/by/department/${id}`,
    }),
    getDepartmentById: builder.query({
      query: (id) => ({ url: `/department/${id}` }),
    }),
    getDepartments: builder.query({
      query: () => ({ url: `/department/` }),
    }),

    addExam: builder.mutation({
      query: (data) => ({ url: `${apiBasePath}`, method: "POST", body: data }),
    }),
    addQuestionForExitExam: builder.mutation({
      query: (data) => ({ url: `/exit-question/`, method: "POST", body: data }),
    }),

    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `${apiBasePath}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateExitQuestion: builder.mutation({
      query: (data) => ({
        url: `/exit-question/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteExitExamVersion: builder.mutation({
      query: (id) => ({ url: `${apiBasePath}/${id}`, method: "DELETE" }),
    }),
    deleteExitExamQuestion: builder.mutation({
      query: (id) => ({ url: `/exit-question/${id}`, method: "DELETE" }),
    }),
    purchaseExam: builder.mutation({
      query: (data) => ({
        url: `${apiBasePath}/purchase`,
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/user/get-or-create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllExitExamVersionQuery,
  useAddExamMutation,
  useDeleteExitExamVersionMutation,
  useAddQuestionForExitExamMutation,
  useGetExitExamQuestionsQuery,
  useDeleteExitExamQuestionMutation,
  useUpdateExitQuestionMutation,
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useGetExitExamByDepartmentQuery,
  usePurchaseExamMutation,
  useCreateUserMutation,
} = exitexamApi;

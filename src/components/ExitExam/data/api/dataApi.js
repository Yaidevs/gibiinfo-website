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
      query: (id) => `/exit-question/by/exit-exam/${id}`,
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
} = exitexamApi;

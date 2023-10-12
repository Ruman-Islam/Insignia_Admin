import { api } from "../../api/apiSlice";


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
    getRefreshToken: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/admin/refresh/token",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const { useLoginMutation, useGetRefreshTokenMutation, useTestQuery } =
  authApi;

import { api } from "../../api/apiSlice";

const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadBannerImg: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/upload/banner-image",
        method: "POST",
        body: data,
      }),
    }),
    uploadWindowImg: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/upload/window-image",
        method: "POST",
        body: data,
      }),
    }),
    uploadBannerTitle: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/upload/banner-title",
        method: "POST",
        body: data,
      }),
    }),
    getSystemConfig: builder.query({
      query: () => ({
        url: "/admin/get/system-config",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadBannerImgMutation,
  useUploadWindowImgMutation,
  useUploadBannerTitleMutation,
  useGetSystemConfigQuery,
} = dashboardApi;

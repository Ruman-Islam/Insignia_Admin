import { api } from "../../api/apiSlice";

const packageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: ({ data }) => ({
        url: "/package/create-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
    getAllPackage: builder.query({
      query: ({ page, limit, searchTerm, isSelected, isPopular }) => {
        let url = `/package`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (isSelected !== "") {
          url += `&isSelected=${isSelected}`;
        }
        if (isPopular !== "") {
          url += `&isPopular=${isPopular}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["package"],
    }),
    getOnePackage: builder.query({
      query: (id) => ({
        url: `/package/${id}`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),
    deleteOnePackage: builder.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),
    deleteManyPackage: builder.mutation({
      query: ({ data }) => ({
        url: `/package/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
    updatePackageVisibility: builder.mutation({
      query: (id) => ({
        url: `/package/update-visibility/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["package"],
    }),
    updatePackagePopularity: builder.mutation({
      query: (id) => ({
        url: `/package/update-popularity/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["package"],
    }),
    editPackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/package/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useUpdatePackageVisibilityMutation,
  useUpdatePackagePopularityMutation,
  useDeleteOnePackageMutation,
  useDeleteManyPackageMutation,
  useGetOnePackageQuery,
  useEditPackageMutation
} = packageApi;

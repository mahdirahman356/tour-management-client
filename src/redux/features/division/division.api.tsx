import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData,
            }),
            invalidatesTags: ["DIVISION"]
        }),
        getDivision: builder.query({
            query: (params) => ({
                url: "/division",
                method: "GET",
                params
            }),
           providesTags: ["DIVISION"], 
           transformResponse: (response) => response.data
        }),
    })
})

export const {
    useAddDivisionMutation,
    useGetDivisionQuery,
} = divisionApi;

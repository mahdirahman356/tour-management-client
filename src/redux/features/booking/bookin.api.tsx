
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";


export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/booking",
                method: "POST",
                data: bookingData,
            }),
            invalidatesTags: ["BOOKING"]
        }),
        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),
    })
})

export const {
    useCreateBookingMutation
} = bookingApi;

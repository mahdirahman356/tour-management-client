import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISentOtp, IUser, IVerifyOtp } from "@/types";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IResponse<null>, Partial<IUser>>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        register: builder.mutation<IResponse<null>, IUser>({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"]
        }),
        sentOtp: builder.mutation<IResponse<null>, ISentOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            }),
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            }),
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSentOtpMutation,
    useVerifyOtpMutation,
    useUserInfoQuery,
    useLogoutMutation
} = authApi;

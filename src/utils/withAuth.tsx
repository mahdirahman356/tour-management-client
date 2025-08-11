import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined)

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to="/unauthorized" />
        }

        console.log("Inside component", data)
        return <Component />
    }
};

export default withAuth;
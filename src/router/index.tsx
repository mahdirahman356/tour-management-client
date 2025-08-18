import App from "@/App"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Verify from "@/pages/Verify"
import { createBrowserRouter, Navigate } from "react-router"
import { adminSidebarItems } from "./adminSidebarItems"
import { generateRoutes } from "@/utils/generateRoutes"
import { userSidebarItems } from "./userSidebarItems"
import withAuth from "@/utils/withAuth"
import { role } from "@/constents/role"
import type { TRole } from "@/types"
import Unauthorized from "@/pages/Unauthorized"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Tours from "@/pages/Tours"
import HomePage from "@/pages/HomePage"
import TourDetails from "@/pages/TourDetails"
import Booking from "@/pages/Booking"
import Success from "@/pages/Payment/Success"
import Fail from "@/pages/Payment/Fail"

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HomePage,
                index: true
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Tours,
                path: "tours"
            },
            {
                Component: TourDetails,
                path: "tours/:id"
            },
            {
                Component: withAuth(Booking),
                path: "booking/:id"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to={"/admin/analytics"} /> },
            ...generateRoutes(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [
            { index: true, element: <Navigate to={"/user/bookings"} /> },
            ...generateRoutes(userSidebarItems)
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },
    {
        Component: Success,
        path: "/payment/success",
    },
    {
        Component: Fail,
        path: "/payment/fail",
    },
])  
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddTour = lazy(() => import("@/pages/Admin/AddTour"))
const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics,
            },
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component: AddTour,
            },
        ],
    }
]
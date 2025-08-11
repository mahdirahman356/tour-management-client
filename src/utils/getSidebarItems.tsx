import { role } from "@/constents/role";
import { adminSidebarItems } from "@/router/adminSidebarItems";
import { userSidebarItems } from "@/router/userSidebarItems";
import type { TRole } from "@/types";



export const getSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.superAdmin:
            return[...adminSidebarItems];

        case role.admin:
            return[...adminSidebarItems];
        
        case role.user:
            return[...userSidebarItems];
        default:
           return []
    } 
};


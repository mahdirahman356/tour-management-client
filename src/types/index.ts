import type { ComponentType } from "react"

export type { ISentOtp, IVerifyOtp } from "./auth.type"

export interface IResponse<T> {
    StatusCode: number
    success: boolean
    message: string
    data: T
}

export interface IUser {
    name: string
    email: string
    password: string
    role: string
    isDeleted: boolean
    isActive: string
    isVerified: boolean
    auths: Auth[]
    _id: string
    createdAt: string
    updatedAt: string
}

export interface Auth {
    provider: string
    providerId: string
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER"
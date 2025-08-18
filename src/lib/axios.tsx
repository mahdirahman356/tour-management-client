import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true
});

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
},
);

// Add a response interceptor

let isRefreshing = false;

let pandingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void
}[] = []

const processQueue = (error: unknown) => {
  pandingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(null)
    }
  })
  pandingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean }
    console.log("Request Failed", error.response)
    if (error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry) {

      console.log("Tour Token is expired")

      originalRequest._retry = true 

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pandingQueue.push({ resolve, reject })
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error))
      }

      isRefreshing = true

      try {
        const res = await axiosInstance.post("/auth/refresh-token")
        console.log("New token arrived", res)
        processQueue(null)
        return axiosInstance(originalRequest)
      } catch (error) {
        processQueue(error)
        Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
);
// lib/axios.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { backendURL } from "@/constants/constants";

export interface ApiError {
  status?: number;
  message: string;
  errors?: unknown[];
}

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

if (process.env.NODE_ENV === "development") {
  console.log("API BASE URL:", api.defaults.baseURL);
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    const formattedError: ApiError = {
      status,
      message,
      errors: error.response?.data?.errors || [],
    };

    return Promise.reject(formattedError);
  },
);

export default api;

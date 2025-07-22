import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BASE_API,
    headers: {
      'Content-Type': 'application/json'
    }
  })
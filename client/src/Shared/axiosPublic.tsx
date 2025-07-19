import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/events',
    headers: {
      'Content-Type': 'application/json'
    }
  })
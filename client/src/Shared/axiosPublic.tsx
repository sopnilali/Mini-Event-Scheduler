import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://mini-event-scheduler-api.vercel.app/events',
    headers: {
      'Content-Type': 'application/json'
    }
  })
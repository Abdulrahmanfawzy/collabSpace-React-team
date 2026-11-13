import axios from "axios";

import { getToken } from "@/lib/auth";
const VITE_API_URL="https://collabspace.huma-volve.com/ai/v1"

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
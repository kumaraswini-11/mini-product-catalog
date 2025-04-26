import axios from "axios";

export const API_URL = "https://fakestoreapi.com";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

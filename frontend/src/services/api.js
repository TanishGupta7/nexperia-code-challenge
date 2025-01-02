import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

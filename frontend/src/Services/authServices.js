import axios from "axios";
import { API_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const login = async (formData) => {
  const response = await axios.post(`${API_URL}/auth/login`, formData);
  return response.data;
};

export const register = async (formData) => {
  const response = await axios.post(`${API_URL}/auth/register`, formData);
  return response.data;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const logout = async () => {
  const response = apiClient.post(`${API_URL}/auth/logout`);
  return response.data;
};

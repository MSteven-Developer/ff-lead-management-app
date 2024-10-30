import axios from "axios";
import { API_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_URL,
});

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

export const fetchLeadStatuses = async () => {
  const response = await apiClient.get(`/lead-statuses`);
  return response.data.data;
};

export const fetchLeadData = async (id) => {
  const response = await apiClient.get(`/leads/${id}`);
  return response.data.data;
};

export const createLead = async (formData) => {
  const response = await apiClient.post(`/leads`, formData);
  return response.data;
};

export const updateLead = async (id, formData) => {
  const response = await apiClient.put(`/leads/${id}`, formData);
  return response.data;
};

export const getLeads = async (params) => {
  const url = `/leads?${createQueryParams(params)}`;
  const response = await apiClient.get(url);
  return response.data.data;
};

const createQueryParams = (params) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
};

export const deleteLead = async (id) => {
  await apiClient.delete(`/leads/${id}`);
};

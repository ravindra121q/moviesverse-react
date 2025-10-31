import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "baseUrl_is_not_set";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_API_TOKEN || localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please try again later.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;

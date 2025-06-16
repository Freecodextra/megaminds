import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}refresh/`, { refresh });
          localStorage.setItem("access", res.data.access);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      } else {
        // No refresh token, logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
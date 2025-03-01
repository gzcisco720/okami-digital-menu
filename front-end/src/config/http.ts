import axios from "axios";
import { API_BASE_URL } from "./env";

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        originalRequest._retry = true;
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
            headers: {
              Authorization: `Bearer ${refresh_token}`
            }
          });
          if (response.status === 200) {
            const {access_token, refresh_token} = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            return http(originalRequest);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
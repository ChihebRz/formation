    import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour ajouter le token JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("📤 API Request:", config.url, "- Token:", token ? "✅ YES (" + token.substring(0, 30) + "...)" : "❌ NO");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("📤 Authorization header set:", config.headers.Authorization.substring(0, 50) + "...");
  }
  return config;
});

// Interceptor pour gérer les erreurs 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message, error.response?.status);
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;




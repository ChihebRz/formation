import axios, { AxiosInstance, AxiosError } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 secondes timeout
});

// ========== REQUEST INTERCEPTOR ==========
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error.message);
    return Promise.reject(error);
  }
);

// ========== RESPONSE INTERCEPTOR ==========
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response Success:", response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.message;

    console.error("❌ API Error:", {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
    });

    // Gestion des erreurs spécifiques
    if (!error.response) {
      // Erreur de connexion (backend injoignable)
      console.error("🔴 CRITICAL: Impossible de se connecter au backend (http://localhost:8080)");
      console.error("Vérifiez que le backend est bien lancé sur le port 8080");
    } else if (status === 401) {
      // Token expiré ou invalide
      console.warn("⚠️ Session expirée (401)");
      localStorage.clear();
      window.location.href = "/login";
    } else if (status === 403) {
      // Accès non autorisé
      console.error("🚫 Accès non autorisé (403)");
    } else if (status === 404) {
      // Endpoint non trouvé
      console.error("🔍 Endpoint non trouvé (404)");
    } else if (status === 500) {
      // Erreur serveur
      console.error("💥 Erreur serveur (500)");
    }

    return Promise.reject(error);
  }
);

export default API;




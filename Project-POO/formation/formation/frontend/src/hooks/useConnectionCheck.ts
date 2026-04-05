import { useEffect, useState } from "react";
import API from "@/services/api";

export const useConnectionCheck = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("🔍 Vérification de la connexion au backend...");
        
        // Tentative de ping au backend
        const response = await API.get("/auth/health", {
          timeout: 5000,
        }).catch(() => {
          // Si l'endpoint /auth/health n'existe pas, on essaie /auth/login
          return API.post(
            "/auth/login",
            { login: "test", password: "test" },
            { timeout: 5000 }
          ).catch(() => null);
        });

        if (response) {
          console.log("✅ Connexion au backend établie");
          setIsConnected(true);
          setError(null);
        }
      } catch (err: any) {
        const errorMsg = err?.message || "Erreur de connexion inconnue";
        console.error("❌ Erreur de connexion:", errorMsg);
        setIsConnected(false);
        setError(errorMsg);
      }
    };

    checkConnection();

    // Vérification toutes les 30 secondes
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isConnected, error };
};


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    console.log("🔓 Déconnexion en cours...");
    logout();
    localStorage.clear();
    sessionStorage.clear();
    console.log("✅ Stockage nettoyé");
    
    // Redirect to login after 1 second
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Déconnexion</h1>
        <p className="text-muted-foreground">Vous êtes en cours de déconnexion...</p>
      </div>
    </div>
  );
}


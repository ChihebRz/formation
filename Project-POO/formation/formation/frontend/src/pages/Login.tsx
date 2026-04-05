import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import API from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

function Login() {
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!login.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🔐 Tentative de connexion...", { login: login.trim() });
      const res = await API.post("/auth/login", { login: login.trim(), password: password.trim() });
      console.log("✅ Login réussi!", res.data);
      
      // Sauvegarder dans localStorage ET AuthContext
      authLogin(res.data);
      
      // Attendre un peu avant de naviguer pour laisser le state se mettre à jour
      setTimeout(() => {
        console.log("🚀 Redirection vers /dashboard...");
        navigate("/dashboard", { replace: true });
      }, 500);
    } catch (err: any) {
      console.error("❌ Erreur login complète:", err);
      let errorMsg = "Erreur de connexion";
      
      if (err.code === "ECONNABORTED") {
        errorMsg = "Timeout - Le serveur ne répond pas";
      } else if (err.message === "Network Error") {
        errorMsg = "Erreur réseau - Le backend est-il disponible?";
      } else if (err.response?.status === 401) {
        errorMsg = "Login ou mot de passe incorrect";
      } else if (err.response?.data) {
        errorMsg = String(err.response.data);
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Excellent Training</CardTitle>
          <p className="text-sm text-muted-foreground">Gestion de Formation - Green Building</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Login</label>
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Entrez votre login"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Identifiants de test: <strong>admin</strong> / <strong>admin123</strong>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;



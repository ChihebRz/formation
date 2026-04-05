import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import API from "@/services/api";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("🔐 Tentative de connexion...", { login, password });

    if (!login || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Envoi des identifiants à l'API...");
      const res = await API.post("/auth/login", { login, password });
      console.log("✅ Réponse reçue:", res.data);
      
      authLogin(res.data);
      console.log("✅ Token sauvegardé dans AuthContext");
      
      console.log("🔄 Navigation vers /dashboard...");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Erreur de connexion:", err);
      console.error("Détails:", err.response?.data || err.message);
      setError("Login ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Gestion de Formation</h1>
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Entrez votre login"
              disabled={loading}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        <div className="default-credentials">
          <p>
            <strong>Identifiants par défaut :</strong>
          </p>
          <p>
            Login: <code>admin</code>
          </p>
          <p>
            Password: <code>admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;




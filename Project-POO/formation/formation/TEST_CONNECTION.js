/**
 * Utilitaire pour tester la connexion entre Frontend et Backend
 * 
 * USAGE:
 * 1. Assurez-vous que le backend tourne sur http://localhost:8080
 * 2. Assurez-vous que le frontend tourne sur http://localhost:3000
 * 3. Ouvrez la console du navigateur (F12)
 * 4. Collez le code ci-dessous et exécutez-le
 * 
 * Cela testera:
 * - Connexion au backend
 * - Endpoint /health
 * - Configuration CORS
 * - Token JWT (si disponible)
 */

const testConnection = async () => {
  console.log("🧪 === DEBUT DES TESTS DE CONNEXION === 🧪\n");

  // Test 1: Vérifier le backend
  console.log("📝 Test 1: Vérification du backend sur http://localhost:8080");
  try {
    const response = await fetch("http://localhost:8080/api/auth/health", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend ACTIF!", data);
    } else {
      console.error("❌ Backend répond avec le code:", response.status);
    }
  } catch (error) {
    console.error("❌ Impossible de se connecter au backend:", error.message);
    console.error("   Assurez-vous que le backend tourne sur http://localhost:8080");
    return;
  }

  // Test 2: Vérifier le localStorage
  console.log("\n📝 Test 2: Vérification du localStorage");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const login = localStorage.getItem("login");

  console.log("Token:", token ? `✅ Présent (${token.substring(0, 30)}...)` : "❌ Non présent");
  console.log("Role:", role ? `✅ ${role}` : "❌ Non présent");
  console.log("Login:", login ? `✅ ${login}` : "❌ Non présent");

  // Test 3: Vérifier la configuration de l'API
  console.log("\n📝 Test 3: Configuration de l'API");
  console.log("Frontend URL:", window.location.href);
  console.log("Backend API URL: http://localhost:8080/api");

  // Test 4: Tester un appel API avec token (si disponible)
  if (token) {
    console.log("\n📝 Test 4: Validation du token JWT");
    try {
      const response = await fetch("http://localhost:8080/api/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Token VALIDE!", data);
      } else {
        console.error("❌ Token INVALIDE:", data);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la validation du token:", error.message);
    }
  } else {
    console.log("\n📝 Test 4: Pas de token trouvé - Connectez-vous d'abord");
  }

  console.log("\n🧪 === FIN DES TESTS === 🧪");
};

// Exécuter les tests
testConnection();


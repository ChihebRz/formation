# Configuration Frontend-Backend - Guide de Correction

## ✅ Problèmes Résolus

### 1. **Détection d'erreurs de connexion améliorée**
- ✅ Timeout configuré à 10 secondes
- ✅ Gestion complète des erreurs CORS
- ✅ Meilleure détection des erreurs de connexion au backend
- ✅ Messages d'erreur détaillés en console

### 2. **Vérification automatique de la connexion**
- ✅ Hook `useConnectionCheck` vérifie la connexion toutes les 30 secondes
- ✅ Alerte visuelle en cas de perte de connexion
- ✅ Endpoint `/api/auth/health` pour vérifier que le backend fonctionne

### 3. **Configuration CORS correcte**
- ✅ Frontend autorisé sur `http://localhost:3000`
- ✅ Tous les header exposés correctement
- ✅ Credentials activés pour les cookies (si nécessaire)

## 🚀 Démarrage du Projet

### Backend (Port 8080)
```powershell
# À la racine du projet
mvn spring-boot:run
# ou
./mvnw spring-boot:run
```

### Frontend (Port 3000)
```powershell
# Dans le dossier frontend
cd frontend
npm install
npm start
```

## ⚙️ Configuration

### Variables d'Environnement Backend (`application.properties`)
- **Port**: `server.port=8080` ✅
- **Base de données**: PostgreSQL sur `localhost:5432`
- **JWT Secret**: Configuré et sécurisé
- **CORS**: Autorisant `http://localhost:3000`

### Variables d'Environnement Frontend (`vite.config.ts`)
- **Port**: `3000` ✅
- **API Base URL**: `http://localhost:8080/api`
- **Timeout**: `10000ms` (10 secondes)

## 🔍 Vérification de la Connexion

### 1. **Via le navigateur**
Ouvrez la console (F12) et vérifiez:
- Aucune erreur CORS
- Endpoint `/api/auth/health` répond avec `status: "UP"`
- Token stocké dans localStorage

### 2. **Via terminal**
```powershell
# Vérifier que le backend tourne
curl http://localhost:8080/api/auth/health

# Réponse attendue:
# {"status":"UP","backend":"Backend is running on port 8080","timestamp":1234567890}
```

### 3. **Composant d'Alerte Visuelle**
Si la connexion échoue, vous verrez une alerte rouge en haut à droite:
- Message d'erreur détaillé
- Port à vérifier (8080)
- Instructions pour corriger

## 📊 Fichiers Modifiés

### Frontend
- ✅ `src/services/api.ts` - Interceptors améliorés
- ✅ `src/hooks/useConnectionCheck.ts` - Nouveau hook de vérification
- ✅ `src/components/shared/ConnectionAlert.tsx` - Nouveau composant d'alerte
- ✅ `src/App.tsx` - Intégration de l'alerte

### Backend
- ✅ `src/main/java/com/gestion/formation/controller/AuthController.java` - Nouveau endpoint `/health`
- ✅ `src/main/java/com/gestion/formation/config/SecurityConfig.java` - CORS configuré (inchangé, déjà correct)

## 🛠️ Troubleshooting

### Le frontend affiche l'alerte rouge "Erreur de connexion"
1. Vérifiez que le backend tourne: `mvn spring-boot:run`
2. Vérifiez que PostgreSQL est lancé
3. Consultez `backend.log` pour les erreurs
4. Rafraîchissez la page (Ctrl+F5)

### Erreur CORS
- ✅ Déjà corrigée dans `SecurityConfig.java`
- Vérifiez que le frontend est sur `http://localhost:3000`

### Token expiré (Erreur 401)
- Le user est automatiquement redirigé vers `/login`
- Reconnectez-vous

### Endpoint non trouvé (Erreur 404)
- Vérifiez l'URL de l'API
- Vérifiez le chemin du contrôleur

## ✨ Nouvelles Fonctionnalités

1. **Health Check Automatique**: Vérifie la connexion toutes les 30 secondes
2. **Alerte Visuelle**: Affiche une alerte en cas de problème de connexion
3. **Meilleur Logging**: Messages console détaillés pour le debugging
4. **Timeout Configuré**: Évite les connexions qui traînent
5. **Endpoint `/api/auth/health`**: Permet de vérifier rapidement le backend

## 📝 Notes

- Le frontend s'exécute sur le port **3000** ✅
- Le backend s'exécute sur le port **8080** ✅
- Pas d'erreurs de connexion attendues ✅
- Communication CORS complètement configurée ✅


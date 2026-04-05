# 🚀 Guide de Démarrage Complet - Gestion de Formation

## 📋 Prérequis

- **Java**: JDK 21+ (ou 25)
- **PostgreSQL**: 14+
- **Node.js**: 18+
- **npm**: 9+
- **IntelliJ IDEA**: Recommandé pour le backend

## ✅ Étape 1: Préparer PostgreSQL

### Démarrer PostgreSQL
```bash
# Windows (si PostgreSQL est installé)
# Ou utiliser pgAdmin pour vérifier la connexion
```

### Créer la base de données
```sql
-- Ouvrir psql ou pgAdmin
CREATE DATABASE gestion_formation;

-- Vérifier
\l  -- Linux/Mac
-- ou dans pgAdmin, clic droit sur Databases > Create
```

**Identifiants par défaut:**
- Utilisateur: `postgres`
- Mot de passe: `0` (comme dans application.properties)
- Port: `5432`

## 🔧 Étape 2: Lancer le Backend Spring Boot

### Méthode 1: IntelliJ IDEA (Recommandé)
1. Ouvrir le dossier: `C:\...\Project-POO\formation\formation`
2. Attendre que le projet se synchronise
3. Clic droit sur `GestionFormationApplication.java`
4. Sélectionner **Run** (ou Shift+F10)
5. Attendre que le serveur démarre

### Méthode 2: Ligne de commande
```bash
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation
mvn spring-boot:run
```

### ✅ Vérifier que le backend tourne
```
Ouvrir: http://localhost:8080/api/formations
Résultat attendu: 401 Unauthorized (pas encore authentifié) ✓
```

## 🎨 Étape 3: Lancer le Frontend React

### Terminal 2 (garder le backend ouvert)
```bash
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation\frontend
npm run dev
```

### ✅ Vérifier que le frontend tourne
```
Ouvrir: http://localhost:3000
Résultat attendu: Page de login ✓
```

## 🔐 Étape 4: Se Connecter

### Identifiants de test:
```
Login: admin
Mot de passe: admin123
```

### Workflow:
1. Sur http://localhost:3000, voir la page Login
2. Entrer les identifiants
3. Cliquer "Se connecter"
4. Être redirigé vers le Dashboard ✅

## 📊 Étape 5: Explorer l'application

### Pages disponibles (après login):

| Page | Accès | Description |
|------|-------|-------------|
| **Dashboard** | / | Statistiques et graphiques |
| **Formations** | /formations | Lister/Ajouter/Modifier formations |
| **Participants** | /participants | Gestion des participants |
| **Formateurs** | /formateurs | Gestion des formateurs |
| **Domaines** | /domaines | Lister les domaines |
| **Structures** | /structures | Lister les structures |
| **Profils** | /profils | Lister les profils |
| **Employeurs** | /employeurs | Lister les employeurs |
| **Utilisateurs** | /utilisateurs | Gestion des utilisateurs |

### Sidebar
- Cliquer sur les icônes pour naviguer
- Bouton chevron pour réduire la sidebar
- Bouton "Déconnexion" pour se déconnecter

## 🧪 Étape 6: Tester l'API avec Postman

### 1. Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "login": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "administrateur",
  "login": "admin"
}
```

### 2. Récupérer les formations
```
GET http://localhost:8080/api/formations
Authorization: Bearer <token_reçu>

Response: [ { ... }, ... ]
```

### 3. Créer une formation
```
POST http://localhost:8080/api/formations
Authorization: Bearer <token_reçu>
Content-Type: application/json

{
  "titre": "Formation Test",
  "annee": 2025,
  "duree": 3,
  "budget": 5000.0,
  "domaine": { "id": 1 },
  "formateur": { "id": 1 }
}
```

## 🐛 Dépannage

### ❌ Erreur: "Cannot connect to database"
```
Solution:
1. Ouvrir pgAdmin
2. Vérifier que PostgreSQL est connecté
3. Vérifier que la base "gestion_formation" existe
4. Redémarrer PostgreSQL si nécessaire
```

### ❌ Erreur CORS: "No 'Access-Control-Allow-Origin' header"
```
Solution:
1. Vérifier que le backend tourne sur le port 8080
2. Vérifier que SecurityConfig.java configure CORS pour localhost:3000
3. Vérifier la configuration dans application.properties
```

### ❌ Page blanche après login
```
Solution:
1. Ouvrir les DevTools (F12)
2. Aller à la tab "Network"
3. Vérifier si les requêtes API retournent des erreurs
4. Vérifier la tab "Console" pour les erreurs JavaScript
```

### ❌ "Unauthorized 401" même avec token valide
```
Solution:
1. Vérifier que le token est inclus dans le header Authorization
2. Vérifier que le format est: "Bearer <token>"
3. Vérifier que le token n'a pas expiré (24h)
4. Redémarrer le backend
```

### ❌ npm: command not found
```
Solution:
1. Installer Node.js: https://nodejs.org/
2. Redémarrer le terminal
3. Vérifier: node --version ; npm --version
```

## 📱 Structure des dossiers

```
formation/
├── frontend/                    ← React/Vite (port 3000)
│   ├── src/
│   │   ├── pages/             # Pages login, dashboard, crud
│   │   ├── components/        # Composants réutilisables
│   │   ├── context/           # AuthContext
│   │   ├── services/          # API calls
│   │   ├── types/             # TypeScript types
│   │   └── index.css          # Tailwind + custom styles
│   └── package.json
│
├── src/main/java/.../formation/    ← Spring Boot (port 8080)
│   ├── controller/            # Endpoints REST
│   ├── service/               # Logique métier
│   ├── entity/                # Entités JPA
│   ├── repository/            # CRUD database
│   ├── security/              # JWT
│   └── config/                # Configuration Spring
│
├── src/main/resources/
│   ├── application.properties  # Configuration
│   └── data.sql              # Données initiales
│
├── pom.xml                    # Maven dependencies
├── BACKEND_README.md          # Guide backend
└── mvnw                       # Maven wrapper
```

## 🎯 Workflow typique

### Pour développer localement:

1. **Terminal 1 (Backend)**:
```bash
cd formation
mvn spring-boot:run
# Ou clic Run dans IntelliJ
```

2. **Terminal 2 (Frontend)**:
```bash
cd frontend
npm run dev
```

3. **Ouvrir le navigateur**:
```
http://localhost:3000
```

4. **Modifier le code**:
   - Backend: Les changements se rechargent automatiquement (devtools)
   - Frontend: Hot reload automatique (Vite)

## 📦 Build pour production

### Frontend
```bash
cd frontend
npm run build
# Génère dist/
```

### Backend
```bash
mvn clean package
# Génère target/formation-0.0.1-SNAPSHOT.jar
```

## 🔑 Variables d'environnement importantes

```properties
# Backend: src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_formation
spring.datasource.username=postgres
spring.datasource.password=0
jwt.secret=gestionFormationSecretKey2025VeryLongSecureKey123456789

# Frontend: .env (si nécessaire)
VITE_API_URL=http://localhost:8080/api
```

## 📞 Support & Questions

Pour toute erreur:
1. Vérifier les logs dans le terminal
2. Ouvrir DevTools (F12) dans le navigateur
3. Vérifier les fichiers README.md dans les dossiers `frontend/` et racine

---

**Excellent Training - Green Building**  
**Année académique**: 2025/2026  
**Dernière mise à jour**: 4 avril 2026


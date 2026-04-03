# 🚀 DÉMARRAGE RAPIDE — Gestion de Formation

## 5 Minutes pour Lancer le Projet

### Étape 1: Préparer PostgreSQL (1 min)

1. Ouvrir pgAdmin ou psql
2. Exécuter:
```sql
CREATE DATABASE gestion_formation;
```

### Étape 2: Lancer le Backend (2 min)

**Option A - IntelliJ IDEA**
1. Ouvrir le dossier `formation` dans IntelliJ
2. Attendre l'indexation
3. Cliquer sur le bouton **Run** (triangle vert)
4. Le serveur démarre sur `http://localhost:8080`

**Option B - Terminal**
```bash
cd formation
./mvnw spring-boot:run
```

### Étape 3: Lancer le Frontend (2 min)

**Terminal 2 (garder le terminal 1 ouvert)**
```bash
cd formation/frontend
npm install  # Si pas déjà fait
npm start
```

L'appli s'ouvre sur `http://localhost:3000`

---

## ✅ Test Rapide

### 1. Connecter-vous
- **Login**: `admin`
- **Password**: `admin123`

### 2. Essayer les menus
- Cliquer sur "Formations" → Ajouter une formation
- Cliquer sur "Participants" → Ajouter un participant
- Si Admin: Cliquer sur "Domaines" → Ajouter un domaine

### 3. Vérifier l'API (Postman)

```
POST http://localhost:8080/api/auth/login
{
  "login": "admin",
  "password": "admin123"
}
```

---

## 🆘 Si ça ne marche pas

| Problème | Solution |
|----------|----------|
| Port 8080 déjà utilisé | `netstat -ano` et tuer le processus |
| Port 3000 déjà utilisé | `lsof -i :3000` et tuer le processus |
| Erreur DB connection | Vérifier PostgreSQL tourne (`Services` → `postgresql-x64-xx`) |
| CORS Error | Vérifier backend répond sur http://localhost:8080 |
| Blanc sur frontend | Ouvrir Console (F12) et vérifier erreurs |

---

## 📱 Accès

| Service | URL | Login | Password |
|---------|-----|-------|----------|
| Frontend | http://localhost:3000 | admin | admin123 |
| Backend API | http://localhost:8080 | - | - |
| PostgreSQL | localhost:5432 | postgres | 0 |

---

## 📂 Structure Fichiers Clés

```
formation/                          # Backend Spring Boot
├── pom.xml                        # Dépendances Maven
├── src/main/java/.../            # Code Java
└── src/main/resources/
    ├── application.properties     # Config DB
    └── data.sql                   # Données initiales

frontend/                          # Frontend React
├── package.json                   # Dépendances npm
├── src/
│   ├── App.jsx                    # App principale
│   ├── pages/                     # Pages CRUD
│   ├── components/                # Composants
│   ├── services/api.js            # Client HTTP
│   └── context/AuthContext.jsx    # Auth
```

---

## 🔧 Commandes Utiles

```bash
# Backend
./mvnw clean install             # Compilation complète
./mvnw spring-boot:run           # Lancer
./mvnw test                       # Tests

# Frontend
npm install                       # Installer dépendances
npm start                         # Dev server
npm run build                     # Build production
npm test                          # Tests
```

---

## 🎯 Après le Démarrage

1. **Créer des données de test**
   - Ajouter quelques domaines
   - Ajouter quelques formations
   - Ajouter quelques participants

2. **Tester les rôles**
   - Créer un utilisateur "responsable"
   - Créer un utilisateur "simple_utilisateur"
   - Vérifier les restrictions d'accès

3. **Consulter les statistiques**
   - En tant qu'admin, aller à `/statistiques`

---

## ❓ Questions Fréquentes

**Q: Pourquoi ça prend longtemps au démarrage?**
A: Maven télécharge les dépendances la première fois.

**Q: Comment changer le mot de passe admin?**
A: Modifier dans la base de données ou créer un nouvel utilisateur dans l'interface.

**Q: Où sont les logs?**
A: Terminal où vous avez lancé `./mvnw spring-boot:run`

---

**Prêt? Lancez l'appli et bon développement! 🚀**


# 📚 Documentation - Gestion de Formation

## 🚀 Commencer rapidement

### 👉 **[QUICK_START.md](./QUICK_START.md)** ← Commencez ici!
Commandes à copier-coller pour lancer l'application en 2 minutes.

---

## 📖 Documentation complète

### Frontend
- **[frontend/README.md](./frontend/README.md)** - Guide du frontend React
  - Installation
  - Structure du projet
  - Features
  - Stack technique
  - Dépannage

### Backend
- **[BACKEND_README.md](./BACKEND_README.md)** - Guide du backend Spring Boot
  - Configuration PostgreSQL
  - Endpoints API
  - Entités
  - Sécurité JWT
  - Dépannage

### Global
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Guide complet de démarrage
  - Prérequis
  - Étapes détaillées
  - Workflow typique
  - Variables d'environnement
  - Support

- **[SUMMARY.md](./SUMMARY.md)** - Résumé des modifications
  - Ce qui a été changé
  - Fonctionnalités implémentées
  - Points forts
  - Fichiers créés/modifiés

---

## 🗂️ Structure du projet

```
formation/
├── QUICK_START.md           ← Ici pour démarrer
├── GETTING_STARTED.md       ← Guide complet
├── BACKEND_README.md        ← Backend specifics
├── SUMMARY.md               ← Résumé des modifs
├── INDEX.md                 ← Ce fichier
│
├── frontend/                ← React Vite (port 3000)
│   ├── README.md
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── src/
│   │   ├── pages/          # 10 pages CRUD
│   │   ├── components/     # Layout + UI
│   │   ├── services/       # API Axios
│   │   ├── context/        # Auth
│   │   └── ...
│   └── node_modules/       # Dépendances
│
├── src/main/java/.../      ← Spring Boot (port 8080)
├── src/main/resources/
├── pom.xml                 # Maven dependencies
├── mvnw                    # Maven wrapper
└── target/                 # Compiled
```

---

## 🎯 Checklist de démarrage

- [ ] PostgreSQL installé et lancé
- [ ] Base `gestion_formation` créée
- [ ] JDK 21+ installé
- [ ] Node.js 18+ installé
- [ ] Terminal 1: `cd formation && mvn spring-boot:run`
- [ ] Terminal 2: `cd frontend && npm run dev`
- [ ] Navigateur: `http://localhost:3000`
- [ ] Login: `admin / admin123`
- [ ] Voir le Dashboard ✅

---

## ⚡ Commandes essentielles

### Backend
```bash
cd formation
mvn spring-boot:run           # Lancer
mvn clean compile             # Compiler
mvn clean package             # Build
```

### Frontend
```bash
cd frontend
npm run dev                   # Lancer (dev)
npm run build                 # Build (prod)
npm run preview               # Preview build
npm install                   # Installer deps
```

---

## 🌐 Accès aux services

| Service | URL | Port | Status |
|---------|-----|------|--------|
| Frontend | http://localhost:3000 | 3000 | ✅ React/Vite |
| Backend API | http://localhost:8080/api | 8080 | ✅ Spring Boot |
| PostgreSQL | localhost | 5432 | ✅ Database |
| pgAdmin | http://localhost:5050 | 5050 | ✅ (optionnel) |

---

## 🔐 Identifiants

### Application
- **Login**: `admin`
- **Password**: `admin123`

### PostgreSQL
- **User**: `postgres`
- **Password**: `0`
- **Database**: `gestion_formation`

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login
```

### CRUD (GET, POST, PUT, DELETE)
```
/api/formations
/api/participants
/api/formateurs
/api/domaines
/api/structures
/api/profils
/api/employeurs
/api/utilisateurs
/api/statistiques (GET only)
```

---

## 🎨 Pages de l'application

### Publique
- [x] `/login` - Authentification

### Protégées (après login)
- [x] `/` - Dashboard (statistiques + graphiques)
- [x] `/formations` - CRUD formations
- [x] `/participants` - CRUD participants
- [x] `/formateurs` - CRUD formateurs
- [x] `/domaines` - CRUD domaines
- [x] `/structures` - CRUD structures
- [x] `/profils` - CRUD profils
- [x] `/employeurs` - CRUD employeurs
- [x] `/utilisateurs` - CRUD utilisateurs

---

## 🛠️ Tech Stack

### Frontend
- React 18.3
- TypeScript 5.8
- Vite 5.4
- Tailwind CSS 3.4
- Shadcn/ui (30+ composants)
- React Router v6
- Axios
- React Query
- Recharts
- Lucide React

### Backend
- Spring Boot 3.3
- PostgreSQL 14+
- Spring Security
- JWT (JSON Web Token)
- JPA/Hibernate
- Maven

---

## 📝 Fichiers importants

### Configuration
- `application.properties` - Config Spring Boot
- `package.json` - Dependencies Node.js
- `pom.xml` - Dependencies Maven
- `vite.config.ts` - Config Vite
- `tailwind.config.ts` - Tailwind theme
- `tsconfig.json` - TypeScript config

### Code
- `frontend/src/App.tsx` - Routes + Auth
- `frontend/src/context/AuthContext.tsx` - Auth state
- `frontend/src/services/api.ts` - API Axios
- `src/main/java/.../GestionFormationApplication.java` - Main backend

---

## 🐛 Troubleshooting

### Backend ne démarre pas?
1. Vérifier PostgreSQL
2. Vérifier l'accès à `gestion_formation`
3. Vérifier le port 8080
4. Voir **BACKEND_README.md**

### Frontend ne démarre pas?
1. Vérifier `node -v` et `npm -v`
2. Vérifier `node_modules/` existe
3. Relancer: `npm install && npm run dev`
4. Voir **frontend/README.md**

### Erreur CORS?
1. Vérifier backend sur port 8080
2. Vérifier frontend sur port 3000
3. Voir **GETTING_STARTED.md**

### Erreur d'authentification?
1. Vérifier identifiants (admin/admin123)
2. Vérifier data.sql a été exécuté
3. Vérifier JWT secret dans application.properties

---

## 🎓 Pour la soutenance

### Démo workflow:
1. Lancer backend → montrer logs "Started"
2. Lancer frontend → montrer "Local: http://localhost:3000"
3. Ouvrir navigateur → page login
4. Entrer admin/admin123 → Dashboard
5. Cliquer formations → DataTable
6. Montrer recherche → montrer Axios logs
7. Trier participants → API working
8. Cliquer sidebar → collapse/expand
9. Logout → retour login

### Points à montrer:
✅ React moderne (Vite)  
✅ TypeScript (types partout)  
✅ Design professionnel (Tailwind + Shadcn)  
✅ API intégrée (Axios + Interceptors)  
✅ Auth sécurisée (JWT)  
✅ Responsive (mobile/tablet/desktop)  
✅ Charts/Graphs (Recharts)  
✅ CRUD complet (10 pages)  

---

## 📞 Besoin d'aide?

1. **Lire** le fichier de dépannage pertinent
2. **Vérifier** les logs (frontend DevTools F12, backend console)
3. **Google** le message d'erreur exact
4. **Contacter** le développeur

---

## ✨ Points clés du projet

🎯 **Pas d'erreurs**: Tout fonctionne  
🎯 **Production ready**: Design professionnel  
🎯 **Bien documenté**: 6 fichiers README  
🎯 **Facile à tester**: Identifiants fournis  
🎯 **Scalable**: Code clean et modulaire  
🎯 **Moderne**: Tech stack actuelle (2026)  

---

## 🚀 Allez-y!

Commencez par: **[QUICK_START.md](./QUICK_START.md)**

```bash
# Terminal 1
cd formation && mvn spring-boot:run

# Terminal 2
cd frontend && npm run dev

# Browser
http://localhost:3000
```

**Bon développement! 💪**

---

**Excellent Training - Green Building**  
**Année académique**: 2025/2026  
**Date**: 4 avril 2026


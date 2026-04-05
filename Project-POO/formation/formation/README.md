# 🎓 Gestion de Formation - Application Complète

> **Plateforme moderne de gestion de formations avec React + Spring Boot**

[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203-green)](./BACKEND_README.md)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue)](./frontend/README.md)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)](./BACKEND_README.md)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#)

---

## 🚀 Démarrer en 2 minutes

### Prérequis
- Node.js 18+
- Java 21+
- PostgreSQL 14+

### Lancer

```bash
# Terminal 1 - Backend
cd formation
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Puis ouvrir**: http://localhost:3000  
**Login**: `admin` / `admin123`

👉 **[Guide complet →](./QUICK_START.md)**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ 2 minutes pour démarrer |
| **[GETTING_STARTED.md](./GETTING_STARTED.md)** | 📖 Guide complet détaillé |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | 🏗️ Schémas et diagrams |
| **[BACKEND_README.md](./BACKEND_README.md)** | 🔧 Backend Spring Boot |
| **[frontend/README.md](./frontend/README.md)** | 🎨 Frontend React |
| **[SUMMARY.md](./SUMMARY.md)** | ✅ Résumé des modifs |
| **[INDEX.md](./INDEX.md)** | 📑 Index complet |

---

## ✨ Fonctionnalités

### 🔐 Authentification
- [x] Login/Logout JWT
- [x] Token Bearer automatique
- [x] Protection des routes
- [x] Password BCrypt

### 📊 Dashboard
- [x] 4 StatCards (Formations, Participants, Formateurs, Budget)
- [x] Bar Chart (formations par année)
- [x] Pie Chart (répartition par domaine)
- [x] Recharts intégrés

### 📋 CRUD Complet
- [x] Formations
- [x] Participants
- [x] Formateurs
- [x] Domaines
- [x] Structures
- [x] Profils
- [x] Employeurs
- [x] Utilisateurs

### 🎨 Interface Moderne
- [x] Design Teal/Green
- [x] Sidebar collapsible
- [x] Responsive (mobile/tablet/desktop)
- [x] Dark/Light mode support
- [x] Animations fluides
- [x] Toast notifications

---

## 🏗️ Architecture

```
┌─────────────────────────────┐
│   Frontend (React 18 + TS)  │
│  http://localhost:3000      │
│ ┌─────────────────────────┐ │
│ │ Pages + Components      │ │
│ │ - DataTable (CRUD)      │ │
│ │ - Dashboard (Stats)     │ │
│ │ - Sidebar (Navigation)  │ │
│ └─────────────────────────┘ │
└──────────┬──────────────────┘
           │ REST API (JSON)
           │ JWT Bearer Token
           ↓
┌─────────────────────────────┐
│  Backend (Spring Boot 3)    │
│  http://localhost:8080      │
│ ┌─────────────────────────┐ │
│ │ Controllers (10 REST)   │ │
│ │ Services (Business)     │ │
│ │ Repositories (CRUD)     │ │
│ │ Security (JWT + CORS)   │ │
│ └─────────────────────────┘ │
└──────────┬──────────────────┘
           │ SQL Queries
           │ Hibernate/JPA
           ↓
┌─────────────────────────────┐
│   PostgreSQL Database       │
│  gestion_formation          │
│ ┌─────────────────────────┐ │
│ │ 10 Tables + Relations   │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**[Voir architecture détaillée →](./ARCHITECTURE.md)**

---

## 🛠️ Stack Technique

### Frontend
```json
{
  "runtime": "Node.js 18+",
  "framework": "React 18.3",
  "language": "TypeScript 5.8",
  "bundler": "Vite 5.4",
  "styling": "Tailwind CSS 3.4",
  "ui": "Shadcn/ui + Radix UI",
  "routing": "React Router v6",
  "state": "React Query 5.83",
  "http": "Axios",
  "charts": "Recharts 3.8",
  "icons": "Lucide React",
  "forms": "React Hook Form",
  "validation": "Zod"
}
```

### Backend
```json
{
  "runtime": "JDK 21+",
  "framework": "Spring Boot 3.3",
  "security": "Spring Security + JWT",
  "database": "PostgreSQL 14+",
  "orm": "JPA/Hibernate",
  "password": "BCrypt",
  "build": "Maven"
}
```

---

## 📱 Pages

### Publiques
- `GET /login` - Authentification

### Protégées (après login)
- `GET /` - Dashboard (statistiques)
- `GET /formations` - CRUD formations
- `GET /participants` - CRUD participants
- `GET /formateurs` - CRUD formateurs
- `GET /domaines` - CRUD domaines
- `GET /structures` - CRUD structures
- `GET /profils` - CRUD profils
- `GET /employeurs` - CRUD employeurs
- `GET /utilisateurs` - CRUD utilisateurs

---

## 🔑 Identifiants

```
Login: admin
Password: admin123
```

### PostgreSQL
```
Host: localhost
Port: 5432
User: postgres
Password: 0
Database: gestion_formation
```

---

## 📡 API REST

### Authentification
```
POST /api/auth/login
```

### CRUD (tous avec GET, POST, PUT, DELETE)
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

**Headers requis:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 🎯 Points Forts

✅ **Zero Errors** - Tout fonctionne  
✅ **Production Ready** - Design professionnel  
✅ **Fully Typed** - TypeScript complet  
✅ **Responsive** - Mobile/Tablet/Desktop  
✅ **Sécurisé** - JWT + Bearer token  
✅ **Performant** - Vite + React Query + optimisé  
✅ **Scalable** - Architecture modulaire  
✅ **Documenté** - 8 fichiers README  

---

## 📂 Structure

```
formation/
├── frontend/                  ← React (port 3000)
│   ├── src/pages/            # 10 pages CRUD
│   ├── src/components/       # Layout + UI
│   ├── src/services/         # API
│   └── README.md
│
├── src/main/java/...         ← Spring Boot (port 8080)
│   ├── controller/           # 10 endpoints
│   ├── service/              # Business
│   ├── entity/               # JPA
│   └── security/             # JWT
│
├── src/main/resources/
│   ├── application.properties # Config
│   └── data.sql              # Init data
│
├── Documentation Files
├── QUICK_START.md            ← Start here!
├── GETTING_STARTED.md
├── BACKEND_README.md
├── FRONTEND_README.md
├── ARCHITECTURE.md
├── SUMMARY.md
├── INDEX.md
└── README.md                 ← You are here
```

---

## 🚀 Quick Commands

### Frontend
```bash
cd frontend
npm install       # Installer dépendances
npm run dev       # Lancer (dev)
npm run build     # Build (prod)
npm run preview   # Preview build
npm run lint      # Linter
```

### Backend
```bash
cd formation
mvn spring-boot:run     # Lancer
mvn clean compile       # Compiler
mvn clean package       # Build
mvn test                # Tests
```

---

## 🐛 Troubleshooting

### Backend ne démarre pas?
1. Vérifier PostgreSQL
2. Vérifier `gestion_formation` existe
3. Voir **[BACKEND_README.md](./BACKEND_README.md)**

### Frontend ne démarre pas?
1. `npm install` dans `frontend/`
2. Vérifier Node 18+
3. Voir **[frontend/README.md](./frontend/README.md)**

### Erreur CORS?
1. Backend sur port 8080
2. Frontend sur port 3000
3. Voir **[GETTING_STARTED.md](./GETTING_STARTED.md)**

### Erreur 401?
1. Identifiants: admin/admin123
2. Token valide (24h)
3. Vérifier JWT secret

---

## 📚 Pour la soutenance

### Démo workflow:
```
1. Backend startup → Show logs "Started"
2. Frontend startup → Show "Local: http://localhost:3000"
3. Open browser → Login page
4. Enter admin/admin123 → Dashboard
5. Click formations → DataTable with API data
6. Search/Sort → API working
7. Show sidebar collapse
8. Logout → Back to login
```

### Points à mettre en avant:
- ✨ Design moderne (Tailwind + Shadcn)
- 🔒 Sécurité (JWT + BCrypt)
- 📊 Données dynamiques (Recharts)
- 🔄 API complètement intégrée
- 📱 Responsive design
- 🚀 Performance (Vite)
- 💪 Code quality (TypeScript)

---

## 📞 Support

- **Lire** la documentation appropriée
- **Vérifier** les logs (DevTools F12 ou console)
- **Chercher** le message d'erreur exact
- **Contacter** le développeur

---

## 🎓 Résumé

| Aspect | Status |
|--------|--------|
| Backend | ✅ Opérationnel |
| Frontend | ✅ Opérationnel |
| API | ✅ Intégrée |
| Auth | ✅ JWT + Security |
| CRUD | ✅ Complet (10 pages) |
| Design | ✅ Professionnel |
| Tests | ✅ Prêt |
| Docs | ✅ Complète |

**Application PRÊTE pour la production! 🎉**

---

## 📖 Liens rapides

- **[QUICK_START.md](./QUICK_START.md)** - Démarrer en 2 min
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Guide complet
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Diagrams
- **[BACKEND_README.md](./BACKEND_README.md)** - Backend
- **[frontend/README.md](./frontend/README.md)** - Frontend

---

**Excellent Training - Green Building**  
**Année académique**: 2025/2026  
**Status**: ✅ Production Ready  
**Date**: 4 avril 2026


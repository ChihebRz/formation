# 🏗️ Architecture de l'application

## 📊 Vue globale

```
┌─────────────────────────────────────────────────────────────────┐
│                       Client Browser                             │
│                    http://localhost:3000                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         React + TypeScript (Vite)                         │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │  Pages (Login, Dashboard, CRUD)                 │    │   │
│  │  │  ├── Login.tsx                                  │    │   │
│  │  │  ├── Dashboard.tsx (Stats + Charts)             │    │   │
│  │  │  ├── FormationsPage.tsx                         │    │   │
│  │  │  ├── ParticipantsPage.tsx                       │    │   │
│  │  │  └── ...8 autres pages CRUD                     │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  │                       ↓                                   │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │  Components (Layout, UI, Shared)                │    │   │
│  │  │  ├── AppLayout + AppSidebar                      │    │   │
│  │  │  ├── DataTable (réutilisable)                   │    │   │
│  │  │  ├── StatCard                                   │    │   │
│  │  │  └── UI Components (Button, Input, Badge, etc) │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  │                       ↓                                   │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │  Services & Context                             │    │   │
│  │  │  ├── services/api.ts (Axios)                    │    │   │
│  │  │  ├── context/AuthContext.tsx (JWT)              │    │   │
│  │  │  └── hooks/use-toast.ts                         │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                          ↓↑ (Axios + Interceptors)
                    HTTP/REST API (JSON)
                 Authorization: Bearer <JWT Token>
                          ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                    Backend Server                                │
│                  http://localhost:8080                           │
│              Spring Boot 3 + Spring Security                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers (REST Endpoints)                             │   │
│  │  ├── AuthController (/api/auth/login)                     │   │
│  │  ├── FormationController (/api/formations)                │   │
│  │  ├── ParticipantController (/api/participants)            │   │
│  │  ├── FormateurController (/api/formateurs)                │   │
│  │  ├── DomaineController (/api/domaines)                    │   │
│  │  ├── StructureController (/api/structures)                │   │
│  │  ├── ProfilController (/api/profils)                      │   │
│  │  ├── EmployeurController (/api/employeurs)                │   │
│  │  ├── UtilisateurController (/api/utilisateurs)            │   │
│  │  └── StatistiqueController (/api/statistiques)            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Security & Authentication                                │   │
│  │  ├── SecurityConfig (CORS, JWT Filter, Authorization)     │   │
│  │  ├── JwtUtil (Generate, Validate, Extract JWT)            │   │
│  │  ├── JwtFilter (Apply JWT to requests)                    │   │
│  │  └── UserDetailsServiceImpl (User loading)                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Services (Business Logic)                                │   │
│  │  ├── UtilisateurService                                   │   │
│  │  ├── FormationService                                     │   │
│  │  ├── ParticipantService                                   │   │
│  │  ├── FormateurService                                     │   │
│  │  ├── DomaineService                                       │   │
│  │  ├── StructureService                                     │   │
│  │  ├── ProfilService                                        │   │
│  │  ├── EmployeurService                                     │   │
│  │  └── StatistiqueService                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Repositories (JPA - CRUD Database)                       │   │
│  │  ├── UtilisateurRepository                                │   │
│  │  ├── FormationRepository                                  │   │
│  │  ├── ParticipantRepository                                │   │
│  │  ├── FormateurRepository                                  │   │
│  │  ├── DomaineRepository                                    │   │
│  │  ├── StructureRepository                                  │   │
│  │  ├── ProfilRepository                                     │   │
│  │  ├── EmployeurRepository                                  │   │
│  │  └── RoleRepository                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Entities (JPA Mapping)                                   │   │
│  │  ├── Utilisateur → utilisateurs table                     │   │
│  │  ├── Role → roles table                                   │   │
│  │  ├── Formation → formations table                         │   │
│  │  ├── Participant → participants table                     │   │
│  │  ├── Formateur → formateurs table                         │   │
│  │  ├── Employeur → employeurs table                         │   │
│  │  ├── Domaine → domaines table                             │   │
│  │  ├── Profil → profils table                               │   │
│  │  ├── Structure → structures table                         │   │
│  │  └── Role → roles table                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                          ↓↑ (JDBC/Hibernate)
                     SQL Queries
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                           │
│                   localhost:5432                                 │
│         Database: gestion_formation                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Tables                                                   │   │
│  │  ├── roles (id, nom)                                      │   │
│  │  ├── utilisateurs (id, login, password, id_role)          │   │
│  │  ├── formations (id, titre, annee, duree, budget, ...)    │   │
│  │  ├── participants (id, nom, prenom, email, ...)           │   │
│  │  ├── formateurs (id, nom, prenom, email, type, ...)       │   │
│  │  ├── employeurs (id, nom_employeur)                       │   │
│  │  ├── domaines (id, libelle)                               │   │
│  │  ├── profils (id, libelle)                                │   │
│  │  ├── structures (id, libelle)                             │   │
│  │  └── formation_participant (id_formation, id_participant) │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux d'authentification

```
┌──────────────┐
│   Utilisateur │
└──────┬───────┘
       │ Entrer admin/admin123
       ↓
┌─────────────────────────┐
│   Login.tsx (Frontend)  │
│ Form submission         │
└──────┬──────────────────┘
       │ POST /api/auth/login
       ↓
┌───────────────────────────────────────┐
│  AuthController.login()               │
│  1. Find user by login                │
│  2. Match password with BCrypt        │
│  3. Generate JWT token                │
│  4. Return token + role + login       │
└──────┬────────────────────────────────┘
       │ Response: { token, role, login }
       ↓
┌──────────────────────────────────────┐
│  AuthContext.login()                 │
│  1. Save token to localStorage       │
│  2. Update auth state                │
│  3. Redirect to /                    │
└──────┬───────────────────────────────┘
       │ Token: "eyJhbGc..."
       ↓
┌──────────────────────────────────────┐
│  Dashboard.tsx (Protected)           │
│  ✅ User authenticated                │
└──────────────────────────────────────┘
```

---

## 📡 Flux d'appel API

```
┌──────────────────────────┐
│  FormationsPage.tsx      │
│  useEffect(() => {       │
│    loadFormations()      │
│  })                      │
└──────┬───────────────────┘
       │ loadFormations()
       ↓
┌──────────────────────────────────┐
│  API.get("/formations")          │
│  (services/api.ts)               │
└──────┬───────────────────────────┘
       │ Interceptor:
       │ - Add Authorization header
       │ - Add: Bearer <token>
       ↓
┌──────────────────────────────────┐
│  HTTP GET                         │
│  http://localhost:8080/           │
│  api/formations                   │
│  Header: Authorization: Bearer... │
└──────┬───────────────────────────┘
       │ CORS Check ✓
       ↓
┌──────────────────────────────────────┐
│  FormationController.getAll()        │
│  1. Check JWT token (JwtFilter)      │
│  2. Extract user from token         │
│  3. Call FormationService.findAll() │
│  4. Return List<Formation>          │
└──────┬───────────────────────────────┘
       │ Database Query
       ↓
┌──────────────────────────────────────┐
│  FormationService.findAll()          │
│  → FormationRepository.findAll()     │
│  → Hibernate/JPA                     │
│  → SQL: SELECT * FROM formations    │
└──────┬───────────────────────────────┘
       │ Query Results
       ↓
┌──────────────────────────────────────┐
│  Response JSON                        │
│  [{                                   │
│    "id": 1,                           │
│    "titre": "Formation Web",          │
│    "annee": 2025,                     │
│    ...                                │
│  }]                                   │
└──────┬───────────────────────────────┘
       │ Response headers:
       │ - Content-Type: application/json
       │ - Access-Control-Allow-Origin
       ↓
┌────────────────────────────────────┐
│  Interceptor Response:              │
│  - Check status code                │
│  - Handle errors                    │
│  - If 401 → redirect to login       │
└──────┬─────────────────────────────┘
       │ Update state
       ↓
┌────────────────────────────────────┐
│  setFormations(response.data)       │
│  Re-render DataTable                │
│  Afficher les formations ✅         │
└────────────────────────────────────┘
```

---

## 🔐 Sécurité - Couches

```
Frontend (Browser)
├── localStorage: { token, role, login }
├── AuthContext: Auth state
└── Interceptor: Add token to requests
                    ↓
Network (CORS)
├── CORS policy: localhost:3000 ✓
├── TLS/HTTPS: (production only)
└── Authorization header validation
                    ↓
Backend (Spring Security)
├── CSRF: Disabled (REST API)
├── Session: Stateless (JWT)
├── JwtFilter: Validate token
├── SecurityConfig: Role-based access
└── PasswordEncoder: BCrypt hashing
                    ↓
Database (PostgreSQL)
├── Password: Never sent (token only)
├── Permissions: User roles
└── Data: Encrypted at rest (if configured)
```

---

## 📁 Arborescence détaillée

```
formation/
├── frontend/                              (React 18.3 + Vite)
│   ├── node_modules/                     (237 packages)
│   ├── public/
│   ├── src/
│   │   ├── main.tsx                      (Entry point)
│   │   ├── App.tsx                       (Routes + Auth guard)
│   │   ├── index.css                     (Tailwind + custom)
│   │   │
│   │   ├── pages/                        (10 pages)
│   │   │   ├── Login.tsx                 (JWT auth)
│   │   │   ├── Dashboard.tsx             (Stats + Charts)
│   │   │   ├── FormationsPage.tsx        (CRUD)
│   │   │   ├── ParticipantsPage.tsx      (CRUD)
│   │   │   ├── FormateursPage.tsx        (CRUD)
│   │   │   ├── DomainesPage.tsx          (CRUD)
│   │   │   ├── StructuresPage.tsx        (CRUD)
│   │   │   ├── ProfilsPage.tsx           (CRUD)
│   │   │   ├── EmployeursPage.tsx        (CRUD)
│   │   │   ├── UtilisateursPage.tsx      (CRUD)
│   │   │   └── NotFound.tsx              (404)
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.tsx         (Main wrapper)
│   │   │   │   └── AppSidebar.tsx        (Collapsible nav)
│   │   │   ├── shared/
│   │   │   │   ├── DataTable.tsx         (Reusable table)
│   │   │   │   └── StatCard.tsx          (Stat boxes)
│   │   │   └── ui/                       (Shadcn components)
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── card.tsx
│   │   │       └── table.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx           (JWT + state)
│   │   ├── services/
│   │   │   └── api.ts                    (Axios config)
│   │   ├── hooks/
│   │   │   └── use-toast.ts              (Notifications)
│   │   ├── types/
│   │   │   └── index.ts                  (TypeScript)
│   │   └── lib/
│   │       └── utils.ts                  (Helpers)
│   │
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── README.md
│
├── src/main/java/com/gestion/formation/
│   ├── GestionFormationApplication.java
│   ├── config/
│   │   └── SecurityConfig.java           (CORS + JWT)
│   ├── controller/                       (10 endpoints)
│   │   ├── AuthController.java
│   │   ├── FormationController.java
│   │   ├── ParticipantController.java
│   │   ├── FormateurController.java
│   │   ├── DomaineController.java
│   │   ├── StructureController.java
│   │   ├── ProfilController.java
│   │   ├── EmployeurController.java
│   │   ├── UtilisateurController.java
│   │   └── StatistiqueController.java
│   ├── service/                          (Business logic)
│   │   ├── UtilisateurService.java
│   │   ├── FormationService.java
│   │   ├── ParticipantService.java
│   │   ├── FormateurService.java
│   │   ├── DomaineService.java
│   │   ├── StructureService.java
│   │   ├── ProfilService.java
│   │   ├── EmployeurService.java
│   │   └── StatistiqueService.java
│   ├── entity/                           (JPA entities)
│   │   ├── Utilisateur.java
│   │   ├── Role.java
│   │   ├── Formation.java
│   │   ├── Participant.java
│   │   ├── Formateur.java
│   │   ├── Employeur.java
│   │   ├── Domaine.java
│   │   ├── Profil.java
│   │   └── Structure.java
│   ├── repository/                       (CRUD)
│   │   ├── UtilisateurRepository.java
│   │   ├── FormationRepository.java
│   │   ├── ParticipantRepository.java
│   │   ├── FormateurRepository.java
│   │   ├── DomaineRepository.java
│   │   ├── StructureRepository.java
│   │   ├── ProfilRepository.java
│   │   ├── EmployeurRepository.java
│   │   └── RoleRepository.java
│   ├── security/
│   │   ├── JwtUtil.java                  (Token generation)
│   │   ├── JwtFilter.java                (Token validation)
│   │   └── UserDetailsServiceImpl.java    (User loading)
│   └── dto/
│       ├── LoginRequest.java
│       ├── LoginResponse.java
│       └── StatistiqueDTO.java
│
├── src/main/resources/
│   ├── application.properties             (Configuration)
│   ├── data.sql                           (Initial data)
│   └── static/
├── src/test/
├── target/                               (Compiled)
├── pom.xml
├── mvnw
│
├── Documentation/
│   ├── INDEX.md                          (You are here)
│   ├── QUICK_START.md                    (2 minutes)
│   ├── GETTING_STARTED.md                (Complete guide)
│   ├── BACKEND_README.md                 (Backend docs)
│   ├── SUMMARY.md                        (What was done)
│   └── ARCHITECTURE.md                   (This file)
│
└── .gitignore
```

---

## 🚀 Points d'entrée

### Frontend
- **Entry**: `src/main.tsx`
- **App Routes**: `src/App.tsx`
- **Auth**: `src/context/AuthContext.tsx`

### Backend
- **Entry**: `GestionFormationApplication.java`
- **Auth**: `controller/AuthController.java`
- **API**: `controller/*.java`

### Database
- **Init**: `data.sql` (auto-run at startup)
- **Migration**: Handled by Hibernate (ddl-auto=update)

---

## 🔗 Interactions clés

```
User
  ↓ (Login credentials)
Frontend Login.tsx
  ↓ (POST /api/auth/login)
Backend AuthController.login()
  ↓ (Query database)
PostgreSQL users table
  ↓ (Return user)
AuthController (Generate JWT)
  ↓ (Return token)
Frontend AuthContext (Save token)
  ↓ (Redirect to /)
Dashboard (Load formations)
  ↓ (GET /api/formations + token)
Backend FormationController (Check JWT)
  ↓ (Query database)
PostgreSQL formations table
  ↓ (Return formations)
DataTable (Render list)
  ↓ (Display to user)
User (See data)
```

---

**Architecture moderne, scalable et sécurisée! ✨**



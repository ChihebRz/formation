# 🎓 Gestion de Formation - Frontend

Frontend React/Vite pour l'application de gestion de formations avec design inspiré de spring-bloom-studio.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm

### Installation

```bash
cd frontend
npm install
npm run dev
```

L'application s'ouvre sur `http://localhost:3000`

## 🔐 Identifiants de test

- **Login**: admin
- **Mot de passe**: admin123

## 📁 Structure du projet

```
src/
├── pages/              # Pages principales
├── components/
│   ├── layout/        # Sidebar, AppLayout
│   ├── shared/        # DataTable, StatCard
│   └── ui/            # Composants Shadcn
├── context/           # AuthContext pour JWT
├── services/          # API Axios
├── types/             # TypeScript interfaces
├── hooks/             # React hooks
└── lib/               # Utilitaires
```

## 🎨 Design

- **Framework UI**: Shadcn/ui + Radix UI + Tailwind CSS
- **Couleur primaire**: Teal `hsl(168, 80%, 36%)`
- **Sidebar**: Dark gradient avec collapse
- **Responsive**: Mobile-first

## 📡 Intégration Backend

- **BaseURL**: `http://localhost:8080/api`
- **Auth**: JWT Bearer token
- **CORS**: Configuré pour localhost:3000

## 📝 Pages disponibles

| Page | URL | Description |
|------|-----|-------------|
| Login | `/login` | Authentification |
| Dashboard | `/` | Tableau de bord avec statistiques |
| Formations | `/formations` | Gestion des formations |
| Participants | `/participants` | Gestion des participants |
| Formateurs | `/formateurs` | Gestion des formateurs |
| Domaines | `/domaines` | Gestion des domaines |
| Structures | `/structures` | Gestion des structures |
| Profils | `/profils` | Gestion des profils |
| Employeurs | `/employeurs` | Gestion des employeurs |
| Utilisateurs | `/utilisateurs` | Gestion des utilisateurs |

## ⚙️ Configuration

Backend requis sur le port 8080:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_formation
spring.datasource.username=postgres
spring.datasource.password=0
server.port=8080
```

## 🛠️ Stack technique

- React 18.3
- TypeScript 5.8
- Vite 5.4
- React Router v6
- Tailwind CSS 3.4
- React Query 5.83
- Axios
- Recharts (graphiques)
- Lucide React (icônes)
- Zod (validation)
- React Hook Form

## 📦 Scripts disponibles

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
npm run lint     # Linter le code
```

## ✨ Fonctionnalités

✅ Authentification JWT  
✅ Sidebar collapsible  
✅ DataTable réutilisable  
✅ Dashboard avec graphiques  
✅ CRUD pour toutes les entités  
✅ Design responsive  
✅ Gestion des erreurs  
✅ Notifications (Sonner)  

## 🐛 Dépannage

**Erreur CORS?**
- Vérifier que le backend tourne sur le port 8080
- Vérifier la configuration CORS du backend

**Token invalide?**
- Nettoyer le localStorage: `localStorage.clear()`
- Se reconnecter avec admin/admin123

**Pas de données?**
- Vérifier les requêtes réseau dans DevTools
- Vérifier que le backend retourne des données

---

**Projet**: Excellent Training - Green Building  
**Date**: 2026


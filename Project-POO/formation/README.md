# 📘 Gestion de Formation - Guide Complet

## Vue d'ensemble
Application complète de gestion de formation avec Spring Boot 3 + React + PostgreSQL.

### Stack Technologique
- **Backend**: Spring Boot 3.3.0, JDK 21, PostgreSQL
- **Frontend**: React 18, React Router, Axios
- **Sécurité**: JWT (JSON Web Tokens)
- **Base de données**: PostgreSQL (port 5432, password: 0)

---

## 📋 Prérequis

### Système
- PostgreSQL installé et démarré
- Node.js 16+ et npm
- JDK 21
- IntelliJ IDEA (recommandé)

### Base de données
```sql
CREATE DATABASE gestion_formation;
```

---

## 🚀 Démarrage Rapide

### 1. Backend

#### Configuration
1. Vérifier `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_formation
spring.datasource.username=postgres
spring.datasource.password=0
```

#### Lancer le serveur
```bash
cd formation
./mvnw spring-boot:run
```

Ou via IntelliJ:
1. Ouvrir le projet dans IntelliJ
2. Cliquer sur Run (icône verte)
3. Le serveur démarre sur http://localhost:8080

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

L'application s'ouvre sur http://localhost:3000

---

## 🔐 Authentification par défaut

| Field | Value |
|-------|-------|
| Login | `admin` |
| Password | `admin123` |
| Rôle | `administrateur` |

---

## 📊 Architecture du Projet

### Backend - Structure des dossiers

```
src/main/java/com/gestion/formation/
├── controller/        ← REST API endpoints
├── service/          ← Logique métier
├── repository/       ← Accès base de données
├── entity/           ← Modèles JPA
├── dto/              ← Data Transfer Objects
├── security/         ← JWT, UserDetails
├── config/           ← Configurations Spring
└── GestionFormationApplication.java
```

### Frontend - Structure des dossiers

```
frontend/src/
├── components/       ← Composants réutilisables (Navbar, Sidebar, PrivateRoute)
├── pages/           ← Pages CRUD principales
├── services/        ← API client (axios)
├── context/         ← Context API (Auth)
├── App.jsx          ← Routeur principal
└── index.js
```

---

## 📋 Entités et Relations

### 9 Entités Principales

| Entité | Description | Relations |
|--------|-------------|-----------|
| **Utilisateur** | Compte connexion | Role (Many-to-One) |
| **Role** | simple_utilisateur, responsable, administrateur | - |
| **Formation** | Formations proposées | Domaine, Formateur, Participants (Many-to-Many) |
| **Participant** | Personnes en formation | Structure, Profil |
| **Formateur** | Responsable formation | Employeur |
| **Domaine** | Catégories de formation | - |
| **Profil** | Type de participant | - |
| **Structure** | Organisation/Département | - |
| **Employeur** | Entreprise formatrice | - |

### Schéma ER (Simplifié)

```
Utilisateur ──Many─to─One──> Role
Formation ──Many─to─One──> Domaine
Formation ──Many─to─One──> Formateur
Formation ──Many─to─Many──> Participant
Formateur ──Many─to─One──> Employeur
Participant ──Many─to─One──> Structure
Participant ──Many─to─One──> Profil
```

---

## 🔌 API REST Endpoints

### Authentication
```
POST /api/auth/login
  Body: { login: "admin", password: "admin123" }
  Response: { token: "...", role: "administrateur", login: "admin" }
```

### CRUD Endpoints

#### Formations
```
GET    /api/formations              # Lister toutes
GET    /api/formations/{id}         # Détail
POST   /api/formations              # Créer
PUT    /api/formations/{id}         # Modifier
DELETE /api/formations/{id}         # Supprimer
```

#### Participants
```
GET    /api/participants
GET    /api/participants/{id}
POST   /api/participants
PUT    /api/participants/{id}
DELETE /api/participants/{id}
```

#### Autres: `/api/formateurs`, `/api/domaines`, `/api/profils`, `/api/structures`, `/api/employeurs`, `/api/utilisateurs`

### Statistiques (Admin/Responsable uniquement)
```
GET /api/statistiques
  Response: { totalFormations: 10, totalParticipants: 50 }
```

---

## 🔐 Autorisation par Rôle

### Admin (administrateur)
- Accès complet à toutes les pages
- Gestion des utilisateurs, domaines, structures, profils
- Statistiques
- Formations, Participants, Formateurs, Employeurs

### Responsable (responsable)
- Accès aux formations, participants, formateurs, employeurs
- Statistiques
- Pas d'accès à l'administration

### Simple Utilisateur (simple_utilisateur)
- Accès aux formations, participants, formateurs, employeurs
- Pas d'accès aux statistiques ni à l'administration

---

## 🛠️ Tester l'API (Postman)

### 1. Connexion
```
POST http://localhost:8080/api/auth/login
Body (JSON):
{
  "login": "admin",
  "password": "admin123"
}
```

Réponse:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "administrateur",
  "login": "admin"
}
```

### 2. Utiliser le token
Créer une formation:
```
POST http://localhost:8080/api/formations
Header: Authorization: Bearer <token_reçu>
Body (JSON):
{
  "titre": "Formation Java",
  "annee": 2025,
  "duree": 5,
  "budget": 2000.0
}
```

---

## 🐛 Dépannage Courant

### Erreur: "relation does not exist"
**Cause**: Les tables ne sont pas créées
**Solution**: Vérifier que `spring.jpa.hibernate.ddl-auto=update` dans `application.properties`

### Erreur: "password authentication failed"
**Cause**: Mauvais mot de passe PostgreSQL
**Solution**: Vérifier `spring.datasource.password=0`

### Erreur: "401 Unauthorized"
**Cause**: Token manquant ou expiré
**Solution**: Refaire login, vérifier header `Authorization: Bearer <token>`

### CORS Error
**Cause**: Frontend bloqué par CORS
**Solution**: Vérifier `CorsConfig.java` avec `localhost:3000`

### Frontend blanc / pas de chargement
**Cause**: Les dépendances ne sont pas installées
**Solution**: `cd frontend && npm install`

---

## 📦 Dépendances Principales

### Backend (pom.xml)
- `spring-boot-starter-web`: Web
- `spring-boot-starter-data-jpa`: JPA/Hibernate
- `spring-boot-starter-security`: Sécurité
- `postgresql`: Driver PostgreSQL
- `jjwt`: JWT
- `lombok`: Annotations

### Frontend (package.json)
- `react`: Framework UI
- `react-router-dom`: Routeur
- `axios`: Client HTTP

---

## 📝 Données Initiales

Au premier démarrage, les données suivantes sont insérées (data.sql):

```sql
-- Rôles
INSERT INTO roles (nom) VALUES ('simple_utilisateur');
INSERT INTO roles (nom) VALUES ('responsable');
INSERT INTO roles (nom) VALUES ('administrateur');

-- Admin par défaut
INSERT INTO utilisateurs (login, password, id_role)
VALUES ('admin', '$2a$10$...', (SELECT id FROM roles WHERE nom = 'administrateur'));
```

---

## 🎯 Checklist de Mise en Place

- [x] Base de données PostgreSQL créée
- [x] `application.properties` configuré
- [x] Toutes les entités JPA créées
- [x] Repositories créés
- [x] Services implémentés
- [x] Controllers REST créés
- [x] JWT configuré
- [x] CORS configuré
- [x] Données initiales (data.sql)
- [x] Frontend React créé
- [x] API service configuré
- [x] AuthContext implémenté
- [x] Pages CRUD créées
- [x] Routeur avec PrivateRoute

---

## 📅 Notes de Production

### Sécurité
- Changer le secret JWT en production
- Utiliser un vrai SGBD avec backups
- Implémenter HTTPS
- Vérifier les permissions d'accès

### Performance
- Ajouter des index sur les colonnes fréquemment cherchées
- Implémenter la pagination
- Utiliser le cache côté client

### Déploiement
- Frontend: Netlify, Vercel, GitHub Pages
- Backend: Heroku, AWS, DigitalOcean, Azure

---

## 📞 Support

Pour toute question ou problème:
1. Vérifier les logs (console du terminal)
2. Consulter la section Dépannage
3. Vérifier les endpoints Postman

---

*Projet: Gestion de Formation — ISI Tunis El Manar — 2025/2026*
*Dernière mise à jour: 3 avril 2026*


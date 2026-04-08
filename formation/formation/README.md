# Gestion de Formation - Global README

Application web de gestion de formation:
- Backend: Spring Boot 3 (Java 21, Maven, PostgreSQL, JWT)
- Frontend: React + Vite + TypeScript

## 1) Prerequis

Installez ces outils:
- Java JDK 21
- Maven (ou utilisez `mvnw.cmd` inclus)
- Node.js 18+ (npm inclus)
- PostgreSQL 14+

Verifier les versions:

```powershell
java -version
mvn -version
node -v
npm -v
```

## 2) Structure du projet

Projet actif:
- Backend: `src/main/java` et `src/main/resources`
- Frontend: `frontend/`

## 3) Configuration base de donnees

Le backend utilise PostgreSQL avec ces valeurs par defaut dans `src/main/resources/application.properties`:
- URL: `jdbc:postgresql://localhost:5432/gestion_formation`
- User: `postgres`
- Password: `0`
- Port backend: `8080`

### Creer la base

```sql
CREATE DATABASE gestion_formation;
```

Si besoin, adaptez `application.properties` selon votre machine.

## 4) Installer les dependances

### Backend

Depuis la racine du projet:

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation"
.\mvnw.cmd -q -DskipTests compile
```

### Frontend

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation\frontend"
npm install
```

## 5) Lancer l'application

## Option A - 2 terminaux (recommande)

Terminal 1 - Backend:

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation"
.\mvnw.cmd spring-boot:run
```

Terminal 2 - Frontend:

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation\frontend"
npm run dev
```

Acces:
- Frontend: `http://localhost:5173`
- API backend: `http://localhost:8080/api`
- Health API: `http://localhost:8080/api/auth/health`

## 6) Comptes de test

Utilisez mot de passe: `admin123`

- Admin: `admin`
- Responsable: `responsable`
- Simple utilisateur: `simple`

Redirections RBAC attendues:
- `simple_utilisateur` -> `/formations`
- `responsable` -> `/dashboard`
- `administrateur` -> `/dashboard`

## 7) Verification rapide

### Frontend

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation\frontend"
npm run lint
npm run build
```

### Backend

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation"
.\mvnw.cmd -q test
```

## 8) Probleme courant

- Si le frontend n'atteint pas le backend:
  - verifier que le backend tourne bien sur `8080`
  - verifier PostgreSQL et les identifiants DB
- Si login bloque:
  - verifier la reponse de `/api/auth/login`
  - verifier que `token`, `role`, `login` sont bien retournes

## 9) Build production

### Frontend

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation\frontend"
npm run build
npm run preview
```

### Backend

```powershell
Set-Location "C:\Users\rezgu\OneDrive\Desktop\formation\formation"
.\mvnw.cmd clean package
java -jar .\target\formation-0.0.1-SNAPSHOT.jar
```


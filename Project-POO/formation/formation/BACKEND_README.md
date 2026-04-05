# 🎓 Gestion de Formation - Backend Spring Boot

Backend Spring Boot 3 avec PostgreSQL pour l'application de gestion de formations.

## 🚀 Démarrage rapide

### Prérequis
- JDK 21 (ou JDK 25)
- PostgreSQL 14+
- Maven 3.8+

### Configuration PostgreSQL

1. **Créer la base de données**:
```sql
CREATE DATABASE gestion_formation;
```

2. **Vérifier les identifiants**:
   - Username: `postgres`
   - Password: `0`
   - Port: `5432`

### Lancer le backend

```bash
cd formation
mvn spring-boot:run
```

Ou dans IntelliJ IDEA:
- Ouvrir le dossier `formation`
- Clic droit sur `GestionFormationApplication.java` → Run

Le serveur démarre sur `http://localhost:8080`

## 🔐 Authentification

### Identifiants de test

```
Login: admin
Mot de passe: admin123
```

### JWT Token

- **Header**: `Authorization: Bearer <token>`
- **Expiration**: 24h
- **Secret**: Configuré dans `application.properties`

## 🔧 Configuration

Fichier: `src/main/resources/application.properties`

```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_formation
spring.datasource.username=postgres
spring.datasource.password=0
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT
jwt.secret=gestionFormationSecretKey2025VeryLongSecureKey123456789
jwt.expiration=86400000

# Server
server.port=8080
```

## 📁 Structure du projet

```
src/main/java/com/gestion/formation/
├── entity/              # Entités JPA
│   ├── Utilisateur.java
│   ├── Role.java
│   ├── Formation.java
│   ├── Participant.java
│   ├── Formateur.java
│   ├── Employeur.java
│   ├── Domaine.java
│   ├── Profil.java
│   └── Structure.java
├── repository/          # Interfaces Repository
├── service/             # Logique métier
├── controller/          # Endpoints REST
├── security/            # JWT + Security
│   ├── JwtUtil.java
│   ├── JwtFilter.java
│   └── UserDetailsServiceImpl.java
├── config/              # Configuration
│   ├── SecurityConfig.java
│   └── CorsConfig.java
├── dto/                 # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── StatistiqueDTO.java
└── GestionFormationApplication.java
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login
```

### Formations
```
GET    /api/formations
POST   /api/formations
GET    /api/formations/{id}
PUT    /api/formations/{id}
DELETE /api/formations/{id}
```

### Participants
```
GET    /api/participants
POST   /api/participants
GET    /api/participants/{id}
PUT    /api/participants/{id}
DELETE /api/participants/{id}
```

### Formateurs
```
GET    /api/formateurs
POST   /api/formateurs
GET    /api/formateurs/{id}
PUT    /api/formateurs/{id}
DELETE /api/formateurs/{id}
```

### Autres entités
- `/api/domaines`
- `/api/structures`
- `/api/profils`
- `/api/employeurs`
- `/api/utilisateurs`
- `/api/statistiques`

## 🔐 Sécurité

- **CORS**: Configuré pour `http://localhost:3000`
- **CSRF**: Désactivé (API REST)
- **Session**: Stateless (JWT)
- **Mot de passe**: Encodé avec BCrypt

## 📊 Entités

### Utilisateur
```json
{
  "id": 1,
  "login": "admin",
  "password": "hashed",
  "role": { "id": 1, "nom": "administrateur" }
}
```

### Formation
```json
{
  "id": 1,
  "titre": "Formation Web",
  "annee": 2025,
  "duree": 5,
  "budget": 15000,
  "domaine": { "id": 1, "libelle": "Informatique" },
  "formateur": {...},
  "participants": [...]
}
```

### Participant
```json
{
  "id": 1,
  "nom": "Mejri",
  "prenom": "Amine",
  "email": "a.mejri@gb.tn",
  "tel": "55123456",
  "structure": {...},
  "profil": {...}
}
```

## 🐛 Dépannage

### Erreur: Database Connection Failed
```
➜ Vérifier que PostgreSQL tourne
➜ Vérifier les identifiants dans application.properties
➜ Vérifier le port 5432
```

### Erreur: ClassNotFoundException
```
➜ Exécuter: mvn clean compile
➜ Redémarrer IntelliJ IDEA
```

### Erreur: Port 8080 déjà utilisé
```
➜ Changer server.port dans application.properties
➜ Ou tuer le processus: lsof -ti:8080 | xargs kill -9
```

### Tables pas créées
```
➜ Vérifier spring.jpa.hibernate.ddl-auto=update
➜ Vérifier que les entités ont @Entity
➜ Relancer l'application
```

## 📚 Dépendances principales

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
</dependency>

<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>0.11.5</version>
</dependency>
```

## 🧪 Test avec Postman

### Login
```
POST http://localhost:8080/api/auth/login
Body JSON:
{
  "login": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGc...",
  "role": "administrateur",
  "login": "admin"
}
```

### Utiliser le token
```
GET http://localhost:8080/api/formations
Headers:
Authorization: Bearer <token_reçu>
```

## 📝 Variables d'environnement

Pour production, créer un fichier `.env`:
```
DATABASE_URL=jdbc:postgresql://localhost:5432/gestion_formation
DATABASE_USER=postgres
DATABASE_PASSWORD=0
JWT_SECRET=very-long-secret-key-for-production
JWT_EXPIRATION=86400000
SERVER_PORT=8080
```

---

**Projet**: Excellent Training - Green Building  
**Version**: 0.0.1-SNAPSHOT  
**Date**: 2026


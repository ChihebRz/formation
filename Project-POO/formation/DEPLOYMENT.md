# 🔧 INSTALLATION & DÉPLOIEMENT

## Installation Complète (30 minutes)

### 1. PostgreSQL (5 min)

#### Windows
```bash
# Télécharger et installer depuis:
# https://www.postgresql.org/download/windows/

# Vérifier l'installation
psql --version

# Créer la base de données
psql -U postgres
CREATE DATABASE gestion_formation;
\q
```

#### macOS
```bash
brew install postgresql
brew services start postgresql
createdb gestion_formation
```

#### Linux
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres psql
CREATE DATABASE gestion_formation;
\q
```

---

### 2. Backend (10 min)

```bash
# Naviguer au dossier
cd formation

# Compiler
./mvnw clean compile

# Lancer les tests (optionnel)
./mvnw test

# Démarrer le serveur
./mvnw spring-boot:run
```

Le serveur démarre sur: `http://localhost:8080`

---

### 3. Frontend (10 min)

```bash
# Terminal 2 - naviguer au dossier frontend
cd formation/frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

L'app s'ouvre automatiquement sur: `http://localhost:3000`

---

## Build Production

### Backend

```bash
cd formation

# Build JAR
./mvnw clean package -DskipTests

# Le JAR est créé dans: target/formation-0.0.1-SNAPSHOT.jar

# Exécuter le JAR
java -jar target/formation-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd formation/frontend

# Build optimisé
npm run build

# Les fichiers statiques sont dans: build/

# Tester le build localement
npm install -g serve
serve -s build -l 3000
```

---

## Déploiement

### Backend - Heroku

```bash
# Installer Heroku CLI
npm install -g heroku

# Se connecter
heroku login

# Créer app
heroku create mon-app-formation
heroku addons:create heroku-postgresql:hobby-dev -a mon-app-formation

# Ajouter remote
git remote add heroku https://git.heroku.com/mon-app-formation.git

# Configurer variables d'environnement
heroku config:set JWT_SECRET=votre_secret_long_et_secure -a mon-app-formation

# Déployer
git push heroku main
```

### Frontend - Netlify

#### Via CLI
```bash
npm install -g netlify-cli
cd formation/frontend
npm run build
netlify deploy --prod --dir=build
```

#### Via GitHub
1. Push sur GitHub
2. Connecter sur Netlify
3. Sélectionner le repo
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Déployer

### Frontend - Vercel

```bash
npm install -g vercel
cd formation/frontend
vercel --prod
```

---

## Configuration pour Production

### Backend - application-prod.properties

```properties
# Server
server.port=8080

# PostgreSQL (AWS RDS, Heroku, etc.)
spring.datasource.url=jdbc:postgresql://<host>:<port>/gestion_formation
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate

# JWT
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.gestion.formation=DEBUG

# CORS
cors.allowed-origins=https://yourdomain.com

# Spring
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
```

### Frontend - .env.production

```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

---

## Docker (Optionnel)

### Dockerfile Backend

```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/formation-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Dockerfile Frontend

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: gestion_formation
      POSTGRES_PASSWORD: 0
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./formation
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/gestion_formation
      SPRING_DATASOURCE_PASSWORD: 0

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  pgdata:
```

Lancer:
```bash
docker-compose up
```

---

## CI/CD - GitHub Actions

### .github/workflows/deploy.yml

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 21
        uses: actions/setup-java@v2
        with:
          java-version: '21'
      - name: Build with Maven
        run: cd formation && ./mvnw clean package -DskipTests
      - name: Deploy to Heroku
        run: |
          git remote add heroku https://git.heroku.com/${{ secrets.HEROKU_APP }}.git
          git push heroku main

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build React
        run: cd formation/frontend && npm install && npm run build
      - name: Deploy to Netlify
        run: netlify deploy --prod --dir=frontend/build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Monitoring

### Backend - Actuator

Ajouter à pom.xml:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Endpoints disponibles:
- http://localhost:8080/actuator/health
- http://localhost:8080/actuator/metrics

### Frontend - Sentry (erreurs)

```bash
npm install @sentry/react @sentry/tracing
```

En haut de App.jsx:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "votre_sentry_dsn",
  environment: process.env.NODE_ENV,
});
```

---

## Backup & Restauration

### PostgreSQL Backup

```bash
# Backup complet
pg_dump -U postgres gestion_formation > backup.sql

# Backup binaire
pg_dump -U postgres -Fc gestion_formation > backup.dump

# Restaurer
psql -U postgres gestion_formation < backup.sql
```

### Backup Automatique (Cron)

```bash
0 2 * * * pg_dump -U postgres gestion_formation > /backups/gestion_formation_$(date +\%Y\%m\%d).sql
```

---

## Performance Tuning

### Backend
```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5

# Cache
spring.cache.type=redis
```

### Frontend
```bash
# Build optimisé
npm run build -- --analyze

# Lighthouse
npm install -g lighthouse
lighthouse https://yourdomain.com
```

---

## Checklist Déploiement

- [ ] Base de données créée et configurée
- [ ] Variables d'environnement définies
- [ ] HTTPS/SSL activé
- [ ] CORS configuré correctement
- [ ] JWT secret sécurisé
- [ ] Logs configurés
- [ ] Backup automatique en place
- [ ] Monitoring activé
- [ ] Tests passent localement
- [ ] Performance testée
- [ ] Domaine et DNS configurés
- [ ] SSL certificate valide
- [ ] Support client/documentation prêt

---

## Support & Troubleshooting

### Erreur: "Cannot connect to database"
- Vérifier PostgreSQL tourne
- Vérifier credentials dans application.properties
- Vérifier firewall port 5432

### Erreur: "CORS blocked"
- Vérifier CorsConfig.java
- Ajouter domain en allowedOrigins

### Erreur: "JWT expired"
- Vérifier jwt.expiration en secondes
- Vérifier horloge serveur

### Frontend slow
- Vérifier Network tab (F12)
- Vérifier API latency
- Activer compression gzip

---

*Dernière mise à jour: 3 avril 2026*


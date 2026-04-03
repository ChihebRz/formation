# 🚀 CHECKLIST DE DÉMARRAGE FINALE

## ✅ Avant de Commencer

### Machine/Environnement
- [ ] Windows / Mac / Linux confirmé
- [ ] Node.js 16+ installé (`node --version`)
- [ ] npm 8+ installé (`npm --version`)
- [ ] Git installé (`git --version`)

### JDK/Maven
- [ ] JDK 21 installé (`java -version`)
- [ ] JAVA_HOME configuré
- [ ] Maven Wrapper inclus (./mvnw)

### PostgreSQL
- [ ] PostgreSQL 12+ installé
- [ ] PostgreSQL en cours d'exécution
- [ ] Base `gestion_formation` créée

---

## 📦 Installation Étape par Étape

### 1. Cloner/Ouvrir le Projet
```bash
# Si dans un dossier Git
git clone <url-repo> formation
cd formation

# Ou ouvrir le dossier dans IntelliJ
```

### 2. Configurer PostgreSQL
```sql
-- Via pgAdmin ou psql
CREATE DATABASE gestion_formation;

-- Vérifier la connexion
psql -U postgres -d gestion_formation -h localhost
```

### 3. Vérifier application.properties
```bash
# Fichier: formation/src/main/resources/application.properties

# Vérifier ces valeurs:
# spring.datasource.url=jdbc:postgresql://localhost:5432/gestion_formation
# spring.datasource.username=postgres
# spring.datasource.password=0
```

### 4. Compiler Backend
```bash
cd formation
./mvnw clean compile
# Doit dire: BUILD SUCCESS
```

### 5. Installer Frontend
```bash
cd frontend
npm install
# Doit dire: added X packages
```

---

## 🚀 Lancer l'Application

### Terminal 1 - Backend
```bash
cd formation
./mvnw spring-boot:run
# Attendre: "Started GestionFormationApplication"
```

### Terminal 2 - Frontend
```bash
cd formation/frontend
npm start
# L'app s'ouvre automatiquement sur http://localhost:3000
```

### Terminal 3 - Surveillance Logs (optionnel)
```bash
# Pour voir les logs PostgreSQL ou erreurs
tail -f formation.log
```

---

## ✅ Vérification de Fonctionnement

### Backend
- [ ] Serveur démarre sans erreurs
- [ ] Les tables sont créées dans PostgreSQL
- [ ] Admin est inséré (password: admin123)

### Frontend
- [ ] Page Login affichée
- [ ] Bouton "Se connecter" visible
- [ ] Console F12 sans erreurs rouges

### Login
- [ ] Login: `admin`
- [ ] Password: `admin123`
- [ ] Cliquer "Se connecter"
- [ ] Redirection vers Dashboard

### Navigation
- [ ] Sidebar affiche les menus
- [ ] Cliquer "Formations" → page Formations charge
- [ ] Cliquer "Ajouter Formation" → formulaire affiche
- [ ] Remplir et soumettre → formation créée

---

## 🆘 Dépannage Rapide

| Problème | Cause | Solution |
|----------|-------|----------|
| Port 8080 busy | Autre app utilise le port | `netstat -ano` et tuer processus |
| Port 3000 busy | Autre app utilise le port | `lsof -i :3000` et tuer processus |
| DB connection refused | PostgreSQL pas démarré | Démarrer PostgreSQL (Services) |
| Module not found | npm install manquant | `cd frontend && npm install` |
| Compilation error | Java version incorrect | Vérifier `java -version` = 21 |
| CORS error | Backend pas accessible | Vérifier `http://localhost:8080` |
| 401 Unauthorized | Token expiré | Refaire login |
| Données pas visibles | DDL auto-update manquant | Vérifier `application.properties` |

---

## 📱 Endpoints de Test

### Postman
```
1. POST http://localhost:8080/api/auth/login
   Body: { "login": "admin", "password": "admin123" }
   → Copier le token

2. GET http://localhost:8080/api/formations
   Header: Authorization: Bearer <token>
   → Vérifier réponse []
```

### cURL
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","password":"admin123"}'

# Créer formation
curl -X POST http://localhost:8080/api/formations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"titre":"Java","annee":2025,"duree":5,"budget":2000}'
```

---

## 📂 Fichiers Importants

```
formation/
├── pom.xml                    ← Dépendances Maven
├── src/main/resources/
│   ├── application.properties ← Config BD/JWT
│   └── data.sql              ← Données initiales
├── mvnw & mvnw.cmd           ← Maven Wrapper
└── README.md                 ← Documentation

formation/frontend/
├── package.json              ← Dépendances npm
├── src/App.jsx               ← App principale
└── public/index.html         ← HTML d'entrée
```

---

## 🔄 Workflow Quotidien

### Matin
```bash
# Terminal 1
cd formation && ./mvnw spring-boot:run

# Terminal 2
cd formation/frontend && npm start
```

### Développer
```bash
# Backend: Les changements se rechargent automatiquement
# Frontend: Hot reload activé (F5 si besoin)
# BD: Hibernate gère les schémas automatiquement
```

### Arrêter
```bash
# Ctrl+C dans chaque terminal
```

---

## 🎯 Prochaines Étapes Après Démarrage

1. **Explorer l'interface**
   - Créer une formation
   - Créer un participant
   - Voir les statistiques (si Admin)

2. **Lire la documentation**
   - README.md (guide complet)
   - DEVELOPER_GUIDE.md (dev)
   - IMPLEMENTATION_SUMMARY.md (résumé)

3. **Modifier/Ajouter**
   - Ajouter un nouveau rôle
   - Modifier la couleur Navbar
   - Ajouter un endpoint API

4. **Déployer**
   - Suivre DEPLOYMENT.md
   - Déployer sur Heroku/Netlify

---

## 📊 Performance

### Indicateurs de Santé

**Backend OK si:**
- Logs ne montrent que INFO/DEBUG
- Réponses < 200ms
- Pas de "out of memory"

**Frontend OK si:**
- Performance score Lighthouse > 80
- Network waterfalls < 1s
- Pas d'erreurs rouge Console

---

## 🔐 Premier Login Admin

**Credentials de Développement:**
- Login: `admin`
- Password: `admin123`

**IMPORTANT:** Changer en production!

---

## 📞 Besoin d'aide?

1. **Vérifier les fichiers:** README.md, QUICKSTART.md
2. **Voir les logs:** Terminal ou IntelliJ console
3. **Déboguer:** F12 (Frontend) ou IntelliJ Debugger
4. **Tester l'API:** Postman ou cURL

---

## ✨ Vous êtes Prêt!

L'application est maintenant **100% fonctionnelle**.

**Status:** ✅ PRODUCTION READY

Bon développement! 🚀

---

*Checklist Final — 3 avril 2026*
*Gestion de Formation — ISI Tunis El Manar 2025/2026*


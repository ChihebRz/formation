# 🎯 QUICK START - Commandes à copier-coller

## 📋 Une seule commande pour tout?

Non, mais presque! Vous avez besoin de 2 terminaux.

---

## ✅ OPTION 1: Démarrage complet (Recommandé)

### Terminal 1: Backend
```bash
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation
mvn spring-boot:run
```

**Vous devez voir:**
```
Tomcat started on port(s): 8080 (http)
Started GestionFormationApplication in 5.234 seconds
```

---

### Terminal 2: Frontend
```bash
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation\frontend
npm run dev
```

**Vous devez voir:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

---

## 🌐 Ouvrir dans le navigateur

```
http://localhost:3000
```

### Login
```
Login: admin
Password: admin123
```

---

## ✅ OPTION 2: IntelliJ IDEA (Plus facile)

### Backend
1. Ouvrir le dossier: `C:\...\Project-POO\formation\formation`
2. Clic droit sur `src/main/java/com/gestion/formation/GestionFormationApplication.java`
3. **Run** (ou Shift+F10)

### Frontend (Terminal intégré)
1. **View** → **Terminal** (Ctrl + `)
2. Copier-coller:
```bash
cd frontend
npm run dev
```

---

## 🧪 Vérifier que tout marche

### Test 1: Backend disponible?
```bash
curl http://localhost:8080/api/formations
# Doit retourner: 401 Unauthorized (normal, pas authentifié)
```

### Test 2: Frontend disponible?
```bash
curl http://localhost:3000
# Doit retourner la page HTML
```

### Test 3: Login?
1. Aller sur http://localhost:3000
2. Entrer admin / admin123
3. Cliquer "Se connecter"
4. Voir le Dashboard ✅

---

## 🛑 Arrêter les serveurs

### Terminal 1 (Backend)
```
Ctrl + C
```

### Terminal 2 (Frontend)
```
Ctrl + C
```

---

## 🔄 Hot Reload

### Frontend
- Les changements dans `src/` se rechargent automatiquement
- L'état du navigateur se conserve

### Backend
- Avec devtools activé, devrait se recharger automatiquement
- Sinon, arrêter et relancer

---

## 📦 Build pour production

### Frontend
```bash
cd frontend
npm run build
# Génère: frontend/dist/
```

### Backend
```bash
mvn clean package
# Génère: target/formation-0.0.1-SNAPSHOT.jar
```

---

## 🐛 Erreurs courantes

| Erreur | Solution |
|--------|----------|
| `connect ECONNREFUSED 127.0.0.1:8080` | Backend pas lancé |
| `Port 3000 already in use` | `npx kill-port 3000` |
| `Port 8080 already in use` | Tuer process ou changer port |
| `npm not found` | Installer Node.js |
| `mvn not found` | Installer Maven ou utiliser IDE |
| `Database connection failed` | Vérifier PostgreSQL + identifiants |
| `CORS error` | Backend pas sur 8080 ou CORS pas config |
| `401 Unauthorized` | Login incorrect |

---

## 💡 Tips & Tricks

### Frontend
```bash
# Lancer avec debug
npm run dev -- --debug

# Build en mode développement
npm run build:dev

# Preview du build
npm run preview
```

### Backend
```bash
# Logs plus détaillés
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"

# Compiler uniquement
mvn compile

# Tests
mvn test
```

---

## 📚 Plus d'info

- **Frontend README**: `frontend/README.md`
- **Backend README**: `BACKEND_README.md`
- **Getting Started**: `GETTING_STARTED.md`
- **Summary**: `SUMMARY.md`

---

**Prêt? Allez-y! 🚀**

```bash
# Terminal 1
cd formation
mvn spring-boot:run

# Terminal 2  
cd frontend
npm run dev

# Navigateur
http://localhost:3000
```

✅ Fait!


# 🚀 GUIDE RAPIDE - LANCER LE PROJET SANS ERREURS

## ⚡ Commandes de Démarrage Rapide

### Option 1: Avec PowerShell (Recommandé)

```powershell
# Terminal 1: Démarrer le Backend (Port 8080)
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation
mvn clean spring-boot:run

# Terminal 2: Démarrer le Frontend (Port 3000)
cd C:\Users\rezgu\OneDrive\Desktop\Project-POO\formation\formation\frontend
npm install
npm start
```

### Option 2: Avec les scripts Maven

```powershell
# À la racine du projet
./mvnw spring-boot:run
```

## ✅ Vérifier que tout fonctionne

1. **Backend**: Ouvrez http://localhost:8080/api/auth/health
   - Vous devriez voir: `{"status":"UP","backend":"Backend is running on port 8080",...}`

2. **Frontend**: Ouvrez http://localhost:3000
   - Vous devriez être redirigé vers `/login`

3. **Connexion**: Testez la connexion avec vos identifiants
   - Connectez-vous avec un utilisateur valide
   - Vérifiez qu'il n'y a pas d'erreur rouge en haut à droite

## 🔧 Si vous voyez l'alerte rouge "Erreur de connexion"

### Checklist:
- [ ] Backend lancé? (mvn spring-boot:run)
- [ ] PostgreSQL lancé? (Check port 5432)
- [ ] Frontend sur http://localhost:3000?
- [ ] Backend sur http://localhost:8080?
- [ ] Pas de firewall bloquant?

### Solutions rapides:
1. Rafraîchissez la page (Ctrl+F5)
2. Attendez 30 secondes (le hook vérifie toutes les 30s)
3. Redémarrez le backend
4. Consultez la console (F12) pour plus de détails

## 🧪 Tester la Connexion Manuellement

1. Ouvrez http://localhost:3000
2. Appuyez sur F12 pour ouvrir la console
3. Allez dans l'onglet "Console"
4. Collez le code du fichier `TEST_CONNECTION.js`
5. Appuyez sur Entrée

## 📊 Structure des Ports

```
Frontend:  http://localhost:3000    ✅
Backend:   http://localhost:8080    ✅
Database:  postgresql://localhost:5432 ✅
```

## 💡 Points Importants

- ✅ Le frontend s'exécute sur le port 3000
- ✅ Le backend s'exécute sur le port 8080
- ✅ CORS est correctement configuré
- ✅ JWT est géré automatiquement
- ✅ Erreurs de connexion affichées clairement
- ✅ Vérification automatique toutes les 30 secondes

## 📝 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `CONNECTION_SETUP.md` | Configuration détaillée |
| `TEST_CONNECTION.js` | Script de test |
| `src/services/api.ts` | Configuration API |
| `src/components/shared/ConnectionAlert.tsx` | Alerte visuelle |
| `src/hooks/useConnectionCheck.ts` | Hook de vérification |

## ⚠️ En cas de Problème

Consultez `CONNECTION_SETUP.md` pour un guide complet de troubleshooting.

---

**🎯 Résumé**: Frontend sur 3000, Backend sur 8080, zéro erreurs de connexion! 🚀


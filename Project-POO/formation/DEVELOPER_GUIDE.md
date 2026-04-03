# 👨‍💻 GUIDE DÉVELOPPEUR — Gestion de Formation

## 📚 Organisation du Code

### Backend - Principes SOLID

```
controller/     → Endpoints HTTP (requêtes entrantes)
  ↓
service/        → Logique métier (traitement)
  ↓
repository/     → Accès données (BD)
  ↓
entity/         → Modèles JPA
```

### Frontend - Structure Modulaire

```
pages/          → Écrans complets (Formations, Dashboard, etc.)
components/     → Composants réutilisables (Navbar, Sidebar)
services/       → Communication API
context/        → État global (Auth)
```

---

## 🔄 Workflow Développement

### Ajouter une Nouvelle Fonctionnalité

#### Exemple: Ajouter "Certifications"

### 1. Backend

**Étape 1: Créer l'Entité**
```java
// entity/Certification.java
@Entity
@Table(name = "certifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String titre;
    
    @ManyToOne
    @JoinColumn(name = "id_formation")
    private Formation formation;
}
```

**Étape 2: Créer le Repository**
```java
// repository/CertificationRepository.java
@Repository
public interface CertificationRepository extends JpaRepository<Certification, Integer> {
    List<Certification> findByFormation_Id(Integer formationId);
}
```

**Étape 3: Créer le Service**
```java
// service/CertificationService.java
@Service
public class CertificationService {
    @Autowired
    private CertificationRepository repo;
    
    public List<Certification> findAll() { return repo.findAll(); }
    public Certification save(Certification c) { return repo.save(c); }
    // ...
}
```

**Étape 4: Créer le Controller**
```java
// controller/CertificationController.java
@RestController
@RequestMapping("/api/certifications")
public class CertificationController {
    @Autowired
    private CertificationService service;
    
    @GetMapping
    public List<Certification> getAll() { return service.findAll(); }
    
    @PostMapping
    public ResponseEntity<Certification> create(@RequestBody Certification c) {
        return ResponseEntity.ok(service.save(c));
    }
    // ...
}
```

### 2. Frontend

**Étape 1: Créer la Page**
```javascript
// pages/Certifications.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Certifications() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ titre: '' });
  
  useEffect(() => {
    loadItems();
  }, []);
  
  const loadItems = async () => {
    try {
      const res = await API.get('/certifications');
      setItems(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };
  
  // CRUD logic...
  return (
    // UI...
  );
}

export default Certifications;
```

**Étape 2: Ajouter la Route**
```javascript
// App.jsx
<Route path="/certifications" element={
  <PrivateRoute>
    <Certifications />
  </PrivateRoute>
} />
```

**Étape 3: Ajouter au Menu**
```javascript
// Sidebar.jsx
<Link to="/certifications" className="nav-link">
  🏆 Certifications
</Link>
```

---

## 🧪 Tests

### Backend - JUnit

```java
// src/test/java/.../FormationServiceTest.java
@SpringBootTest
public class FormationServiceTest {
    
    @Autowired
    private FormationService service;
    
    @Test
    public void testFindAll() {
        List<Formation> formations = service.findAll();
        assertNotNull(formations);
    }
    
    @Test
    public void testSave() {
        Formation f = new Formation();
        f.setTitre("Java Advanced");
        Formation saved = service.save(f);
        assertNotNull(saved.getId());
    }
}
```

Exécuter:
```bash
./mvnw test
```

### Frontend - Jest/React Testing Library

```javascript
// src/__tests__/Login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText(/login/i)).toBeInTheDocument();
});
```

Exécuter:
```bash
npm test
```

---

## 🐛 Debug

### Backend

**Voir les logs:**
```properties
# application.properties
logging.level.com.gestion.formation=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

**Breakpoint IntelliJ:**
1. Cliquer sur la ligne (gutter)
2. F5 ou Debug > Run
3. Debugger affiche variables

### Frontend

**Chrome DevTools:**
- F12 → Console
- F12 → Network (requêtes API)
- F12 → React DevTools (state/props)

**Logs React:**
```javascript
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);
```

---

## 📝 Conventions de Code

### Naming

**Backend**
- Classes: `PascalCase` (Formation, ParticipantService)
- Méthodes: `camelCase` (findByName, getFormations)
- Constantes: `UPPER_SNAKE_CASE` (MAX_SIZE, DEFAULT_PAGE)

**Frontend**
- Components: `PascalCase` (Formations, Login)
- Functions: `camelCase` (loadItems, handleSubmit)
- Constants: `UPPER_SNAKE_CASE` (API_URL, DEFAULT_ROLE)

### Comments

**Backend**
```java
/**
 * Récupère toutes les formations de l'année donnée.
 * @param annee l'année de la formation
 * @return liste des formations
 */
public List<Formation> findByAnnee(Integer annee) {
    return repo.findByAnnee(annee);
}
```

**Frontend**
```javascript
// Charger les formations au montage du composant
useEffect(() => {
  loadFormations();
}, []);
```

---

## 🚀 Optimisation

### Backend

**Lazy Loading:**
```java
@ManyToOne(fetch = FetchType.LAZY)  // Au lieu de EAGER
@JoinColumn(name = "id_formation")
private Formation formation;
```

**Pagination:**
```java
@GetMapping
public Page<Formation> getAll(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    return repo.findAll(PageRequest.of(page, size));
}
```

**Caching:**
```java
@Cacheable("formations")
public List<Formation> findAll() {
    return repo.findAll();
}
```

### Frontend

**Code Splitting:**
```javascript
const Formations = lazy(() => import('./pages/Formations'));

<Suspense fallback={<div>Chargement...</div>}>
  <Formations />
</Suspense>
```

**Memoization:**
```javascript
const MemoizedFormationRow = React.memo(({ formation }) => (
  <tr>...</tr>
));
```

---

## 📋 Pull Request Checklist

- [ ] Code compile sans erreurs
- [ ] Tests passent (`mvnw test`, `npm test`)
- [ ] Pas de warnings/lint errors
- [ ] Commits bien nommés
- [ ] Pas de code déboggage (console.log, debugger)
- [ ] Documentation mise à jour
- [ ] Pas de fichiers temporaires commitées

---

## 🔒 Sécurité

### Backend

**Never do this:**
```java
// ❌ Stocker password en clair
user.setPassword("admin123");

// ✅ Hasher avec BCrypt
user.setPassword(passwordEncoder.encode("admin123"));

// ❌ SQL Injection
String query = "SELECT * FROM users WHERE login = '" + login + "'";

// ✅ JPA Query
repo.findByLogin(login);

// ❌ Exposer infos sensibles
return user.getPassword();

// ✅ Utiliser DTO
return new UserDTO(user.getLogin(), user.getRole());
```

### Frontend

**Never do this:**
```javascript
// ❌ Stocker token en localstorage (XSS risk)
localStorage.setItem('token', token);

// ✅ HttpOnly cookie (backend)
response.setHeader("Set-Cookie", "token=...; HttpOnly; Secure");

// ❌ Secrets en code
const API_KEY = "sk_live_4eC39HqLyjWDarhtT00ZQlVU";

// ✅ Variable d'environnement
const API_KEY = process.env.REACT_APP_API_KEY;

// ❌ Données sensibles en URL
window.location = `/profile?password=admin123`;

// ✅ POST ou state
```

---

## 📚 Ressources Utiles

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [JWT.io](https://jwt.io)

### Tutoriels
- [Spring Security](https://spring.io/guides/gs/securing-web)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

---

## 📞 Support Interne

### Issues Communes

**Q: Comment ajouter un nouvel endpoint?**
A: Voir section "Ajouter une nouvelle fonctionnalité"

**Q: Comment débogger une requête API?**
A: Chrome DevTools → Network tab → Cliquer sur requête

**Q: Comment migrer la BD?**
A: Hibernate gère automatiquement (ddl-auto=update)

**Q: Comment déployer?**
A: Voir DEPLOYMENT.md

---

*Guide Développeur — Version 1.0*
*Dernière mise à jour: 3 avril 2026*


-- Rôles
INSERT INTO roles (nom) SELECT 'simple_utilisateur' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nom = 'simple_utilisateur');
INSERT INTO roles (nom) SELECT 'responsable' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nom = 'responsable');
INSERT INTO roles (nom) SELECT 'administrateur' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nom = 'administrateur');

-- Admin (password: admin123)
INSERT INTO utilisateurs (login, password, id_role)
SELECT 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
       (SELECT id FROM roles WHERE nom = 'administrateur')
WHERE NOT EXISTS (SELECT 1 FROM utilisateurs WHERE login = 'admin');





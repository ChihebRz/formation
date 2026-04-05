-- Nettoyer les données
DELETE FROM formation_participant CASCADE;
DELETE FROM formations CASCADE;
DELETE FROM utilisateurs CASCADE;
DELETE FROM domaines CASCADE;
DELETE FROM formateurs CASCADE;
DELETE FROM participants CASCADE;
DELETE FROM employeurs CASCADE;
DELETE FROM structures CASCADE;
DELETE FROM profils CASCADE;
DELETE FROM roles CASCADE;

-- Réinitialiser les séquences
ALTER SEQUENCE roles_id_seq RESTART WITH 1;
ALTER SEQUENCE domaines_id_seq RESTART WITH 1;
ALTER SEQUENCE structures_id_seq RESTART WITH 1;
ALTER SEQUENCE profils_id_seq RESTART WITH 1;
ALTER SEQUENCE employeurs_id_seq RESTART WITH 1;
ALTER SEQUENCE formateurs_id_seq RESTART WITH 1;
ALTER SEQUENCE participants_id_seq RESTART WITH 1;
ALTER SEQUENCE utilisateurs_id_seq RESTART WITH 1;

-- Rôles
INSERT INTO roles (nom) VALUES ('simple_utilisateur'), ('responsable'), ('administrateur');

-- Domaines
INSERT INTO domaines (libelle) VALUES
  ('Informatique'), ('Finance'), ('Marketing'), ('Ressources Humaines');

-- Structures
INSERT INTO structures (libelle) VALUES
  ('Direction Centrale'), ('Région Tunis'), ('Région Sfax');

-- Profils
INSERT INTO profils (libelle) VALUES
  ('Informaticien Bac+5'), ('Gestionnaire'), ('Analyste');

-- Employeurs
INSERT INTO employeurs (nom_employeur) VALUES
  ('TechConsult'), ('FormaPro'), ('Conseil Expert');

-- Formateurs
INSERT INTO formateurs (nom, prenom, email, tel, type) VALUES
  ('Ben Ali', 'Mohamed', 'benali@gb.tn', '71234567', 'interne'),
  ('Trabelsi', 'Sarra', 'trabelsi@extern.tn', '72345678', 'externe'),
  ('Hammami', 'Ahmed', 'hammami@gb.tn', '73456789', 'interne');

-- Participants
INSERT INTO participants (nom, prenom, email, tel) VALUES
  ('Mejri', 'Amine', 'amine.m@gb.tn', '55123456'),
  ('Gharbi', 'Leila', 'leila.g@gb.tn', '55234567'),
  ('Bouazizi', 'Yassine', 'yassine.b@gb.tn', '55345678'),
  ('Khelifi', 'Nour', 'nour.k@gb.tn', '55456789'),
  ('Sassi', 'Rim', 'rim.s@gb.tn', '55567890');

-- Admin (password: admin123 - Hash BCrypt généré et VALIDE)
INSERT INTO utilisateurs (login, password, id_role)
VALUES ('admin', '$2a$10$JflDimZ4KfT49EO3aSWtc.Xlhq7Fu.u9woyqxxqlDGh1ciMzAhrHm', 3);

-- Formations
INSERT INTO formations (titre, nom, description, annee, duree, budget, id_domaine, id_formateur) VALUES
  ('Développement Web Avancé', 'Développement Web Avancé', 'Formation avancée en développement web moderne avec React, Angular et Vue.js', 2025, 5, 15000, 1, 1),
  ('Gestion Financière', 'Gestion Financière', 'Master class en gestion financière d''entreprise et analyse de bilan', 2025, 3, 8000, 2, 2),
  ('Sécurité Informatique', 'Sécurité Informatique', 'Formation complète en sécurité informatique et protection des données', 2025, 4, 12000, 1, 3),
  ('Marketing Digital', 'Marketing Digital', 'Stratégies modernes de marketing digital et réseaux sociaux', 2026, 2, 5000, 3, 2),
  ('Intelligence Artificielle', 'Intelligence Artificielle', 'Introduction à l''IA, machine learning et deep learning', 2026, 5, 20000, 1, 1);

























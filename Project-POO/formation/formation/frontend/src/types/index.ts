export interface Domaine {
  id: number;
  libelle: string;
}

export interface Profil {
  id: number;
  libelle: string;
}

export interface Structure {
  id: number;
  libelle: string;
}

export interface Employeur {
  id: number;
  nomEmployeur: string;
}

export interface Formateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  type: "interne" | "externe";
  employeur?: Employeur;
}

export interface Participant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  structure: Structure;
  profil: Profil;
}

export interface Formation {
  id: number;
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaine: Domaine;
  formateur?: Formateur;
  participants?: Participant[];
}

export interface Utilisateur {
  id: number;
  login: string;
  role: Role;
}

export interface Role {
  id: number;
  nom: string;
}

export interface AuthContextType {
  user: { token: string; role: string; login: string } | null;
  login: (data: { token: string; role: string; login: string }) => void;
  logout: () => void;
  setUser: (user: { token: string; role: string; login: string } | null) => void;
  isAuthenticated: boolean;
  userRole: string | null;
}



import API from "./api";

// Types
export interface Formation {
  id: number;
  nom: string;
  description: string;
  domaine: { id: number; libelle: string };
  duree: number;
  budget: number;
  dateDebut: string;
  dateFin: string;
  annee: number;
}

export interface Formateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
}

export interface Participant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  organisation: string;
}

export interface Domaine {
  id: number;
  libelle: string;
  description: string;
}

export interface Structure {
  id: number;
  nom: string;
  adresse: string;
}

export interface Profil {
  id: number;
  nom: string;
  description: string;
}

export interface Utilisateur {
  id: number;
  login: string;
  role: { id: number; nom: string };
}

export interface Employeur {
  id: number;
  nom: string;
  adresse: string;
}

export interface Statistique {
  totalFormations: number;
  totalFormateurs: number;
  totalParticipants: number;
  totalBudget: number;
}

// API Services
export const apiService = {
  // Formations
  getFormations: async (): Promise<Formation[]> => {
    const response = await API.get("/formations");
    return response.data;
  },

  createFormation: async (formation: Omit<Formation, "id">) => {
    const response = await API.post("/formations", formation);
    return response.data;
  },

  updateFormation: async (id: number, formation: Partial<Formation>) => {
    const response = await API.put(`/formations/${id}`, formation);
    return response.data;
  },

  deleteFormation: async (id: number) => {
    await API.delete(`/formations/${id}`);
  },

  // Formateurs
  getFormateurs: async (): Promise<Formateur[]> => {
    const response = await API.get("/formateurs");
    return response.data;
  },

  createFormateur: async (formateur: Omit<Formateur, "id">) => {
    const response = await API.post("/formateurs", formateur);
    return response.data;
  },

  updateFormateur: async (id: number, formateur: Partial<Formateur>) => {
    const response = await API.put(`/formateurs/${id}`, formateur);
    return response.data;
  },

  deleteFormateur: async (id: number) => {
    await API.delete(`/formateurs/${id}`);
  },

  // Participants
  getParticipants: async (): Promise<Participant[]> => {
    const response = await API.get("/participants");
    return response.data;
  },

  createParticipant: async (participant: Omit<Participant, "id">) => {
    const response = await API.post("/participants", participant);
    return response.data;
  },

  updateParticipant: async (id: number, participant: Partial<Participant>) => {
    const response = await API.put(`/participants/${id}`, participant);
    return response.data;
  },

  deleteParticipant: async (id: number) => {
    await API.delete(`/participants/${id}`);
  },

  // Domaines
  getDomaines: async (): Promise<Domaine[]> => {
    const response = await API.get("/domaines");
    return response.data;
  },

  createDomaine: async (domaine: Omit<Domaine, "id">) => {
    const response = await API.post("/domaines", domaine);
    return response.data;
  },

  updateDomaine: async (id: number, domaine: Partial<Domaine>) => {
    const response = await API.put(`/domaines/${id}`, domaine);
    return response.data;
  },

  deleteDomaine: async (id: number) => {
    await API.delete(`/domaines/${id}`);
  },

  // Structures
  getStructures: async (): Promise<Structure[]> => {
    const response = await API.get("/structures");
    return response.data;
  },

  createStructure: async (structure: Omit<Structure, "id">) => {
    const response = await API.post("/structures", structure);
    return response.data;
  },

  updateStructure: async (id: number, structure: Partial<Structure>) => {
    const response = await API.put(`/structures/${id}`, structure);
    return response.data;
  },

  deleteStructure: async (id: number) => {
    await API.delete(`/structures/${id}`);
  },

  // Profils
  getProfils: async (): Promise<Profil[]> => {
    const response = await API.get("/profils");
    return response.data;
  },

  createProfil: async (profil: Omit<Profil, "id">) => {
    const response = await API.post("/profils", profil);
    return response.data;
  },

  updateProfil: async (id: number, profil: Partial<Profil>) => {
    const response = await API.put(`/profils/${id}`, profil);
    return response.data;
  },

  deleteProfil: async (id: number) => {
    await API.delete(`/profils/${id}`);
  },

  // Utilisateurs
  getUtilisateurs: async (): Promise<Utilisateur[]> => {
    const response = await API.get("/utilisateurs");
    return response.data;
  },

  createUtilisateur: async (utilisateur: Omit<Utilisateur, "id">) => {
    const response = await API.post("/utilisateurs", utilisateur);
    return response.data;
  },

  updateUtilisateur: async (id: number, utilisateur: Partial<Utilisateur>) => {
    const response = await API.put(`/utilisateurs/${id}`, utilisateur);
    return response.data;
  },

  deleteUtilisateur: async (id: number) => {
    await API.delete(`/utilisateurs/${id}`);
  },

  // Employeurs
  getEmployeurs: async (): Promise<Employeur[]> => {
    const response = await API.get("/employeurs");
    return response.data;
  },

  createEmployeur: async (employeur: Omit<Employeur, "id">) => {
    const response = await API.post("/employeurs", employeur);
    return response.data;
  },

  updateEmployeur: async (id: number, employeur: Partial<Employeur>) => {
    const response = await API.put(`/employeurs/${id}`, employeur);
    return response.data;
  },

  deleteEmployeur: async (id: number) => {
    await API.delete(`/employeurs/${id}`);
  },

  // Statistiques
  getStatistiques: async (): Promise<Statistique> => {
    const response = await API.get("/statistiques");
    return response.data;
  },
};


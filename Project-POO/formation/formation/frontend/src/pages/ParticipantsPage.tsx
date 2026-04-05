import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Participant } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/participants");
      setParticipants(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ id: Date.now().toString(), title: "Erreur", description: "Impossible de charger les participants" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (participant: Participant) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) {
      try {
        await API.delete(`/participants/${participant.id}`);
        toast({ id: Date.now().toString(), title: "Succès", description: "Participant supprimé" });
        loadParticipants();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ id: Date.now().toString(), title: "Erreur", description: "Impossible de supprimer le participant" });
      }
    }
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "prenom", label: "Prénom" },
    { key: "email", label: "Email" },
    { key: "tel", label: "Téléphone" },
    {
      key: "structure",
      label: "Structure",
      render: (p: Participant) => <Badge variant="outline">{p.structure?.libelle || "—"}</Badge>,
    },
    {
      key: "profil",
      label: "Profil",
      render: (p: Participant) => <Badge variant="secondary">{p.profil?.libelle || "—"}</Badge>,
    },
  ];

  return (
    <DataTable<Participant>
      title="Participants"
      description="Gérer les participants aux formations"
      columns={columns}
      data={participants}
      searchPlaceholder="Rechercher un participant..."
      isLoading={isLoading}
      onAdd={() => toast({ id: Date.now().toString(), title: "Ajouter un participant", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ id: Date.now().toString(), title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default ParticipantsPage;


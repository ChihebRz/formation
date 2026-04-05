import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Utilisateur } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UtilisateursPage = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUtilisateurs();
  }, []);

  const loadUtilisateurs = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/utilisateurs");
      setUtilisateurs(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les utilisateurs" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (utilisateur: Utilisateur) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await API.delete(`/utilisateurs/${utilisateur.id}`);
        toast({ title: "Succès", description: "Utilisateur supprimé" });
        loadUtilisateurs();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer l'utilisateur" });
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "login", label: "Login" },
    {
      key: "role",
      label: "Rôle",
      render: (u: Utilisateur) => (
        <Badge variant="secondary">
          {u.role?.nom || "—"}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable<Utilisateur>
      title="Utilisateurs"
      description="Gérer les utilisateurs du système"
      columns={columns}
      data={utilisateurs}
      searchKey="login"
      searchPlaceholder="Rechercher un utilisateur..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter un utilisateur", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default UtilisateursPage;


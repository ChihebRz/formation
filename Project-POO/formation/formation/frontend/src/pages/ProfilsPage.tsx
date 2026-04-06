import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Profil } from "@/types";
import { useToast } from "@/hooks/use-toast";

const ProfilsPage = () => {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProfils();
  }, []);

  const loadProfils = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/profils");
      setProfils(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ id: "error-load", title: "Erreur", description: "Impossible de charger les profils", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (profil: Profil) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce profil ?")) {
      try {
        await API.delete(`/profils/${profil.id}`);
        toast({ id: "success-delete", title: "Succès", description: "Profil supprimé" });
        loadProfils();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ id: "error-delete", title: "Erreur", description: "Impossible de supprimer le profil", variant: "destructive" });
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "libelle", label: "Libellé" },
  ];

  return (
    <DataTable<Profil>
      title="Profils"
      description="Gérer les profils des participants"
      columns={columns}
      data={profils}
      searchKey="libelle"
      searchPlaceholder="Rechercher un profil..."
      isLoading={isLoading}
      onAdd={() => toast({ id: "add-profil", title: "Ajouter un profil", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ id: "edit-profil", title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default ProfilsPage;

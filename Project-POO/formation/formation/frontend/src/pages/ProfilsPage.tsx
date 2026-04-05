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
      toast({ title: "Erreur", description: "Impossible de charger les profils" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (profil: Profil) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce profil ?")) {
      try {
        await API.delete(`/profils/${profil.id}`);
        toast({ title: "Succès", description: "Profil supprimé" });
        loadProfils();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer le profil" });
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
      onAdd={() => toast({ title: "Ajouter un profil", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default ProfilsPage;


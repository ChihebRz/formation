import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Domaine } from "@/types";
import { useToast } from "@/hooks/use-toast";

const DomainesPage = () => {
  const [domaines, setDomaines] = useState<Domaine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDomaines();
  }, []);

  const loadDomaines = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/domaines");
      setDomaines(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les domaines" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (domaine: Domaine) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce domaine ?")) {
      try {
        await API.delete(`/domaines/${domaine.id}`);
        toast({ title: "Succès", description: "Domaine supprimé" });
        loadDomaines();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer le domaine" });
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "libelle", label: "Libellé" },
  ];

  return (
    <DataTable<Domaine>
      title="Domaines"
      description="Gérer les domaines de formation"
      columns={columns}
      data={domaines}
      searchKey="libelle"
      searchPlaceholder="Rechercher un domaine..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter un domaine", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default DomainesPage;


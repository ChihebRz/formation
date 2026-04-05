import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Structure } from "@/types";
import { useToast } from "@/hooks/use-toast";

const StructuresPage = () => {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStructures();
  }, []);

  const loadStructures = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/structures");
      setStructures(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les structures" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (structure: Structure) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette structure ?")) {
      try {
        await API.delete(`/structures/${structure.id}`);
        toast({ title: "Succès", description: "Structure supprimée" });
        loadStructures();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer la structure" });
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "libelle", label: "Libellé" },
  ];

  return (
    <DataTable<Structure>
      title="Structures"
      description="Gérer les structures organisationnelles"
      columns={columns}
      data={structures}
      searchKey="libelle"
      searchPlaceholder="Rechercher une structure..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter une structure", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default StructuresPage;


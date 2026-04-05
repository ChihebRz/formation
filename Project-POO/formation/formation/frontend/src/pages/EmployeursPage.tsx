import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Employeur } from "@/types";
import { useToast } from "@/hooks/use-toast";

const EmployeursPage = () => {
  const [employeurs, setEmployeurs] = useState<Employeur[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEmployeurs();
  }, []);

  const loadEmployeurs = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/employeurs");
      setEmployeurs(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les employeurs" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (employeur: Employeur) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employeur ?")) {
      try {
        await API.delete(`/employeurs/${employeur.id}`);
        toast({ title: "Succès", description: "Employeur supprimé" });
        loadEmployeurs();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer l'employeur" });
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "nomEmployeur", label: "Nom" },
  ];

  return (
    <DataTable<Employeur>
      title="Employeurs"
      description="Gérer les employeurs externes"
      columns={columns}
      data={employeurs}
      searchKey="nomEmployeur"
      searchPlaceholder="Rechercher un employeur..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter un employeur", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default EmployeursPage;


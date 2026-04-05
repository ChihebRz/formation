import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Formateur } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const FormateursPage = () => {
  const [formateurs, setFormateurs] = useState<Formateur[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFormateurs();
  }, []);

  const loadFormateurs = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/formateurs");
      setFormateurs(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les formateurs" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (formateur: Formateur) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce formateur ?")) {
      try {
        await API.delete(`/formateurs/${formateur.id}`);
        toast({ title: "Succès", description: "Formateur supprimé" });
        loadFormateurs();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer le formateur" });
      }
    }
  };

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "prenom", label: "Prénom" },
    { key: "email", label: "Email" },
    { key: "tel", label: "Téléphone" },
    {
      key: "type",
      label: "Type",
      render: (f: Formateur) => (
        <Badge variant={f.type === "interne" ? "secondary" : "outline"}>
          {f.type === "interne" ? "Interne" : "Externe"}
        </Badge>
      ),
    },
    {
      key: "employeur",
      label: "Employeur",
      render: (f: Formateur) => f.employeur?.nomEmployeur || "—",
    },
  ];

  return (
    <DataTable<Formateur>
      title="Formateurs"
      description="Gérer les formateurs"
      columns={columns}
      data={formateurs}
      searchPlaceholder="Rechercher un formateur..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter un formateur", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default FormateursPage;


import { useEffect, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import API from "@/services/api";
import { Formation, Domaine, Formateur } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const FormationsPage = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/formations");
      setFormations(res.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast({ title: "Erreur", description: "Impossible de charger les formations" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (formation: Formation) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        await API.delete(`/formations/${formation.id}`);
        toast({ title: "Succès", description: "Formation supprimée" });
        loadFormations();
      } catch (error) {
        console.error("Erreur:", error);
        toast({ title: "Erreur", description: "Impossible de supprimer la formation" });
      }
    }
  };

  const columns = [
    { key: "titre", label: "Titre" },
    {
      key: "domaine",
      label: "Domaine",
      render: (f: Formation) => (
        <Badge variant="secondary" className="font-normal">
          {f.domaine?.libelle || "—"}
        </Badge>
      ),
    },
    { key: "annee", label: "Année" },
    { key: "duree", label: "Durée (j)" },
    {
      key: "budget",
      label: "Budget",
      render: (f: Formation) => `${f.budget.toLocaleString()} DT`,
    },
    {
      key: "formateur",
      label: "Formateur",
      render: (f: Formation) =>
        f.formateur ? `${f.formateur.prenom} ${f.formateur.nom}` : "—",
    },
    {
      key: "participants",
      label: "Participants",
      render: (f: Formation) => <Badge variant="outline">{f.participants?.length ?? 0}</Badge>,
    },
  ];

  return (
    <DataTable<Formation>
      title="Formations"
      description="Gérer les formations organisées par le centre"
      columns={columns}
      data={formations}
      searchKey="titre"
      searchPlaceholder="Rechercher une formation..."
      isLoading={isLoading}
      onAdd={() => toast({ title: "Ajouter une formation", description: "Fonctionnalité à venir" })}
      onEdit={() => toast({ title: "Modifier", description: "Fonctionnalité à venir" })}
      onDelete={handleDelete}
    />
  );
};

export default FormationsPage;


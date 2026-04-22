import { useState, useEffect } from "react";
import API from "@/services/api";
import { Formation, Formateur, Participant, Planning } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { canAccessRole } from "@/lib/rbac";

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  events: Planning[];
}

const PlanningPageNew = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formateurs, setFormateurs] = useState<Formateur[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [selectedDateDebut, setSelectedDateDebut] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [selectedFormateur, setSelectedFormateur] = useState<string>("");
  const [selectedLieu, setSelectedLieu] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [conflictMessage, setConflictMessage] = useState<string>("");
  const [editingPlanning, setEditingPlanning] = useState<Planning | null>(null);
  const [formationParticipants, setFormationParticipants] = useState<Participant[]>([]);
  const { toast } = useToast();
  const { userRole } = useAuth();

  const canManagePlanning = canAccessRole(["responsable", "administrateur"], userRole);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    loadPlannings();
  }, [currentMonth]);

  useEffect(() => {
    if (selectedFormation) {
      loadFormationParticipants(selectedFormation.id);
      if (selectedFormation.lieu) {
        setSelectedLieu(selectedFormation.lieu);
      }
    } else {
      setFormationParticipants([]);
    }
  }, [selectedFormation]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      console.log("📦 Chargement des données...");

      const [formationsRes, formateursRes, participantsRes, planningsRes] = await Promise.allSettled([
        API.get("/formations"),
        API.get("/formateurs"),
        API.get("/participants"),
        API.get("/planning"),
      ]);

      if (formationsRes.status === "fulfilled") {
        setFormations(formationsRes.value.data || []);
        console.log("✅ Formations chargées:", formationsRes.value.data);
      } else {
        console.error("❌ Erreur formations:", formationsRes.reason);
        setFormations([]);
      }

      if (formateursRes.status === "fulfilled") {
        setFormateurs(formateursRes.value.data || []);
        console.log("✅ Formateurs chargés:", formateursRes.value.data);
      } else {
        console.error("❌ Erreur formateurs:", formateursRes.reason);
        setFormateurs([]);
      }

      if (participantsRes.status === "fulfilled") {
        setParticipants(participantsRes.value.data || []);
        console.log("✅ Participants chargés:", participantsRes.value.data);
      } else {
        console.error("❌ Erreur participants:", participantsRes.reason);
        setParticipants([]);
      }

      if (planningsRes.status === "fulfilled") {
        setPlannings(planningsRes.value.data || []);
        console.log("✅ Plannings chargés:", planningsRes.value.data);
      } else {
        console.warn("⚠️ Impossible de charger /planning au démarrage:", planningsRes.reason);
        setPlannings([]);
      }
    } catch (error: any) {
      console.error("❌ Erreur inattendue lors du chargement:", error);
      toast({
        id: Date.now().toString(),
        title: "Erreur",
        description: "Impossible de charger les données principales",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlannings = async () => {
    try {
      const res = await API.get("/planning");
      setPlannings(res.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des plannings:", error);
    }
  };

  const loadFormationParticipants = async (formationId: number) => {
    try {
      console.log("🔍 Chargement des participants pour la formation:", formationId);
      const res = await API.get(`/formations/${formationId}/participants`);
      console.log("✅ Participants chargés:", res.data);
      setFormationParticipants(res.data || []);
      const participantIds = (res.data || []).map((p: Participant) => p.id);
      setSelectedParticipants(participantIds);
    } catch (error: any) {
      console.error("❌ Erreur lors du chargement des participants:", error);
      setFormationParticipants([]);
      // Ne pas définir une erreur ici, juste continuer
    }
  };

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const daysInPrevMonth = prevLastDay.getDate();
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days: CalendarDay[] = [];

    for (let i = daysInPrevMonth - startDate + 1; i <= daysInPrevMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dateString = date.toISOString().split("T")[0];
      days.push({
        date: dateString,
        day: i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        events: [],
      });
    }

    const today = new Date().toISOString().split("T")[0];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split("T")[0];
      const events = plannings.filter(
        (p) => dateString >= p.dateDebut && dateString <= p.dateFin
      );

      days.push({
        date: dateString,
        day: i,
        isCurrentMonth: true,
        isToday: dateString === today,
        hasEvent: events.length > 0,
        events,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const dateString = date.toISOString().split("T")[0];
      days.push({
        date: dateString,
        day: i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        events: [],
      });
    }

    return days;
  };

  const getEndDate = (startDate: string, duration: number): string => {
    if (!startDate || duration <= 0) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + (duration - 1));
    return date.toISOString().split("T")[0];
  };

  const checkConflicts = async (): Promise<boolean> => {
    if (!selectedFormation || !selectedDateDebut || !selectedFormateur) {
      setConflictMessage("Veuillez remplir tous les champs requis");
      return false;
    }

    const dateFin = getEndDate(selectedDateDebut, selectedFormation.duree);

    const conflictingPlannings = plannings.filter((p) => {
      if (editingPlanning && p.id === editingPlanning.id) return false;

      if (p.formateurId === Number(selectedFormateur)) {
        if (!(dateFin < p.dateDebut || selectedDateDebut > p.dateFin)) {
          return true;
        }
      }

      if (p.lieu === selectedLieu) {
        if (!(dateFin < p.dateDebut || selectedDateDebut > p.dateFin)) {
          return true;
        }
      }

      if (selectedParticipants.some((pId) => p.participantIds?.includes(pId))) {
        if (!(dateFin < p.dateDebut || selectedDateDebut > p.dateFin)) {
          return true;
        }
      }

      return false;
    });

    if (conflictingPlannings.length > 0) {
      const conflicts = conflictingPlannings
        .map((p) => `${p.formationTitre} (${p.dateDebut} - ${p.dateFin})`)
        .join(", ");
      setConflictMessage(`⚠️ Conflits détectés: ${conflicts}`);
      return false;
    }

    setConflictMessage("");
    return true;
  };

  const handleSavePlanning = async () => {
    if (!selectedFormation || !selectedDateDebut || !selectedFormateur) {
      toast({
        id: Date.now().toString(),
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
      });
      return;
    }

    const hasConflicts = await checkConflicts();
    if (!hasConflicts) {
      return;
    }

    setIsSaving(true);
    try {
      const dateFin = getEndDate(selectedDateDebut, selectedFormation.duree);

      // Fallback: if no checkbox selection, use participants loaded for the selected formation.
      const participantIds = selectedParticipants.length > 0
        ? selectedParticipants
        : formationParticipants.map((p) => p.id);

      if (participantIds.length === 0) {
        toast({
          id: Date.now().toString(),
          title: "Aucun destinataire",
          description: "Selectionnez au moins un participant pour enregistrer le planning et envoyer les emails.",
        });
        return;
      }

      const planningData = {
        formationId: selectedFormation.id,
        dateDebut: selectedDateDebut,
        dateFin: dateFin,
        lieu: selectedLieu,
        formateurId: Number(selectedFormateur),
        participantIds,
        status: "PLANIFIE",
      };

      console.log("Payload planning envoye:", planningData);

      if (editingPlanning) {
        await API.put(`/planning/${editingPlanning.id}`, planningData);
        toast({
          id: Date.now().toString(),
          title: "Succès",
          description: "Planning mis à jour",
        });
      } else {
        await API.post("/planning", planningData);
        toast({
          id: Date.now().toString(),
          title: "Succès",
          description: "Planning créé",
        });
      }

      resetForm();
      loadPlannings();
      setIsModalOpen(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Erreur";
      toast({
        id: Date.now().toString(),
        title: "Erreur",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlanning = async (planningId: number) => {
    if (!confirm("Êtes-vous sûr ?")) return;

    try {
      await API.delete(`/planning/${planningId}`);
      toast({
        id: Date.now().toString(),
        title: "Succès",
        description: "Planning supprimé",
      });
      loadPlannings();
    } catch (error) {
      toast({
        id: Date.now().toString(),
        title: "Erreur",
        description: "Impossible de supprimer",
      });
    }
  };

  const handleEditPlanning = (planning: Planning) => {
    setEditingPlanning(planning);
    setSelectedFormation(
      formations.find((f) => f.id === planning.formationId) || null
    );
    setSelectedDateDebut(planning.dateDebut);
    setSelectedParticipants(planning.participantIds || []);
    setSelectedFormateur(String(planning.formateurId));
    setSelectedLieu(planning.lieu);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setSelectedFormation(null);
    setSelectedDateDebut("");
    setSelectedParticipants([]);
    setSelectedFormateur("");
    setSelectedLieu("");
    setConflictMessage("");
    setEditingPlanning(null);
    setFormationParticipants([]);
  };

  const calendarDays = getCalendarDays();
  const monthName = currentMonth.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const dateFin = selectedFormation ? getEndDate(selectedDateDebut, selectedFormation.duree) : "";

  if (isLoading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Planning des Formations</h1>

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{monthName}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                )
              }
            >
              ←
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                )
              }
            >
              →
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="text-center font-bold text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => (
            <div
              key={day.date}
              onClick={() => {
                if (canManagePlanning && day.isCurrentMonth) {
                  setSelectedDateDebut(day.date);
                }
              }}
              className={`min-h-24 p-2 rounded border cursor-pointer transition
                ${!day.isCurrentMonth ? "bg-gray-100" : ""}
                ${day.isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"}
                ${day.date === selectedDateDebut ? "bg-green-50 border-green-500" : ""}
                ${day.hasEvent ? "bg-yellow-50" : ""}
                hover:shadow-md`}
            >
              <div className="font-bold text-sm mb-1">{day.day}</div>
              <div className="space-y-1">
                {day.events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-blue-100 text-blue-800 p-1 rounded truncate cursor-pointer hover:bg-blue-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPlanning(event);
                    }}
                  >
                    {event.formationTitre}
                  </div>
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{day.events.length - 2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {canManagePlanning && (
        <Button
          onClick={() => {
            console.log("🔄 Ouverture du modal, rechargement des données...");
            resetForm();
            loadAllData(); // Recharger les données avant d'ouvrir
            setIsModalOpen(true);
          }}
          className="mb-8"
        >
          + Nouveau Planning
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingPlanning ? "Modifier" : "Créer"} Planning
            </h2>

            {/* Debug info */}
            <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-100 rounded">
              Formations: {formations.length} | Formateurs: {formateurs.length} | Participants: {participants.length}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Formation *</label>
                {formations.length === 0 ? (
                  <div className="p-2 border border-yellow-300 bg-yellow-50 rounded mb-2 text-sm">
                    ⚠️ Chargement des formations... (Essayez de fermer et réouvrir la fenêtre)
                  </div>
                ) : null}
                <select
                  value={selectedFormation?.id || ""}
                  onChange={(e) => {
                    console.log("🔄 Sélection de la formation:", e.target.value);
                    const f = formations.find((f) => f.id === Number(e.target.value));
                    setSelectedFormation(f || null);
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">
                    {formations.length === 0 ? "Chargement..." : "Sélectionner une formation"}
                  </option>
                  {formations.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.titre} ({f.duree}j)
                    </option>
                  ))}
                </select>
              </div>

              {selectedFormation && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm font-medium">
                    ℹ️ Durée: <strong>{selectedFormation.duree} jour(s)</strong>
                  </p>
                  {selectedDateDebut && dateFin && (
                    <p className="text-sm mt-1">
                      📅 <strong>{selectedDateDebut}</strong> à <strong>{dateFin}</strong>
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Date début *</label>
                <input
                  type="date"
                  value={selectedDateDebut}
                  onChange={(e) => setSelectedDateDebut(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Formateur *</label>
                {formateurs.length === 0 ? (
                  <div className="p-2 border border-yellow-300 bg-yellow-50 rounded mb-2 text-sm">
                    ⚠️ Chargement des formateurs... (Essayez de fermer et réouvrir la fenêtre)
                  </div>
                ) : null}
                <select
                  value={selectedFormateur}
                  onChange={(e) => {
                    console.log("🔄 Sélection du formateur:", e.target.value);
                    setSelectedFormateur(e.target.value);
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">
                    {formateurs.length === 0 ? "Chargement..." : "Sélectionner un formateur"}
                  </option>
                  {formateurs.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nom} {f.prenom} ({f.type || "interne"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lieu *</label>
                <input
                  type="text"
                  value={selectedLieu}
                  onChange={(e) => setSelectedLieu(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Participants * ({participants.length})
                </label>
                <div className="bg-green-50 border border-green-200 rounded p-3 max-h-48 overflow-y-auto">
                  {participants.length === 0 ? (
                    <p className="text-sm text-gray-600">Aucun participant disponible.</p>
                  ) : (
                    participants.map((p) => (
                      <label key={p.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={selectedParticipants.includes(p.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedParticipants((prev) => [...prev, p.id]);
                            } else {
                              setSelectedParticipants((prev) => prev.filter((id) => id !== p.id));
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {p.nom} {p.prenom}
                          {formationParticipants.some((fp) => fp.id === p.id) ? " (de la formation)" : ""}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {conflictMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {conflictMessage}
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={handleSavePlanning} disabled={isSaving || formations.length === 0 || formateurs.length === 0}>
                  {isSaving ? "..." : "Enregistrer"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Plannings</h3>
        <div className="grid gap-4">
          {plannings.length === 0 ? (
            <p className="text-gray-500">Aucun planning</p>
          ) : (
            plannings.map((planning) => (
              <Card key={planning.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{planning.formationTitre}</h4>
                    <p className="text-sm text-gray-600">
                      📅 {planning.dateDebut} → {planning.dateFin}
                    </p>
                    <p className="text-sm text-gray-600">👨‍🏫 {planning.formateurNom}</p>
                    <p className="text-sm text-gray-600">📍 {planning.lieu}</p>
                    <Badge className="mt-2">{planning.status}</Badge>
                  </div>
                  {canManagePlanning && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPlanning(planning)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeletePlanning(planning.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningPageNew;




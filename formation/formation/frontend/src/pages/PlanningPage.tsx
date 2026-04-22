import { useEffect, useMemo, useState } from "react";
import API from "@/services/api";
import { Formation, Participant, PlanningConflict, PlanningConflictResponse, PlanningEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { canAccessRole } from "@/lib/rbac";

const toMonthValue = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const addDays = (value: string, days: number) => {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  return formatDateKey(date);
};

const compareDateStrings = (a: string, b: string) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const PlanningPage = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [monthValue, setMonthValue] = useState(toMonthValue(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFormationId, setSelectedFormationId] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<string>("");
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<number[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isSavingPlanning, setIsSavingPlanning] = useState(false);
  const [conflicts, setConflicts] = useState<PlanningConflict[]>([]);
  const { toast } = useToast();
  const { userRole } = useAuth();

  const canManagePlanning = canAccessRole(["responsable", "administrateur"], userRole);

  const notify = (title: string, description: string) =>
    toast({ id: Date.now().toString(), title, description });

  const selectedFormation = useMemo(
    () => formations.find((f) => String(f.id) === selectedFormationId) ?? null,
    [formations, selectedFormationId]
  );

  const selectedEndDate = useMemo(() => {
    if (!selectedStartDate || !selectedFormation?.duree) return "";
    return addDays(selectedStartDate, Math.max(0, selectedFormation.duree - 1));
  }, [selectedStartDate, selectedFormation]);

  const selectedRangeDates = useMemo(() => {
    if (!selectedStartDate || !selectedEndDate) return new Set<string>();
    const dates = new Set<string>();
    for (let d = new Date(`${selectedStartDate}T00:00:00`); compareDateStrings(formatDateKey(d), selectedEndDate) <= 0; d.setDate(d.getDate() + 1)) {
      dates.add(formatDateKey(d));
    }
    return dates;
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    loadBaseData();
  }, []);

  useEffect(() => {
    loadPlanning();
  }, [monthValue]);

  useEffect(() => {
    if (!selectedFormationId) {
      setSelectedParticipantIds([]);
      setSelectedStartDate("");
      return;
    }
    loadAssignedParticipants(Number(selectedFormationId));
  }, [selectedFormationId]);

  useEffect(() => {
    if (!selectedFormation) {
      setSelectedStartDate("");
      return;
    }
    setSelectedStartDate(selectedFormation.dateFormation ?? "");
  }, [selectedFormation]);

  const loadBaseData = async () => {
    setIsLoading(true);
    try {
      const [formationsRes, participantsRes] = await Promise.all([API.get("/formations"), API.get("/participants")]);
      setFormations(formationsRes.data || []);
      setParticipants(participantsRes.data || []);
    } catch {
      notify("Erreur", "Impossible de charger les données de planification");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlanning = async () => {
    const [year, month] = monthValue.split("-").map(Number);
    const firstDay = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDay = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    try {
      const planningRes = await API.get("/formations/planning", {
        params: { from: firstDay, to: endDay },
      });
      setEvents(planningRes.data || []);
    } catch {
      notify("Erreur", "Impossible de charger le planning");
    }
  };

  const loadAssignedParticipants = async (formationId: number) => {
    try {
      const res = await API.get(`/formations/${formationId}/participants`);
      const ids = ((res.data || []) as Participant[]).map((p) => p.id);
      setSelectedParticipantIds(ids);
      setConflicts([]);
    } catch {
      notify("Erreur", "Impossible de charger les participants affectés");
    }
  };

  const handleParticipantToggle = (participantId: number) => {
    setSelectedParticipantIds((prev) =>
      prev.includes(participantId) ? prev.filter((id) => id !== participantId) : [...prev, participantId]
    );
  };

  const handleSelectDate = (date: string | null) => {
    if (!canManagePlanning || !selectedFormationId || !date) return;
    setSelectedStartDate(date);
    setConflicts([]);
  };

  const handleSavePlanning = async () => {
    if (!selectedFormation) {
      notify("Information", "Sélectionnez d'abord une formation");
      return;
    }
    if (!selectedStartDate) {
      notify("Information", "Cliquez d'abord sur une date de départ dans le calendrier");
      return;
    }

    setIsSavingPlanning(true);
    setConflicts([]);
    try {
      const payload = {
        id: selectedFormation.id,
        titre: selectedFormation.titre,
        nom: selectedFormation.nom,
        description: selectedFormation.description,
        annee: selectedFormation.annee,
        duree: selectedFormation.duree,
        budget: selectedFormation.budget,
        dateFormation: selectedStartDate,
        lieu: selectedFormation.lieu ?? null,
        domaine: selectedFormation.domaine ? { id: selectedFormation.domaine.id } : null,
        formateur: selectedFormation.formateur ? { id: selectedFormation.formateur.id } : null,
      };

      await API.put(`/formations/${selectedFormation.id}`, payload);
      notify("Succès", "Planning enregistré");
      await loadBaseData();
      await loadPlanning();
    } catch (error: unknown) {
      const apiError = error as { response?: { status?: number; data?: PlanningConflictResponse } };
      if (apiError.response?.status === 409 && apiError.response.data?.conflicts) {
        setConflicts(apiError.response.data.conflicts);
        notify("Conflit détecté", "Le planning ne peut pas être enregistré");
      } else {
        notify("Erreur", "Impossible d'enregistrer le planning");
      }
    } finally {
      setIsSavingPlanning(false);
    }
  };

  const handleAssignParticipants = async () => {
    if (!selectedFormationId) {
      notify("Information", "Sélectionnez d'abord une formation");
      return;
    }

    setIsAssigning(true);
    setConflicts([]);
    try {
      await API.put(`/formations/${selectedFormationId}/participants`, {
        participantIds: selectedParticipantIds,
      });
      notify("Succès", "Affectation des participants mise à jour");
      loadPlanning();
    } catch (error: unknown) {
      const apiError = error as { response?: { status?: number; data?: PlanningConflictResponse } };
      if (apiError.response?.status === 409 && apiError.response.data?.conflicts) {
        setConflicts(apiError.response.data.conflicts);
        notify("Conflit détecté", "Affectation refusée à cause d'un conflit de planning");
      } else {
        notify("Erreur", "Impossible de mettre à jour l'affectation");
      }
    } finally {
      setIsAssigning(false);
    }
  };

  const monthDays = useMemo(() => {
    const [year, month] = monthValue.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstWeekDay = new Date(year, month - 1, 1).getDay();
    const normalizedFirst = firstWeekDay === 0 ? 7 : firstWeekDay;

    const cells: Array<{ date: string | null; label: string }> = [];
    for (let i = 1; i < normalizedFirst; i += 1) {
      cells.push({ date: null, label: "" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push({ date, label: String(day) });
    }

    return cells;
  }, [monthValue]);

  const eventByDay = useMemo(() => {
    const map = new Map<string, PlanningEvent[]>();
    events.forEach((event) => {
      const start = new Date(`${event.startDate}T00:00:00`);
      const end = new Date(`${event.endDate}T00:00:00`);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const arr = map.get(key) ?? [];
        arr.push(event);
        map.set(key, arr);
      }
    });
    return map;
  }, [events]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="page-header">Planning des formations</h1>
          <p className="text-sm text-muted-foreground">Calendrier mensuel + gestion des affectations participants</p>
        </div>
        <input
          type="month"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={monthValue}
          onChange={(e) => setMonthValue(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 stat-card space-y-3">
          <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-muted-foreground">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <div key={d} className="text-center py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day, idx) => (
              <button
                key={`${day.date ?? "empty"}-${idx}`}
                type="button"
                onClick={() => handleSelectDate(day.date)}
                className={`min-h-28 border rounded-lg p-2 text-left transition-colors bg-background ${
                  day.date && selectedRangeDates.has(day.date)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40 hover:bg-muted/30"
                } ${day.date && selectedStartDate === day.date ? "ring-2 ring-primary ring-offset-1" : ""}`}
                disabled={!day.date || !canManagePlanning}
              >
                <div className="text-xs font-semibold mb-1">{day.label}</div>
                <div className="space-y-1">
                  {(day.date ? eventByDay.get(day.date) ?? [] : []).slice(0, 3).map((event) => (
                    <div key={`${event.id}-${day.date}`} className="rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                      {event.titre}
                    </div>
                  ))}
                  {(day.date ? eventByDay.get(day.date)?.length ?? 0 : 0) > 3 && (
                    <div className="text-[11px] text-muted-foreground">+
                      {(eventByDay.get(day.date as string)?.length ?? 0) - 3} autres
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="stat-card space-y-4">
          <h3 className="font-semibold">Affectation participants</h3>
          {!canManagePlanning ? (
            <p className="text-sm text-muted-foreground">Lecture seule pour votre rôle.</p>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Formation</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedFormationId}
                  onChange={(e) => setSelectedFormationId(e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  {formations.map((formation) => (
                    <option key={formation.id} value={formation.id}>
                      #{formation.id} - {formation.titre}
                    </option>
                  ))}
                </select>
              </div>

              {selectedFormation ? (
                <div className="rounded-md border border-border p-3 bg-muted/20 text-sm space-y-1">
                  <p><span className="font-medium">Date:</span> {selectedFormation.dateFormation ? formatDate(selectedFormation.dateFormation) : "—"}</p>
                  <p><span className="font-medium">Durée:</span> {selectedFormation.duree} jour(s)</p>
                  <p><span className="font-medium">Lieu:</span> {selectedFormation.lieu || "—"}</p>
                </div>
              ) : null}

              {selectedFormation && canManagePlanning ? (
                <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm space-y-2">
                  <p className="font-medium text-primary">Planification active</p>
                  <p>Jour cliqué: {selectedStartDate ? formatDate(selectedStartDate) : "Aucun"}</p>
                  <p>
                    Fin prévue: {selectedEndDate ? formatDate(selectedEndDate) : "—"}
                  </p>
                  <p>
                    Période: {selectedStartDate ? formatDate(selectedStartDate) : "—"} → {selectedEndDate ? formatDate(selectedEndDate) : "—"}
                  </p>
                  <Button onClick={handleSavePlanning} disabled={isSavingPlanning || !selectedStartDate} className="w-full">
                    {isSavingPlanning ? "Enregistrement..." : "Enregistrer le planning"}
                  </Button>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-medium">Participants</label>
                <div className="max-h-64 overflow-y-auto rounded-md border border-border p-2 space-y-1">
                  {participants.map((participant) => {
                    const checked = selectedParticipantIds.includes(participant.id);
                    return (
                      <label key={participant.id} className="flex items-center gap-2 text-sm py-1 px-1 rounded hover:bg-muted/40">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleParticipantToggle(participant.id)}
                        />
                        <span>#{participant.id} - {participant.prenom} {participant.nom}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Button onClick={handleAssignParticipants} disabled={isAssigning || !selectedFormationId}>
                {isAssigning ? "Enregistrement..." : "Enregistrer l'affectation"}
              </Button>
            </>
          )}
        </div>
      </div>

      {conflicts.length > 0 && (
        <div className="stat-card border border-destructive/40 bg-destructive/5">
          <h3 className="font-semibold text-destructive mb-3">Conflits détectés</h3>
          <div className="space-y-2">
            {conflicts.map((conflict, index) => (
              <div key={`${conflict.type}-${conflict.formationId}-${conflict.participantId}-${index}`} className="rounded-md border border-destructive/30 bg-background p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-destructive/40 text-destructive">
                    {conflict.type}
                  </Badge>
                  {conflict.formationId ? <span className="text-sm">Formation #{conflict.formationId}</span> : null}
                </div>
                <p className="text-sm">{conflict.details}</p>
                {conflict.participantNom ? (
                  <p className="text-xs text-muted-foreground mt-1">Participant concerné: {conflict.participantNom}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="stat-card">
        <h3 className="font-semibold mb-2">Liste des sessions du mois</h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement...</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune session planifiée sur ce mois.</p>
        ) : (
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="rounded-md border border-border p-3 bg-muted/20">
                <p className="font-medium">#{event.id} - {event.titre}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.startDate)} - {formatDate(event.endDate)} | {event.lieu || "Sans lieu"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Formateur: {event.formateurNom || "Non affecté"} | Participants: {event.participantsCount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningPage;





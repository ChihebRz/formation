import { useEffect, useState } from "react";
import { GraduationCap, Users, UserCheck, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import StatCard from "@/components/shared/StatCard";
import API from "@/services/api";
import { Formation, Formateur, Participant } from "@/types";

const Dashboard = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formateurs, setFormateurs] = useState<Formateur[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("📡 Dashboard - Chargement des données...");
        const token = localStorage.getItem("token");
        console.log("🔑 Token du localStorage:", token ? "✅ YES" : "❌ NO");
        console.log("📊 Appel API /formations...");
        const formationsRes = await API.get("/formations");
        console.log("✅ Formations reçues:", formationsRes.data.length);
        
        const [formateursRes, participantsRes] = await Promise.all([
          API.get("/formateurs"),
          API.get("/participants"),
        ]);
        
        setFormations(formationsRes.data || []);
        setFormateurs(formateursRes.data || []);
        setParticipants(participantsRes.data || []);
        console.log("✅ Toutes les données chargées avec succès!");
      } catch (error: any) {
        console.error("❌ Erreur détaillée:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const totalBudget = formations.reduce((sum, f) => sum + f.budget, 0);
  
  const formationsParAnnee = [
    { annee: "2024", count: 0 },
    { annee: "2025", count: formations.filter((f) => f.annee === 2025).length },
    { annee: "2026", count: formations.filter((f) => f.annee === 2026).length },
  ];

  const domainesSet = new Set(formations.map(f => f.domaine?.id));
  const formationsParDomaine = Array.from(domainesSet).map((domaineId) => {
    const formation = formations.find(f => f.domaine?.id === domaineId);
    return {
      name: formation?.domaine?.libelle || "Sans domaine",
      count: formations.filter((f) => f.domaine?.id === domaineId).length,
      budget: formations.filter((f) => f.domaine?.id === domaineId).reduce((s, f) => s + f.budget, 0),
    };
  }).filter((d) => d.count > 0);

  const COLORS = [
    "hsl(168, 80%, 36%)",
    "hsl(210, 90%, 55%)",
    "hsl(142, 72%, 40%)",
    "hsl(38, 92%, 50%)",
    "hsl(280, 65%, 55%)",
    "hsl(0, 72%, 51%)",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-header">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Vue d'ensemble des activités de formation — Excellent Training
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Formations" value={formations.length} icon={GraduationCap} color="primary" trend="+2 cette année" trendUp />
        <StatCard title="Participants" value={participants.length} icon={Users} color="info" trend="+12% vs 2024" trendUp />
        <StatCard title="Formateurs" value={formateurs.length} icon={UserCheck} color="success" />
        <StatCard title="Budget Total" value={`${(totalBudget / 1000).toFixed(1)}k DT`} icon={DollarSign} color="warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Formations par année</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={formationsParAnnee}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="annee" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(214, 20%, 90%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="count" name="Formations" fill="hsl(168, 80%, 36%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Répartition par domaine</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={formationsParDomaine}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="count"
                nameKey="name"
              >
                {formationsParDomaine.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





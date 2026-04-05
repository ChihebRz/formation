import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ConnectionAlert } from "@/components/shared/ConnectionAlert";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import FormationsPage from "@/pages/FormationsPage";
import FormateursPage from "@/pages/FormateursPage";
import ParticipantsPage from "@/pages/ParticipantsPage";
import DomainesPage from "@/pages/DomainesPage";
import StructuresPage from "@/pages/StructuresPage";
import ProfilsPage from "@/pages/ProfilsPage";
import EmployeursPage from "@/pages/EmployeursPage";
import UtilisateursPage from "@/pages/UtilisateursPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {isAuthenticated ? (
        <>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formations" element={<FormationsPage />} />
            <Route path="/formateurs" element={<FormateursPage />} />
            <Route path="/participants" element={<ParticipantsPage />} />
            <Route path="/domaines" element={<DomainesPage />} />
            <Route path="/structures" element={<StructuresPage />} />
            <Route path="/profils" element={<ProfilsPage />} />
            <Route path="/employeurs" element={<EmployeursPage />} />
            <Route path="/utilisateurs" element={<UtilisateursPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConnectionAlert />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;










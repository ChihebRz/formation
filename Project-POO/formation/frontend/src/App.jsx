import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Formations from './pages/Formations';
import Participants from './pages/Participants';
import Formateurs from './pages/Formateurs';
import Domaines from './pages/Domaines';
import Profils from './pages/Profils';
import Structures from './pages/Structures';
import Employeurs from './pages/Employeurs';
import Utilisateurs from './pages/Utilisateurs';
import Statistiques from './pages/Statistiques';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/formations"
            element={
              <PrivateRoute>
                <Formations />
              </PrivateRoute>
            }
          />
          <Route
            path="/participants"
            element={
              <PrivateRoute>
                <Participants />
              </PrivateRoute>
            }
          />
          <Route
            path="/formateurs"
            element={
              <PrivateRoute>
                <Formateurs />
              </PrivateRoute>
            }
          />
          <Route
            path="/employeurs"
            element={
              <PrivateRoute>
                <Employeurs />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistiques"
            element={
              <PrivateRoute roles={['responsable', 'administrateur']}>
                <Statistiques />
              </PrivateRoute>
            }
          />
          <Route
            path="/domaines"
            element={
              <PrivateRoute roles={['administrateur']}>
                <Domaines />
              </PrivateRoute>
            }
          />
          <Route
            path="/profils"
            element={
              <PrivateRoute roles={['administrateur']}>
                <Profils />
              </PrivateRoute>
            }
          />
          <Route
            path="/structures"
            element={
              <PrivateRoute roles={['administrateur']}>
                <Structures />
              </PrivateRoute>
            }
          />
          <Route
            path="/utilisateurs"
            element={
              <PrivateRoute roles={['administrateur']}>
                <Utilisateurs />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


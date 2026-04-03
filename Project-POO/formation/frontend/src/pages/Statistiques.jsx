import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Statistiques() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await API.get('/statistiques');
      setStats(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <h1>Statistiques</h1>
          {loading ? (
            <p>Chargement des statistiques...</p>
          ) : (
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Formations</h3>
                <p className="stat-value">{stats.totalFormations || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Participants</h3>
                <p className="stat-value">{stats.totalParticipants || 0}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Statistiques;


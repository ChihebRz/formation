import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <h1>Bienvenue au Dashboard</h1>
          <div className="welcome-message">
            <p>Veuillez sélectionner une option dans la barre latérale pour commencer.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


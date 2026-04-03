import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-link">
          📊 Dashboard
        </Link>
        <Link to="/formations" className="nav-link">
          📚 Formations
        </Link>
        <Link to="/participants" className="nav-link">
          👥 Participants
        </Link>
        <Link to="/formateurs" className="nav-link">
          👨‍🏫 Formateurs
        </Link>
        <Link to="/employeurs" className="nav-link">
          🏢 Employeurs
        </Link>
        
        {user?.role === 'administrateur' && (
          <>
            <hr />
            <span className="sidebar-title">Administration</span>
            <Link to="/domaines" className="nav-link">
              📂 Domaines
            </Link>
            <Link to="/profils" className="nav-link">
              🎯 Profils
            </Link>
            <Link to="/structures" className="nav-link">
              🏛️ Structures
            </Link>
            <Link to="/utilisateurs" className="nav-link">
              🔐 Utilisateurs
            </Link>
          </>
        )}

        {(user?.role === 'administrateur' || user?.role === 'responsable') && (
          <>
            <hr />
            <Link to="/statistiques" className="nav-link">
              📈 Statistiques
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;


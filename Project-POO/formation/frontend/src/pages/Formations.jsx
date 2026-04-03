import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Formations() {
  const [formations, setFormations] = useState([]);
  const [form, setForm] = useState({
    titre: '',
    annee: new Date().getFullYear(),
    duree: '',
    budget: ''
  });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loadFormations = async () => {
    try {
      const res = await API.get('/formations');
      setFormations(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des formations:', err);
    }
  };

  useEffect(() => {
    loadFormations();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.titre.trim()) e.titre = 'Titre obligatoire';
    if (!form.annee || form.annee < 2000) e.annee = 'Année invalide';
    if (!form.duree || form.duree < 1) e.duree = 'Durée minimale: 1 jour';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (editId) {
        await API.put(`/formations/${editId}`, form);
      } else {
        await API.post('/formations', form);
      }
      setForm({ titre: '', annee: new Date().getFullYear(), duree: '', budget: '' });
      setEditId(null);
      loadFormations();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (f) => {
    setForm({ titre: f.titre, annee: f.annee, duree: f.duree, budget: f.budget });
    setEditId(f.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation?')) {
      try {
        await API.delete(`/formations/${id}`);
        loadFormations();
      } catch (err) {
        console.error('Erreur:', err);
      }
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <h1>Gestion des Formations</h1>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  placeholder="Titre de la formation"
                />
                {errors.titre && <span className="error">{errors.titre}</span>}
              </div>

              <div className="form-group">
                <label>Année</label>
                <input
                  type="number"
                  value={form.annee}
                  onChange={(e) => setForm({ ...form, annee: parseInt(e.target.value) })}
                />
                {errors.annee && <span className="error">{errors.annee}</span>}
              </div>

              <div className="form-group">
                <label>Durée (jours)</label>
                <input
                  type="number"
                  value={form.duree}
                  onChange={(e) => setForm({ ...form, duree: parseInt(e.target.value) })}
                />
                {errors.duree && <span className="error">{errors.duree}</span>}
              </div>

              <div className="form-group">
                <label>Budget</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {editId ? 'Modifier' : 'Ajouter'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({ titre: '', annee: new Date().getFullYear(), duree: '', budget: '' });
                    }}
                    className="cancel-btn"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Année</th>
                  <th>Durée (jours)</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formations.map((f) => (
                  <tr key={f.id}>
                    <td>{f.titre}</td>
                    <td>{f.annee}</td>
                    <td>{f.duree}</td>
                    <td>{f.budget ? f.budget.toFixed(2) : '-'}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(f)} className="edit-btn">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(f.id)} className="delete-btn">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Formations;


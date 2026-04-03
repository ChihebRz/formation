import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Employeurs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nomEmployeur: '' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await API.get('/employeurs');
      setItems(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.nomEmployeur.trim()) e.nomEmployeur = 'Nom obligatoire';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/employeurs/${editId}`, form);
      } else {
        await API.post('/employeurs', form);
      }
      setForm({ nomEmployeur: '' });
      setEditId(null);
      loadItems();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ nomEmployeur: item.nomEmployeur });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await API.delete(`/employeurs/${id}`);
        loadItems();
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
          <h1>Gestion des Employeurs</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom de l'employeur</label>
                <input value={form.nomEmployeur} onChange={(e) => setForm({ ...form, nomEmployeur: e.target.value })} placeholder="Nom de l'employeur" />
                {errors.nomEmployeur && <span className="error">{errors.nomEmployeur}</span>}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>{editId ? 'Modifier' : 'Ajouter'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nomEmployeur: '' }); }} className="cancel-btn">Annuler</button>}
              </div>
            </form>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Nom</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}><td>{item.nomEmployeur}</td><td className="actions"><button onClick={() => handleEdit(item)} className="edit-btn">✏️</button><button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Employeurs;


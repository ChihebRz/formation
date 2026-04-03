import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Structures() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ libelle: '' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await API.get('/structures');
      setItems(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.libelle.trim()) e.libelle = 'Libellé obligatoire';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/structures/${editId}`, form);
      } else {
        await API.post('/structures', form);
      }
      setForm({ libelle: '' });
      setEditId(null);
      loadItems();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ libelle: item.libelle });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await API.delete(`/structures/${id}`);
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
          <h1>Gestion des Structures</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Libellé</label>
                <input value={form.libelle} onChange={(e) => setForm({ ...form, libelle: e.target.value })} placeholder="Libellé de la structure" />
                {errors.libelle && <span className="error">{errors.libelle}</span>}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>{editId ? 'Modifier' : 'Ajouter'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ libelle: '' }); }} className="cancel-btn">Annuler</button>}
              </div>
            </form>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Libellé</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}><td>{item.libelle}</td><td className="actions"><button onClick={() => handleEdit(item)} className="edit-btn">✏️</button><button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Structures;


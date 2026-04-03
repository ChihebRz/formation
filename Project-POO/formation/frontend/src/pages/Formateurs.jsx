import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Formateurs() {
  const [formateurs, setFormateurs] = useState([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', tel: '', type: 'interne' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFormateurs();
  }, []);

  const loadFormateurs = async () => {
    try {
      const res = await API.get('/formateurs');
      setFormateurs(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Nom obligatoire';
    if (!form.prenom.trim()) e.prenom = 'Prénom obligatoire';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/formateurs/${editId}`, form);
      } else {
        await API.post('/formateurs', form);
      }
      setForm({ nom: '', prenom: '', email: '', tel: '', type: 'interne' });
      setEditId(null);
      loadFormateurs();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (f) => {
    setForm({ nom: f.nom, prenom: f.prenom, email: f.email, tel: f.tel, type: f.type });
    setEditId(f.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await API.delete(`/formateurs/${id}`);
        loadFormateurs();
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
          <h1>Gestion des Formateurs</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom" />
                {errors.nom && <span className="error">{errors.nom}</span>}
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Téléphone" />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="interne">Interne</option>
                  <option value="externe">Externe</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>{editId ? 'Modifier' : 'Ajouter'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nom: '', prenom: '', email: '', tel: '', type: 'interne' }); }} className="cancel-btn">Annuler</button>}
              </div>
            </form>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Nom</th><th>Prénom</th><th>Email</th><th>Téléphone</th><th>Type</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {formateurs.map((f) => (
                  <tr key={f.id}><td>{f.nom}</td><td>{f.prenom}</td><td>{f.email || '-'}</td><td>{f.tel || '-'}</td><td>{f.type}</td><td className="actions"><button onClick={() => handleEdit(f)} className="edit-btn">✏️</button><button onClick={() => handleDelete(f.id)} className="delete-btn">🗑️</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Formateurs;


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', tel: '' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loadParticipants = async () => {
    try {
      const res = await API.get('/participants');
      setParticipants(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Nom obligatoire';
    if (!form.prenom.trim()) e.prenom = 'Prénom obligatoire';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Email invalide';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (editId) {
        await API.put(`/participants/${editId}`, form);
      } else {
        await API.post('/participants', form);
      }
      setForm({ nom: '', prenom: '', email: '', tel: '' });
      setEditId(null);
      loadParticipants();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setForm({ nom: p.nom, prenom: p.prenom, email: p.email, tel: p.tel });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await API.delete(`/participants/${id}`);
        loadParticipants();
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
          <h1>Gestion des Participants</h1>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  placeholder="Nom du participant"
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
              </div>

              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  placeholder="Prénom du participant"
                />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={form.tel}
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                  placeholder="Téléphone"
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {editId ? 'Modifier' : 'Ajouter'}
                </button>
                {editId && (
                  <button type="button" onClick={() => { setEditId(null); setForm({ nom: '', prenom: '', email: '', tel: '' }); }} className="cancel-btn">
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
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nom}</td>
                    <td>{p.prenom}</td>
                    <td>{p.email || '-'}</td>
                    <td>{p.tel || '-'}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(p)} className="edit-btn">✏️</button>
                      <button onClick={() => handleDelete(p.id)} className="delete-btn">🗑️</button>
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

export default Participants;


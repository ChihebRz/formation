import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import './CrudPages.css';

function Utilisateurs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ login: '', password: '' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await API.get('/utilisateurs');
      setItems(res.data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.login.trim()) e.login = 'Login obligatoire';
    if (!form.password.trim()) e.password = 'Mot de passe obligatoire';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/utilisateurs/${editId}`, form);
      } else {
        await API.post('/utilisateurs', form);
      }
      setForm({ login: '', password: '' });
      setEditId(null);
      loadItems();
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ login: item.login, password: '' });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await API.delete(`/utilisateurs/${id}`);
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
          <h1>Gestion des Utilisateurs</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Login</label>
                <input value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} placeholder="Login" />
                {errors.login && <span className="error">{errors.login}</span>}
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mot de passe" />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>{editId ? 'Modifier' : 'Ajouter'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ login: '', password: '' }); }} className="cancel-btn">Annuler</button>}
              </div>
            </form>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Login</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}><td>{item.login}</td><td className="actions"><button onClick={() => handleEdit(item)} className="edit-btn">✏️</button><button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Utilisateurs;


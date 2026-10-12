import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const API = 'http://127.0.0.1:8000/api';

const FORMULES = {
  essai: 'Essai gratuit',
  1: '1 mois',
  3: '3 mois',
  6: '6 mois',
  12: '12 mois',
};

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [demandes, setDemandes] = useState([]);
  const [chargement, setChargement] = useState(false);

  // كي يكون عندنا token نجيبو الطلبات
  useEffect(() => {
    if (!token) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChargement(true);
    fetch(`${API}/demandes`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('admin_token');
          setToken(null);
          throw new Error('Session expirée, reconnectez-vous.');
        }
        if (!res.ok) throw new Error('Erreur serveur.');
        return res.json();
      })
      .then(setDemandes)
      .catch((e) => setErreur(e.message))
      .finally(() => setChargement(false));
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message || 'Connexion impossible.');
        return;
      }

      localStorage.setItem('admin_token', data.token);
      setPassword('');
      setToken(data.token);
    } catch {
      setErreur('Serveur injoignable.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/logout`, {
        method: 'POST',
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
    } catch {
      // نخرجو كيما كان الحال
    }
    localStorage.removeItem('admin_token');
    setToken(null);
    setDemandes([]);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('fr-FR', {
      timeZone: 'Africa/Algiers',
      dateStyle: 'short',
      timeStyle: 'short',
    });

  // 1) صفحة الدخول
  if (!token) {
    return (
      <div className="admin">
        <form className="login" onSubmit={handleLogin}>
          <h1>Espace admin</h1>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="btn btn-red">Se connecter</button>
          {erreur && <p className="admin-erreur">{erreur}</p>}
        </form>
      </div>
    );
  }

  // 2) لوحة الطلبات
  return (
    <div className="admin">
      <div className="admin-box">
        <div className="admin-top">
          <div>
            <h1>Demandes reçues</h1>
            <p className="admin-count">{demandes.length} demande(s)</p>
          </div>
          <div className="admin-actions">
            <Link to="/" className="btn btn-outline">Voir le site</Link>
            <button type="button" className="btn btn-red" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>

        {erreur && <p className="admin-erreur">{erreur}</p>}
        {chargement && <p className="admin-count">Chargement...</p>}

        {!chargement && demandes.length === 0 ? (
          <p className="admin-count">Aucune demande pour le moment.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Téléphone</th>
                  <th>Formule</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((d) => (
                  <tr key={d.id}>
                    <td>{formatDate(d.created_at)}</td>
                    <td>{d.nom}</td>
                    <td>{d.telephone}</td>
                    <td>{FORMULES[d.formule] ?? d.formule}</td>
                    <td>{d.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
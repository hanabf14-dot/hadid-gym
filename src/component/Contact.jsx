import { useState } from 'react';
import './Contact.css';

const API_URL = 'http://127.0.0.1:8000/api/demandes';
const vide = { nom: '', telephone: '', formule: 'essai', message: '' };

export default function Contact() {
  const [form, setForm] = useState(vide);
  const [erreur, setErreur] = useState('');
  const [envoye, setEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom.trim() || !form.telephone.trim()) {
      setErreur('Indiquez votre nom et votre numéro de téléphone.');
      setEnvoye(false);
      return;
    }

    setErreur('');
    setEnvoye(false);
    setChargement(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      // 422 = خطأ في البيانات (validation تاع Laravel)
      if (res.status === 422) {
        const data = await res.json();
        setErreur(Object.values(data.errors)[0][0]);
        return;
      }

      if (!res.ok) throw new Error('Erreur serveur');

      setEnvoye(true);
      setForm(vide);
    } catch {
      setErreur('Impossible d’envoyer la demande. Réessayez plus tard.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section-inner contact-grid">
        <div className="contact-infos">
          <p className="section-tag">Venir nous voir</p>
          <h2>Contact</h2>

          <dl>
            <dt>Adresse</dt>
            <dd>12 rue de la Liberté, centre-ville (à remplacer)</dd>

            <dt>Téléphone</dt>
            <dd>0550 00 00 00</dd>

            <dt>Horaires</dt>
            <dd>Samedi – Jeudi : 06h00 – 22h30</dd>
            <dd>Vendredi : 14h00 – 20h00</dd>
            <dd>Espace femmes : 09h00 – 12h00 (Sam – Jeu)</dd>
          </dl>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label>
            Nom complet
            <input name="nom" value={form.nom} onChange={handleChange} />
          </label>

          <label>
            Téléphone
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="05 50 00 00 00"
            />
          </label>

          <label>
            Je suis intéressé(e) par
            <select name="formule" value={form.formule} onChange={handleChange}>
              <option value="essai">Une séance d’essai gratuite</option>
              <option value="1">Abonnement 1 mois</option>
              <option value="3">Abonnement 3 mois</option>
              <option value="6">Abonnement 6 mois</option>
              <option value="12">Abonnement 12 mois</option>
            </select>
          </label>

          <label>
            Message (facultatif)
            <textarea name="message" value={form.message} onChange={handleChange} />
          </label>

          <button type="submit" className="btn btn-red" disabled={chargement}>
            {chargement ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>

          {erreur && <p className="msg erreur">{erreur}</p>}
          {envoye && <p className="msg ok">Merci ! Nous vous rappelons très vite.</p>}
        </form>
      </div>
    </section>
  );
}
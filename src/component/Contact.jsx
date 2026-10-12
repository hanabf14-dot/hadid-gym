import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import './Contact.css';

const API_URL = 'http://127.0.0.1:8000/api/demandes';
const vide = { nom: '', telephone: '', formule: 'essai', message: '' };
const formules = ['essai', '1', '3', '6', '12'];

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [form, setForm] = useState(vide);
  const [erreur, setErreur] = useState(''); // مفتاح الرسالة ولا نص جاي من Laravel
  const [envoye, setEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom.trim() || !form.telephone.trim()) {
      setErreur('errChamps');
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

      if (res.status === 422) {
        const data = await res.json();
        setErreur(Object.values(data.errors)[0][0]);
        return;
      }

      if (!res.ok) throw new Error('Erreur serveur');

      setEnvoye(true);
      setForm(vide);
    } catch {
      setErreur('errReseau');
    } finally {
      setChargement(false);
    }
  };

  // إذا الخطأ مفتاح عندنا نترجموه، وإذا جاي من Laravel نعرضوه كيما هو
  const texteErreur = c[erreur] ?? erreur;

  return (
    <section className="contact" id="contact">
      <div className="section-inner contact-grid">
        <div className="contact-infos">
          <p className="section-tag">{c.tag}</p>
          <h2>{c.titre}</h2>

          <dl>
            <dt>{c.adresse}</dt>
            <dd>{c.adresseVal}</dd>

            <dt>{c.telephone}</dt>
            <dd>0550 00 00 00</dd>

            <dt>{c.horaires}</dt>
            <dd>{c.h1}</dd>
            <dd>{c.h2}</dd>
            <dd>{c.h3}</dd>
          </dl>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label>
            {c.nom}
            <input name="nom" value={form.nom} onChange={handleChange} />
          </label>

          <label>
            {c.tel}
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="05 50 00 00 00"
            />
          </label>

          <label>
            {c.interet}
            <select name="formule" value={form.formule} onChange={handleChange}>
              {formules.map((f) => (
                <option key={f} value={f}>
                  {c.options[f]}
                </option>
              ))}
            </select>
          </label>

          <label>
            {c.message}
            <textarea name="message" value={form.message} onChange={handleChange} />
          </label>

          <button type="submit" className="btn btn-red" disabled={chargement}>
            {chargement ? c.envoi : c.envoyer}
          </button>

          {texteErreur && <p className="msg erreur">{texteErreur}</p>}
          {envoye && <p className="msg ok">{c.merci}</p>}
        </form>
      </div>
    </section>
  );
}
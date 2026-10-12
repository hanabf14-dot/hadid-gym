import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import './Planning.css';

const ids = ['sam', 'dim', 'lun', 'mar', 'mer', 'jeu', 'ven'];

// cours: m=Musculation, c=CrossTraining, b=Boxe, y=Yoga, z=Zumba, s=Stretching
// coach: Y=Yacine, S=Samira, W=Walid
const cours = {
  sam: [
    { heure: '07:00', cours: 'm', coach: 'Y', femmes: false },
    { heure: '09:30', cours: 'y', coach: 'S', femmes: true },
    { heure: '18:00', cours: 'b', coach: 'W', femmes: false },
    { heure: '19:30', cours: 'c', coach: 'Y', femmes: false },
  ],
  dim: [
    { heure: '07:00', cours: 'c', coach: 'Y', femmes: false },
    { heure: '10:00', cours: 'z', coach: 'S', femmes: true },
    { heure: '17:30', cours: 's', coach: 'S', femmes: false },
    { heure: '19:00', cours: 'm', coach: 'Y', femmes: false },
  ],
  lun: [
    { heure: '07:00', cours: 'b', coach: 'W', femmes: false },
    { heure: '09:30', cours: 'z', coach: 'S', femmes: true },
    { heure: '18:30', cours: 'm', coach: 'Y', femmes: false },
    { heure: '20:00', cours: 'c', coach: 'Y', femmes: false },
  ],
  mar: [
    { heure: '07:00', cours: 'm', coach: 'Y', femmes: false },
    { heure: '10:00', cours: 'y', coach: 'S', femmes: true },
    { heure: '18:00', cours: 'c', coach: 'Y', femmes: false },
    { heure: '19:30', cours: 'b', coach: 'W', femmes: false },
  ],
  mer: [
    { heure: '07:00', cours: 'c', coach: 'Y', femmes: false },
    { heure: '09:30', cours: 'z', coach: 'S', femmes: true },
    { heure: '17:30', cours: 's', coach: 'S', femmes: false },
    { heure: '19:00', cours: 'b', coach: 'W', femmes: false },
  ],
  jeu: [
    { heure: '07:00', cours: 'm', coach: 'Y', femmes: false },
    { heure: '10:00', cours: 'y', coach: 'S', femmes: true },
    { heure: '18:00', cours: 'b', coach: 'W', femmes: false },
    { heure: '19:30', cours: 'm', coach: 'Y', femmes: false },
  ],
  ven: [],
};

export default function Planning() {
  const { t } = useLang();
  const p = t.planning;
  const [jour, setJour] = useState('sam');
  const liste = cours[jour];

  return (
    <section className="planning" id="planning">
      <div className="section-inner">
        <p className="section-tag">{p.tag}</p>
        <h2>{p.titre}</h2>

        <div className="jours">
          {ids.map((id) => (
            <button
              key={id}
              className={`jour ${jour === id ? 'actif' : ''}`}
              onClick={() => setJour(id)}
            >
              {p.jours[id]}
            </button>
          ))}
        </div>

        {liste.length === 0 ? (
          <p className="vide">{p.vendredi}</p>
        ) : (
          <ul className="liste-cours">
            {liste.map((c) => (
              <li key={c.heure}>
                <span className="heure">{c.heure}</span>
                <div>
                  <span className="nom">{p.cours[c.cours]}</span>
                  <span className="coach">
                    {p.avec} {p.coachs[c.coach]}
                  </span>
                </div>
                <span className={`badge ${c.femmes ? 'femmes' : ''}`}>
                  {c.femmes ? p.femmes : p.mixte}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
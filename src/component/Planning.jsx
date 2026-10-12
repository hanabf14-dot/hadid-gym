import { useState } from 'react';
import './Planning.css';

const jours = [
  { id: 'sam', label: 'Samedi' },
  { id: 'dim', label: 'Dimanche' },
  { id: 'lun', label: 'Lundi' },
  { id: 'mar', label: 'Mardi' },
  { id: 'mer', label: 'Mercredi' },
  { id: 'jeu', label: 'Jeudi' },
  { id: 'ven', label: 'Vendredi' },
];

const cours = {
  sam: [
    { heure: '07:00', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
    { heure: '09:30', nom: 'Yoga', coach: 'Samira', femmes: true },
    { heure: '18:00', nom: 'Boxe', coach: 'Walid', femmes: false },
    { heure: '19:30', nom: 'CrossTraining', coach: 'Yacine', femmes: false },
  ],
  dim: [
    { heure: '07:00', nom: 'CrossTraining', coach: 'Yacine', femmes: false },
    { heure: '10:00', nom: 'Zumba', coach: 'Samira', femmes: true },
    { heure: '17:30', nom: 'Stretching', coach: 'Samira', femmes: false },
    { heure: '19:00', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
  ],
  lun: [
    { heure: '07:00', nom: 'Boxe', coach: 'Walid', femmes: false },
    { heure: '09:30', nom: 'Zumba', coach: 'Samira', femmes: true },
    { heure: '18:30', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
    { heure: '20:00', nom: 'CrossTraining', coach: 'Yacine', femmes: false },
  ],
  mar: [
    { heure: '07:00', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
    { heure: '10:00', nom: 'Yoga', coach: 'Samira', femmes: true },
    { heure: '18:00', nom: 'CrossTraining', coach: 'Yacine', femmes: false },
    { heure: '19:30', nom: 'Boxe', coach: 'Walid', femmes: false },
  ],
  mer: [
    { heure: '07:00', nom: 'CrossTraining', coach: 'Yacine', femmes: false },
    { heure: '09:30', nom: 'Zumba', coach: 'Samira', femmes: true },
    { heure: '17:30', nom: 'Stretching', coach: 'Samira', femmes: false },
    { heure: '19:00', nom: 'Boxe', coach: 'Walid', femmes: false },
  ],
  jeu: [
    { heure: '07:00', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
    { heure: '10:00', nom: 'Yoga', coach: 'Samira', femmes: true },
    { heure: '18:00', nom: 'Boxe', coach: 'Walid', femmes: false },
    { heure: '19:30', nom: 'Musculation guidée', coach: 'Yacine', femmes: false },
  ],
  ven: [],
};

export default function Planning() {
  const [jour, setJour] = useState('sam');
  const liste = cours[jour];

  return (
    <section className="planning" id="planning">
      <div className="section-inner">
        <p className="section-tag">Cours collectifs</p>
        <h2>Planning de la semaine</h2>

        <div className="jours">
          {jours.map((j) => (
            <button
              key={j.id}
              className={`jour ${jour === j.id ? 'actif' : ''}`}
              onClick={() => setJour(j.id)}
            >
              {j.label}
            </button>
          ))}
        </div>

        {liste.length === 0 ? (
          <p className="vide">
            Vendredi : salle ouverte de 14h à 20h, sans cours collectifs.
          </p>
        ) : (
          <ul className="liste-cours">
            {liste.map((c) => (
              <li key={c.heure}>
                <span className="heure">{c.heure}</span>
                <div>
                  <span className="nom">{c.nom}</span>
                  <span className="coach">avec {c.coach}</span>
                </div>
                <span className={`badge ${c.femmes ? 'femmes' : ''}`}>
                  {c.femmes ? 'Femmes' : 'Mixte'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
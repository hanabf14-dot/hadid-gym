import './Coachs.css';

const coachs = [
  { id: 1, nom: 'Yacine B.', specialite: 'Musculation · CrossTraining', initiales: 'YB' },
  { id: 2, nom: 'Samira K.', specialite: 'Yoga · Zumba · Stretching', initiales: 'SK' },
  { id: 3, nom: 'Walid M.', specialite: 'Boxe · Préparation physique', initiales: 'WM' },
];

export default function Coachs() {
  return (
    <section className="coachs" id="coachs">
      <div className="section-inner">
        <p className="section-tag">L’équipe</p>
        <h2>Vos coachs</h2>

        <div className="coachs-grid">
          {coachs.map((c) => (
            <article key={c.id} className="coach-card">
              <div className="avatar">{c.initiales}</div>
              <div>
                <h3>{c.nom}</h3>
                <p>{c.specialite}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
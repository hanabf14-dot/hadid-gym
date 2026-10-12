import { useLang } from '../i18n/LanguageContext';
import './Coachs.css';

export default function Coachs() {
  const { t } = useLang();
  const c = t.coachs;

  return (
    <section className="coachs" id="coachs">
      <div className="section-inner">
        <p className="section-tag">{c.tag}</p>
        <h2>{c.titre}</h2>

        <div className="coachs-grid">
          {c.liste.map((coach) => (
            <article key={coach.nom} className="coach-card">
              <div className="avatar">{coach.initiales}</div>
              <div>
                <h3>{coach.nom}</h3>
                <p>{coach.specialite}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
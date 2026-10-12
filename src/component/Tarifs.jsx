import { useLang } from '../i18n/LanguageContext';
import './Tarifs.css';

// نفس ترتيب plans في translations.js
const prix = [3000, 8000, 14000, 24000];
const populaire = 2; // الفهرس 2 = الصيغة الثالثة (6 أشهر)

export default function Tarifs() {
  const { t } = useLang();
  const tr = t.tarifs;

  return (
    <section className="tarifs" id="tarifs">
      <div className="section-inner">
        <p className="section-tag">{tr.tag}</p>
        <h2>{tr.titre}</h2>
        <p className="tarifs-intro">{tr.intro}</p>

        <div className="plans">
          {tr.plans.map((p, i) => (
            <article
              key={p.nom}
              className={`plan ${i === populaire ? 'populaire' : ''}`}
            >
              {i === populaire && <span className="flag">{tr.populaire}</span>}

              <h3>{p.nom}</h3>

              <p className="prix">
                {prix[i].toLocaleString('fr-FR')} <small>{tr.devise}</small>
              </p>

              <ul>
                {p.avantages.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn ${i === populaire ? 'btn-red' : 'btn-outline'}`}
              >
                {tr.choisir}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
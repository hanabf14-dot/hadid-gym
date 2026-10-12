import './Tarifs.css';

const plans = [
  {
    id: 1,
    nom: '1 mois',
    prix: 3000,
    avantages: [
      'Accès à toute la salle',
      'Vestiaires et douches',
      'Bilan de départ avec un coach',
    ],
  },
  {
    id: 2,
    nom: '3 mois',
    prix: 8000,
    avantages: [
      'Tout du forfait 1 mois',
      'Programme personnalisé',
      'Suivi des charges toutes les 4 semaines',
    ],
  },
  {
    id: 3,
    nom: '6 mois',
    prix: 14000,
    populaire: true,
    avantages: [
      'Tout du forfait 3 mois',
      'Tous les cours collectifs',
      'Pesée et mesures chaque mois',
    ],
  },
  {
    id: 4,
    nom: '12 mois',
    prix: 24000,
    avantages: [
      'Tout du forfait 6 mois',
      '2 séances de coaching individuel',
      'Casier et serviette à l’année',
    ],
  },
];

export default function Tarifs() {
  return (
    <section className="tarifs" id="tarifs">
      <div className="section-inner">
        <p className="section-tag">Abonnements</p>
        <h2>Choisissez votre formule</h2>
        <p className="tarifs-intro">
          Plus la durée est longue, plus le prix par mois baisse.
          Paiement directement à la salle.
        </p>

        <div className="plans">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`plan ${p.populaire ? 'populaire' : ''}`}
            >
              {p.populaire && <span className="flag">Le plus choisi</span>}

              <h3>{p.nom}</h3>

              <p className="prix">
                {p.prix.toLocaleString('fr-FR')} <small>DA</small>
              </p>

              <ul>
                {p.avantages.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn ${p.populaire ? 'btn-red' : 'btn-outline'}`}
              >
                Choisir
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
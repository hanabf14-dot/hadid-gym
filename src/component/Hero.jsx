import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="hero-tag">Salle de sport · Musculation &amp; Fitness</p>

        <h1>
          Du fer.<br />
          De la <span>sueur</span>.<br />
          Chaque jour.
        </h1>

        <p className="hero-text">
          Matériel neuf, coachs sur place et un espace réservé aux femmes.
          Venez essayer, la première séance est offerte.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="btn btn-red">Réserver mon essai</a>
          <a href="#tarifs" className="btn btn-outline">Voir les tarifs</a>
        </div>

        <ul className="hero-infos">
          <li>
            <strong>06h – 22h30</strong>
            <span>Samedi au jeudi</span>
          </li>
          <li>
            <strong>Espace femmes</strong>
            <span>Créneaux réservés</span>
          </li>
          <li>
            <strong>1ère séance</strong>
            <span>Offerte</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
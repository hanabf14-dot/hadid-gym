import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, toggleLang } = useLang();

  const links = [
    { href: '#planning', label: t.nav.planning },
    { href: '#tarifs', label: t.nav.tarifs },
    { href: '#coachs', label: t.nav.coachs },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="header">
      <a className="logo" href="#top">
        HADID <span>GYM</span>
      </a>

      <button
        className="burger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}

        <button type="button" className="lang-btn" onClick={toggleLang}>
          {t.nav.lang}
        </button>

        <a className="btn-cta" href="#contact" onClick={() => setOpen(false)}>
          {t.nav.cta}
        </a>
      </nav>
    </header>
  );
}
import { useState } from 'react';
import './Header.css';

const links = [
  { href: '#planning', label: 'Planning' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#coachs', label: 'Coachs' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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
        <a className="btn-cta" href="#contact" onClick={() => setOpen(false)}>
          Essai gratuit
        </a>
      </nav>
    </header>
  );
}
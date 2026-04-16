import { useState } from "react";

export default function TopNav({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="top-nav" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="Sumona Pal home">
        <span className="brand-small">DIETITIAN</span>
        <span className="brand-main">Sumona Pal</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="nav-toggle-bars" aria-hidden="true" />
      </button>

      <nav className={`nav-menu${isOpen ? " is-open" : ""}`} aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item}
            className={`nav-link${item === "Home" ? " is-active" : ""}`}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <a className="call-btn" href="#book-call">
        <span aria-hidden="true">📞</span> Book a call
      </a>
    </header>
  );
}


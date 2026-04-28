import { useEffect, useState } from "react";

export default function TopNav({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`top-nav${isScrolled ? " is-scrolled" : ""}`} aria-label="Main navigation">
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
        <span className="call-btn-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.06 21 3 13.94 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>Book a call</span>
      </a>
    </header>
  );
}


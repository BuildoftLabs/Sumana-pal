import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navPathMap = {
  Home: "/",
  Services: "/services",
  Testimonial: "/testimonials",
  Offers: "/offers",
  "About me": "/about",
  Blogs: "/faqs",
  Contact: "/contact"
};

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
      <Link className="brand" to="/" aria-label="Sumona Pal home">
        <span className="brand-small">DIETITIAN</span>
        <span className="brand-main">Sumona Pal</span>
      </Link>

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
          <Link
            key={item}
            className={`nav-link${item === "Home" ? " is-active" : ""}`}
            to={navPathMap[item] ?? "/"}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}

        <div className="nav-social" aria-label="Social links">
          <a className="nav-social-link" href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path
                d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.5A3.25 3.25 0 0 0 4.5 7.75v8.5a3.25 3.25 0 0 0 3.25 3.25h8.5a3.25 3.25 0 0 0 3.25-3.25v-8.5a3.25 3.25 0 0 0-3.25-3.25h-8.5ZM17.5 6.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a className="nav-social-link" href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path
                d="M20.52 3.48A11.88 11.88 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.1.55 4.15 1.58 5.96L0 24l6.2-1.58A11.94 11.94 0 0 0 12 24h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.21-3.49-8.52ZM12.01 21.9h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.68.94.98-3.58-.23-.37a9.84 9.84 0 0 1-1.5-5.3c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.47a8.9 8.9 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.09 4.48.7.3 1.25.48 1.68.61.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a className="nav-social-link" href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path
                d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.4v8h3.1Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </nav>

      <Link className="call-btn" to="/contact">
        <span className="call-btn-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.06 21 3 13.94 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>Book a call</span>
      </Link>
    </header>
  );
}


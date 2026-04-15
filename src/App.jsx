function App() {
  const navItems = ["Home", "Services", "Testimonial", "Offers", "About me", "Blogs", "Contact"];

  return (
    <main>
      <header className="top-nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Sumona Pal home">
          <span className="brand-small">DIETITIAN</span>
          <span className="brand-main">Sumona Pal</span>
        </a>

        <nav className="nav-menu" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item}
              className={`nav-link${item === "Home" ? " is-active" : ""}`}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <a className="call-btn" href="#book-call">
          <span aria-hidden="true">📞</span> Book a call
        </a>
      </header>

      <section className="hero" aria-label="Introduction section">
        <img
          className="hero-image"
          src="/hero-image.png"
          alt="Dietitian Sumana Pal Roy sitting at her office desk"
          loading="eager"
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-eyebrow">SUMANA PAL ROY</p>
          <h1 className="hero-title">Dietitian</h1>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#know-more">
              Know More <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-outline" href="#contact">
              Contact Sumona <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <button className="slider-arrow slider-arrow-left" aria-label="Previous slide">
          &#8249;
        </button>
        <button className="slider-arrow slider-arrow-right" aria-label="Next slide">
          &#8250;
        </button>
      </section>
    </main>
  );
}

export default App;

export default function Hero() {
  return (
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
  );
}


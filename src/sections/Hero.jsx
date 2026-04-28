import { useEffect, useState } from "react";

const heroTitles = ["Dietitian", "Nutritionist", "Diet Expert", "Nutritional Therapist"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleIndex((currentIndex) => (currentIndex + 1) % heroTitles.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

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
        <h1 className="hero-title" aria-live="polite">
          <span key={heroTitles[titleIndex]} className="hero-title-text">
            {heroTitles[titleIndex]}
          </span>
        </h1>

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


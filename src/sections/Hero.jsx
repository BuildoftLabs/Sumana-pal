import { useEffect, useState } from "react";

const heroTitles = ["Dietitian", "Nutritionist", "Diet Expert", "Nutritional Therapist"];
const heroBanners = [
  {
    imageUrl: "/hero-image.png",
    imageAlt: "Dietitian Sumana Pal Roy sitting at her office desk"
  },
  {
    imageUrl: "/hero-banner-2.png",
    imageAlt: "Sumana Pal Roy standing beside a nutrition conference banner"
  }
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleIndex((currentIndex) => (currentIndex + 1) % heroTitles.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBannerIndex((currentIndex) => (currentIndex + 1) % heroBanners.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const moveBanner = (direction) => {
    setBannerIndex((currentIndex) => {
      if (direction === "prev") {
        return currentIndex <= 0 ? heroBanners.length - 1 : currentIndex - 1;
      }

      return (currentIndex + 1) % heroBanners.length;
    });
  };

  return (
    <section className="hero" aria-label="Introduction section">
      <img
        className="hero-image"
        src={heroBanners[bannerIndex].imageUrl}
        alt={heroBanners[bannerIndex].imageAlt}
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

      <button
        className="slider-arrow slider-arrow-left"
        type="button"
        aria-label="Previous banner"
        onClick={() => moveBanner("prev")}
      >
        &#8249;
      </button>
      <button
        className="slider-arrow slider-arrow-right"
        type="button"
        aria-label="Next banner"
        onClick={() => moveBanner("next")}
      >
        &#8250;
      </button>
    </section>
  );
}


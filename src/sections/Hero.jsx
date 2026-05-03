import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const heroTitles = ["Dietitian", "Nutritionist", "Diet Expert", "Nutritional Therapist"];

// Only ONE local fallback — the main hero image
const defaultHeroBanners = [
  {
    imageUrl: "/hero-image.png",
    imageAlt: "Dietitian Sumana Pal Roy sitting at her office desk"
  }
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [heroBanners, setHeroBanners] = useState(defaultHeroBanners);

  useEffect(() => {
    async function loadHero() {
      try {
        const snap = await getDoc(doc(db, "sections", "hero"));
        if (snap.exists()) {
          const data = snap.data();
          const banners = [];

          // Support multiple images array OR single heroImage field
          if (Array.isArray(data.heroImages) && data.heroImages.length > 0) {
            data.heroImages.forEach((url, i) => {
              banners.push({ imageUrl: url, imageAlt: `Dietitian Sumana Pal Roy - slide ${i + 1}` });
            });
          } else if (data.heroImage) {
            banners.push({ imageUrl: data.heroImage, imageAlt: "Dietitian Sumana Pal Roy" });
          }

          if (banners.length > 0) {
            setHeroBanners(banners);
          }
          // else: keep the local fallback (defaultHeroBanners)
        }
      } catch (err) {
        console.error("Failed to fetch hero", err);
      }
    }
    loadHero();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleIndex((currentIndex) => (currentIndex + 1) % heroTitles.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

  // Only auto-slide if there are multiple banners
  useEffect(() => {
    if (heroBanners.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setBannerIndex((currentIndex) => (currentIndex + 1) % heroBanners.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroBanners]);

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

      {/* Only show arrows if there are multiple banners */}
      {heroBanners.length > 1 && (
        <>
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
        </>
      )}
    </section>
  );
}

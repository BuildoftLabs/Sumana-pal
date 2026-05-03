import { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useInView } from "../hooks/useInView";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1.35;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

// Map Firestore category names → service page slugs
const SLUG_MAP = {
  "PCOD/PCOS": "pcod-treatment",
  "PCOD": "pcod-treatment",
  "PCOS": "pcod-treatment",
  "Weight Loss": "weight-loss",
  "Thyroid": "thyroid-management",
  "Diabetes": "diabetes-management",
};

function getCategorySlug(category) {
  if (!category) return null;
  if (SLUG_MAP[category]) return SLUG_MAP[category];
  // Fallback: lowercase + hyphenate
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default function Services({ data }) {
  const [cards, setCards] = useState(data.cards);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const dragStartXRef = useRef(null);
  const autoSlideResumeTimeoutRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressIsDraggingRef = useRef(false);
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    async function loadCards() {
      try {
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const fetchedCards = snap.docs.map((doc) => {
          const item = doc.data();
          const slug = getCategorySlug(item.category);
          return {
            title: item.category || "Uncategorised",
            description: item.description,
            imageAlt: item.category || "Service image",
            imageUrl: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
            badge: null,
            primaryCta: { label: "Get This", href: `#get-${(item.category || "").toLowerCase().replace(/\s+/g, '-')}` },
            secondaryCta: { label: "Know More", href: slug ? `/services/${slug}` : "#services" }
          };
        });
        if (fetchedCards.length > 0) setCards(fetchedCards);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    }
    loadCards();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(Math.ceil(cards.length - visibleCount), 0);
  const totalSteps = maxIndex + 1;
  const progressWidth = maxIndex <= 0 ? 100 : (currentIndex / maxIndex) * 100;

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0 || !isAutoSliding || !isInView) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [isAutoSliding, maxIndex, isInView]);

  useEffect(() => {
    return () => {
      if (autoSlideResumeTimeoutRef.current) {
        window.clearTimeout(autoSlideResumeTimeoutRef.current);
      }
    };
  }, []);

  const pauseAutoSlide = () => {
    setIsAutoSliding(false);

    if (autoSlideResumeTimeoutRef.current) {
      window.clearTimeout(autoSlideResumeTimeoutRef.current);
    }

    autoSlideResumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoSliding(true);
    }, 6000);
  };

  const moveCarousel = (direction) => {
    if (maxIndex === 0) return;

    pauseAutoSlide();
    setCurrentIndex((previousIndex) => {
      if (direction === "prev") {
        return previousIndex <= 0 ? maxIndex : previousIndex - 1;
      }

      return previousIndex >= maxIndex ? 0 : previousIndex + 1;
    });
  };

  const clampIndex = (idx) => Math.max(0, Math.min(maxIndex, idx));

  const setIndexFromClientX = (clientX) => {
    const track = progressTrackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = rect.width <= 0 ? 0 : Math.max(0, Math.min(1, x / rect.width));
    const nextIndex = clampIndex(Math.round(ratio * maxIndex));

    pauseAutoSlide();
    setCurrentIndex(nextIndex);
  };

  const handleProgressPointerDown = (event) => {
    if (maxIndex === 0) return;
    progressIsDraggingRef.current = true;
    setIndexFromClientX(event.clientX);
  };

  const handleProgressPointerMove = (event) => {
    if (!progressIsDraggingRef.current) return;
    setIndexFromClientX(event.clientX);
  };

  const handleProgressPointerUp = () => {
    progressIsDraggingRef.current = false;
  };

  useEffect(() => {
    const handleWindowPointerMove = (event) => {
      if (!progressIsDraggingRef.current) return;
      setIndexFromClientX(event.clientX);
    };

    const handleWindowPointerUp = () => {
      progressIsDraggingRef.current = false;
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
  }, [maxIndex]);

  const handlePointerDown = (event) => {
    dragStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (dragStartXRef.current === null) return;

    const dragDistance = event.clientX - dragStartXRef.current;
    dragStartXRef.current = null;

    if (Math.abs(dragDistance) < 50) return;

    moveCarousel(dragDistance > 0 ? "prev" : "next");
  };

  const handlePointerLeave = () => {
    dragStartXRef.current = null;
  };

  const carouselStyle = useMemo(
    () => ({
      "--services-visible-count": visibleCount,
      "--services-current-index": currentIndex
    }),
    [visibleCount, currentIndex]
  );

  return (
    <section className="services" id="services" aria-label="Services" ref={sectionRef}>
      <div className="services-inner">
        <p className="services-badge">{data.badge}</p>

        <h2 className="services-title">
          {data.titlePrefix} <span className="services-title-accent">{data.titleAccent}</span>
        </h2>

        <p className="services-desc">{data.description}</p>

        <div className="services-carousel" style={carouselStyle}>
          <div
            className="services-track"
            role="list"
            aria-label="Service programs"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {cards.map((card, index) => (
              <article className="service-card" role="listitem" key={card.title + index}>
                <div className="service-media">
                  <img className="service-img" src={card.imageUrl} alt={card.imageAlt} loading="lazy" />
                  {card.badge ? <span className="service-pill">{card.badge}</span> : null}
                </div>

                <div className="service-body">
                  <h3 className="service-title">{card.title}</h3>
                  <p className="service-text">{card.description}</p>

                  <div className="service-actions">
                    <a className="service-btn service-btn-primary" href={card.primaryCta.href}>
                      {card.primaryCta.label}
                    </a>
                    <Link className="service-btn service-btn-outline" to={card.secondaryCta.href}>
                      {card.secondaryCta.label} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="services-progress"
          ref={progressTrackRef}
          role="slider"
          tabIndex={0}
          aria-label="Services carousel scrubber"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          aria-disabled={maxIndex === 0}
          onPointerDown={handleProgressPointerDown}
          onPointerMove={handleProgressPointerMove}
          onPointerUp={handleProgressPointerUp}
          onPointerCancel={handleProgressPointerUp}
          onKeyDown={(e) => {
            if (maxIndex === 0) return;
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              pauseAutoSlide();
              setCurrentIndex((v) => clampIndex(v - 1));
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              pauseAutoSlide();
              setCurrentIndex((v) => clampIndex(v + 1));
            }
          }}
        >
          <span
            className="services-progress-fill"
            style={{ width: `${progressWidth}%` }}
          />
          <span className="services-progress-thumb" aria-hidden="true" style={{ left: `${progressWidth}%` }} />
        </div>
      </div>
    </section>
  );
}


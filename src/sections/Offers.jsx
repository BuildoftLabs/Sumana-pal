import { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useInView } from "../hooks/useInView";
import { buildWhatsAppHref } from "../components/WhatsAppFab";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1.35;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

export default function Offers({ data }) {
  const stripLoopItems = [...data.stripItems, ...data.stripItems];
  const [cards, setCards] = useState(data.cards);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const dragStartXRef = useRef(null);
  const autoSlideResumeTimeoutRef = useRef(null);
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadOffers() {
      try {
        const q = query(collection(db, "offers"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const fetchedCards = snap.docs.map(doc => {
          const item = doc.data();
          if (!item.isActive) return null;
          return {
            title: item.headline,
            subtitle: item.description,
            imageAlt: item.headline,
            imageUrl: item.image || "/offer-card.png",
            badge: item.badge || null,
            primaryCta: { label: "Grab This Offer", href: buildWhatsAppHref(`Hi! I want to avail this offer: ${item.badge ? item.badge + ' - ' : ''}${item.headline}`) },
            secondaryCta: { label: "Know More", href: `/offers/${doc.id}` }
          };
        }).filter(Boolean);
        if (fetchedCards.length > 0) setCards(fetchedCards);
      } catch (err) {
        console.error("Failed to fetch offers", err);
      }
    }
    loadOffers();
  }, []);

  const maxIndex = Math.max(Math.ceil(cards.length - visibleCount), 0);

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0 || !isAutoSliding || !isInView) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, 3200);

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
      if (direction === "prev") return previousIndex <= 0 ? maxIndex : previousIndex - 1;
      return previousIndex >= maxIndex ? 0 : previousIndex + 1;
    });
  };

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
      "--offers-visible-count": visibleCount,
      "--offers-current-index": currentIndex
    }),
    [visibleCount, currentIndex]
  );

  return (
    <section className="offers" id="offers" aria-label="Limited time offers" ref={sectionRef}>
      <div className="offers-strip" aria-label="Offer highlights">
        <div className="offers-strip-inner">
          <div className="offers-strip-track">
            {stripLoopItems.map((item, idx) => (
              <span className="offers-strip-item" key={`${item}-${idx}`}>
                <span className="offers-diamond" aria-hidden="true">
                  ◆
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="offers-inner">
        <p className="offers-badge">{data.badge}</p>
        <h2 className="offers-title">
          {data.titlePrefix} <span className="offers-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="offers-desc">{data.description}</p>

        <div className="offers-carousel" style={carouselStyle}>
          <div className="offers-carousel-controls" aria-label="Offers carousel controls">
            <button
              className="offers-carousel-btn"
              type="button"
              onClick={() => moveCarousel("prev")}
              aria-label="Previous offers"
            >
              &#8249;
            </button>
            <button
              className="offers-carousel-btn"
              type="button"
              onClick={() => moveCarousel("next")}
              aria-label="Next offers"
            >
              &#8250;
            </button>
          </div>

          <div
            className="offers-track"
            role="list"
            aria-label="Special deal cards"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {cards.map((card, idx) => (
              <article className="offer-card" role="listitem" key={`${card.title}-${idx}`}>
                <div className="offer-media">
                  <img className="offer-img" src={card.imageUrl} alt={card.imageAlt} loading="lazy" />
                </div>

                <div className="offer-body">
                  <h3 className="offer-title">{card.title}</h3>
                  <p className="offer-sub">{card.subtitle}</p>

                  <div className="offer-actions">
                    <a className="offer-btn offer-btn-primary" href={card.primaryCta.href} target="_blank" rel="noreferrer">
                      {card.primaryCta.label}
                    </a>
                    <a className="offer-btn offer-btn-outline" href={card.secondaryCta.href}>
                      {card.secondaryCta.label} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


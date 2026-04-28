import { useEffect, useMemo, useRef, useState } from "react";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

export default function Services({ data }) {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const dragStartXRef = useRef(null);
  const autoSlideResumeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(data.cards.length - visibleCount, 0);
  const totalSteps = maxIndex + 1;
  const progressWidth = totalSteps <= 1 ? 100 : ((currentIndex + 1) / totalSteps) * 100;

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0 || !isAutoSliding) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [isAutoSliding, maxIndex]);

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
    <section className="services" id="services" aria-label="Services">
      <div className="services-inner">
        <p className="services-badge">{data.badge}</p>

        <h2 className="services-title">
          {data.titlePrefix} <span className="services-title-accent">{data.titleAccent}</span>
        </h2>

        <p className="services-desc">{data.description}</p>

        <div className="services-carousel" style={carouselStyle}>
          <div className="services-carousel-controls" aria-label="Services carousel controls">
            <button
              className="services-carousel-btn"
              type="button"
              onClick={() => moveCarousel("prev")}
              aria-label="Previous services"
            >
              &#8249;
            </button>
            <button
              className="services-carousel-btn"
              type="button"
              onClick={() => moveCarousel("next")}
              aria-label="Next services"
            >
              &#8250;
            </button>
          </div>

          <div
            className="services-track"
            role="list"
            aria-label="Service programs"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {data.cards.map((card) => (
              <article className="service-card" role="listitem" key={card.title}>
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
                    <a className="service-btn service-btn-outline" href={card.secondaryCta.href}>
                      {card.secondaryCta.label} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="services-progress"
          role="progressbar"
          aria-label="Services carousel progress"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          <span
            className="services-progress-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </section>
  );
}


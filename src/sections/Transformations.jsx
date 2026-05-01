import { useEffect, useMemo, useRef, useState } from "react";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1.35;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

export default function Transformations({ data }) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0] ?? "All");
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const dragStartXRef = useRef(null);
  const autoSlideResumeTimeoutRef = useRef(null);

  const filteredCards = useMemo(() => {
    if (activeFilter === "All") return data.cards;
    return data.cards.filter((c) => c.category === activeFilter);
  }, [activeFilter, data.cards]);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(Math.ceil(filteredCards.length - visibleCount), 0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter, visibleCount]);

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
    }, 5500);
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
    if (dragStartXRef.current == null) return;
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
      "--transform-visible-count": visibleCount,
      "--transform-current-index": currentIndex
    }),
    [visibleCount, currentIndex]
  );

  return (
    <section className="transformations" id="transformations" aria-label="Transformations">
      <div className="transformations-inner">
        <p className="transformations-badge">{data.badge}</p>
        <h2 className="transformations-title">
          {data.titlePrefix} <span className="transformations-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="transformations-desc">{data.description}</p>

        <div className="transformations-filters" role="tablist" aria-label="Transformation filters">
          {data.filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-pill${f === activeFilter ? " is-active" : ""}`}
              role="tab"
              aria-selected={f === activeFilter}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="transformations-carousel" style={carouselStyle}>
          <div className="transformations-carousel-controls" aria-label="Transformations carousel controls">
            <button
              className="transformations-carousel-btn"
              type="button"
              onClick={() => moveCarousel("prev")}
              aria-label="Previous transformations"
            >
              &#8249;
            </button>
            <button
              className="transformations-carousel-btn"
              type="button"
              onClick={() => moveCarousel("next")}
              aria-label="Next transformations"
            >
              &#8250;
            </button>
          </div>

          <div
            className="transformations-track"
            role="list"
            aria-label="Transformation results"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {filteredCards.map((c, idx) => (
              <article className="transformation-card" role="listitem" key={`${c.person}-${idx}`}>
                <div className="transformation-media" aria-label="Before and after images">
                  <div
                    className="transformation-half"
                    style={c.beforeImageUrl ? { backgroundImage: `url(${c.beforeImageUrl})` } : undefined}
                  >
                    <span className="transformation-label">{c.beforeLabel}</span>
                  </div>
                  <div
                    className="transformation-half"
                    style={c.afterImageUrl ? { backgroundImage: `url(${c.afterImageUrl})` } : undefined}
                  >
                    <span className="transformation-label is-after">{c.afterLabel}</span>
                  </div>
                </div>

                <div className="transformation-body">
                  <div className="transformation-meta">
                    <p className="transformation-person">{c.person}</p>
                    <div className="transformation-tag">{c.tag}</div>
                  </div>

                  <div className="transformation-chips" aria-label="Result highlights">
                  {c.chips.map((chip, chipIndex) => (
                    <span className={`chip${chipIndex === 0 ? " chip-filled" : ""}`} key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className="transformation-quote">{c.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="transformations-cta">
          <h3 className="transformations-cta-title">{data.cta.title}</h3>
          <p className="transformations-cta-sub">{data.cta.subtitle}</p>
          <div className="transformations-cta-actions">
            <a className="cta-btn cta-btn-primary" href={data.cta.primary.href}>
              {data.cta.primary.label} <span aria-hidden="true">→</span>
            </a>
            <a className="cta-btn cta-btn-outline" href={data.cta.secondary.href}>
              {data.cta.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


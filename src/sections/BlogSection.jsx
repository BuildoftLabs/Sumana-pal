import { useEffect, useMemo, useRef, useState } from "react";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1.35;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

export default function BlogSection({ data }) {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const dragStartXRef = useRef(null);
  const autoSlideResumeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(Math.ceil(data.cards.length - visibleCount), 0);

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0 || !isAutoSliding) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, 3400);

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
      "--blog-visible-count": visibleCount,
      "--blog-current-index": currentIndex
    }),
    [visibleCount, currentIndex]
  );

  return (
    <section className="blog" id="blogs" aria-label="From the blog">
      <div className="blog-inner">
        <p className="blog-badge">{data.badge}</p>
        <h2 className="blog-title">
          {data.titlePrefix} <span className="blog-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="blog-desc">{data.description}</p>

        <div className="blog-carousel" style={carouselStyle}>
          <div className="blog-carousel-controls" aria-label="Blog carousel controls">
            <button
              className="blog-carousel-btn"
              type="button"
              onClick={() => moveCarousel("prev")}
              aria-label="Previous blogs"
            >
              &#8249;
            </button>
            <button
              className="blog-carousel-btn"
              type="button"
              onClick={() => moveCarousel("next")}
              aria-label="Next blogs"
            >
              &#8250;
            </button>
          </div>

          <div
            className="blog-track"
            role="list"
            aria-label="Blog cards"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {data.cards.map((card, idx) => (
              <article className="blog-card" role="listitem" key={`${card.title}-${idx}`}>
                <img className="blog-card-img" src={card.imageUrl} alt={card.imageAlt} loading="lazy" />
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{card.title}</h3>
                  <p className="blog-card-date">{card.date}</p>
                  <button type="button" className="blog-card-read">
                    {card.readTime} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

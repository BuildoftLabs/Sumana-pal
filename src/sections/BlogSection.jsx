import { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 580) return 1.35;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

export default function BlogSection({ data }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    async function loadBlogs() {
      try {
        const snap = await getDocs(collection(db, "blogs"));
        const fetchedCards = snap.docs.map(doc => {
          const item = doc.data();
          return {
            id: doc.id,
            slug: item.slug || doc.id,
            title: item.headline,
            subheading: item.description,
            date: item.date ? new Date(item.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "",
            readTime: item.readTime ? `${item.readTime} Read` : "5 Min Read",
            category: item.category,
            imageAlt: item.headline,
            imageUrl: item.image || "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=900&q=80"
          };
        });
        
        fetchedCards.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (fetchedCards.length > 0) setCards(fetchedCards);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    }
    loadBlogs();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(cards.map(c => c.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (selectedCategory === "All") return cards;
    return cards.filter(c => c.category === selectedCategory);
  }, [cards, selectedCategory]);

  const maxIndex = Math.max(Math.ceil(filteredCards.length - visibleCount), 0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0 || !isAutoSliding || !isInView) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, 3400);

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
    <section className="blog" id="blogs" aria-label="From the blog" ref={sectionRef}>
      <div className="blog-inner">
        <div className="blog-head">
          <p className="blog-badge">{data.badge}</p>
        </div>
        <h2 className="blog-title">
          {data.titlePrefix} <span className="blog-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="blog-desc">{data.description}</p>

        <div className="transformations-filters" role="tablist" aria-label="Blog filters" style={{ marginTop: '24px', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`filter-pill${selectedCategory === cat ? " is-active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

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
            {filteredCards.map((card, idx) => (
              <article className="blog-card" role="listitem" key={`${card.id || card.slug}-${idx}`} onClick={() => navigate(`/blogs/${card.slug}`)} style={{cursor: "pointer"}}>
                <img className="blog-card-img" src={card.imageUrl} alt={card.imageAlt} loading="lazy" />
                <div className="blog-card-body">
                  <span className="transformation-tag" style={{ marginTop: '10px', marginBottom: '10px' }}>{card.category || "General"}</span>
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

        <button
          className="blog-viewall-bottom"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/blogs");
          }}
          style={{
            marginTop: '40px',
            background: '#f26f3f',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '12px',
            fontSize: '1.05rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(242, 111, 63, 0.3)'
          }}
        >
          View all blogs <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

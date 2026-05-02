import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Testimonials({ data }) {
  const [testimonials, setTestimonials] = useState(data.testimonials);
  const [rating, setRating] = useState(data.rating);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const snap = await getDocs(collection(db, "reviews"));
        const fetched = snap.docs.map(doc => {
          const item = doc.data();
          return {
            name: item.name,
            stars: item.stars || 5,
            text: item.review,
            avatar: { initials: item.name ? item.name[0] : "?", color: "var(--accent)", imageUrl: item.image || null }
          };
        });
        
        if (fetched.length > 0) {
          setTestimonials(fetched);
          const avg = fetched.reduce((acc, curr) => acc + curr.stars, 0) / fetched.length;
          setRating({ value: avg, label: `${fetched.length}+ Reviews` });
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }
    loadTestimonials();
  }, []);
  return (
    <section className="testimonials" id="testimonials" aria-label="Testimonials">
      <div className="testimonials-inner">
        <p className="testimonials-badge">{data.badge}</p>
        <h2 className="testimonials-title">{data.title}</h2>
        <p className="testimonials-desc">{data.description}</p>

        <div className="testimonials-rating" aria-label="Rating summary">
          <div className="people-row" aria-hidden="true">
            {data.people.map((p, idx) => (
              <span key={`${p.initials}-${idx}`} className="people-avatar" style={{ background: p.color }}>
                {p.initials}
              </span>
            ))}
          </div>

          <div className="rating-text">
            <span className="rating-value">{rating.value.toFixed(1)}</span>
            <span className="rating-star" aria-hidden="true">
              ★
            </span>
            <span className="rating-label">({rating.label})</span>
          </div>
        </div>

        <div className="testimonials-grid" role="list" aria-label="Customer testimonials">
          {testimonials.map((t, idx) => (
            <article className="testimonial-card" role="listitem" key={`${t.name}-${idx}`}>
              <header className="testimonial-head">
                {t.avatar?.imageUrl ? (
                  <img src={t.avatar.imageUrl} alt={t.name} className="testimonial-avatar" style={{ objectFit: 'cover' }} />
                ) : (
                  <span className="testimonial-avatar" aria-hidden="true" style={{ background: t.avatar?.color || "var(--accent)" }}>
                    {t.avatar?.initials || "?"}
                  </span>
                )}
                <div className="testimonial-meta">
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                    {"★".repeat(t.stars)}
                  </p>
                </div>
              </header>

              <p className="testimonial-text">{t.text}</p>
            </article>
          ))}
        </div>

        <div className="testimonials-cta">
          <div className="testimonials-cta-text">
            <p className="testimonials-cta-title">{data.ctaBar.title}</p>
            <p className="testimonials-cta-sub">{data.ctaBar.subtitle}</p>
          </div>
          <a className="google-btn" href={data.ctaBar.buttonHref}>
            <span className="google-logo" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.7 0 3.2.58 4.4 1.72l3.27-3.27C17.62 1.34 14.99 0 12 0 7.31 0 3.27 2.69 1.24 6.61l3.8 2.95C5.95 6.5 8.73 4.8 12 4.8Z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.84-.07-1.64-.2-2.41H12v4.56h6.49a5.56 5.56 0 0 1-2.4 3.64v3h3.88c2.28-2.1 3.52-5.2 3.52-8.79Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.04 14.44a7.2 7.2 0 0 1 0-4.88V6.61h-3.8a12 12 0 0 0 0 10.78l3.8-2.95Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3 0 5.52-.99 7.37-2.69l-3.88-3a6.7 6.7 0 0 1-10.45-3.87l-3.8 2.95A12 12 0 0 0 12 24Z"
                />
              </svg>
            </span>
            {data.ctaBar.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}


export default function Testimonials({ data }) {
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
            <span className="rating-value">{data.rating.value.toFixed(1)}</span>
            <span className="rating-star" aria-hidden="true">
              ★
            </span>
            <span className="rating-label">({data.rating.label})</span>
          </div>
        </div>

        <div className="testimonials-grid" role="list" aria-label="Customer testimonials">
          {data.testimonials.map((t, idx) => (
            <article className="testimonial-card" role="listitem" key={`${t.name}-${idx}`}>
              <header className="testimonial-head">
                <span className="testimonial-avatar" aria-hidden="true" style={{ background: t.avatar.color }}>
                  {t.avatar.initials}
                </span>
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
            <span className="google-g" aria-hidden="true">
              G
            </span>
            {data.ctaBar.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}


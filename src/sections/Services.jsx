export default function Services({ data }) {
  return (
    <section className="services" id="services" aria-label="Services">
      <div className="services-inner">
        <p className="services-badge">{data.badge}</p>

        <h2 className="services-title">
          {data.titlePrefix} <span className="services-title-accent">{data.titleAccent}</span>
        </h2>

        <p className="services-desc">{data.description}</p>

        <div className="services-grid" role="list" aria-label="Service programs">
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

        <div
          className="services-progress"
          role="progressbar"
          aria-label="Services carousel progress"
          aria-valuenow={data.progress.current}
          aria-valuemin={1}
          aria-valuemax={data.progress.total}
        >
          <span
            className="services-progress-fill"
            style={{ width: `${(data.progress.current / data.progress.total) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}


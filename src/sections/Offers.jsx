export default function Offers({ data }) {
  const stripLoopItems = [...data.stripItems, ...data.stripItems];

  return (
    <section className="offers" id="offers" aria-label="Limited time offers">
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

        <div className="offers-grid" role="list" aria-label="Special deal cards">
          {data.cards.map((card) => (
            <article className="offer-card" role="listitem" key={card.title}>
              <div className="offer-media">
                <img className="offer-img" src={card.imageUrl} alt={card.imageAlt} loading="lazy" />
              </div>

              <div className="offer-body">
                <h3 className="offer-title">{card.title}</h3>
                <p className="offer-sub">{card.subtitle}</p>

                <div className="offer-actions">
                  <a className="offer-btn offer-btn-primary" href={card.primaryCta.href}>
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
    </section>
  );
}


export default function Treat({ data }) {
  return (
    <section className="treat" id="what-i-treat" aria-label="What I treat">
      <div className="treat-inner">
        <p className="treat-badge">{data.badge}</p>

        <h2 className="treat-title">
          {data.titlePrefix} <span className="treat-title-accent">{data.titleAccent}</span>
        </h2>

        <p className="treat-desc">{data.description}</p>

        <div className="treat-grid" role="list" aria-label="Conditions treated">
          {data.cards.map((card) => (
            <article className="treat-card" role="listitem" key={card.title}>
              <div className="treat-icon" aria-hidden="true">
                {card.iconUrl ? (
                  <img className="treat-icon-img" src={card.iconUrl} alt={card.title} loading="lazy" />
                ) : (
                  card.icon
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


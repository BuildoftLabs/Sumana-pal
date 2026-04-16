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
                {card.icon}
              </div>
              <h3 className="treat-card-title">{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


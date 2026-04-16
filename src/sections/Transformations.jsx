import { useMemo, useState } from "react";

export default function Transformations({ data }) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0] ?? "All");

  const filteredCards = useMemo(() => {
    if (activeFilter === "All") return data.cards;
    return data.cards.filter((c) => c.category === activeFilter);
  }, [activeFilter, data.cards]);

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

        <div className="transformations-grid" role="list" aria-label="Transformation results">
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
                  {c.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>

                <p className="transformation-quote">{c.quote}</p>
              </div>
            </article>
          ))}
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


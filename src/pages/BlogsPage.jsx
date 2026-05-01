import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogSection, footerSection, navItems } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab from "../components/WhatsAppFab";

export default function BlogsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(blogSection.filters?.[0] ?? "All");

  const cards = useMemo(() => {
    const list = blogSection.cards ?? [];
    if (activeFilter === "All") return list;
    return list.filter((c) => (c.category ?? "All") === activeFilter);
  }, [activeFilter]);

  const featured = cards[0] ?? blogSection.cards?.[0];
  const side = cards.slice(1, 4);
  const grid = cards.slice(0);

  return (
    <main className="blogs-page" aria-label="Blogs page">
      <TopNav navItems={navItems} />

      <section className="blogs" aria-label="All blogs">
        <div className="blogs-inner">
          <p className="blogs-badge">{blogSection.badge}</p>
          <h1 className="blogs-title">
            Straight answers. <span className="blogs-title-accent">Zero fluff.</span>
          </h1>
          <p className="blogs-desc">{blogSection.description}</p>

          <div className="blogs-filters" role="tablist" aria-label="Blog filters">
            {(blogSection.filters ?? ["All"]).map((f) => (
              <button
                key={f}
                type="button"
                className={`blogs-filter${f === activeFilter ? " is-active" : ""}`}
                role="tab"
                aria-selected={f === activeFilter}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="blogs-layout">
            {featured ? (
              <article
                className="blogs-feature"
                role="button"
                tabIndex={0}
                aria-label="Featured blog"
                onClick={() => navigate(`/blogs/${featured.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/blogs/${featured.slug}`);
                }}
              >
                <div className="blogs-feature-media">
                  <img src={featured.imageUrl} alt={featured.imageAlt} loading="lazy" />
                  <span className="blogs-chip">{featured.category ?? "All"}</span>
                </div>
                <div className="blogs-feature-body">
                  <h2 className="blogs-feature-title">{featured.title}</h2>
                  <p className="blogs-feature-date">{featured.date}</p>
                  <button className="blogs-read" type="button">
                    {featured.readTime} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ) : null}

            <div className="blogs-side" aria-label="More blogs">
              {side.map((c, idx) => (
                <article
                  className="blogs-mini"
                  key={`${c.title}-${idx}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/blogs/${c.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") navigate(`/blogs/${c.slug}`);
                  }}
                >
                  <div className="blogs-mini-media">
                    <img src={c.imageUrl} alt={c.imageAlt} loading="lazy" />
                    <span className="blogs-chip">{c.category ?? "All"}</span>
                  </div>
                  <div className="blogs-mini-body">
                    <h3 className="blogs-mini-title">{c.title}</h3>
                    <p className="blogs-mini-date">{c.date}</p>
                    <button className="blogs-read is-mini" type="button">
                      {c.readTime} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="blogs-grid" aria-label="Blog list">
            {grid.map((c, idx) => (
              <article
                className="blogs-card"
                key={`${c.title}-${idx}`}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/blogs/${c.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/blogs/${c.slug}`);
                }}
              >
                <div className="blogs-card-media">
                  <img src={c.imageUrl} alt={c.imageAlt} loading="lazy" />
                  <span className="blogs-chip">{c.category ?? "All"}</span>
                </div>
                <div className="blogs-card-body">
                  <h3 className="blogs-card-title">{c.title}</h3>
                  <p className="blogs-card-date">{c.date}</p>
                  <button className="blogs-read is-mini" type="button">
                    {c.readTime} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
  );
}


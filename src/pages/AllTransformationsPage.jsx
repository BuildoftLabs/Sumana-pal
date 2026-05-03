import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { footerSection, navItems, transformationsSection } from "../content/homeContent";
import Footer from "../sections/Footer";
import TopNav from "../sections/TopNav";
import WhatsAppFab from "../components/WhatsAppFab";

export default function AllTransformationsPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [dynamicFilters, setDynamicFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadTransformations() {
      try {
        const snap = await getDocs(collection(db, "transformations"));
        const fetchedCards = snap.docs.map(doc => {
          const item = doc.data();
          const chips = [];
          if (item.weightLost) chips.push(item.weightLost);
          if (item.duration) chips.push(item.duration);
          
          return {
            category: item.category || "Weight Loss",
            beforeLabel: "Before",
            afterLabel: "After",
            beforeImageUrl: item.beforeImageUrl || item.beforeImage || item.before || null,
            afterImageUrl: item.afterImageUrl || item.afterImage || item.after || null,
            person: `${item.name}${item.age ? `, ${item.age}` : ''} ${item.gender === 'female' ? 'F' : item.gender === 'male' ? 'M' : ''}`.trim(),
            chips,
            tag: item.category || "Weight Loss",
            quote: item.testimonial ? `"${item.testimonial}"` : ""
          };
        });
        if (fetchedCards.length > 0) {
          setCards(fetchedCards);
          const uniqueCategories = [...new Set(fetchedCards.map(c => c.category))];
          setDynamicFilters(["All", ...uniqueCategories]);
        }
      } catch (err) {
        console.error("Failed to fetch transformations", err);
      }
    }
    loadTransformations();
  }, []);

  const filteredCards = useMemo(() => {
    if (activeFilter === "All") return cards;
    return cards.filter((c) => c.category === activeFilter);
  }, [activeFilter, cards]);

  return (
    <main className="transformations-page" aria-label="All Transformations">
      <TopNav navItems={navItems} />

      <section className="transformations is-page">
        <div className="transformations-inner">
          <p className="transformations-badge">{transformationsSection.badge}</p>
          <h1 className="transformations-title">
            {transformationsSection.titlePrefix} <span className="transformations-title-accent">{transformationsSection.titleAccent}</span>
          </h1>
          <p className="transformations-desc">{transformationsSection.description}</p>

          <div className="transformations-filters" role="tablist" aria-label="Transformation filters">
            {dynamicFilters.map((f) => (
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

          <div className="transformations-grid">
            {filteredCards.map((c, idx) => (
              <article className="transformation-card" key={`${c.person}-${idx}`}>
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
                  <p className="transformation-person">{c.person}</p>

                  <div className="transformation-chips" aria-label="Result highlights">
                    {c.chips.map((chip, chipIndex) => (
                      <span className={`chip${chipIndex === 0 ? " chip-filled" : ""}`} key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="transformation-tag">{c.tag}</div>

                  <p className="transformation-quote">{c.quote}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="transformations-page-cta">
            <a
              className="transformations-page-cta-btn"
              href="https://wa.me/918013007962?text=Hi!%20I%20want%20to%20start%20my%20transformation%20journey.%20Please%20guide%20me."
              target="_blank"
              rel="noreferrer"
            >
              Start My Transformation Journey <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer data={footerSection} />
      <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
    </main>
  );
}

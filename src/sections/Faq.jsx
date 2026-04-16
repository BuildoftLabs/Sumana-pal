import { useId, useState } from "react";

export default function Faq({ data }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(data.defaultOpenIndex ?? 0);

  return (
    <section className="faq" id="faqs" aria-label="Frequently asked questions">
      <div className="faq-inner">
        <p className="faq-badge">{data.badge}</p>
        <h2 className="faq-title">
          {data.titlePrefix} <span className="faq-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="faq-desc">{data.description}</p>

        <div className="faq-list" role="list" aria-label="FAQ list">
          {data.items.map((item, idx) => {
            const isOpen = idx === openIndex;
            const panelId = `${baseId}-panel-${idx}`;
            const buttonId = `${baseId}-button-${idx}`;

            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} role="listitem" key={item.q}>
                <button
                  id={buttonId}
                  type="button"
                  className="faq-button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? "▴" : "▾"}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-panel"
                  hidden={!isOpen}
                >
                  <p className="faq-a">{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


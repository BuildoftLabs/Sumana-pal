import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import TopNav from "../sections/TopNav";
import { navItems } from "../content/homeContent";
import WhatsAppFab from "../components/WhatsAppFab";
import { useSEO } from "../hooks/useSEO";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.dietwithsumana.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.dietwithsumana.com/about" }
      ]
    },
    {
      "@type": "Person",
      "name": "Sumana Pal Roy",
      "jobTitle": "Certified Dietitian & Nutritionist",
      "url": "https://www.dietwithsumana.com/about",
      "image": "https://www.dietwithsumana.com/about.png",
      "telephone": "+919804380329",
      "email": "dietwithsumana@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      "sameAs": ["https://www.instagram.com/dietitian_sumana.pal"],
      "knowsAbout": ["Nutrition", "Dietetics", "Weight Loss", "PCOS Diet", "Thyroid Diet", "Diabetes Diet"]
    }
  ]
};

export default function AboutPage() {
  useSEO({
    title: "About Dietitian Sumana Pal Roy | Certified Dietitian & Nutritionist in Kolkata",
    description: "Learn about Dietitian Sumana Pal Roy — a certified nutritionist in Kolkata specializing in weight loss, PCOS, thyroid, and diabetes diet management. Trusted by hundreds of clients.",
    canonical: "/about"
  });

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "sections", "about"))
      .then((snap) => {
        if (snap.exists()) setAboutData(snap.data());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Use Firestore data if available, otherwise fall back to static defaults
  const heroImage   = aboutData?.image       || "/about.png";
  const headline    = aboutData?.headline    || "About Dietitian Sumana Pal Roy";
  const description = aboutData?.description || "";
  const blocks      = Array.isArray(aboutData?.descriptionBlocks)
    ? aboutData.descriptionBlocks
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <main className="about-page" aria-label="About me page">
        <TopNav navItems={navItems} />

        {/* ── Profile Image ──────────────────────────────── */}
        <section className="about-section about-section-white about-img-section" aria-label="About Image">
          <div className="about-hero-inner">
            <div className="about-hero-media">
              <img
                className="about-hero-img"
                src={heroImage}
                alt="Sumana Pal Roy"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── Headline + Short Description ───────────────── */}
        <section className="about-section about-section-white" aria-label="About me content">
          <div className="about-hero-inner">
            <div className="about-hero-copy">
              <h1 className="about-title">
                {headline}
                {!aboutData?.headline && (
                  <>
                    <br />
                    <span className="about-title-accent">Certified Dietitian &amp; Nutritionist in Kolkata</span>
                  </>
                )}
              </h1>
              {description && <p className="about-lead">{description}</p>}
            </div>
          </div>
        </section>

        {/* ── Dynamic Description Blocks from Admin ─────── */}
        {!loading && blocks.length > 0 ? (
          blocks.map((block, i) => (
            <section
              key={block.id || i}
              className={`about-section ${i % 2 === 0 ? "about-section-cream" : "about-section-white"}`}
              aria-label={block.heading || `Section ${i + 1}`}
            >
              <div className="about-hero-inner">
                <div className="about-split-block">
                  {block.heading && (
                    <h2 className="about-split-title">{block.heading}</h2>
                  )}
                  {block.html && (
                    <div
                      className="about-split-text"
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  )}
                </div>
              </div>
            </section>
          ))
        ) : !loading && (
          // Fallback shown only when Firestore has no blocks yet
          <>
            <section className="about-section about-section-cream" aria-label="Awards and Recognition">
              <div className="about-hero-inner">
                <div className="about-split-block">
                  <h2 className="about-split-title">
                    Awards <span className="about-split-accent">&amp; Recognition</span>
                  </h2>
                  <p className="about-split-text">
                    Content coming soon — add description blocks from the admin panel.
                  </p>
                </div>
              </div>
            </section>

            <section className="about-section about-section-white" aria-label="Education and Training">
              <div className="about-hero-inner">
                <div className="about-split-block">
                  <h2 className="about-split-title">
                    Education <span className="about-split-accent">&amp; Training</span>
                  </h2>
                  <p className="about-split-text">
                    Content coming soon — add description blocks from the admin panel.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        <WhatsAppFab message="Hi! I want to enquire about your nutrition plans." />
      </main>
    </>
  );
}
